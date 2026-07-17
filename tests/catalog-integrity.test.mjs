import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { catalogProducts } from '../src/data/catalog-products.mjs';
import { catalogProductDetails } from '../src/data/catalog-product-details.mjs';
import { catalogExpansionProposals } from '../src/data/catalog-expansion/index.mjs';
import { expansionEditorialProfiles } from '../src/data/catalog-expansion/publication.mjs';
import { buildCatalogSchema, buildQuoteProductOptions } from '../src/lib/catalog-utils.mjs';
import { capitalize, uncapitalize, endSentence, sentence, continuation } from '../src/lib/text-utils.mjs';

/**
 * Regresión de la auditoría 2026-07-16.
 *
 * Los 71 tests previos pasaban en verde mientras tres defectos vivían en
 * producción, porque ninguno cubría el output real de las plantillas ni las
 * URLs del schema. Estas pruebas cierran ese hueco: cada bloque falla contra
 * el código anterior al fix.
 */

// ---------------------------------------------------------------------------
// 1.1 — Aridad de las llamadas a offer(): ningún campo puede quedar undefined
// ---------------------------------------------------------------------------

test('ninguna propuesta de expansión tiene campos undefined', () => {
  const defects = [];

  for (const proposal of catalogExpansionProposals) {
    for (const [field, value] of Object.entries(proposal)) {
      if (value === undefined) {
        defects.push(`${proposal.id}.${field} es undefined`);
      }
      if (Array.isArray(value) && value.some((item) => item === undefined || item === null)) {
        defects.push(`${proposal.id}.${field} contiene un elemento vacío`);
      }
      if (typeof value === 'string' && value.trim().length === 0) {
        defects.push(`${proposal.id}.${field} es una cadena vacía`);
      }
    }
  }

  assert.deepEqual(defects, [], `campos vacíos en propuestas:\n${defects.join('\n')}`);
});

test('ninguna ficha renderiza la cadena literal "undefined"', () => {
  const offenders = catalogProductDetails
    .filter((detail) => JSON.stringify(detail).includes('undefined'))
    .map((detail) => detail.slug);

  assert.deepEqual(offenders, [], `fichas con "undefined" impreso: ${offenders.join(', ')}`);
});

test('los sectores son etiquetas cortas, no frases de necesidad', () => {
  // El bug de aridad se detectó porque `sector` capturó el argumento `need`.
  // Un sector es un sustantivo o sintagma corto: "Industria", "Metalmecánica".
  const offenders = catalogExpansionProposals
    .flatMap((proposal) => proposal.sectors.map((sector) => ({ id: proposal.id, sector })))
    .filter(({ sector }) => String(sector).split(/\s+/).length > 4 || /^se\s(necesita|requiere)/i.test(sector))
    .map(({ id, sector }) => `${id}: "${sector}"`);

  assert.deepEqual(offenders, [], `sectores que parecen frases:\n${offenders.join('\n')}`);
});

// ---------------------------------------------------------------------------
// 1.2 — El ItemList debe declarar la ficha real, no un ancla
// ---------------------------------------------------------------------------

test('el ItemList apunta a la URL canónica de cada producto, nunca a un ancla', () => {
  const schema = buildCatalogSchema(catalogProducts);
  const urls = schema.itemListElement.map((element) => element.item.url);

  const anchors = urls.filter((url) => url.includes('#'));
  assert.equal(anchors.length, 0, `${anchors.length} URLs del ItemList son anclas: ${anchors.slice(0, 3).join(', ')}`);

  assert.equal(urls.length, catalogProducts.length);

  // La canónica es la landing de servicio cuando existe; la ficha en los demás.
  const expected = new Set(
    catalogProducts.map((product) => `https://mantenimientodeextintores.mx${product.detailUrl || product.productPageUrl}`),
  );
  const stray = urls.filter((url) => !expected.has(url));
  assert.deepEqual(stray, [], `URLs que no son la canónica del producto: ${stray.join(', ')}`);
});

