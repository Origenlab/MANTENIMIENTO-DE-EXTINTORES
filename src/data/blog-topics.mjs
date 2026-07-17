/**
 * Taxonomía del blog: los diez temas y a cuál pertenece cada artículo.
 *
 * Por qué existe (auditoría 2026-07-16):
 *
 *   · Los diez artículos pilar —`tipos-de-extintores`, `normativas-y-certificaciones`,
 *     etc.— publicaban el literal "Contenido principal no detectado
 *     automáticamente. Revisa el archivo original.": un mensaje de error de la
 *     migración, en vivo y en el sitemap. Ya estaba señalado en
 *     ANALISIS-MANEXT-2026-05-05.
 *   · Además eran huérfanos: cero enlaces entrantes. Las tarjetas de tema del
 *     índice del blog eran `<div>` decorativos, sin enlace.
 *
 * Un pilar existe para reunir su tema. Aquí se define ese vínculo, así que el
 * pilar puede listar sus artículos —contenido real, derivado de artículos
 * reales— y el índice puede enlazarlo.
 *
 * La clasificación es por reglas sobre slug y título, evaluadas **de específico
 * a genérico**: gana la primera que casa. El orden importa; `brigada` debe
 * ganar a `empresa` porque un curso de brigadas para una empresa es, ante todo,
 * capacitación. `seguridad-contra-incendios` cierra la lista como tema más
 * amplio: recoge lo que no cae en ningún otro, en vez de dejar artículos fuera.
 */

/**
 * Los diez pilares, **en orden de evaluación**: de específico a genérico.
 *
 * El orden es la parte frágil. Un curso de brigadas para una empresa debe caer
 * en capacitación, no en «por sector»; una señalización exigida por la
 * NOM-026 debe caer en equipamiento, no en «normativas», porque el artículo
 * trata del equipo. Mover una entrada hacia arriba reclasifica artículos en
 * silencio: hay tests que fijan los casos límite.
 *
 * Los patrones usan `\b` a propósito. Sin él, `casa` casa dentro de «no casa»
 * y `auto` dentro de «automáticamente»: media taxonomía se iría a hogar.
 */
