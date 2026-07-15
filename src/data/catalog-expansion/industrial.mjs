import { createProposalSeries } from './schema.mjs';

const amerexWheeled = 'https://amerex-fire.com/products/fire-extinguishers/';
const amerexCo2Wheeled = 'https://amerex-fire.com/products/fire-extinguishers/wheeled-fire-extinguishers/co2/';
const badgerWheeled = 'https://www.badgerfire.com/products/wheeled-stored-pressure';
const amerexClassD = 'https://www.amerex-fire.com/products/fire-extinguishers/portable-fire-extinguishers/class-d/';
const amerexCatalog = 'https://amerex-fire.com/upl/downloads/library/fire-extinguisher-product-catalog-english.pdf';

function offer(key, name, slug, variant, application, sector, need, value, selection, limitation, type = 'capacity') {
  return { key, name, slug, variant, application, sector, need, value, selection, limitation, type };
}

const abcWheeled = createProposalSeries({
  parentId: 'pqs-abc-rodante', group: 'industriales', agentOrMaterial: 'Polvo químico seco ABC', fireClasses: ['A', 'B', 'C'], source: badgerWheeled, priority: 'alta',
  items: [
    offer('20-kg', 'Extintor móvil PQS ABC de 20 kg', 'extintor-movil-pqs-abc-20-kg', '20 kg', 'Talleres y bodegas con acceso rodante', 'Industria ligera', 'se requiere más agente que en un portátil sin sobredimensionar el equipo', 'introduce movilidad sobre ruedas y mayor carga para riesgos multipropósito', 'rating, ancho de paso, manguera y recorrido', 'una unidad móvil requiere espacio, superficie transitable y operador capacitado'),
    offer('35-kg', 'Extintor móvil PQS ABC de 35 kg', 'extintor-movil-pqs-abc-35-kg', '35 kg', 'Almacenes, patios y áreas de proceso', 'Logística', 'se necesita una unidad intermedia para áreas industriales', 'equilibra carga, movilidad y tiempo de descarga sujeto al modelo', 'rating, distancia, ruedas, manguera y riesgo', 'el peso total impide tratarlo como extintor portátil'),
    offer('50-kg', 'Extintor móvil PQS ABC de 50 kg', 'extintor-movil-pqs-abc-50-kg', '50 kg', 'Plantas, hangares y grandes superficies', 'Industria', 'se requiere mayor reserva de PQS para una exposición amplia', 'aporta capacidad rodante y manguera para atacar desde una posición controlada', 'rating, caudal, descarga, acceso y personal', 'no sustituye un sistema fijo ni una brigada cuando el fuego supera fase incipiente'),
    offer('70-kg', 'Extintor móvil PQS ABC de 70 kg', 'extintor-movil-pqs-abc-70-kg', '68–70 kg', 'Patios industriales y manufactura pesada', 'Industria pesada', 'se busca una configuración robusta para puntos de alto riesgo', 'incrementa agente y autonomía manteniendo desplazamiento manual sobre ruedas', 'presurización, manguera, ruedas, terreno y rating', 'su operación puede requerir más de una persona y entrenamiento específico'),
    offer('125-kg', 'Extintor móvil PQS ABC de 125 kg', 'extintor-movil-pqs-abc-125-kg', '125 kg', 'Instalaciones industriales de gran escala', 'Petroquímica', 'se necesita la mayor carga móvil habitual de esta familia', 'permite cotizar una unidad industrial con descarga y componentes definidos por fabricante', 'rating, cilindro impulsor, manguera, terreno y plan', 'la movilidad, estabilidad y caudal deben comprobarse en sitio antes de recomendarlo'),
  ],
});