test('cada producto tiene una sola URL canónica y el ItemList la declara', () => {
  // Los 7 productos con landing declaraban una canónica en la ficha y otra en
  // el ItemList: señal contradictoria justo en los de más volumen de búsqueda.
  const schema = buildCatalogSchema(catalogProducts);
  const listed = new Map(
    schema.itemListElement.map((element) => [element.item.name, element.item.url]),
  );

  const offenders = [];
  for (const detail of catalogProductDetails) {
    const declared = listed.get(detail.name);
    if (declared && declared !== detail.seo.canonical) {
      offenders.push(`${detail.slug}: ItemList dice ${declared}, la ficha dice ${detail.seo.canonical}`);
    }
  }

  assert.deepEqual(offenders, [], `canónicas contradictorias:\n${offenders.join('\n')}`);
});

test('las fichas de familia con landing canonizan a la landing', () => {
  const withLanding = catalogProducts.filter((product) => product.detailUrl);
  assert.equal(withLanding.length, 7, 'son 7 los productos con landing de servicio');

  for (const product of withLanding) {
    const detail = catalogProductDetails.find((item) => item.id === product.id);
    assert.equal(
      detail.seo.canonical,
      `https://mantenimientodeextintores.mx${product.detailUrl}`,
      `${product.id} debe canonizar a su landing`,
    );
  }

  // Las derivadas atacan long-tail y no compiten: canónicas de sí mismas.
  const derived = catalogProducts.find((product) => product.parentProductId === 'pqs-abc-portatil');
  const derivedDetail = catalogProductDetails.find((item) => item.id === derived.id);
  assert.match(derivedDetail.seo.canonical, /\/catalogo\//, 'las derivadas se canonizan a su propia ficha');
});

test('las URLs del catálogo respetan trailingSlash: never', () => {
  const schema = buildCatalogSchema(catalogProducts);
  const urls = [schema.url, ...schema.itemListElement.map((element) => element.item.url)];
  const offenders = urls.filter((url) => url.endsWith('/'));

  assert.deepEqual(offenders, [], `URLs con trailing slash: ${offenders.slice(0, 3).join(', ')}`);
});

// ---------------------------------------------------------------------------
// 1.3 — Gramática de las plantillas editoriales
// ---------------------------------------------------------------------------

/**
 * Las plantillas insertan un fragmento de datos y lo continúan con prosa fija.
 * El invariante es estructural: entre el fragmento y la prosa que le sigue debe
 * existir un cierre de oración. Se verifica contra las frases fijas conocidas en
 * lugar de adivinar la prosa con una heurística — `need` contiene nombres
 * propios ("Purple-K", "Halotron I") que hacen fracasar cualquier regex de
 * mayúsculas.
 */
const BOILERPLATE_SUFFIXES = [
  'El responsable de compra necesita documentar',
  'La propuesta se ajusta al riesgo',
  'MANEXT contrasta estos criterios con la aplicación',
  'La diferencia debe confirmarse contra la ficha',
  'Si el escenario cambia, MANEXT compara otra variante',
  'Revisar estos datos evita pedir',
  'Explicarlo desde la cotización permite',
  'La recomendación final requiere revisar',
  'No basta con comparar el nombre',
  'MANEXT contrasta este límite con el combustible',
  'Para preparar una propuesta responsable',
];

test('toda prosa fija va precedida de un cierre de oración', () => {
  const offenders = [];

  for (const [id, profile] of Object.entries(expansionEditorialProfiles)) {
    const texts = [
      ['humanLead', profile.humanLead],
      ['humanDescription', profile.humanDescription],
      ['buyerScenario', profile.buyerScenario],
      ['valuePromise', profile.valuePromise],
      ['selectionFocus', profile.selectionFocus],
      ['differentiator', profile.differentiator],
      ['notFor', profile.notFor],
      ...profile.benefitAngles.map((angle, i) => [`benefitAngles[${i}]`, angle.text]),
      ...profile.faqs.map((faq, i) => [`faqs[${i}]`, faq.answer]),
    ];

    for (const [field, text] of texts) {
      for (const suffix of BOILERPLATE_SUFFIXES) {
        const index = text.indexOf(suffix);
        if (index <= 0) continue;
        const preceding = text.slice(0, index).trimEnd().slice(-1);
        if (!'.!?'.includes(preceding)) {
          offenders.push(`${id}.${field}: "…${text.slice(Math.max(0, index - 40), index + 20)}…"`);
        }
      }
    }
  }

  assert.deepEqual(offenders.slice(0, 5), [], `${offenders.length} textos con run-on. Ejemplos:\n${offenders.slice(0, 3).join('\n')}`);
});

test('el lead compone need y valueProposition como dos oraciones', () => {
  const offenders = [];

  for (const proposal of catalogExpansionProposals) {
    const profile = expansionEditorialProfiles[proposal.id];
    const closedNeed = /[.!?]$/.test(proposal.need) ? proposal.need : `${proposal.need}.`;
    const openedValue = proposal.valueProposition.charAt(0).toLocaleUpperCase('es-MX') + proposal.valueProposition.slice(1);

    if (!profile.humanLead.includes(`${closedNeed} ${openedValue}`)) {
      offenders.push(`${proposal.id}: ${profile.humanLead.slice(0, 120)}`);
    }
  }

  assert.deepEqual(offenders.slice(0, 3), [], `${offenders.length} leads mal compuestos. Ejemplos:\n${offenders.slice(0, 3).join('\n')}`);
});

test('la marca MANEXT conserva sus mayúsculas en la prosa', () => {
  const offenders = [];

  for (const [id, profile] of Object.entries(expansionEditorialProfiles)) {
    const prose = [
      profile.humanLead, profile.humanDescription, profile.buyerScenario,
      profile.valuePromise, profile.selectionFocus, profile.differentiator, profile.notFor,
      ...profile.benefitAngles.map((angle) => angle.text),
      ...profile.faqs.map((faq) => faq.answer),
    ].join(' ');

    if (/manext/.test(prose)) offenders.push(id);
  }

  assert.deepEqual(offenders.slice(0, 5), [], `${offenders.length} fichas escriben "manext" en minúscula`);
});

test('los acrónimos sobreviven a la composición de metadatos', () => {
  // `toLocaleLowerCase()` sobre la cadena completa destruía PQS, ABC, BC, AFFF,
  // SDS e ICAO. La composición debe bajar sólo la inicial.
  const offenders = catalogProductDetails
    .filter((detail) => / (pqs|abc|bc|afff|sds|icao|co₂) /.test(detail.seo.description))
    .map((detail) => `${detail.slug}: "${detail.seo.description.slice(0, 70)}…"`);

  assert.deepEqual(offenders.slice(0, 5), [], `${offenders.length} descripciones con acrónimos destruidos. Ejemplos:\n${offenders.slice(0, 3).join('\n')}`);
});

// ---------------------------------------------------------------------------
// 1.4 — Títulos capitalizados
// ---------------------------------------------------------------------------

test('todo seoTitle y h1 arranca en mayúscula', () => {
  const offenders = catalogProductDetails
    .filter((detail) => /^[a-záéíóúñ]/.test(detail.seo.title) || /^[a-záéíóúñ]/.test(detail.h1 ?? ''))
    .map((detail) => `${detail.slug}: "${detail.seo.title}"`);

  assert.deepEqual(offenders.slice(0, 5), [], `${offenders.length} títulos en minúscula. Ejemplos:\n${offenders.slice(0, 5).join('\n')}`);
});

test('seoTitle respeta el límite de 60 caracteres tras capitalizar', () => {
  const offenders = catalogProductDetails
    .filter((detail) => detail.seo.title.length > 60)
    .map((detail) => `${detail.slug}: ${detail.seo.title.length} chars`);

  assert.deepEqual(offenders, [], `títulos largos:\n${offenders.join('\n')}`);
});

// ---------------------------------------------------------------------------
// Fase 2 — /productos/* retirado: no debe reaparecer
// ---------------------------------------------------------------------------

test('la colección productos no existe y nadie la referencia', async () => {
  const config = await readFile(new URL('../src/content.config.ts', import.meta.url), 'utf8');

  assert.doesNotMatch(config, /productosCollection/, 'la colección productos debe seguir retirada');
  assert.match(config, /export const collections = \{\s*blog: blogCollection,\s*\}/, 'sólo debe quedar la colección blog');
});

test('cada URL retirada de /productos/ tiene un 301 a un destino que existe', async () => {
  const redirects = await readFile(new URL('../public/_redirects', import.meta.url), 'utf8');

  const rules = redirects
    .split('\n')
    .filter((line) => line.startsWith('/productos/'))
    .map((line) => line.trim().split(/\s+/));

  assert.equal(rules.length, 42, 'deben existir los 42 redirects de las URLs indexadas');

  const catalogUrls = new Set(catalogProducts.map((product) => product.productPageUrl));
  const landings = new Set(['/polvo-quimico-seco', '/tipo-k', '/co2', '/agua-presion', '/espuma-afff', '/agentes-limpios']);

  const broken = rules
    .filter(([, target]) => !catalogUrls.has(target) && !landings.has(target))
    .map(([from, target]) => `${from} -> ${target}`);

  assert.deepEqual(broken, [], `301 apuntando a un destino inexistente:\n${broken.join('\n')}`);

  const wrongCode = rules.filter(([, , code]) => code !== '301').map(([from]) => from);
  assert.deepEqual(wrongCode, [], 'todas las reglas deben ser 301 permanentes');

  // githubSlug() minusculiza: un 301 con mayúsculas nunca haría match.
  const uppercase = rules.filter(([from]) => /[A-Z]/.test(from)).map(([from]) => from);
  assert.deepEqual(uppercase, [], 'las URLs de origen deben ir en minúscula');
});

// ---------------------------------------------------------------------------
// Postura editorial: producto de reventa, sin precio público
// ---------------------------------------------------------------------------

/**
 * tests/catalog.test.mjs:118 ya blindaba el catálogo ("resold products must not
 * be branded as MANEXT"), pero 8 landing pages hacían justo lo contrario:
 * declaraban brand:MANEXT sobre producto que MANEXT distribuye y no fabrica, y
 * un AggregateOffer con availability:InStock sin `lowPrice` — inválido para
 * Google y presumiendo stock. Este test extiende la postura a todo src/pages.
 */
const PAGES_WITH_PRODUCT_SCHEMA = [
  'agentes-limpios', 'agua-presion', 'co2', 'espuma-afff',
  'extintores', 'polvo-quimico-seco', 'tipo-k', 'venta-de-extintores',
];

/** Lee el .astro descartando comentarios: sólo interesa el código que se emite. */
async function readPageCode(page) {
  const source = await readFile(new URL(`../src/pages/${page}.astro`, import.meta.url), 'utf8');
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('//'))
    .join('\n');
}

