# Configuracion del Workflow - MANEXT (Mantenimiento de Extintores)

## Datos de la Empresa

```javascript
const CONFIG = {
  baseUrl: 'https://mantenimientodeextintores.mx',
  github: {
    owner: 'Origenlab',
    repo: 'MANTENIMIENTO-DE-EXTINTORES',
    branch: 'main'
  },
  empresa: {
    nombre: 'MANEXT',
    slogan: 'Proteccion Contra Incendios Certificada',
    telefono: '55 3968 9272',
    whatsapp: '5215539689272',
    email: 'contacto@mantenimientodeextintores.mx',
    horario: 'Lun - Dom / 8:00 - 18:00',
    experiencia: 'Mas de 80 anos de experiencia',
    empresasAtendidas: '+15,000 empresas'
  }
};
```

---

## Categorias del Blog

```javascript
const categories = {
  'seguridad-contra-incendios': {
    name: 'Seguridad Contra Incendios',
    description: 'Guias de prevencion, protocolos de seguridad y seleccion de equipos',
    color: '#d32f2f'
  },
  'tipos-de-extintores': {
    name: 'Tipos de Extintores',
    description: 'Diferencias entre PQS, CO2, Agua, Tipo K, Espuma AFFF y Agentes Limpios',
    color: '#f57c00'
  },
  'mantenimiento-y-recarga': {
    name: 'Mantenimiento y Recarga',
    description: 'Servicio profesional, frecuencias de recarga y procesos NOM',
    color: '#1976d2'
  },
  'equipos-contra-incendio': {
    name: 'Equipos Contra Incendio',
    description: 'Sistemas de deteccion, supresion, senalizacion y equipos especializados',
    color: '#7b1fa2'
  },
  'normativas-y-certificaciones': {
    name: 'Normativas y Certificaciones',
    description: 'NOM-154-SCFI, NOM-002-STPS, NFPA y requisitos legales',
    color: '#00796b'
  },
  'prevencion-empresarial': {
    name: 'Prevencion Empresarial',
    description: 'Auditorias, capacitacion de brigadas y protocolos integrales',
    color: '#c62828'
  },
  'emergencias-y-protocolos': {
    name: 'Emergencias y Protocolos',
    description: 'Planes de evacuacion, respuesta rapida y simulacros',
    color: '#e53935'
  },
  'guias-y-comparativas': {
    name: 'Guias y Comparativas',
    description: 'Analisis detallados, precios y comparativas entre equipos',
    color: '#5e35b1'
  },
  'industria-y-comercio': {
    name: 'Industria y Comercio',
    description: 'Soluciones para restaurantes, fabricas, oficinas y bodegas',
    color: '#0288d1'
  },
  'hogar-y-familia': {
    name: 'Hogar y Familia',
    description: 'Proteccion residencial y consejos de seguridad domestica',
    color: '#43a047'
  }
};
```

---

## Productos/Temas para Articulos