const bcWheeled = createProposalSeries({
  parentId: 'pqs-bc-rodante', group: 'industriales', agentOrMaterial: 'Polvo químico seco BC', fireClasses: ['B', 'C'], source: badgerWheeled,
  items: [
    offer('20-kg', 'Extintor móvil PQS BC de 20 kg', 'extintor-movil-pqs-bc-20-kg', '20 kg', 'Combustibles y equipos industriales', 'Industria ligera', 'se requiere una unidad BC compacta sobre ruedas', 'concentra la selección en líquidos, gases y riesgo eléctrico compatible', 'rating BC, manguera, ruedas y recorrido', 'no es equivalente a un PQS ABC frente a combustibles sólidos'),
    offer('35-kg', 'Extintor móvil PQS BC de 35 kg', 'extintor-movil-pqs-bc-35-kg', '35 kg', 'Patios con líquidos inflamables', 'Combustibles', 'se busca mayor caudal que un portátil BC', 'ofrece reserva intermedia con movilidad y aplicación mediante manguera', 'líquido, superficie, rating, descarga y terreno', 'la reignición sigue siendo posible si no se controla la fuente'),
    offer('50-kg', 'Extintor móvil PQS BC de 50 kg', 'extintor-movil-pqs-bc-50-kg', '50 kg', 'Almacenamiento y trasiego de combustibles', 'Petróleo y gas', 'se necesita una capacidad industrial para un riesgo clase B', 'aumenta autonomía para escenarios compatibles sujetos al rating', 'combustible, fuga, rating, manguera y brigada', 'extinguir una llama de gas sin cerrar el flujo puede agravar el peligro'),
    offer('70-kg', 'Extintor móvil PQS BC de 70 kg', 'extintor-movil-pqs-bc-70-kg', '70 kg', 'Terminales y procesos con hidrocarburos', 'Energía', 'se requiere una unidad rodante robusta para combustibles', 'integra mayor carga, movilidad y servicio profesional en una propuesta', 'agente, rating, presurización, terreno y personal', 'no debe desplazarse por superficies inestables o con obstáculos'),
    offer('150-lb', 'Extintor móvil PQS BC de 150 lb', 'extintor-movil-pqs-bc-150-lb', '150 lb', 'Riesgo industrial B:C de alta exposición', 'Industria pesada', 'se busca una presentación imperial disponible por fabricante', 'permite comparar capacidad, química y arquitectura de presión regulada', 'modelo, agente, rating, descarga y repuestos', 'la conversión de unidades no garantiza equivalencia entre equipos'),
  ],
});

const purpleWheeled = createProposalSeries({
  parentId: 'purple-k-rodante', group: 'industriales', agentOrMaterial: 'Bicarbonato de potasio Purple-K', fireClasses: ['B', 'C'], source: amerexWheeled, priority: 'especialidad',
  items: [
    offer('50-lb', 'Extintor móvil Purple-K de 50 lb', 'extintor-movil-purple-k-50-lb', '50 lb', 'Carga de combustible y gases', 'Petróleo y gas', 'se necesita Purple-K en una unidad rodante de escala contenida', 'combina agente BC especializado con manguera y movilidad', 'rating, descarga, combustible y terreno', 'no cubre clase A ni reemplaza control de fugas'),
    offer('125-lb', 'Extintor móvil Purple-K de 125 lb', 'extintor-movil-purple-k-125-lb', '125 lb', 'Refinerías y almacenamiento', 'Petroquímica', 'se requiere mayor masa de agente para riesgo B:C', 'aporta autonomía y aplicación remota mediante manguera', 'rating, caudal, cilindro impulsor y acceso', 'necesita inspección de ruedas, manguera y presurización'),
    offer('150-lb', 'Extintor Purple-K rodante de 150 lb', 'extintor-purple-k-rodante-150-lb', '150 lb', 'Procesos de combustible de alta exposición', 'Industria pesada', 'se busca una unidad directa o regulada según fabricante', 'permite comparar arquitectura de presión y desempeño documentado', 'presurización, rating, flujo, manguera y repuestos', 'no se debe asumir equivalencia entre presión contenida y regulada'),
    offer('gas-presurizado', 'Extintor móvil Purple-K para gas presurizado', 'extintor-movil-purple-k-gas-presurizado', 'Capacidad según riesgo', 'Estaciones y procesos con gas', 'Gas y energía', 'se necesita alto desempeño BC junto con control del suministro', 'vincula la selección del equipo con el procedimiento de cierre de emergencia', 'gas, presión, fuga, rating, caudal y brigada', 'apagar la llama sin cortar el gas puede formar una nube inflamable'),
    offer('aeroportuario', 'Extintor móvil Purple-K aeroportuario', 'extintor-movil-purple-k-aeropuerto', 'Capacidad según fabricante', 'Línea de vuelo y apoyo en tierra', 'Aeronáutica', 'se requiere una unidad móvil especializada para combustibles de aviación', 'integra agente, movilidad, aprobación y ambiente operativo', 'autoridad, combustible, rating, corrosión y acceso', 'no sustituye los equipos ARFF ni requisitos específicos del aeropuerto'),
  ],
});