test('ninguna página declara MANEXT como marca de un producto de reventa', async () => {
  const offenders = [];

  for (const page of PAGES_WITH_PRODUCT_SCHEMA) {
    if (/"brand"\s*:/.test(await readPageCode(page))) offenders.push(page);
  }

  assert.deepEqual(offenders, [], `páginas que marcan producto de reventa como MANEXT: ${offenders.join(', ')}`);
});

test('ninguna página declara stock ni oferta agregada sin precio', async () => {
  const offenders = [];

  for (const page of PAGES_WITH_PRODUCT_SCHEMA) {
    const code = await readPageCode(page);
    if (/AggregateOffer/.test(code)) offenders.push(`${page}: AggregateOffer`);
    if (/schema\.org\/InStock/.test(code)) offenders.push(`${page}: InStock`);
  }

  assert.deepEqual(offenders, [], `claims de oferta sin sustento:\n${offenders.join('\n')}`);
});

/**
 * La regla no es "nunca declarar ofertas": es **declarar una oferta sólo si hay
 * un precio real, y entonces hacerla legible por máquina**. Las landings de
 * agente no publican precio → sin `offers`. Las 3 páginas de sector sí publican
 * precios de entrada en el copy → `AggregateOffer` con `lowPrice`.
 */
const SECTOR_PAGES_WITH_PRICES = ['hospitales', 'restaurantes', 'data-centers'];

