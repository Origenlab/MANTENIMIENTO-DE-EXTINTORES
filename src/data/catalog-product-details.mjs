import { availabilityLabels, catalogGroups, catalogProducts } from './catalog-products.mjs';
import { getCatalogProductEditorial } from './catalog-product-editorial.mjs';

const authoredCatalogProductDetails = [
  {
    id: 'co2-portatil',
    slug: 'extintor-co2-portatil',
    name: 'Extintor CO₂ portátil',
    eyebrow: 'Extintores portátiles · Dióxido de carbono',
    category: 'Extintores portátiles',
    agent: 'Dióxido de carbono (CO₂)',
    fireClasses: ['B', 'C'],
    availability: 'Cotización personalizada',
    lead: 'Protección sin residuo para líquidos inflamables y equipo eléctrico energizado, con selección técnica según el riesgo, el recinto y la capacidad requerida.',
    description: 'El extintor CO₂ portátil es una solución para fuegos incipientes clase B y C en áreas con equipos eléctricos, electrónicos y líquidos inflamables. MANEXT te ayuda a definir capacidad, cantidad, ubicación y servicios complementarios.',
    image: '/img/productos/co2/img-extintores-co2/Extintor-de-CO2-5lbs.avif',
    imageAlt: 'Extintor CO₂ portátil de 5 libras para riesgos clase B y C',
    galleryImage: '/img/productos/co2/img-extintores-co2/Extintor-portátil-CO2-10lbs.avif',
    galleryImageAlt: 'Extintor portátil CO₂ de 10 libras con corneta de descarga',
    variants: ['5 lb', '10 lb', '15 lb', '20 lb'],
    applications: ['Tableros eléctricos', 'Servidores y telecomunicaciones', 'Laboratorios', 'Líquidos inflamables compatibles'],
    sectors: ['Tecnología', 'Corporativos', 'Salud', 'Industria', 'Laboratorios'],
    detailCopy: {
      availabilityBadge: 'Entrega sujeta a confirmación',
      heroSuffix: 'para riesgos clase B y C',
      agentBadge: 'Agente sin residuo',
      quickUse: 'Tableros eléctricos · Servidores',
      variantLabel: 'Capacidades',
      trustItems: ['Selección según el riesgo y el inmueble', 'Instalación y señalización opcionales', 'Atención en CDMX y área metropolitana'],
      benefitsTitle: 'Por qué elegir un extintor de dióxido de carbono',
      benefitsIntro: 'El CO₂ destaca cuando importa controlar un fuego incipiente sin dejar polvo sobre equipo sensible. La selección final debe equilibrar protección, ventilación, portabilidad y posibilidad de reignición.',
      specsTitle: 'Ficha técnica del extintor CO₂ portátil',
      specsIntro: 'Datos comerciales para orientar la compra. Las especificaciones definitivas dependen de marca, modelo, rating, capacidad nominal y documentación del equipo cotizado.',
      specsCaption: 'Especificaciones del extintor CO₂ portátil',
      capacityTitle: 'Capacidades habituales: 5, 10, 15 y 20 lb',
      capacityIntro: 'La capacidad por sí sola no define la cobertura. MANEXT confirma el rating del modelo, el escenario de fuego, la distancia de recorrido y la facilidad de manejo antes de recomendar una configuración.',
      applicationsTitle: 'Protección para infraestructura eléctrica y equipo sensible',
      applicationsIntro: 'Su ventaja comercial es clara: controla riesgos compatibles sin contaminar el área con polvo. Aun así, cada aplicación necesita revisar el combustible real y las condiciones del recinto.',
      faqTitle: 'Lo esencial antes de cotizar un extintor CO₂',
      faqIntro: 'Respuestas breves para comparar opciones y preparar una solicitud más precisa.',
      guideUrl: '/co2/',
      guideLabel: 'Ver la guía completa sobre CO₂',
      formLabel: 'Formulario de cotización del extintor CO₂',
    },
    benefits: [
      {
        title: 'Sin residuo posterior',
        text: 'El agente se dispersa como gas y no deja polvo sobre tableros, tarjetas, contactos o superficies sensibles.',
        icon: 'clean',
      },
      {
        title: 'Cobertura clase B',
        text: 'Se utiliza en fuegos incipientes con líquidos inflamables cuando el equipo y la capacidad corresponden al riesgo.',
        icon: 'drop',
      },
      {
        title: 'Cobertura clase C',
        text: 'Es apropiado para equipo eléctrico energizado; al desenergizar, debe evaluarse la clase real del combustible.',
        icon: 'bolt',
      },
      {
        title: 'Solución integral MANEXT',
        text: 'La propuesta puede incluir suministro, instalación, señalización, mantenimiento, recarga y documentación.',
        icon: 'shield',
      },
    ],
    technicalSpecs: [
      ['Agente extinguidor', 'Dióxido de carbono (CO₂)'],
      ['Clases de fuego', 'B y C'],
      ['Presentaciones habituales', '5 lb, 10 lb, 15 lb y 20 lb'],
      ['Residuo después de descarga', 'No deja polvo ni agente sólido'],
      ['Identificación característica', 'Cilindro con corneta o difusor de descarga'],
      ['Verificación de carga', 'Por peso, conforme al equipo y procedimiento aplicable'],
      ['Uso principal', 'Líquidos inflamables y equipo eléctrico energizado'],
      ['Configuración final', 'Se confirma por riesgo, capacidad nominal, marca y disponibilidad'],
    ],
    capacityGuide: [
      { capacity: '5 lb', profile: 'Puntos compactos', use: 'Estaciones de trabajo, equipos pequeños o respaldo localizado.', note: 'La cobertura depende del rating y fabricante.' },
      { capacity: '10 lb', profile: 'Uso comercial', use: 'Tableros, cuartos eléctricos y racks de escala contenida.', note: 'Equilibrio habitual entre portabilidad y carga.' },
      { capacity: '15 lb', profile: 'Mayor demanda', use: 'Salas técnicas, laboratorios y procesos con mayor exposición.', note: 'Validar maniobrabilidad y distancia de recorrido.' },
      { capacity: '20 lb', profile: 'Aplicación robusta', use: 'Áreas industriales o técnicas que requieren mayor capacidad portátil.', note: 'Confirmar ubicación, soporte y capacidad del usuario.' },
    ],
    recommendedUses: [
      { title: 'Tableros y cuartos eléctricos', text: 'Ayuda a controlar un fuego incipiente sin depositar polvo conductor o corrosivo sobre componentes.' },
      { title: 'Servidores y telecomunicaciones', text: 'Opción portátil para riesgos eléctricos puntuales donde la limpieza posterior es un factor operativo importante.' },
      { title: 'Laboratorios e instrumentación', text: 'Adecuado cuando existen equipos sensibles y combustibles clase B compatibles con el rating del extintor.' },
      { title: 'Procesos con líquidos inflamables', text: 'Puede aplicarse a fuegos clase B incipientes; el tipo de líquido, superficie y posibilidad de reignición deben revisarse.' },
    ],
    limitations: [
      'No se recomienda como solución principal para fuegos clase A profundos o materiales que pueden seguir ardiendo y reignitar cuando el CO₂ se dispersa.',
      'El CO₂ puede desplazar oxígeno. No debe utilizarse en espacios confinados ocupados sin controles, capacitación y protección respiratoria apropiados.',
      'La descarga produce frío intenso. La corneta y partes frías no deben sujetarse fuera de las zonas indicadas por el fabricante.',
      'No sustituye el análisis del riesgo, la capacitación del personal ni un sistema fijo cuando la magnitud del peligro requiere otra ingeniería.',
    ],
    quoteIncludes: [
      { number: '01', title: 'Revisión del riesgo', text: 'Identificamos combustibles, equipos energizados, superficie, ventilación y condiciones de operación.' },
      { number: '02', title: 'Selección del equipo', text: 'Definimos capacidades, cantidad, ubicaciones y accesorios según el escenario y disponibilidad.' },
      { number: '03', title: 'Propuesta integral', text: 'Cotizamos suministro y, si lo necesitas, instalación, señalización, mantenimiento, recarga y capacitación.' },
    ],
    compliance: {
      title: 'Selección y servicio con enfoque normativo',
      text: 'La NOM-002-STPS-2010 exige contar con extintores acordes con la clase de fuego y mantenerlos en condiciones de operación. La NOM-154-SCFI-2005 establece requisitos para los servicios de mantenimiento y recarga. La conformidad final depende del equipo, su documentación y el servicio contratado.',
      items: ['Selección por clase de fuego y riesgo', 'Ubicación, accesibilidad y señalización', 'Mantenimiento y recarga documentados', 'Reemplazo temporal disponible durante el servicio, sujeto a programa'],
    },
    faqs: [
      {
        question: '¿Para qué sirve un extintor CO₂ portátil?',
        answer: 'Se utiliza principalmente en fuegos incipientes clase B, relacionados con líquidos inflamables, y clase C, relacionados con equipo eléctrico energizado. La capacidad y el rating deben corresponder al riesgo real.',
      },
      {
        question: '¿El CO₂ daña computadoras o tableros eléctricos?',
        answer: 'El agente no deja polvo ni residuo sólido, por lo que reduce la necesidad de limpieza posterior. Sin embargo, el equipo afectado debe inspeccionarse antes de volver a energizarse y la descarga fría requiere precaución.',
      },
      {
        question: '¿Qué capacidad de extintor CO₂ necesito?',
        answer: 'Las presentaciones habituales son 5, 10, 15 y 20 lb, pero la elección no debe hacerse sólo por tamaño. Se revisan el tipo y magnitud del riesgo, rating del equipo, distancia de recorrido, ventilación y capacidad de manejo.',
      },
      {
        question: '¿Por qué no se recomienda para fuegos clase A?',
        answer: 'El CO₂ puede apagar la llama visible, pero ofrece enfriamiento limitado en materiales sólidos que pueden continuar con combustión interna y reignitar cuando el gas se dispersa.',
      },
      {
        question: '¿Se puede usar en un espacio cerrado?',
        answer: 'Requiere una evaluación especial porque el CO₂ desplaza oxígeno. No debe descargarse en espacios confinados ocupados sin controles, capacitación y protección apropiados.',
      },
      {
        question: '¿La cotización puede incluir instalación y mantenimiento?',
        answer: 'Sí. MANEXT puede integrar suministro, soportes o gabinete, señalización, instalación, mantenimiento, recarga y capacitación en una sola propuesta.',
      },
    ],
    seo: {
      title: 'Extintor CO₂ Portátil en CDMX | Cotiza con MANEXT',
      description: 'Cotiza un extintor CO₂ portátil de 5, 10, 15 o 20 lb para riesgos clase B y C. Asesoría, instalación y mantenimiento en CDMX y zona metropolitana.',
      canonical: 'https://mantenimientodeextintores.mx/catalogo/extintor-co2-portatil',
      ogTitle: 'Extintor CO₂ portátil para riesgos clase B y C',
      ogDescription: 'Selecciona la capacidad correcta con asesoría técnica MANEXT. Cotización personalizada con instalación, señalización y servicio posterior.',
    },
    sources: [
      { label: 'Guía informativa NOM-002-STPS-2010', url: 'https://www.stps.gob.mx/bp/secciones/dgsst/publicaciones/guias/Guia_002.pdf' },
      { label: 'NOM-154-SCFI-2005 en el Diario Oficial de la Federación', url: 'https://www.dof.gob.mx/normasOficiales/791/NOM-154-SCFI-2005/NOM-154-SCFI-2005.htm' },
      { label: 'OSHA: fundamentos de extintores portátiles', url: 'https://www.osha.gov/etools/evacuation-plans-procedures/emergency-standards/portable-extinguishers/about' },
    ],
  },
  {
    id: 'hfc-236fa-portatil',
    slug: 'extintor-agente-limpio-hfc-236fa',
    name: 'Extintor de agente limpio HFC-236fa',
    eyebrow: 'Extintores portátiles · Agente limpio HFC-236fa',
    category: 'Extintores portátiles',
    agent: 'HFC-236fa (1,1,1,3,3,3-hexafluoropropano)',
    fireClasses: ['A', 'B', 'C'],
    availability: 'Cotización personalizada',
    lead: 'Protección portátil sin residuo para electrónica, telecomunicaciones e instrumentación, con selección por rating, capacidad, riesgo y disponibilidad del equipo.',
    description: 'El extintor de agente limpio HFC-236fa está orientado a fuegos incipientes en áreas donde el residuo de polvo o espuma puede agravar el daño operativo. MANEXT valida el rating ABC del modelo, la capacidad, la cantidad y los servicios complementarios antes de cotizar.',
    image: '/img/productos/agentes-limpios/img-agente-limpio/extintor-agente-limpio-6kg-venta.avif',
    imageAlt: 'Extintor portátil de agente limpio HFC-236fa de 6 kg',
    galleryImage: '/img/productos/agentes-limpios/img-agente-limpio/extintores-agente-limpio-4-5kg-para-negocios.avif',
    galleryImageAlt: 'Extintor de agente limpio de 4.5 kg para electrónica y telecomunicaciones',
    variants: ['2.5 kg', '4.5 kg', '6 kg'],
    applications: ['Electrónica', 'Telecomunicaciones', 'Instrumentación', 'Activos de alto valor'],
    sectors: ['Centros de datos', 'Telecomunicaciones', 'Laboratorios', 'Industria', 'Corporativos'],
    detailCopy: {
      availabilityBadge: 'Disponibilidad bajo pedido',
      heroSuffix: 'para electrónica, telecomunicaciones y activos sensibles',
      agentBadge: 'Agente limpio sin residuo',
      quickUse: 'Electrónica · Telecomunicaciones',
      variantLabel: 'Capacidades',
      trustItems: ['Selección según el riesgo y el inmueble', 'Instalación y señalización opcionales', 'Atención en CDMX y área metropolitana'],
      benefitsTitle: 'Por qué elegir un extintor de agente limpio HFC-236fa',
      benefitsIntro: 'HFC-236fa permite orientar la descarga hacia un fuego incipiente sin depositar polvo sobre componentes sensibles. La selección profesional confirma rating, capacidad, compatibilidad, condiciones de ocupación y disponibilidad.',
      specsTitle: 'Ficha técnica del extintor HFC-236fa',
      specsIntro: 'Datos comerciales para orientar la cotización. Las especificaciones definitivas dependen de la marca, el modelo, el rating, la capacidad nominal, el agente autorizado y la documentación del equipo.',
      specsCaption: 'Especificaciones del extintor de agente limpio HFC-236fa',
      capacityTitle: 'Capacidades habituales: 2.5, 4.5 y 6 kg',
      capacityIntro: 'La carga nominal no determina por sí sola la cobertura. MANEXT revisa el rating del modelo, el riesgo, la distancia de recorrido, la maniobrabilidad y la disponibilidad antes de recomendar una capacidad.',
      applicationsTitle: 'Protección limpia para electrónica y activos críticos',
      applicationsIntro: 'Su principal ventaja es reducir el daño colateral asociado con agentes que dejan residuos. Cada aplicación debe confirmar la clase de fuego, el alcance del equipo y las instrucciones del fabricante.',
      faqTitle: 'Lo esencial antes de cotizar un extintor HFC-236fa',
      faqIntro: 'Respuestas técnicas para comparar capacidades, aplicaciones y condiciones de suministro.',
      guideUrl: '/agentes-limpios/',
      guideLabel: 'Conocer la guía de agentes limpios',
      formLabel: 'Formulario de cotización del extintor HFC-236fa',
    },
    benefits: [
      {
        title: 'Descarga sin residuo',
        text: 'No deposita polvo ni espuma sobre tarjetas, contactos, sensores o superficies, lo que reduce la limpieza posterior al incidente.',
        icon: 'clean',
      },
      {
        title: 'Apto para equipo energizado',
        text: 'El agente es eléctricamente no conductor; la aptitud clase C debe confirmarse en el rating y la etiqueta del modelo cotizado.',
        icon: 'bolt',
      },
      {
        title: 'Protección de activos sensibles',
        text: 'Es una alternativa para áreas donde el daño por residuos puede comprometer información, instrumentación o continuidad operativa.',
        icon: 'shield',
      },
      {
        title: 'Configuración técnica MANEXT',
        text: 'La propuesta puede integrar suministro, ubicación, instalación, señalización, mantenimiento, recarga y documentación.',
        icon: 'check',
      },
    ],
    technicalSpecs: [
      ['Agente extinguidor', 'HFC-236fa (1,1,1,3,3,3-hexafluoropropano)'],
      ['Clases de fuego', 'A, B y C, sujetas al rating del modelo'],
      ['Presentaciones comerciales', '2.5 kg, 4.5 kg y 6 kg, según fabricante y disponibilidad'],
      ['Residuo después de descarga', 'No deja polvo, espuma ni agente sólido'],
      ['Propiedades relevantes', 'Agente no conductor y no corrosivo, conforme a la documentación del fabricante'],
      ['Aplicación principal', 'Electrónica, telecomunicaciones, instrumentación y activos sensibles'],
      ['Perfil ambiental', 'Potencial de agotamiento de ozono igual a cero; por ser un HFC requiere manejo y recuperación responsables'],
      ['Configuración final', 'Se confirma por rating, riesgo, capacidad nominal, marca, documentación y disponibilidad'],
    ],
    capacityGuide: [
      { capacity: '2.5 kg', profile: 'Protección localizada', use: 'Puntos compactos de electrónica, instrumentación o comunicaciones.', note: 'Confirmar rating, alcance y soporte del modelo.' },
      { capacity: '4.5 kg', profile: 'Uso técnico comercial', use: 'Cuartos de telecomunicaciones, control y equipos sensibles de escala contenida.', note: 'Balance habitual entre autonomía y maniobrabilidad.' },
      { capacity: '6 kg', profile: 'Mayor carga portátil', use: 'Áreas técnicas con mayor exposición o concentración de activos críticos.', note: 'Validar recorrido, peso operativo y capacidad del usuario.' },
    ],
    recommendedUses: [
      { title: 'Electrónica y tableros de control', text: 'Ayuda a combatir un fuego incipiente sin introducir partículas sobre circuitos, contactos o dispositivos de precisión.' },
      { title: 'Telecomunicaciones y centros de datos', text: 'Adecuado para puntos de riesgo donde la continuidad, la limpieza posterior y la protección del hardware son determinantes.' },
      { title: 'Laboratorios e instrumentación', text: 'Puede proteger equipos de medición y procesos sensibles cuando el rating del extintor corresponde a los combustibles presentes.' },
      { title: 'Archivos y activos de alto valor', text: 'Alternativa para áreas donde agua, espuma o polvo pueden ocasionar daños adicionales difíciles de recuperar.' },
    ],
    limitations: [
      'La clasificación A, B y C debe verificarse en el rating, la etiqueta y la documentación del extintor específico; no se determina únicamente por el nombre del agente.',
      'La descarga y sus posibles productos de descomposición no deben inhalarse. Deben seguirse las instrucciones del fabricante, ventilación, evacuación y capacitación aplicables.',
      'HFC-236fa no agota la capa de ozono, pero es un gas de efecto invernadero. La selección debe considerar disponibilidad, recuperación del agente y alternativas de menor impacto cuando sean viables.',
      'Un extintor portátil no sustituye un sistema fijo de supresión ni el análisis de ingeniería cuando la magnitud, continuidad o confinamiento del riesgo requieren otra solución.',
    ],
    quoteIncludes: [
      { number: '01', title: 'Levantamiento del riesgo', text: 'Identificamos combustibles, equipos energizados, ocupación, ventilación, continuidad operativa y valor de los activos.' },
      { number: '02', title: 'Validación del equipo', text: 'Confirmamos agente, rating, capacidad, cantidad, ubicación, marca, documentación y disponibilidad comercial.' },
      { number: '03', title: 'Propuesta integral', text: 'Cotizamos suministro y, si lo necesitas, instalación, señalización, mantenimiento, recarga y capacitación.' },
    ],
    compliance: {
      title: 'Selección documentada y servicio responsable',
      text: 'La NOM-002-STPS-2010 contempla los agentes limpios para fuegos A, B y C y exige seleccionar extintores acordes con la clase de fuego. La NOM-154-SCFI-2005 establece requisitos para mantenimiento y recarga. La conformidad final depende del modelo, su rating, documentación y servicio contratado.',
      items: ['Validación de clase de fuego y rating', 'Ubicación, accesibilidad y señalización', 'Mantenimiento y recarga documentados', 'Confirmación de agente, refacciones y disponibilidad'],
    },
    faqs: [
      {
        question: '¿Qué es un extintor HFC-236fa?',
        answer: 'Es un extintor portátil que utiliza 1,1,1,3,3,3-hexafluoropropano como agente limpio. Está orientado a riesgos donde importa controlar un conato sin dejar polvo o espuma sobre equipos y superficies.',
      },
      {
        question: '¿El HFC-236fa deja residuos sobre equipos electrónicos?',
        answer: 'No deja residuo sólido después de la descarga. Aun así, cualquier equipo afectado por fuego, humo o temperatura debe ser inspeccionado antes de volver a energizarse.',
      },
      {
        question: '¿Sirve para fuegos clase A, B y C?',
        answer: 'Los agentes limpios aparecen como aplicables a clases A, B y C en la guía de referencia de la NOM-002-STPS-2010, pero la clasificación efectiva debe comprobarse en el rating y la etiqueta del extintor específico.',
      },
      {
        question: '¿Qué capacidad de HFC-236fa necesito?',
        answer: 'Las opciones consideradas en este catálogo son 2.5, 4.5 y 6 kg. La recomendación depende del rating del modelo, el tipo y magnitud del riesgo, la distancia de recorrido, el alcance y la facilidad de manejo.',
      },
      {
        question: '¿Qué diferencia hay entre HFC-236fa, CO₂ y PQS?',
        answer: 'HFC-236fa y CO₂ no dejan residuo sólido; el PQS sí deja polvo. La cobertura de clases, el alcance, la seguridad de uso, la disponibilidad y el costo total varían, por lo que deben compararse contra el riesgo real.',
      },
      {
        question: '¿La cotización incluye instalación y mantenimiento?',
        answer: 'Puede incluir suministro, soportes o gabinete, señalización, instalación, mantenimiento, recarga, capacitación y documentación en una sola propuesta.',
      },
    ],
    seo: {
      title: 'Extintor HFC-236fa en CDMX | Agente Limpio - MANEXT',
      description: 'Cotiza un extintor de agente limpio HFC-236fa de 2.5, 4.5 o 6 kg para electrónica y telecomunicaciones. Asesoría, instalación y servicio MANEXT en CDMX.',
      canonical: 'https://mantenimientodeextintores.mx/catalogo/extintor-agente-limpio-hfc-236fa',
      ogTitle: 'Extintor de agente limpio HFC-236fa para equipo sensible',
      ogDescription: 'Protección sin residuo para electrónica, telecomunicaciones e instrumentación, con selección técnica y cotización personalizada MANEXT.',
    },
    sources: [
      { label: 'Chemours: agente extintor FE-36 (HFC-236fa)', url: 'https://www.chemours.com/en/brands-and-products/fire-suppressants/products/fe36' },
      { label: 'Chemours: propiedades, usos, almacenamiento y manejo de FE-36', url: 'https://www.chemours.com/en/-/media/files/fire-extinguishants/fe-36-push-bulletin.pdf?rev=d9f32ac190d64173980809bc3304ad2f' },
      { label: 'Guía informativa NOM-002-STPS-2010', url: 'https://www.stps.gob.mx/bp/secciones/dgsst/publicaciones/guias/Guia_002.pdf' },
      { label: 'NOM-154-SCFI-2005 en el Diario Oficial de la Federación', url: 'https://dof.gob.mx/nota_detalle.php?codigo=2103192&fecha=26/12/2005' },
      { label: 'EPA: contexto ambiental y gestión de los HFC', url: 'https://www.epa.gov/hfcs/background-hfcs-and-aim-act' },
    ],
  },
];

