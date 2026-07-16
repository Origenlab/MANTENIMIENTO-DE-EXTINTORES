import test from 'node:test';
import assert from 'node:assert/strict';

import { catalogProducts } from '../src/data/catalog-products.mjs';
import { catalogProductDetails } from '../src/data/catalog-product-details.mjs';
import { catalogExpansionProposals } from '../src/data/catalog-expansion/index.mjs';
import { expansionEditorialProfiles } from '../src/data/catalog-expansion/publication.mjs';
import { buildCatalogSchema } from '../src/lib/catalog-utils.mjs';
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

test('el ItemList apunta a la ficha canónica de cada producto, nunca a un ancla', () => {
  const schema = buildCatalogSchema(catalogProducts);
  const urls = schema.itemListElement.map((element) => element.item.url);

  const anchors = urls.filter((url) => url.includes('#'));
  assert.equal(anchors.length, 0, `${anchors.length} URLs del ItemList son anclas: ${anchors.slice(0, 3).join(', ')}`);

  assert.equal(urls.length, catalogProducts.length);
  assert.equal(new Set(urls).size, urls.length, 'las URLs del ItemList deben ser únicas');

  const expected = new Set(catalogProducts.map((product) => `https://mantenimientodeextintores.mx${product.productPageUrl}`));
  const stray = urls.filter((url) => !expected.has(url));
  assert.deepEqual(stray, [], `URLs que no corresponden a una ficha: ${stray.join(', ')}`);
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