```javascript
const products = [
  // === TIPOS DE EXTINTORES ===
  {
    id: 'extintor-pqs',
    name: 'Extintor de Polvo Quimico Seco (PQS)',
    category: 'tipos-de-extintores',
    categoryName: 'Tipos de Extintores',
    focus: 'extintor multiusos ABC para oficinas, comercios e industrias',
    audience: 'Empresarios, encargados de seguridad, duenos de negocios',
    keywords: ['extintor PQS', 'polvo quimico seco', 'extintor ABC', 'extintor multiusos CDMX'],
    url: '/polvo-quimico-seco.html',
    relatedServices: [
      {name: 'Recarga de Extintores', url: '/recarga-de-extintores.html'},
      {name: 'Mantenimiento Preventivo', url: '/mantenimiento-preventivo.html'},
      {name: 'Venta de Extintores', url: '/venta-de-extintores.html'}
    ]
  },
  {
    id: 'extintor-co2',
    name: 'Extintor de CO2 (Dioxido de Carbono)',
    category: 'tipos-de-extintores',
    categoryName: 'Tipos de Extintores',
    focus: 'extintor para equipos electronicos y servidores sin residuos',
    audience: 'IT managers, centros de datos, laboratorios',
    keywords: ['extintor CO2', 'dioxido de carbono', 'extintor equipos electronicos', 'extintor sin residuos'],
    url: '/co2.html',
    relatedServices: [
      {name: 'Extintor PQS', url: '/polvo-quimico-seco.html'},
      {name: 'Agentes Limpios', url: '/agentes-limpios.html'},
      {name: 'Mantenimiento Preventivo', url: '/mantenimiento-preventivo.html'}
    ]
  },
  {
    id: 'extintor-tipo-k',
    name: 'Extintor Tipo K para Cocinas',
    category: 'tipos-de-extintores',
    categoryName: 'Tipos de Extintores',
    focus: 'extintor obligatorio para restaurantes y cocinas comerciales',
    audience: 'Duenos de restaurantes, chefs, gerentes de hoteles',
    keywords: ['extintor Tipo K', 'extintor cocinas', 'extintor restaurantes CDMX', 'extintor aceites grasas'],
    url: '/tipo-k.html',
    relatedServices: [
      {name: 'Extintores Restaurantes', url: '/blog/extintores-restaurantes-requisitos-normativa-cdmx.html'},
      {name: 'Capacitacion Brigadas', url: '/capacitacion-brigadas.html'},
      {name: 'Recarga de Extintores', url: '/recarga-de-extintores.html'}
    ]
  },
  {
    id: 'extintor-agua',
    name: 'Extintor de Agua a Presion',
    category: 'tipos-de-extintores',
    categoryName: 'Tipos de Extintores',
    focus: 'extintor clase A para materiales solidos combustibles',
    audience: 'Industrias textiles, bodegas de papel, archivos',
    keywords: ['extintor agua presion', 'extintor clase A', 'extintor solidos', 'extintor textiles'],
    url: '/agua-presion.html',
    relatedServices: [
      {name: 'Extintor PQS', url: '/polvo-quimico-seco.html'},
      {name: 'Extintor Espuma AFFF', url: '/espuma-afff.html'},
      {name: 'Prueba Hidrostatica', url: '/prueba-hidrostatica.html'}
    ]
  },
  {
    id: 'extintor-espuma',
    name: 'Extintor de Espuma AFFF',
    category: 'tipos-de-extintores',
    categoryName: 'Tipos de Extintores',
    focus: 'extintor para liquidos inflamables y combustibles',
    audience: 'Gasolineras, industria petrolera, talleres mecanicos',
    keywords: ['extintor espuma AFFF', 'extintor liquidos inflamables', 'extintor gasolina', 'extintor clase B'],
    url: '/espuma-afff.html',
    relatedServices: [
      {name: 'Extintor CO2', url: '/co2.html'},
      {name: 'Extintor PQS', url: '/polvo-quimico-seco.html'},
      {name: 'Mantenimiento Preventivo', url: '/mantenimiento-preventivo.html'}
    ]
  },
  {
    id: 'extintor-agente-limpio',
    name: 'Extintor de Agentes Limpios',
    category: 'tipos-de-extintores',
    categoryName: 'Tipos de Extintores',
    focus: 'extintor ecologico para equipos delicados y museos',
    audience: 'Hospitales, museos, centros de computo, laboratorios',
    keywords: ['extintor agente limpio', 'extintor ecologico', 'extintor hospitales', 'extintor museos CDMX'],
    url: '/agentes-limpios.html',
    relatedServices: [
      {name: 'Extintor CO2', url: '/co2.html'},
      {name: 'Sistemas Proteccion', url: '/blog/sistemas-proteccion-integral-empresas-cdmx.html'},
      {name: 'Venta de Extintores', url: '/venta-de-extintores.html'}
    ]
  },

  // === SERVICIOS ===
  {
    id: 'recarga-extintores',
    name: 'Recarga de Extintores',
    category: 'mantenimiento-y-recarga',
    categoryName: 'Mantenimiento y Recarga',
    focus: 'servicio profesional de recarga certificada NOM-154',
    audience: 'Empresas con extintores vencidos o usados',
    keywords: ['recarga extintores CDMX', 'recargar extintor', 'servicio recarga', 'recarga certificada'],
    url: '/recarga-de-extintores.html',
    relatedServices: [
      {name: 'Mantenimiento Preventivo', url: '/mantenimiento-preventivo.html'},
      {name: 'Prueba Hidrostatica', url: '/prueba-hidrostatica.html'},
      {name: 'NOM-154-SCFI', url: '/blog/nom-154-scfi-guia-completa-cumplimiento-extintores.html'}
    ]
  },
  {
    id: 'mantenimiento-preventivo',
    name: 'Mantenimiento Preventivo de Extintores',
    category: 'mantenimiento-y-recarga',
    categoryName: 'Mantenimiento y Recarga',
    focus: 'servicio de mantenimiento anual obligatorio por NOM',
    audience: 'Empresas que necesitan cumplir normativa',
    keywords: ['mantenimiento extintores', 'servicio mantenimiento CDMX', 'mantenimiento anual', 'inspeccion extintores'],
    url: '/mantenimiento-preventivo.html',
    relatedServices: [
      {name: 'Recarga de Extintores', url: '/recarga-de-extintores.html'},
      {name: 'NOM-002-STPS', url: '/blog/nom-002-stps-seguridad-incendios-trabajo.html'},
      {name: 'Capacitacion Brigadas', url: '/capacitacion-brigadas.html'}
    ]
  },
  {
    id: 'prueba-hidrostatica',
    name: 'Prueba Hidrostatica de Extintores',
    category: 'mantenimiento-y-recarga',
    categoryName: 'Mantenimiento y Recarga',
    focus: 'prueba quinquenal obligatoria de resistencia del cilindro',
    audience: 'Empresas con extintores de mas de 5 anos',
    keywords: ['prueba hidrostatica', 'prueba presion extintor', 'prueba quinquenal', 'certificacion cilindro'],
    url: '/prueba-hidrostatica.html',
    relatedServices: [
      {name: 'Vida Util Extintor', url: '/blog/vida-util-extintor-cuando-reemplazarlo.html'},
      {name: 'Mantenimiento Preventivo', url: '/mantenimiento-preventivo.html'},
      {name: 'Venta de Extintores', url: '/venta-de-extintores.html'}
    ]
  },
  {
    id: 'capacitacion-brigadas',
    name: 'Capacitacion de Brigadas Contra Incendio',
    category: 'prevencion-empresarial',
    categoryName: 'Prevencion Empresarial',
    focus: 'formacion obligatoria de personal en uso de extintores',
    audience: 'Empresas que necesitan capacitar a su personal',
    keywords: ['capacitacion extintores', 'curso brigadas', 'capacitacion incendios CDMX', 'formacion brigadas'],
    url: '/capacitacion-brigadas.html',
    relatedServices: [
      {name: 'NOM-002-STPS', url: '/blog/nom-002-stps-seguridad-incendios-trabajo.html'},
      {name: 'Prevencion Incendios', url: '/blog/prevencion-incendios-empresas-protocolo-completo-cdmx.html'},
      {name: 'Senalizacion', url: '/senalizacion.html'}
    ]
  },
  {
    id: 'venta-extintores',
    name: 'Venta de Extintores Certificados',
    category: 'seguridad-contra-incendios',
    categoryName: 'Seguridad Contra Incendios',
    focus: 'venta de extintores nuevos con certificacion NOM',
    audience: 'Empresas que necesitan comprar extintores nuevos',
    keywords: ['venta extintores CDMX', 'comprar extintor', 'extintores certificados', 'precios extintores'],
    url: '/venta-de-extintores.html',
    relatedServices: [
      {name: 'Como Elegir Extintor', url: '/blog/como-elegir-extintor-correcto-negocio-cdmx.html'},
      {name: 'Catalogo Extintores', url: '/catalogo.html'},
      {name: 'Mantenimiento Preventivo', url: '/mantenimiento-preventivo.html'}
    ]
  },
  {
    id: 'senalizacion',
    name: 'Senalizacion y Equipamiento de Seguridad',
    category: 'equipos-contra-incendio',
    categoryName: 'Equipos Contra Incendio',
    focus: 'senales fotoluminiscentes y equipamiento NOM-026',
    audience: 'Empresas que necesitan cumplir senalizacion',
    keywords: ['senalizacion extintores', 'senales seguridad', 'NOM-026-STPS', 'senales evacuacion'],
    url: '/senalizacion.html',
    relatedServices: [
      {name: 'Proteccion Civil', url: '/blog/proteccion-civil-cdmx-requisitos-extintores.html'},
      {name: 'Sistemas Proteccion', url: '/blog/sistemas-proteccion-integral-empresas-cdmx.html'},
      {name: 'Venta de Extintores', url: '/venta-de-extintores.html'}
    ]
  },

  // === NORMATIVAS ===
  {
    id: 'nom-154-scfi',
    name: 'NOM-154-SCFI Extintores',
    category: 'normativas-y-certificaciones',
    categoryName: 'Normativas y Certificaciones',
    focus: 'requisitos tecnicos y legales para extintores en Mexico',
    audience: 'Encargados de seguridad, compliance, auditores',
    keywords: ['NOM-154-SCFI', 'normativa extintores', 'requisitos legales', 'certificacion extintores'],
    url: '/blog/nom-154-scfi-guia-completa-cumplimiento-extintores.html',
    relatedServices: [
      {name: 'NOM-002-STPS', url: '/blog/nom-002-stps-seguridad-incendios-trabajo.html'},
      {name: 'Proteccion Civil', url: '/blog/proteccion-civil-cdmx-requisitos-extintores.html'},
      {name: 'Mantenimiento Preventivo', url: '/mantenimiento-preventivo.html'}
    ]
  },
  {
    id: 'nom-002-stps',
    name: 'NOM-002-STPS Seguridad Laboral',
    category: 'normativas-y-certificaciones',
    categoryName: 'Normativas y Certificaciones',
    focus: 'condiciones de seguridad para prevencion de incendios en trabajo',
    audience: 'Recursos humanos, seguridad industrial, STPS',
    keywords: ['NOM-002-STPS', 'seguridad laboral', 'prevencion incendios trabajo', 'brigadas emergencia'],
    url: '/blog/nom-002-stps-seguridad-incendios-trabajo.html',
    relatedServices: [
      {name: 'Capacitacion Brigadas', url: '/capacitacion-brigadas.html'},
      {name: 'NOM-154-SCFI', url: '/blog/nom-154-scfi-guia-completa-cumplimiento-extintores.html'},
      {name: 'Prevencion Empresarial', url: '/blog/prevencion-incendios-empresas-protocolo-completo-cdmx.html'}
    ]
  },
  {
    id: 'proteccion-civil',
    name: 'Proteccion Civil CDMX Requisitos',
    category: 'normativas-y-certificaciones',
    categoryName: 'Normativas y Certificaciones',
    focus: 'requisitos de extintores para licencia de funcionamiento',
    audience: 'Nuevos negocios, renovacion de licencias',
    keywords: ['Proteccion Civil CDMX', 'licencia funcionamiento', 'requisitos extintores', 'inspeccion Proteccion Civil'],
    url: '/blog/proteccion-civil-cdmx-requisitos-extintores.html',
    relatedServices: [
      {name: 'Multas Extintores', url: '/blog/multas-no-tener-extintores-montos-evitarlas.html'},
      {name: 'NOM-154-SCFI', url: '/blog/nom-154-scfi-guia-completa-cumplimiento-extintores.html'},
      {name: 'Venta de Extintores', url: '/venta-de-extintores.html'}
    ]
  },

  // === INDUSTRIAS ESPECIFICAS ===
  {
    id: 'extintores-restaurantes',
    name: 'Extintores para Restaurantes',
    category: 'industria-y-comercio',
    categoryName: 'Industria y Comercio',
    focus: 'requisitos especificos de extintores para cocinas comerciales',
    audience: 'Duenos de restaurantes, food trucks, hoteles',
    keywords: ['extintores restaurantes', 'Tipo K cocinas', 'normativa restaurantes', 'extintor cocina comercial'],
    url: '/blog/extintores-restaurantes-requisitos-normativa-cdmx.html',
    relatedServices: [
      {name: 'Extintor Tipo K', url: '/tipo-k.html'},
      {name: 'Capacitacion Brigadas', url: '/capacitacion-brigadas.html'},
      {name: 'Proteccion Civil', url: '/blog/proteccion-civil-cdmx-requisitos-extintores.html'}
    ]
  },
  {
    id: 'extintores-oficinas',
    name: 'Extintores para Oficinas',
    category: 'industria-y-comercio',
    categoryName: 'Industria y Comercio',
    focus: 'seleccion y ubicacion de extintores en espacios de oficina',
    audience: 'Facility managers, administradores de edificios',
    keywords: ['extintores oficinas', 'extintor corporativo', 'seguridad oficinas CDMX', 'extintor edificio'],
    url: '/venta-de-extintores.html',
    relatedServices: [
      {name: 'Extintor PQS', url: '/polvo-quimico-seco.html'},
      {name: 'Extintor CO2', url: '/co2.html'},
      {name: 'Senalizacion', url: '/senalizacion.html'}
    ]
  },
  {
    id: 'extintores-bodegas',
    name: 'Extintores para Bodegas e Industrias',
    category: 'industria-y-comercio',
    categoryName: 'Industria y Comercio',
    focus: 'sistemas de proteccion para almacenes y naves industriales',
    audience: 'Gerentes de planta, logistica, operaciones',
    keywords: ['extintores bodegas', 'extintor industrial', 'seguridad almacenes', 'proteccion naves industriales'],
    url: '/venta-de-extintores.html',
    relatedServices: [
      {name: 'Sistemas Proteccion', url: '/blog/sistemas-proteccion-integral-empresas-cdmx.html'},
      {name: 'Extintor PQS 9kg', url: '/productos/producto-extintor-pqs-9kg.html'},
      {name: 'Capacitacion Brigadas', url: '/capacitacion-brigadas.html'}
    ]
  },

  // === GUIAS Y COMPARATIVAS ===
  {
    id: 'clases-fuego',
    name: 'Clases de Fuego A B C D K',
    category: 'seguridad-contra-incendios',
    categoryName: 'Seguridad Contra Incendios',
    focus: 'identificacion de tipos de fuego y extintor correcto',
    audience: 'Cualquier persona que necesite entender clases de fuego',
    keywords: ['clases de fuego', 'tipos de fuego', 'fuego clase A B C D K', 'que extintor usar'],
    url: '/blog/clases-fuego-a-b-c-d-k-guia-completa.html',
    relatedServices: [
      {name: 'Como Elegir Extintor', url: '/blog/como-elegir-extintor-correcto-negocio-cdmx.html'},
      {name: 'Extintor PQS', url: '/polvo-quimico-seco.html'},
      {name: 'Extintor Tipo K', url: '/tipo-k.html'}
    ]
  },
  {
    id: 'como-elegir-extintor',
    name: 'Como Elegir el Extintor Correcto',
    category: 'guias-y-comparativas',
    categoryName: 'Guias y Comparativas',
    focus: 'guia de seleccion segun tipo de negocio y riesgo',
    audience: 'Duenos de negocios, encargados de compras',
    keywords: ['elegir extintor', 'que extintor comprar', 'seleccion extintor', 'mejor extintor negocio'],
    url: '/blog/como-elegir-extintor-correcto-negocio-cdmx.html',
    relatedServices: [
      {name: 'Clases de Fuego', url: '/blog/clases-fuego-a-b-c-d-k-guia-completa.html'},
      {name: 'Venta de Extintores', url: '/venta-de-extintores.html'},
      {name: 'Catalogo Extintores', url: '/catalogo.html'}
    ]
  },
  {
    id: 'precios-extintores',
    name: 'Precios de Extintores en Mexico',
    category: 'guias-y-comparativas',
    categoryName: 'Guias y Comparativas',
    focus: 'comparativa de precios actualizada por tipo y capacidad',
    audience: 'Compradores comparando precios',
    keywords: ['precios extintores', 'cuanto cuesta extintor', 'precio extintor CDMX', 'costo extintor'],
    url: '/blog/precios-extintores-cdmx-guia-actualizada.html',
    relatedServices: [
      {name: 'Venta de Extintores', url: '/venta-de-extintores.html'},
      {name: 'Como Elegir Extintor', url: '/blog/como-elegir-extintor-correcto-negocio-cdmx.html'},
      {name: 'Catalogo Extintores', url: '/catalogo.html'}
    ]
  },

  // === PREVENCION ===
  {
    id: 'prevencion-incendios',
    name: 'Prevencion de Incendios Empresarial',
    category: 'prevencion-empresarial',
    categoryName: 'Prevencion Empresarial',
    focus: 'protocolo completo de prevencion para empresas',
    audience: 'Directores, gerentes de seguridad, compliance',
    keywords: ['prevencion incendios', 'protocolo emergencia', 'plan prevencion', 'seguridad empresarial'],
    url: '/blog/prevencion-incendios-empresas-protocolo-completo-cdmx.html',
    relatedServices: [
      {name: 'Capacitacion Brigadas', url: '/capacitacion-brigadas.html'},
      {name: 'NOM-002-STPS', url: '/blog/nom-002-stps-seguridad-incendios-trabajo.html'},
      {name: 'Sistemas Proteccion', url: '/blog/sistemas-proteccion-integral-empresas-cdmx.html'}
    ]
  },
  {
    id: 'sistemas-proteccion',
    name: 'Sistemas de Proteccion Integral',
    category: 'equipos-contra-incendio',
    categoryName: 'Equipos Contra Incendio',
    focus: 'integracion de detectores, rociadores y senalizacion',
    audience: 'Empresas grandes, edificios corporativos',
    keywords: ['sistemas proteccion incendios', 'detectores humo', 'rociadores automaticos', 'NFPA'],
    url: '/blog/sistemas-proteccion-integral-empresas-cdmx.html',
    relatedServices: [
      {name: 'Senalizacion', url: '/senalizacion.html'},
      {name: 'Prevencion Empresarial', url: '/blog/prevencion-incendios-empresas-protocolo-completo-cdmx.html'},
      {name: 'Capacitacion Brigadas', url: '/capacitacion-brigadas.html'}
    ]
  }
];
```

