export const catalogProductDetails = [
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
];

export function getCatalogProductDetail(slug) {
  return catalogProductDetails.find((product) => product.slug === slug);
}