const groupProfiles = {
  portatiles: {
    noun: 'extintor portátil',
    variantLabel: 'Capacidades',
    badge: 'Equipo portátil seleccionado por riesgo',
    benefit: 'Respuesta accesible para un conato',
    compliance: 'Selección, ubicación y mantenimiento con enfoque normativo',
    trustItems: ['Selección según clase de fuego y nivel de riesgo', 'Instalación y señalización opcionales', 'Atención en CDMX y área metropolitana'],
  },
  industriales: {
    noun: 'equipo móvil o industrial',
    variantLabel: 'Presentaciones',
    badge: 'Mayor capacidad para riesgos industriales',
    benefit: 'Mayor reserva de agente y movilidad operativa',
    compliance: 'Dimensionamiento industrial y servicio documentado',
    trustItems: ['Validación de caudal, alcance y maniobrabilidad', 'Levantamiento técnico para ubicación y acceso', 'Atención a plantas y operaciones en zona metropolitana'],
  },
  automaticos: {
    noun: 'sistema automático de aplicación local',
    variantLabel: 'Configuraciones',
    badge: 'Protección automática sujeta a ingeniería',
    benefit: 'Detección o activación para protección localizada',
    compliance: 'Diseño, compatibilidad e instalación técnicamente validados',
    trustItems: ['Revisión de volumen, cobertura y temperatura', 'Compatibilidad entre agente, activación y riesgo', 'Instalación y mantenimiento especializados'],
  },
  accesorios: {
    noun: 'accesorio para protección contra incendios',
    variantLabel: 'Opciones',
    badge: 'Accesorio para instalación y resguardo',
    benefit: 'Orden, visibilidad y protección del equipo',
    compliance: 'Compatibilidad, ubicación e instalación verificadas',
    trustItems: ['Medidas y compatibilidad confirmadas antes del suministro', 'Instalación profesional disponible', 'Integración con señalización y programa de mantenimiento'],
  },
  refacciones: {
    noun: 'refacción o consumible para extintores',
    variantLabel: 'Compatibilidades',
    badge: 'Componente para servicio profesional',
    benefit: 'Compatibilidad y trazabilidad para mantenimiento',
    compliance: 'Refacciones validadas para servicio técnico documentado',
    trustItems: ['Compatibilidad por marca, modelo, agente y capacidad', 'Uso por personal técnico capacitado', 'Suministro sujeto a identificación de la pieza'],
  },
};