test('las ofertas de sector declaran precio legible por máquina', async () => {
  const offenders = [];

  for (const page of SECTOR_PAGES_WITH_PRICES) {
    const source = await readFile(new URL(`../src/pages/sectores/${page}.astro`, import.meta.url), 'utf8');
    const offer = /"offers"\s*:\s*\{[\s\S]*?\n  \}/.exec(source);
    if (!offer) continue;

    if (!/"lowPrice"\s*:\s*"?\d/.test(offer[0])) offenders.push(`${page}: offers sin lowPrice`);
    if (!/"priceCurrency"\s*:\s*"MXN"/.test(offer[0])) offenders.push(`${page}: offers sin priceCurrency`);
  }

  assert.deepEqual(offenders, [], `ofertas sin precio estructurado:\n${offenders.join('\n')}`);
});

test('la NOM-002-STPS no se presenta como atributo del extintor', async () => {
  // NOM-002-STPS-2010 obliga al centro de trabajo/patrón, no al equipo:
  // un extintor no "cumple" ni se "certifica" bajo ella.
  const { readdir } = await import('node:fs/promises');
  const dir = new URL('../src/pages/', import.meta.url);
  const files = (await readdir(dir, { recursive: true })).filter((f) => f.endsWith('.astro'));

  const offenders = [];
  for (const file of files) {
    const source = await readFile(new URL(file, dir), 'utf8');
    const match = /(?:^|>)\s*Cumple\s+NOM-002|extintor\w*[^.<]{0,40}cumple[^.<]{0,15}NOM-002/i.exec(source);
    if (match) offenders.push(`${file}: "${match[0].trim().slice(0, 60)}"`);
  }

  assert.deepEqual(offenders, [], `NOM-002 como atributo del equipo:\n${offenders.join('\n')}`);
});

test('MANEXT no se presenta como unidad de verificación acreditada', async () => {
  // Confirmado por el dueño (2026-07-16): MANEXT NO tiene la acreditación de
  // unidad de verificación. Es figura acreditada por la EMA y aprobada por la
  // Secretaría de Economía para verificar a terceros — distinta de ser
  // prestador del servicio de mantenimiento y recarga, que es lo que MANEXT sí
  // es. El sitio lo afirmaba en 6 lugares. Vigilancia: Economía vía PROFECO.
  const { readdir } = await import('node:fs/promises');
  const dir = new URL('../src/pages/', import.meta.url);
  const files = (await readdir(dir, { recursive: true })).filter((f) => f.endsWith('.astro'));

  const offenders = [];
  for (const file of files) {
    // Hay que quitar las etiquetas antes de evaluar: el claim real venía
    // partido por <strong>, así que un patrón que no cruce '<' no lo ve.
    const text = (await readFile(new URL(file, dir), 'utf8')).replace(/<[^>]+>/g, '');
    // Sólo el claim propio: el blog sí puede explicar qué es una unidad de
    // verificación o recomendar al lector que corrobore la de su proveedor.
    const match = /(somos|estamos|empresa familiar,?|continua,?|1943\.)[^.]{0,70}unidad(es)? de verificaci[oó]n|unidad de verificaci[oó]n autorizada/i.exec(text);
    if (match) offenders.push(`${file}: "${match[0].trim().slice(0, 70)}"`);
  }

  assert.deepEqual(offenders, [], `MANEXT como unidad de verificación:\n${offenders.join('\n')}`);
});

test('no se atribuye a NFPA una certificación de empresa', async () => {
  // NFPA publica estándares y certifica *personas* (CFPS, CFPE); no certifica
  // empresas ni ofrece membresía corporativa. "NFPA Certified" como credencial
  // de MANEXT era falso; "personal con certificaciones NFPA" sí es correcto.
  const source = await readFile(new URL('../src/pages/nosotros.astro', import.meta.url), 'utf8');

  assert.doesNotMatch(source, /NFPA\s+Certified/i, 'NFPA no certifica empresas');
});

// ---------------------------------------------------------------------------
// Citas normativas — verificadas contra fuente primaria (auditoría 2026-07-16)
// ---------------------------------------------------------------------------

/**
 * NOM-154-SCFI-2005, "Equipos contra incendio-Extintores-Servicio de
 * mantenimiento y recarga". Campo de aplicación textual (DOF): «aplica a las
 * personas físicas y morales que presten servicio de mantenimiento y recarga a
 * extintores portátiles y móviles». Certifica al PRESTADOR — a MANEXT —, no al
 * extintor. El sitio la presentaba como certificación de producto en ~120
 * strings; el contenido retirado en /productos/* llegó a decir que normaba la
 * fabricación.
 */
test('ninguna página presenta la NOM-154 como certificación del extintor', async () => {
  const { readdir } = await import('node:fs/promises');
  const dir = new URL('../src/pages/', import.meta.url);
  const files = (await readdir(dir, { recursive: true })).filter((f) => f.endsWith('.astro'));

  // La concordancia de género y número desambigua en español: en "Recarga de
  // Extintores Certificada NOM-154" el participio es femenino y concuerda con
  // "Recarga" (el servicio) — es correcto. El error sólo existe cuando el
  // participio concuerda con "extintor/extintores".
  const wrong = [
    /extintores\s+(<[^>]+>)?\s*certificados\s*(<[^>]+>)?\s*(bajo\s+|norma\s+)?NOM-154/i,
    /extintor\s+(<[^>]+>)?\s*certificado\s*(<[^>]+>)?\s*(bajo\s+|norma\s+)?NOM-154/i,
    /extintores\s+avalados\s+(norma\s+)?NOM-154/i,
    /fabricaci[oó]n\s+certificada\s*(<[^>]+>)?\s*NOM-154/i,
    /fabricantes?\s+aprobad\w*\s*(<[^>]+>)?\s*NOM-154/i,
    /extintores\s+MANEXT\s+cumplen[^.<]{0,20}(<[^>]+>)?\s*NOM-154/i,
    /NOM-154[^.<]{0,40}(especificaciones|requisitos)\s+de\s+fabricaci[oó]n/i,
    /NOM-154[^.<]{0,30}regula[^.<]{0,30}fabricaci[oó]n/i,
  ];

  const offenders = [];
  for (const file of files) {
    const source = await readFile(new URL(file, dir), 'utf8');
    for (const pattern of wrong) {
      const match = pattern.exec(source);
      if (match) offenders.push(`${file}: "${match[0].replace(/<[^>]+>/g, '').slice(0, 70)}"`);
    }
  }

  assert.deepEqual(offenders, [], `NOM-154 como certificación de producto:\n${offenders.join('\n')}`);
});

test('las cifras de la NOM-002-STPS-2010 en las FAQs son las verificadas', async () => {
  const { getSiteFaqs } = await import('../src/data/site-faqs.mjs');
  const faq = getSiteFaqs('/polvo-quimico-seco').find((f) => f.question.includes('¿Cuántos extintores necesito'));

  assert.ok(faq, 'la FAQ de conteo debe existir');
  // Riesgo ordinario: 1 por cada 300 m²; recorrido 23 m (A/C/D) y 15 m (B).
  // El contenido retirado publicaba "200 m²" y "15 m" para todas las clases.
  assert.match(faq.answer, /300\s*m²/, 'debe decir 300 m², no 200');
  assert.match(faq.answer, /23\s*m/, 'debe incluir el recorrido de 23 m para clases A, C y D');
  assert.doesNotMatch(faq.answer, /200\s*m²/, 'la cifra de 200 m² es incorrecta');
});

test('la FAQ de distancia clase K cita la distancia verificada de NFPA 10', async () => {
  const { getSiteFaqs } = await import('../src/data/site-faqs.mjs');
  const faq = getSiteFaqs('/tipo-k').find((f) => f.question.includes('distancia'));

  assert.ok(faq, 'la FAQ de distancia debe existir');
  assert.match(faq.answer, /9\.15\s*m/, 'NFPA 10: 30 pies = 9.15 m para clase K');
});

// ---------------------------------------------------------------------------
// Fase 4 — el selector de la ficha no serializa el catálogo entero
// ---------------------------------------------------------------------------

test('el selector de cotización de la ficha se limita a la familia', () => {
  const offenders = [];

  for (const product of catalogProducts) {
    const options = buildQuoteProductOptions(catalogProducts, product.id);

    // 1 padre + 5 hijos como máximo (schema.mjs:108 fuerza exactamente 5).
    if (options.length > 6) offenders.push(`${product.id}: ${options.length} opciones`);
    // El producto de la ficha siempre debe poder seleccionarse.
    if (!options.some((option) => option.id === product.id)) offenders.push(`${product.id}: no se incluye a sí mismo`);
  }

  assert.deepEqual(offenders.slice(0, 5), [], `selectores demasiado grandes:\n${offenders.slice(0, 5).join('\n')}`);
});

test('la familia del selector reúne padre e hijos del mismo linaje', () => {
  const derived = catalogProducts.find((product) => product.parentProductId);
  const options = buildQuoteProductOptions(catalogProducts, derived.id);
  const ids = options.map((option) => option.id);

  assert.ok(ids.includes(derived.parentProductId), 'debe incluir al padre');
  assert.ok(ids.includes(derived.id), 'debe incluir al producto actual');

  const foreign = options.filter(
    (option) => option.id !== derived.parentProductId && option.parentProductId !== derived.parentProductId,
  );
  assert.deepEqual(foreign, [], 'no debe colar productos de otra familia');
});

test('un id desconocido no rompe el selector', () => {
  // Defensa: ante un id que no existe se devuelve el catálogo completo antes
  // que un formulario sin opciones.
  assert.equal(buildQuoteProductOptions(catalogProducts, 'no-existe').length, catalogProducts.length);
});

// ---------------------------------------------------------------------------
// text-utils — contrato del helper
// ---------------------------------------------------------------------------

test('capitalize y uncapitalize preservan acrónimos', () => {
  assert.equal(capitalize('ofrece una alternativa'), 'Ofrece una alternativa');
  assert.equal(capitalize(''), '');
  assert.equal(capitalize(undefined), '');

  assert.equal(uncapitalize('Ofrece una alternativa'), 'ofrece una alternativa');
  assert.equal(uncapitalize('MANEXT confirma el rating'), 'MANEXT confirma el rating', 'un acrónimo inicial no se toca');
  assert.equal(uncapitalize('SDS, ficha y concentración'), 'SDS, ficha y concentración');
  assert.equal(uncapitalize('CO₂ de 20 lb'), 'CO₂ de 20 lb');
  assert.equal(uncapitalize('Integra servicios de MANEXT'), 'integra servicios de MANEXT', 'sólo cambia la inicial');
});

test('endSentence no duplica puntuación', () => {
  assert.equal(endSentence('un vehículo'), 'un vehículo.');
  assert.equal(endSentence('un vehículo.'), 'un vehículo.');
  assert.equal(endSentence('¿y esto?'), '¿y esto?');
  assert.equal(endSentence('  espacio  '), 'espacio.');
  assert.equal(endSentence(undefined), '');
});

test('sentence y continuation componen fragmentos', () => {
  assert.equal(sentence('ofrece una presentación transportable'), 'Ofrece una presentación transportable.');
  assert.equal(continuation('se necesita un equipo compacto'), 'se necesita un equipo compacto.');
  assert.equal(sentence(undefined), '', 'un fragmento ausente no imprime "undefined"');
  assert.equal(continuation(null), '');
});