const co2Wheeled = createProposalSeries({
  parentId: 'co2-rodante', group: 'industriales', agentOrMaterial: 'Dióxido de carbono (CO₂)', fireClasses: ['B', 'C'], source: amerexCo2Wheeled, priority: 'especialidad',
  items: [
    offer('50-lb', 'Extintor móvil CO₂ de 50 lb', 'extintor-movil-co2-50-lb', '50 lb', 'Salas eléctricas y procesos B:C', 'Industria', 'se necesita CO₂ sin residuo en mayor volumen que un portátil', 'aporta movilidad, manguera y válvula de control en una unidad industrial', 'ventilación, rating, acceso, manguera y peso', 'el CO₂ desplaza oxígeno y requiere control especial en recintos'),
    offer('100-lb', 'Extintor móvil CO₂ de 100 lb', 'extintor-movil-co2-100-lb', '100 lb en dos cilindros', 'Áreas eléctricas de gran escala', 'Energía', 'se requiere una configuración doble para mayor volumen', 'incrementa agente disponible manteniendo una plataforma rodante', 'rating, cilindros, válvula, recorrido y ventilación', 'su peso y dimensiones exigen rutas de acceso comprobadas'),
    offer('valvula-cierre', 'Extintor CO₂ rodante con válvula de cierre', 'extintor-co2-rodante-valvula-cierre', '50 o 100 lb', 'Aplicación controlada con manguera', 'Industria', 'se necesita controlar la descarga desde la corneta o manguera', 'diferencia el conjunto de descarga como elemento operativo crítico', 'válvula, manguera, corneta, modelo y mantenimiento', 'los componentes deben ser originales o compatibles con el modelo exacto'),
    offer('subestacion', 'Extintor móvil CO₂ para subestación', 'extintor-movil-co2-subestacion-electrica', 'Capacidad según riesgo', 'Subestaciones y cuartos eléctricos', 'Energía', 'se busca un agente no conductor y sin polvo en una instalación eléctrica', 'orienta la propuesta a distancia, acceso y ventilación reales', 'energía, combustibles, ventilación, rating y recorrido', 'al desenergizar debe evaluarse la clase real del combustible'),
    offer('laboratorio-industrial', 'Extintor móvil CO₂ para laboratorio', 'extintor-movil-co2-laboratorio-industrial', '50 lb o modelo aplicable', 'Laboratorios con líquidos y equipos sensibles', 'Laboratorios', 'se requiere mayor agente limpio de residuo para un recinto técnico', 'permite combinar capacidad industrial con control de contaminación', 'sustancias, ventilación, manguera, rating y ocupación', 'no corresponde a químicos reactivos ni fuegos clase A profundos'),
  ],
});

const foamWheeled = createProposalSeries({
  parentId: 'espuma-rodante', group: 'industriales', agentOrMaterial: 'Espuma contra incendio', fireClasses: ['A', 'B'], source: 'https://www.bio-ex.com/en/', priority: 'especialidad',
  items: [
    offer('afff', 'Extintor móvil de espuma AFFF', 'extintor-movil-espuma-afff', 'Capacidad según fabricante', 'Hidrocarburos y combustibles A:B', 'Petróleo y gas', 'se necesita mayor solución de espuma para una superficie clase B', 'aporta movilidad y volumen para formar una manta sobre combustible compatible', 'formulación, capacidad, boquilla, rating y combustible', 'AFFF no es automáticamente apta para solventes polares'),
    offer('ar-afff', 'Extintor móvil de espuma AR-AFFF', 'extintor-movil-espuma-ar-afff', 'Capacidad según ingeniería', 'Solventes polares e hidrocarburos compatibles', 'Industria química', 'se requiere resistencia al alcohol en formato rodante', 'combina mayor reserva de solución con formulación AR documentada', 'solvente, concentración, viscosidad, boquilla y ensayo', 'la aplicación incorrecta puede romper la manta polimérica'),
    offer('f3', 'Extintor móvil de espuma sin flúor F3', 'extintor-movil-espuma-f3', 'Capacidad según fabricante', 'Riesgos B compatibles con F3', 'Industria', 'se busca una unidad móvil con espuma libre de flúor', 'permite integrar objetivo ambiental y desempeño ensayado', 'combustible, formulación, aprobación, hardware y caudal', 'F3 no debe sustituir AFFF sin revisar todo el conjunto'),
    offer('hidrocarburos', 'Extintor móvil de espuma para hidrocarburos', 'extintor-movil-espuma-hidrocarburos', 'Capacidad según superficie', 'Derrames y almacenamiento de combustibles', 'Terminales', 'se necesita dimensionar agente por combustible y superficie', 'convierte el escenario en especificación de espuma, descarga y movilidad', 'combustible, superficie, burnback, aplicación y rating', 'no se debe estimar cobertura únicamente por litros del recipiente'),
    offer('solventes', 'Extintor móvil de espuma para solventes', 'extintor-movil-espuma-solventes-polares', 'Agente AR según solvente', 'Alcoholes, cetonas y líquidos polares', 'Industria química', 'se requiere identificar la química antes de seleccionar espuma', 'orienta la cotización a una formulación resistente y compatible', 'SDS, miscibilidad, superficie, espuma y boquilla', 'un solvente no identificado impide recomendar responsablemente el agente'),
  ],
});