const officialSources = [
  { label: 'Guía informativa NOM-002-STPS-2010', url: 'https://www.stps.gob.mx/bp/secciones/dgsst/publicaciones/guias/Guia_002.pdf' },
  { label: 'NOM-154-SCFI-2005 en el Diario Oficial de la Federación', url: 'https://dof.gob.mx/nota_detalle.php?codigo=2103192&fecha=26/12/2005' },
];

function sentenceList(items) {
  return new Intl.ListFormat('es-MX', { style: 'long', type: 'conjunction' }).format(items);
}

function buildMetaDescription(product) {
  const createDescription = (subject, application) => (
    `Cotiza ${subject}. Solución para ${application}, con asesoría técnica, suministro y servicio MANEXT en CDMX y zona metropolitana.`
  );
  const primaryApplications = sentenceList(product.applications.slice(0, 2));
  let result = createDescription(product.name.toLowerCase(), primaryApplications);

  if (result.length > 160) {
    result = createDescription(product.shortName.toLowerCase(), primaryApplications);
  }
  if (result.length > 160) {
    result = createDescription(product.shortName.toLowerCase(), product.applications[0]);
  }
  if (result.length < 120) {
    result = `${result.slice(0, -1)} Cotización personalizada.`;
  }

  return result;
}

function createGeneratedProductDetail(product) {
  const group = catalogGroups.find((item) => item.id === product.group);
  const profile = groupProfiles[product.group];
  const slug = product.productPageUrl.replace(/^\/catalogo\//, '').replace(/\/$/, '');
  const classText = product.fireClasses.length
    ? `clases ${sentenceList(product.fireClasses)}`
    : 'la configuración y compatibilidad del sistema';
  const variantsText = sentenceList(product.variants);
  const applicationsText = sentenceList(product.applications);
  const sectorsText = sentenceList(product.sectors);
  const availability = availabilityLabels[product.availability] || 'Cotización personalizada';
  const validationText = product.technicalValidation
    ? 'La selección final requiere validación técnica antes del suministro.'
    : 'La selección se confirma con las condiciones reales del inmueble y la disponibilidad del modelo.';
  const variantGuides = product.variants.map((variant, index) => ({
    capacity: variant,
    profile: index === 0 ? 'Opción inicial' : index === product.variants.length - 1 ? 'Configuración especializada' : 'Alternativa disponible',
    use: `Presentación de ${product.name.toLowerCase()} para proyectos relacionados con ${applicationsText}.`,
    note: 'Medidas, rating, compatibilidad y disponibilidad se confirman en la cotización.',
  }));
  const useItems = [...product.applications, ...product.sectors]
    .filter((item, index, items) => items.indexOf(item) === index)
    .slice(0, 4)
    .map((item) => ({
      title: item,
      text: `${product.name} puede integrarse en proyectos de ${item.toLowerCase()} cuando sus especificaciones, ubicación y condiciones de uso corresponden al riesgo evaluado.`,
    }));
  while (useItems.length < 3) {
    useItems.push({
      title: `Aplicación técnica ${useItems.length + 1}`,
      text: `La aplicación de ${product.name.toLowerCase()} se determina mediante una revisión del riesgo, la operación y la compatibilidad del equipo.`,
    });
  }

  const classLimitation = product.fireClasses.length
    ? `La clasificación ${classText} debe verificarse en la etiqueta, el rating y la documentación del modelo cotizado; no se determina únicamente por el nombre comercial.`
    : 'Este producto no sustituye la selección del extintor ni modifica por sí mismo su clasificación; debe comprobarse la compatibilidad con el equipo y la instalación.';
  const specializedLimitation = product.group === 'automaticos'
    ? 'La cobertura automática exige revisar geometría, volumen, ventilación, temperatura, activación, supervisión y posibles obstrucciones antes de instalar.'
    : product.group === 'refacciones'
      ? 'La instalación, recarga o sustitución debe realizarla personal capacitado con procedimientos, herramientas y controles adecuados para el equipo.'
      : product.group === 'accesorios'
        ? 'Las dimensiones, materiales, fijaciones y ubicación deben corresponder al peso del equipo, al ambiente y a las condiciones de acceso.'
        : 'La cantidad y ubicación no se definen sólo por la capacidad nominal: deben considerarse la clase de fuego, magnitud del riesgo, recorrido y facilidad de operación.';

  return {
    id: product.id,
    slug,
    name: product.name,
    eyebrow: `${group.name} · ${product.agent}`,
    category: group.name,
    agent: product.agent,
    fireClasses: product.fireClasses,
    availability,
    lead: `${product.description} ${validationText}`,
    description: `${product.name} es un ${profile.noun} disponible mediante cotización personalizada para aplicaciones de ${applicationsText}. MANEXT revisa variantes, compatibilidad, cantidad, ubicación, instalación y servicio para proponer una solución coherente con ${classText}.`,
    image: product.image,
    imageAlt: product.imageAlt,
    galleryImage: product.image,
    galleryImageAlt: `${product.name} para ${applicationsText}`,
    variants: product.variants,
    applications: product.applications,
    sectors: product.sectors,
    detailCopy: {
      availabilityBadge: availability,
      heroSuffix: `para ${applicationsText}`,
      agentBadge: profile.badge,
      quickUse: product.applications.join(' · '),
      variantLabel: profile.variantLabel,
      trustItems: profile.trustItems,
      benefitsTitle: `Ventajas de ${product.name.toLowerCase()}`,
      benefitsIntro: `${product.description} La propuesta se prepara con criterios de seguridad, compatibilidad, facilidad de operación y continuidad del servicio.`,
      specsTitle: `Ficha técnica de ${product.name.toLowerCase()}`,
      specsIntro: 'Información comercial para preparar la solicitud. Marca, modelo, materiales, rating, dimensiones, certificaciones y accesorios se confirman en la propuesta técnica.',
      specsCaption: `Especificaciones de ${product.name.toLowerCase()}`,
      capacityTitle: `${profile.variantLabel} disponibles: ${variantsText}`,
      capacityIntro: `Cada alternativa responde a necesidades distintas. MANEXT revisa la aplicación, compatibilidad, volumen requerido y condiciones del sitio antes de recomendar ${product.name.toLowerCase()}.`,
      applicationsTitle: `${product.name} para ${applicationsText}`,
      applicationsIntro: `Se considera para ${sectorsText}. La recomendación final depende del riesgo, el entorno, la operación y la documentación del producto disponible.`,
      faqTitle: `Lo esencial antes de cotizar ${product.name.toLowerCase()}`,
      faqIntro: 'Respuestas concretas para comparar variantes, confirmar compatibilidad y solicitar una propuesta mejor definida.',
      guideUrl: '/catalogo/#guia-seleccion',
      guideLabel: 'Consultar la guía para seleccionar productos',
      formLabel: `Formulario de cotización de ${product.name.toLowerCase()}`,
    },
    benefits: [
      { title: profile.benefit, text: `${product.description} La configuración se adapta al escenario y a la disponibilidad comercial.`, icon: 'shield' },
      { title: 'Selección técnica acompañada', text: `Revisamos ${classText}, aplicaciones, variantes y condiciones del inmueble antes de preparar la propuesta.`, icon: 'check' },
      { title: 'Configuración por proyecto', text: `La cotización puede considerar ${variantsText}, cantidad, accesorios, ubicación e instalación cuando corresponda.`, icon: 'tools' },
      { title: 'Respaldo integral MANEXT', text: 'El suministro puede complementarse con señalización, mantenimiento, recarga, capacitación y documentación para auditoría.', icon: 'service' },
    ],
    technicalSpecs: [
      ['Producto', product.name],
      ['Familia', group.name],
      ['Agente o función', product.agent],
      ['Clases o compatibilidad', product.fireClasses.length ? product.fireClasses.join(', ') : 'Se confirma contra el equipo y la aplicación'],
      [profile.variantLabel, variantsText],
      ['Aplicaciones previstas', applicationsText],
      ['Sectores atendidos', sectorsText],
      ['Disponibilidad', availability],
      ['Validación final', validationText],
    ],
    capacityGuide: variantGuides,
    recommendedUses: useItems,
    limitations: [
      classLimitation,
      specializedLimitation,
      validationText,
      'La imagen es ilustrativa. El producto entregado puede variar por fabricante y disponibilidad sin modificar las especificaciones aceptadas en la cotización.',
    ],
    quoteIncludes: [
      { number: '01', title: 'Revisión del requerimiento', text: `Confirmamos aplicación, sector, ${classText}, cantidad, ubicación y fecha requerida.` },
      { number: '02', title: 'Validación de la configuración', text: `Comparamos ${variantsText}, compatibilidad, documentación, accesorios y disponibilidad comercial.` },
      { number: '03', title: 'Propuesta integral', text: 'Presentamos suministro y, cuando aplica, instalación, señalización, mantenimiento, recarga, capacitación y documentación.' },
    ],
    compliance: {
      title: profile.compliance,
      text: 'La NOM-002-STPS-2010 establece criterios de prevención y protección contra incendios en los centros de trabajo. La NOM-154-SCFI-2005 regula los servicios de mantenimiento y recarga de extintores. La conformidad específica depende del producto, su uso, documentación e instalación.',
      items: ['Identificación del riesgo y de la aplicación', 'Compatibilidad, ubicación y accesibilidad', 'Documentación del equipo y del servicio', 'Programa de inspección y mantenimiento cuando corresponda'],
    },
    faqs: [
      { question: `¿Para qué sirve ${product.name.toLowerCase()}?`, answer: `Se considera para ${applicationsText}, especialmente en sectores como ${sectorsText}. Su idoneidad se confirma contra el riesgo, la operación y la documentación del producto.` },
      { question: `¿Qué ${profile.variantLabel.toLowerCase()} están disponibles?`, answer: `El catálogo contempla ${variantsText}. La existencia, marca, medidas, rating y configuración definitiva se confirman al preparar la cotización.` },
      { question: `¿Cómo se selecciona ${product.name.toLowerCase()}?`, answer: `Se revisan ${classText}, aplicación, condiciones ambientales, cantidad, ubicación, facilidad de uso, compatibilidad y requerimientos documentales del inmueble.` },
      { question: `¿Requiere validación técnica?`, answer: validationText },
      { question: '¿La cotización puede incluir instalación y señalización?', answer: 'Sí. La propuesta puede integrar suministro, instalación, soportes o gabinete, señalización y documentación según el tipo de producto y las condiciones del sitio.' },
      { question: '¿MANEXT ofrece mantenimiento y atención posterior?', answer: 'Sí. Cuando corresponde al producto, se pueden integrar inspección, mantenimiento, recarga, refacciones, capacitación y seguimiento dentro de un programa documentado.' },
    ],
    seo: {
      title: `${product.name} | MANEXT`,
      description: buildMetaDescription(product),
      canonical: `https://mantenimientodeextintores.mx${product.productPageUrl}`,
      ogTitle: `${product.name}: ficha técnica y cotización`,
      ogDescription: `${product.description} Consulta variantes, aplicaciones y criterios de selección con asesoría MANEXT.`,
    },
    sources: officialSources,
  };
}

const authoredDetailsById = new Map(authoredCatalogProductDetails.map((product) => [product.id, product]));

function applyEditorialProfile(detail, editorial) {
  if (!editorial) {
    throw new Error(`Missing editorial profile for catalog product ${detail.id}`);
  }

  return {
    ...detail,
    primaryKeyword: editorial.primaryKeyword,
    h1: editorial.h1,
    secondaryKeywords: editorial.secondaryKeywords,
    searchIntent: editorial.searchIntent,
    buyerScenario: editorial.buyerScenario,
    valuePromise: editorial.valuePromise,
    selectionFocus: editorial.selectionFocus,
    differentiator: editorial.differentiator,
    notFor: editorial.notFor,
    lead: editorial.humanLead,
    description: editorial.humanDescription,
    benefits: editorial.benefitAngles,
    limitations: [editorial.notFor, ...detail.limitations.slice(0, 3)],
    faqs: editorial.faqs,
    internalLinks: editorial.internalLinks,
    detailCopy: {
      ...detail.detailCopy,
      benefitsTitle: `Por qué considerar ${editorial.primaryKeyword.toLocaleLowerCase('es-MX')}`,
      benefitsIntro: editorial.buyerScenario,
      applicationsIntro: editorial.searchIntent,
      faqTitle: `Preguntas antes de cotizar ${editorial.primaryKeyword.toLocaleLowerCase('es-MX')}`,
      faqIntro: 'Respuestas directas para comparar el producto, reconocer sus límites y compartir los datos que cambian una cotización técnica.',
    },
    quoteIncludes: [
      { number: '01', title: 'Entender el escenario', text: editorial.buyerScenario },
      { number: '02', title: 'Confirmar la selección', text: editorial.selectionFocus },
      { number: '03', title: 'Preparar una propuesta clara', text: `${editorial.valuePromise} La propuesta puede integrar suministro y los servicios que correspondan.` },
    ],
    seo: {
      ...detail.seo,
      title: editorial.seoTitle,
      description: editorial.metaDescription,
      ogTitle: `${detail.name}: ficha técnica y cotización`,
      ogDescription: editorial.valuePromise,
    },
  };
}

export const catalogProductDetails = catalogProducts.map((product) => {
  const baseDetail = authoredDetailsById.get(product.id) || createGeneratedProductDetail(product);
  return applyEditorialProfile(baseDetail, getCatalogProductEditorial(product.id));
});

export function getCatalogProductDetail(slug) {
  return catalogProductDetails.find((product) => product.slug === slug);
}