---

## Tipos de Articulos

```javascript
const articleTypes = [
  { id: 'guia-completa', name: 'Guia Completa', tone: 'educativo y detallado' },
  { id: 'tutorial', name: 'Tutorial Practico', tone: 'paso a paso y aplicable' },
  { id: 'normativa', name: 'Explicacion Normativa', tone: 'tecnico y legal' },
  { id: 'comparativa', name: 'Comparativa', tone: 'analitico y objetivo' },
  { id: 'consejos', name: 'Consejos Profesionales', tone: 'experto y practico' },
  { id: 'casos-uso', name: 'Casos de Uso', tone: 'ejemplos reales y aplicados' }
];
```

---

## Zonas de Cobertura CDMX

```javascript
const colonias = [
  // Zona Centro
  'Centro Historico', 'Roma Norte', 'Roma Sur', 'Condesa', 'Juarez',
  // Zona Sur
  'Coyoacan', 'Del Valle', 'Napoles', 'Mixcoac', 'San Angel', 'Pedregal',
  // Zona Poniente
  'Polanco', 'Lomas de Chapultepec', 'Santa Fe', 'Bosques de las Lomas',
  // Zona Norte
  'Lindavista', 'Industrial Vallejo', 'Azcapotzalco', 'Gustavo A. Madero',
  // Estado de Mexico
  'Naucalpan', 'Tlalnepantla', 'Ecatepec', 'Nezahualcoyotl', 'Toluca',
  'Interlomas', 'Huixquilucan', 'Metepec', 'Atizapan'
];

const zonasIndustriales = [
  'Parque Industrial Vallejo',
  'Zona Industrial Tlalnepantla',
  'Corredor Industrial Naucalpan',
  'Zona Industrial Tultitlan',
  'Parque Industrial Cuamatla',
  'Zona Industrial Ecatepec'
];
```