const classDWheeled = createProposalSeries({
  parentId: 'clase-d-rodante', group: 'industriales', agentOrMaterial: 'Polvo especial clase D', fireClasses: ['D'], source: amerexClassD, priority: 'especialidad',
  items: [
    offer('150-lb-sodio', 'Extintor móvil clase D de 150 lb NaCl', 'extintor-movil-clase-d-150-lb-nacl', '150 lb', 'Magnesio, sodio y metales compatibles', 'Metalmecánica', 'se necesita gran volumen de cloruro de sodio para un proceso', 'combina agente específico, aplicador y movilidad industrial', 'metal, cantidad, agente, manguera y aplicador', 'no cubre metales incompatibles ni baterías ion-litio'),
    offer('250-lb-cobre', 'Extintor móvil clase D de 250 lb cobre', 'extintor-movil-clase-d-250-lb-cobre', '250 lb', 'Litio metálico en procesos de escala industrial', 'Energía', 'se requiere polvo de cobre en una unidad de gran capacidad', 'ofrece una configuración especializada para litio metálico documentado', 'metal, forma, volumen, agente y procedimiento', 'litio metálico no equivale a batería de ion-litio'),
    offer('grafito', 'Extintor móvil clase D de grafito', 'extintor-movil-clase-d-grafito', 'Capacidad según fabricante', 'Metales compatibles con agente grafítico', 'Fundición', 'se busca un polvo grafítico para un metal específico', 'permite cotizar composición y descarga conforme a la ficha', 'metal, aleación, agente, caudal y aplicador', 'ningún polvo clase D debe asumirse universal'),
    offer('magnesio', 'Extintor móvil clase D para magnesio', 'extintor-movil-clase-d-magnesio', 'Agente y capacidad según proceso', 'Fundición y maquinado de magnesio', 'Metalmecánica', 'se necesita cubrir viruta o masa de magnesio de mayor escala', 'parte del inventario y proceso para seleccionar polvo y cantidad', 'forma del metal, cantidad, temperatura y agente', 'una descarga violenta puede dispersar partículas incendiadas'),
    offer('litio-metalico', 'Extintor móvil clase D para litio metálico', 'extintor-movil-clase-d-litio-metalico', 'Polvo de cobre u otro listado', 'Fabricación y almacenamiento de litio metálico', 'Energía', 'se requiere distinguir metal combustible de celdas ion-litio', 'prioriza agente expresamente indicado y protocolo especializado', 'tipo de litio, cantidad, agente, evidencia y brigada', 'no debe ofrecerse para baterías ion-litio sin ensayo independiente'),
  ],
});