export const blogTopics = Object.freeze([
  {
    slug: 'prevencion-empresarial',
    label: 'Brigadas y capacitación',
    icon: 'people',
    desc: 'Formación de brigadas y constancias DC-3',
    intro: 'El equipo correcto no sirve si nadie sabe usarlo. Aquí se reúne lo relacionado con formar brigadas, capacitar al personal y documentarlo con constancias DC-3 válidas ante la STPS.',
    match: /\bbrigadas?\b|capacitaci[oó]n|\bcursos?\b|\bbombero|hazmat|rescate|\bepp\b|\btrajes?-|\bcascos?\b|\bscba\b|firefighter|\bdc-?3\b|simulacro/i,
  },
  {
    slug: 'equipos-contra-incendio',
    label: 'Equipamiento',
    icon: 'building',
    desc: 'Gabinetes, señalización, detección y monitores',
    intro: 'Alrededor del extintor hay un sistema: dónde se monta, cómo se señaliza, qué lo protege y qué avisa antes de que haga falta. Estos artículos cubren ese equipamiento.',
    match: /gabinete|soporte|se[nñ]alizaci[oó]n|manguera|monitores?\b|hidrante|detectores?\b|detecci[oó]n|alarma|rociador|sprinkler|sistema-fijo|\bmanta\b/i,
  },
  {
    slug: 'mantenimiento-y-recarga',
    label: 'Mantenimiento y recarga',
    icon: 'wrench',
    desc: 'Recarga anual, prueba hidrostática e inspección',
    intro: 'Un extintor sin servicio es un objeto decorativo: el polvo se compacta, la presión se pierde y el equipo falla en el único momento que importa. Estos artículos cubren cuándo recargar, cuándo hacer prueba hidrostática y cómo verificar a quien te da el servicio.',
    match: /recarga|recargar|mantenimiento|hidrost[aá]tic|vencid|caduc|p[oó]liza|bit[aá]cora|vida-util|reemplazar|inspecci[oó]n/i,
  },
  {
    slug: 'emergencias-y-protocolos',
    label: 'Emergencias',
    icon: 'fire',
    desc: 'Qué hacer durante un conato de incendio',
    intro: 'Qué hacer en los primeros segundos, cuándo usar el extintor y cuándo evacuar. La decisión correcta depende de haberla pensado antes, no durante.',
    match: /emergencias?\b|evacuaci[oó]n|evacuac|protocolos?\b|que-hacer|primeros-auxilios|conato|incendio-real|como-usar/i,
  },
  {
    slug: 'hogar-y-familia',
    label: 'Hogar y vehículo',
    icon: 'people',
    desc: 'Protección residencial y para tu auto',
    intro: 'La protección contra incendios no es sólo cosa de empresas. Qué tiene sentido en una casa, un condominio o un vehículo, y qué es gasto innecesario.',
    match: /\bhogar\b|\bcasas?\b|\bfamilia\b|residencial|dom[eé]stic|\bautos?\b|veh[ií]cul|condominio/i,
  },
  {
    slug: 'normativas-y-certificaciones',
    label: 'Normativas y NOM',
    icon: 'shield',
    desc: 'NOM-154, NOM-002 y Protección Civil',
    intro: 'La NOM-154-SCFI regula el servicio de mantenimiento y recarga; la NOM-002-STPS obliga al centro de trabajo. Son cosas distintas y confundirlas es el error más común del sector. Aquí está qué exige cada una y a quién.',
    match: /nom-\d|normativ|certificac|protecci[oó]n-civil|\bstps\b|cumplimiento|\bmultas?\b|sanci[oó]n|expediente|dictamen|verificaci[oó]n/i,
  },
  {
    slug: 'industria-y-comercio',
    label: 'Por sector',
    icon: 'building',
    desc: 'Restaurantes, industria, hospitales y oficinas',
    intro: 'El riesgo de una cocina no se parece al de un centro de datos ni al de una gasolinera. Estos artículos aterrizan la selección a sectores concretos y a lo que cada uno debe cumplir.',
    match: /industri|refiner[ií]a|pemex|almac[eé]n|bodega|restaurante|hotel|comercio|oficina|data-?center|hospital|escuela|universidad|gasolinera|centro-comercial|plaza|giro-de-negocio|empresas?\b|corporativ/i,
  },
  {
    slug: 'tipos-de-extintores',
    label: 'Tipos de extintor',
    icon: 'fire',
    desc: 'PQS, CO₂, tipo K, AFFF y agentes limpios',
    intro: 'Cada agente extinguidor resuelve una clase de fuego distinta, y elegir mal no es un detalle: un polvo químico sobre aceite de cocina puede proyectar el aceite en llamas. Estos artículos explican qué apaga cada agente, dónde tiene sentido y dónde no.',
    match: /clases-de-fuego|clases-fuego|tipos-de-extintor|\bpqs\b|\bco2\b|tipo-k|\bafff\b|espuma|agente-limpio|halotron|novec|clase-d|ion-litio|purple-k|\bagua\b/i,
  },
  {
    slug: 'guias-y-comparativas',
    label: 'Guías y comparativas',
    icon: 'flask',
    desc: 'Checklists, precios y cómo elegir',
    intro: 'Comparativas y listas de verificación para decidir con criterio: qué revisar antes de pagar, qué distingue a un proveedor serio y qué cuesta realmente mantener un parque de extintores en regla.',
    match: /checklist|comparativ|-vs-|como-elegir|cu[aá]l-|cuanto-cuesta|precios?\b|costos?\b|lo-que-no-te-dicen|comprar-extintor/i,
  },
  {
    slug: 'seguridad-contra-incendios',
    label: 'Seguridad contra incendios',
    icon: 'shield',
    desc: 'Fundamentos de la protección contra incendios',
    intro: 'Los fundamentos: cómo empieza un incendio, qué lo propaga y por qué la prevención cuesta siempre menos que la respuesta.',
    // Tema más amplio, evaluado al final: recoge lo que no cae en ningún otro,
    // para que ningún artículo se quede sin pilar que lo enlace. `/.*/` y no
    // `/./`: este último no casa la cadena vacía y dejaría de ser un catch-all.
    match: /.*/,
  },
]);

/** Los slugs de los diez pilares. No se clasifican a sí mismos. */
export const blogPillarSlugs = Object.freeze(blogTopics.map((topic) => topic.slug));

/** `index` es la portada del blog, no un artículo clasificable. */
const NOT_AN_ARTICLE = new Set([...blogPillarSlugs, 'index']);

/** ¿Es este artículo un pilar? Devuelve su tema, o `null`. */
export function getTopicForPillar(slug) {
  return blogTopics.find((topic) => topic.slug === slug) ?? null;
}

/** Tema de un artículo, por slug y título. Nunca devuelve `null`. */
export function classifyPost(slug, title = '') {
  const haystack = `${slug} ${title}`;
  return blogTopics.find((topic) => topic.match.test(haystack)) ?? blogTopics[blogTopics.length - 1];
}

/**
 * Artículos de cada tema, a partir de la colección `blog`. Excluye los pilares
 * y la portada: un pilar no se lista a sí mismo.
 */
export function groupPostsByTopic(entries) {
  const groups = new Map(blogTopics.map((topic) => [topic.slug, []]));

  for (const entry of entries) {
    if (NOT_AN_ARTICLE.has(entry.id)) continue;
    const topic = classifyPost(entry.id, entry.data.title);
    groups.get(topic.slug).push(entry);
  }

  return groups;
}