---

## Imagenes por Categoria

```javascript
const images = {
  'seguridad-contra-incendios': [
    'img/img-index/venta-de-extintores.avif',
    'img/img-index/como-elegir-extintor-correcto.avif',
    'img/img-index/prevencion-de-incendios.avif'
  ],
  'tipos-de-extintores': [
    'img/img-index/polvo-quimico-seco-pqs.avif',
    'img/img-index/dioxido-de-carbono-co2.avif',
    'img/img-index/tipo-k.avif',
    'img/img-index/agua-presion.avif',
    'img/img-index/espuma-afff.avif',
    'img/img-index/agentes-limpios.avif'
  ],
  'mantenimiento-y-recarga': [
    'img/img-index/mantenimiento-preventivo.avif',
    'img/img-index/recarga-de-extintores.avif',
    'img/img-index/prueba-hidrostatica.avif'
  ],
  'equipos-contra-incendio': [
    'img/img-index/sistemas-proteccion-integral.avif',
    'img/img-index/senalizacion.avif'
  ],
  'normativas-y-certificaciones': [
    'img/img-index/nom-154-scfi.avif',
    'img/img-index/prevencion-de-incendios.avif'
  ],
  'prevencion-empresarial': [
    'img/img-index/capacitacion-y-brigadas.avif',
    'img/img-index/prevencion-de-incendios.avif'
  ],
  'emergencias-y-protocolos': [
    'img/img-index/capacitacion-y-brigadas.avif'
  ],
  'guias-y-comparativas': [
    'img/img-index/como-elegir-extintor-correcto.avif',
    'img/img-index/venta-de-extintores.avif'
  ],
  'industria-y-comercio': [
    'img/img-index/tipo-k.avif',
    'img/img-index/venta-de-extintores.avif'
  ],
  'hogar-y-familia': [
    'img/img-index/extintor.avif'
  ]
};
```

