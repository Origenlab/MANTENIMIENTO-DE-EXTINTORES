/**
 * Taxonomía del catálogo: grupos, clases de fuego y disponibilidad.
 *
 * Vive aparte y sin dependencias a propósito. Estaba definida en
 * `catalog-products.mjs`, que importa la cadena de expansión, así que
 * `catalog-expansion/schema.mjs` no podía usarla para validar sin crear un
 * import circular. Resultado: `group`, `fireClasses` y `availability` se
 * exigían como presentes pero nunca se cotejaban contra los valores válidos —
 * `group: 'inventado'` o `fireClasses: ['Z']` pasaban la validación
 * (auditoría 2026-07-16).
 */

export const catalogGroups = Object.freeze([
  { id: 'portatiles', name: 'Extintores portátiles', description: 'Equipos manuales para protección general y riesgos especializados.' },
  { id: 'industriales', name: 'Móviles e industriales', description: 'Mayor capacidad y caudal para plantas, patios, hangares y procesos.' },
  { id: 'automaticos', name: 'Automáticos y aplicación local', description: 'Protección puntual que requiere validación de cobertura y activación.' },
  { id: 'accesorios', name: 'Accesorios y protección', description: 'Gabinetes, soportes, señalización y elementos de resguardo.' },
  { id: 'refacciones', name: 'Refacciones y consumibles', description: 'Componentes compatibles y agentes para servicio profesional.' },
]);

export const availabilityLabels = Object.freeze({
  'entrega-rapida': 'Entrega rápida',
  'bajo-pedido': 'Bajo pedido',
  'proyecto-especial': 'Proyecto especial',
  'validacion-tecnica': 'Validación técnica requerida',
});

export const fireClasses = Object.freeze([
  { id: 'A', name: 'Clase A', description: 'Sólidos combustibles como papel, madera y textiles.' },
  { id: 'B', name: 'Clase B', description: 'Líquidos y gases inflamables.' },
  { id: 'C', name: 'Clase C', description: 'Equipo eléctrico energizado.' },
  { id: 'D', name: 'Clase D', description: 'Metales combustibles; el agente se selecciona según el metal.' },
  { id: 'K', name: 'Clase K', description: 'Aceites y grasas de cocina a alta temperatura.' },
]);

/** Conjuntos para validar. Derivados de las listas de arriba: no pueden divergir. */
export const CATALOG_GROUP_IDS = Object.freeze(new Set(catalogGroups.map((group) => group.id)));
export const FIRE_CLASS_IDS = Object.freeze(new Set(fireClasses.map((fireClass) => fireClass.id)));
export const AVAILABILITY_IDS = Object.freeze(new Set(Object.keys(availabilityLabels)));