const highFlow = createProposalSeries({
  parentId: 'pqs-alto-flujo', group: 'industriales', agentOrMaterial: 'PQS de alto flujo', fireClasses: ['B', 'C'], source: amerexWheeled, priority: 'especialidad',
  items: [
    offer('abc-10-lb', 'Extintor alto flujo ABC de 10 lb', 'extintor-alto-flujo-abc-10-lb', '10 lb', 'Riesgos tridimensionales compatibles', 'Industria', 'se necesita una descarga superior a un equipo convencional', 'combina agente ABC y hardware de alto flujo en formato portátil', 'flujo, rating, agente, duración y riesgo', 'alto flujo no compensa una capacidad insuficiente o mala ubicación'),
    offer('abc-20-lb', 'Extintor alto flujo ABC de 20 lb', 'extintor-alto-flujo-abc-20-lb', '20 lb', 'Procesos industriales con mayor exposición', 'Industria pesada', 'se requiere más agente y caudal manteniendo portabilidad reforzada', 'aporta una descarga robusta antes de pasar a unidad móvil', 'caudal, peso, duración, rating y acceso', 'la reacción de descarga exige control físico y capacitación'),
    offer('purple-k', 'Extintor alto flujo Purple-K', 'extintor-alto-flujo-purple-k', 'Capacidad según modelo', 'Gases y líquidos inflamables presurizados', 'Petróleo y gas', 'se busca alto caudal con agente Purple-K especializado', 'combina rápida aplicación y química BC para riesgos compatibles', 'flujo, gas, fuga, rating y cierre', 'no debe apagarse una llama de gas sin controlar el suministro'),
    offer('gas', 'Extintor alto flujo para gas inflamable', 'extintor-alto-flujo-gas-inflamable', 'Agente según riesgo', 'Procesos con gas a presión', 'Gas y energía', 'se necesita una barrera de agente de alto caudal durante respuesta', 'vincula equipo, táctica y cierre de emergencia del proceso', 'gas, presión, fuente, caudal y brigada', 'una nube sin llama puede generar explosión si persiste la fuga'),
    offer('clase-b-3d', 'Extintor alto flujo para fuego B tridimensional', 'extintor-alto-flujo-fuego-b-tridimensional', 'Capacidad según fabricante', 'Fugas, aspersión o combustible en volumen', 'Petroquímica', 'se requiere mayor entrega de agente para un riesgo clase B tridimensional', 'diferencia el escenario de un simple derrame superficial', 'geometría, presión, combustible, flujo y rating', 'requiere análisis especializado y no se define sólo por metros cuadrados'),
  ],
});

const cartridge = createProposalSeries({
  parentId: 'operado-cartucho', group: 'industriales', agentOrMaterial: 'PQS con cartucho de gas', fireClasses: ['A', 'B', 'C'], source: amerexCatalog, priority: 'especialidad',
  items: [
    offer('20-lb-abc', 'Extintor de cartucho ABC de 20 lb', 'extintor-cartucho-abc-20-lb', '20 lb', 'Industria y ambientes de uso exigente', 'Industria', 'se busca presurizar el agente sólo al momento de operar', 'separa cilindro de agente y cartucho para una arquitectura robusta', 'cartucho, agente, presión, repuestos y rating', 'el procedimiento de activación difiere de un presurizado permanente'),
    offer('30-lb-purple-k', 'Extintor de cartucho Purple-K de 30 lb', 'extintor-cartucho-purple-k-30-lb', '30 lb', 'Combustibles y gases industriales', 'Petróleo y gas', 'se requiere Purple-K con presurización por cartucho', 'combina agente BC y mantenimiento especializado de cartucho', 'agente, cartucho, rating, descarga y compatibilidad', 'cartuchos y válvulas no son intercambiables entre modelos'),
    offer('150-lb-rodante', 'Extintor rodante de cartucho de 150 lb', 'extintor-rodante-cartucho-150-lb', '150 lb', 'Industria pesada y patios', 'Industria pesada', 'se necesita una unidad móvil con cilindro impulsor independiente', 'aporta gran carga y arquitectura preparada para servicio industrial', 'cilindro impulsor, regulador, manguera, agente y ruedas', 'requiere inspección y mantenimiento de ambos recipientes'),
    offer('ambiente-extremo', 'Extintor de cartucho para ambiente extremo', 'extintor-cartucho-ambiente-extremo', 'Capacidad según fabricante', 'Minas, puertos y plantas expuestas', 'Minería', 'se busca robustez frente a vibración, polvo o clima severo', 'permite especificar materiales, protección y repuestos del conjunto', 'temperatura, corrosión, montaje, cartucho y manual', 'la aptitud ambiental debe demostrarse en el modelo cotizado'),
    offer('maquinaria', 'Extintor de cartucho para maquinaria pesada', 'extintor-cartucho-maquinaria-pesada', 'Portátil o móvil', 'Equipos mineros y construcción', 'Construcción', 'se requiere un equipo resistente y accesible junto a maquinaria', 'integra soporte, agente y mecanismo de cartucho en una configuración operativa', 'combustible, vibración, montaje, rating y usuario', 'no sustituye un sistema automático de compartimiento cuando es necesario'),
  ],
});

export const industrialExpansionProposals = [
  ...abcWheeled,
  ...bcWheeled,
  ...purpleWheeled,
  ...co2Wheeled,
  ...foamWheeled,
  ...classDWheeled,
  ...highFlow,
  ...cartridge,
];