---

## Servicios Relacionados (para interlinks)

```javascript
const serviciosDestacados = [
  { name: 'Venta de Extintores', url: '/venta-de-extintores.html', icon: 'shopping-cart' },
  { name: 'Recarga de Extintores', url: '/recarga-de-extintores.html', icon: 'refresh' },
  { name: 'Mantenimiento Preventivo', url: '/mantenimiento-preventivo.html', icon: 'tools' },
  { name: 'Prueba Hidrostatica', url: '/prueba-hidrostatica.html', icon: 'check-circle' },
  { name: 'Capacitacion Brigadas', url: '/capacitacion-brigadas.html', icon: 'users' },
  { name: 'Senalizacion', url: '/senalizacion.html', icon: 'sign' }
];
```

---

## Normativas Clave (para referencias)

```javascript
const normativas = [
  {
    id: 'nom-154-scfi',
    nombre: 'NOM-154-SCFI-2005',
    titulo: 'Equipos contra incendio - Extintores - Servicio de mantenimiento y recarga',
    aplicacion: 'Especificaciones tecnicas para extintores'
  },
  {
    id: 'nom-002-stps',
    nombre: 'NOM-002-STPS-2010',
    titulo: 'Condiciones de seguridad - Prevencion y proteccion contra incendios',
    aplicacion: 'Obligaciones para centros de trabajo'
  },
  {
    id: 'nom-026-stps',
    nombre: 'NOM-026-STPS-2008',
    titulo: 'Colores y senales de seguridad e higiene',
    aplicacion: 'Senalizacion obligatoria'
  }
];
```

---

## Notas para el Prompt

### Tono de Voz MANEXT:
- Profesional pero accesible
- Experto que ASESORA, no vendedor que presiona
- Transmitir 80 anos de experiencia y confianza
- Enfocado en cumplimiento normativo y seguridad

### Diferenciadores a Destacar:
- Mas de 80 anos de experiencia
- +15,000 empresas atendidas
- Certificacion NOM garantizada
- Servicio 24/7
- Cobertura CDMX y Estado de Mexico
- Personal tecnico certificado

### Prohibiciones:
- NO mencionar competidores por nombre
- NO dar garantias de aprobacion de inspecciones
- NO dar consejos medicos sobre inhalacion de agentes
- NO recomendar extintores no certificados NOM
