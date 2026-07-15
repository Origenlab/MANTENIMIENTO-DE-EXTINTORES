import { createProposalSeries } from './schema.mjs';

const amerexCatalog = 'https://amerex-fire.com/upl/downloads/library/fire-extinguisher-product-catalog-english.pdf';
const amerexPortable = 'https://amerex-fire.com/products/fire-extinguishers/';
const amerexClassD = 'https://www.amerex-fire.com/products/fire-extinguishers/portable-fire-extinguishers/class-d/';
const amerexWaterMist = 'https://www.amerex-fire.com/products/fire-extinguishers/portable-fire-extinguishers/watermist/';
const amerexClassK = 'https://www.amerex-fire.com/products/fire-extinguishers/portable-fire-extinguishers/class-k/';
const chemoursFe36 = 'https://www.chemours.com/en/brands-and-products/fire-suppressants/products/fe36';
const bioexFoam = 'https://www.bio-ex.com/en/';
const avdRange = 'https://www.avdfire.com/lithium-battery-fire-extinguishers/';

function offer(key, name, slug, variant, application, sector, need, value, selection, limitation, type = 'capacity') {
  return { key, name, slug, variant, application, sector, need, value, selection, limitation, type };
}

const pqsAbc = createProposalSeries({
  parentId: 'pqs-abc-portatil', group: 'portatiles', agentOrMaterial: 'Polvo químico seco ABC', fireClasses: ['A', 'B', 'C'], source: amerexCatalog, priority: 'alta',
  items: [
    offer('1-kg-vehicular', 'Extintor PQS ABC de 1 kg vehicular', 'extintor-pqs-abc-1-kg-vehicular', '1 kg', 'Cabina de automóvil y vehículo ligero', 'Flotillas', 'se necesita un equipo compacto con soporte compatible para un vehículo', 'ofrece una presentación transportable para un punto vehicular, sujeta al rating y al montaje', 'rating, diámetro del cilindro y soporte vehicular', 'no sustituye la evaluación de riesgos especiales del motor, combustible o carga'),
    offer('2-5-kg-comercio', 'Extintor PQS ABC de 2.5 kg para comercio', 'extintor-pqs-abc-2-5-kg-comercio', '2.5 kg', 'Locales, consultorios y puntos de atención', 'Pequeño comercio', 'se busca más capacidad que un equipo vehicular sin perder maniobrabilidad', 'equilibra tamaño y facilidad de manejo para riesgos comunes de escala contenida', 'rating, distancia de recorrido y facilidad de uso', 'la capacidad nominal no determina por sí sola cantidad ni cobertura'),
    offer('4-5-kg-oficina', 'Extintor PQS ABC de 4.5 kg para oficina', 'extintor-pqs-abc-4-5-kg-oficina', '4.5 kg', 'Oficinas, recepción y áreas administrativas', 'Corporativos', 'se requiere una presentación comercial para combustibles ordinarios y riesgo eléctrico', 'permite cotizar una solución multipropósito con soporte, señal e instalación', 'carga combustible, ubicación y rating del modelo', 'el polvo deja residuo y puede afectar electrónica sensible'),
    offer('6-kg-negocio', 'Extintor PQS ABC de 6 kg para negocio', 'extintor-pqs-abc-6-kg-negocio', '6 kg', 'Comercios, bodegas ligeras y áreas de servicio', 'Comercio', 'se necesita una capacidad recurrente para protección general empresarial', 'integra una alternativa multipropósito con servicios posteriores de MANEXT', 'riesgo por área, recorrido, cantidad y montaje', 'no debe elegirse sólo por ser una capacidad común en el mercado'),
    offer('9-kg-industrial', 'Extintor PQS ABC de 9 kg industrial', 'extintor-pqs-abc-9-kg-industrial', '9 kg', 'Bodegas, talleres y procesos industriales', 'Industria', 'se requiere mayor carga portátil para áreas con exposición más exigente', 'aporta una configuración robusta sin pasar todavía a una unidad sobre ruedas', 'rating, peso operativo, acceso y capacidad del usuario', 'su mayor peso puede reducir la maniobrabilidad y requiere ubicación adecuada'),
  ],
});

const pqsBc = createProposalSeries({
  parentId: 'pqs-bc-portatil', group: 'portatiles', agentOrMaterial: 'Polvo químico seco BC', fireClasses: ['B', 'C'], source: amerexCatalog,
  items: [
    offer('1-kg-vehicular', 'Extintor PQS BC de 1 kg vehicular', 'extintor-pqs-bc-1-kg-vehicular', '1 kg', 'Vehículos con riesgo de líquidos y electricidad', 'Flotillas', 'se necesita un equipo BC compacto donde no domina un riesgo clase A', 'concentra la selección en líquidos inflamables y equipo energizado compatible', 'rating BC, soporte y ambiente vehicular', 'no cubre combustibles clase A como lo haría una formulación ABC'),
    offer('2-5-kg-taller', 'Extintor PQS BC de 2.5 kg para taller', 'extintor-pqs-bc-2-5-kg-taller', '2.5 kg', 'Puestos de trabajo con solventes y equipos', 'Talleres', 'se requiere portabilidad cerca de líquidos inflamables de volumen contenido', 'facilita una respuesta localizada con un agente BC de rápida descarga', 'combustible, rating, ventilación y distancia', 'no debe aplicarse a metales, aceites de cocina ni fuegos clase A profundos'),
    offer('4-5-kg-liquidos', 'Extintor PQS BC de 4.5 kg para líquidos', 'extintor-pqs-bc-4-5-kg-liquidos', '4.5 kg', 'Almacenamiento y manejo de líquidos inflamables', 'Industria ligera', 'se necesita comparar una capacidad intermedia para un riesgo clase B', 'orienta la cotización al combustible real en lugar de asumir un equipo multipropósito', 'tipo de líquido, superficie expuesta y rating', 'puede existir reignición si el combustible conserva temperatura o fuente de fuga'),
    offer('6-kg-gases', 'Extintor PQS BC de 6 kg para gases', 'extintor-pqs-bc-6-kg-gases', '6 kg', 'Áreas con gases inflamables y equipo energizado', 'Gas y energía', 'se requiere un agente BC para un punto con gas presurizado', 'permite cotizar capacidad, ubicación y capacitación alrededor de un riesgo específico', 'fuente de gas, cierre de suministro y rating', 'extinguir la llama sin detener el flujo de gas puede agravar el peligro'),
    offer('9-kg-combustibles', 'Extintor PQS BC de 9 kg industrial', 'extintor-pqs-bc-9-kg-industrial', '9 kg', 'Procesos con combustibles y maquinaria', 'Industria', 'se busca mayor carga portátil para un riesgo B:C industrial', 'combina capacidad superior y movilidad manual antes de evaluar equipos rodantes', 'peso operativo, caudal, rating y acceso', 'no sustituye unidades de alto flujo ni sistemas cuando el escenario los exige'),
  ],
});

const purpleK = createProposalSeries({
  parentId: 'purple-k-portatil', group: 'portatiles', agentOrMaterial: 'Bicarbonato de potasio Purple-K', fireClasses: ['B', 'C'], source: amerexPortable, priority: 'especialidad',
  items: [
    offer('10-lb-gas', 'Extintor Purple-K de 10 lb para gas', 'extintor-purple-k-10-lb-gas', '10 lb', 'Puntos con gases inflamables presurizados', 'Gas y energía', 'se requiere un agente BC de alto desempeño en una presentación aún manejable', 'enfoca la selección en fuego clase B y gases, con verificación del cierre de suministro', 'rating, caudal, distancia y control de la fuga', 'no es un agente para combustibles clase A ni metales combustibles'),
    offer('20-lb-combustible', 'Extintor Purple-K de 20 lb para combustible', 'extintor-purple-k-20-lb-combustible', '20 lb', 'Carga y trasiego de hidrocarburos', 'Petróleo y gas', 'se necesita mayor descarga portátil para una exposición de combustible líquido', 'ofrece una alternativa especializada cuando un BC regular no es la primera preferencia', 'rating, descarga, superficie y maniobrabilidad', 'la posibilidad de reignición exige controlar derrame, fuga y temperatura'),
    offer('30-lb-petroquimico', 'Extintor Purple-K de 30 lb petroquímico', 'extintor-purple-k-30-lb-petroquimico', '30 lb', 'Procesos petroquímicos y patios', 'Petroquímica', 'se busca la mayor carga portátil disponible antes de pasar a un equipo móvil', 'aporta capacidad para puntos industriales con necesidad de agente Purple-K', 'peso total, flujo, rating y acceso del operador', 'su masa y descarga requieren personal capacitado y una ruta libre'),
    offer('vehicular-reforzado', 'Extintor Purple-K con soporte vehicular', 'extintor-purple-k-soporte-vehicular', 'Capacidad según vehículo', 'Autotanques y vehículos de servicio', 'Transporte especializado', 'se necesita asegurar el extintor ante vibración sin perder acceso de emergencia', 'integra agente, cilindro y soporte pesado como una configuración compatible', 'diámetro, peso, montaje, vibración y corrosión', 'un soporte incorrecto puede soltar o dañar el cilindro durante la operación'),
    offer('aviacion', 'Extintor Purple-K para línea de vuelo', 'extintor-purple-k-linea-vuelo', 'Capacidad según fabricante', 'Plataformas y apoyo aeroportuario', 'Aeronáutica', 'se requiere protección BC especializada alrededor de combustibles de aviación', 'permite comparar presentación, soporte y movilidad para operaciones aeroportuarias', 'listado, rating, corrosión y procedimiento del sitio', 'la selección debe alinearse con la autoridad y los procedimientos aeronáuticos aplicables'),
  ],
});

const co2 = createProposalSeries({
  parentId: 'co2-portatil', group: 'portatiles', agentOrMaterial: 'Dióxido de carbono (CO₂)', fireClasses: ['B', 'C'], source: 'https://amerex-fire.com/products/fire-extinguishers/portable-fire-extinguishers/co2/', priority: 'alta',
  items: [
    offer('5-lb-tableros', 'Extintor CO₂ de 5 lb para tableros', 'extintor-co2-5-lb-tableros', '5 lb', 'Tableros y equipos eléctricos compactos', 'Corporativos', 'se busca protección localizada sin residuo en un punto eléctrico', 'mantiene alta maniobrabilidad y evita depositar polvo sobre componentes', 'rating, tamaño del tablero, ventilación y soporte', 'el CO₂ ofrece enfriamiento limitado y puede existir reignición'),
    offer('10-lb-cuarto-electrico', 'Extintor CO₂ de 10 lb para cuarto eléctrico', 'extintor-co2-10-lb-cuarto-electrico', '10 lb', 'Cuartos eléctricos y racks', 'Tecnología', 'se requiere más agente sin perder portabilidad en una sala técnica', 'equilibra carga, alcance del modelo y manejo para infraestructura eléctrica', 'rating, ventilación, recorrido y peso operativo', 'la descarga desplaza oxígeno y exige precaución en recintos ocupados'),
    offer('15-lb-laboratorio', 'Extintor CO₂ de 15 lb para laboratorio', 'extintor-co2-15-lb-laboratorio', '15 lb', 'Laboratorios con líquidos y equipos sensibles', 'Laboratorios', 'se necesita una carga mayor sin contaminar instrumentación con polvo', 'combina agente limpio de residuo con capacidad portátil para riesgos B:C compatibles', 'combustibles, ventilación, rating y maniobrabilidad', 'no es la solución principal para sólidos clase A con combustión profunda'),
    offer('20-lb-industrial', 'Extintor CO₂ de 20 lb industrial', 'extintor-co2-20-lb-industrial', '20 lb', 'Procesos y salas eléctricas industriales', 'Industria', 'se requiere la mayor presentación portátil habitual de CO₂', 'ofrece carga robusta antes de considerar una unidad móvil de 50 o 100 lb', 'peso, montaje, rating, distancia y ventilación', 'su peso puede requerir carro o apoyo y no debe confundirse con un equipo rodante'),
    offer('hospitalario', 'Extintor CO₂ para equipo médico', 'extintor-co2-equipo-medico', 'Capacidad según área', 'Equipos médicos y áreas técnicas compatibles', 'Salud', 'se necesita evitar polvo alrededor de equipo médico no magnético sólo cuando el modelo lo permita', 'orienta la cotización a limpieza, documentación y condiciones del entorno clínico', 'documentación hospitalaria, ubicación, ventilación y rating', 'no debe anunciarse como no magnético ni apto para MRI sin evidencia específica del modelo'),
  ],
});

const water = createProposalSeries({
  parentId: 'agua-presion-portatil', group: 'portatiles', agentOrMaterial: 'Agua a presión', fireClasses: ['A'], source: amerexCatalog,
  items: [
    offer('9-l-papel', 'Extintor de agua de 9 L para papel', 'extintor-agua-presion-9-l-papel', '9 L', 'Oficinas, escuelas y archivos no energizados', 'Educación', 'se requiere enfriamiento para combustibles clase A ordinarios', 'aporta descarga prolongada sobre papel, madera y textiles compatibles', 'riesgo eléctrico, capacidad, alcance y ubicación', 'no debe utilizarse sobre líquidos inflamables ni equipo energizado'),
    offer('10-l-bodega', 'Extintor de agua de 10 L para bodega', 'extintor-agua-presion-10-l-bodega', '10 L', 'Bodegas de cartón, madera y textiles', 'Logística', 'se busca una presentación de agua para carga combustible clase A', 'favorece enfriamiento y penetración cuando no existe riesgo eléctrico activo', 'material almacenado, altura, electricidad y recorrido', 'no corresponde a combustibles B, C, D o K'),
    offer('2-5-gal-inox', 'Extintor de agua inoxidable de 2.5 gal', 'extintor-agua-inoxidable-2-5-gal', '2.5 gal', 'Instalaciones que priorizan resistencia del cilindro', 'Institucional', 'se necesita una construcción durable para un equipo de agua presurizada', 'combina agente clase A y cilindro inoxidable sujeto a modelo y documentación', 'material del cilindro, presión, capacidad y mantenimiento', 'la construcción inoxidable no cambia las clases de fuego permitidas'),
    offer('cartucho', 'Extintor de agua operado por cartucho', 'extintor-agua-operado-cartucho', 'Capacidad según fabricante', 'Ambientes que requieren presurización al operar', 'Industria', 'se busca separar almacenamiento del agente y gas de impulsión', 'ofrece una arquitectura de servicio distinta para aplicaciones industriales específicas', 'cartucho compatible, presión, repuestos y procedimiento', 'no debe mezclarse con equipos de presión contenida durante mantenimiento o recarga'),
    offer('aditivo-clase-a', 'Extintor de agua con aditivo clase A', 'extintor-agua-aditivo-clase-a', 'Capacidad según formulación', 'Materiales porosos y combustibles ordinarios', 'Industria ligera', 'se necesita mejorar humectación o penetración con una formulación documentada', 'permite cotizar agente y equipo como conjunto aprobado por el fabricante', 'aditivo, concentración, compatibilidad y etiqueta', 'no se debe añadir un concentrado genérico a un cilindro sin autorización del fabricante'),
  ],
});

const waterMist = createProposalSeries({
  parentId: 'agua-nebulizada', group: 'portatiles', agentOrMaterial: 'Agua desionizada nebulizada', fireClasses: ['A', 'C'], source: amerexWaterMist, priority: 'especialidad',
  items: [
    offer('6-l-salud', 'Extintor de agua nebulizada de 6 L', 'extintor-agua-nebulizada-6-l', '6 L', 'Clínicas y áreas con activos sensibles', 'Salud', 'se requiere enfriamiento con una descarga fina y poco residuo sólido', 'ofrece una presentación manejable de agua desionizada nebulizada', 'listado, calidad del agua, rating y electricidad', 'la aptitud eléctrica depende del diseño y listado del modelo'),
    offer('9-l-hospital', 'Extintor de agua nebulizada de 9 L', 'extintor-agua-nebulizada-9-l', '9 L', 'Hospitales, laboratorios y archivos', 'Salud', 'se necesita mayor reserva de agente para combustibles clase A sensibles', 'aumenta la carga manteniendo la tecnología de niebla y agua desionizada', 'rating, peso, recorrido y ambiente', 'no debe aplicarse a metales, aceites de cocina ni líquidos incompatibles'),
    offer('1-75-gal-telecom', 'Extintor water mist de 1.75 gal', 'extintor-water-mist-1-75-gal', '1.75 gal', 'Telecomunicaciones y cuartos técnicos', 'Telecomunicaciones', 'se busca una presentación documentada para clase A con peligro eléctrico potencial', 'permite comparar un modelo de menor volumen dentro de la familia water mist', 'rating A:C, boquilla, alcance y agua de recarga', 'no todos los equipos de agua nebulizada comparten la misma aptitud eléctrica'),
    offer('2-5-gal-patrimonio', 'Extintor water mist de 2.5 gal', 'extintor-water-mist-2-5-gal', '2.5 gal', 'Museos, archivos y patrimonio', 'Cultura', 'se requiere mayor volumen de agua nebulizada sin polvo químico', 'favorece enfriamiento en bienes donde la limpieza posterior es crítica', 'material protegido, escurrimiento, rating y peso', 'el agua todavía puede dañar ciertos bienes y debe evaluarse su compatibilidad'),
    offer('mri-no-magnetico', 'Extintor water mist no magnético para MRI', 'extintor-water-mist-no-magnetico-mri', 'Modelo ensayado para MRI', 'Salas de resonancia magnética', 'Salud', 'se requiere construcción ensayada para un campo magnético específico', 'permite cotizar únicamente modelos con evidencia independiente para la intensidad del sitio', 'teslas, distancia, certificado del modelo y montaje', 'no se debe afirmar compatibilidad MRI para un equipo estándar sin ensayo documentado'),
  ],
});

const afff = createProposalSeries({
  parentId: 'espuma-afff-portatil', group: 'portatiles', agentOrMaterial: 'Espuma AFFF', fireClasses: ['A', 'B'], source: amerexCatalog,
  items: [
    offer('6-l-comercio', 'Extintor de espuma AFFF de 6 L', 'extintor-espuma-afff-6-l', '6 L', 'Comercio con sólidos y líquidos compatibles', 'Comercio', 'se necesita una presentación portátil de espuma para riesgos A:B', 'combina enfriamiento y formación de película sobre hidrocarburos compatibles', 'concentración, combustible, rating y boquilla', 'no es la elección automática para solventes polares miscibles con agua'),
    offer('9-l-industria', 'Extintor de espuma AFFF de 9 L', 'extintor-espuma-afff-9-l', '9 L', 'Talleres y almacenamiento de hidrocarburos', 'Industria', 'se requiere una carga portátil mayor para una superficie clase B', 'ofrece más solución premezclada con aplicación controlada', 'tipo de líquido, superficie, rating y temperatura', 'la formulación y compatibilidad ambiental deben verificarse antes del suministro'),
    offer('10-l-almacen', 'Extintor de espuma AFFF de 10 L', 'extintor-espuma-afff-10-l', '10 L', 'Almacenes con combustibles A y B compatibles', 'Logística', 'se busca una presentación métrica de mayor volumen para un punto específico', 'permite cotizar capacidad, soporte y señalización como solución integral', 'rating, peso, recorrido y formulación', 'no debe usarse sobre electricidad energizada salvo indicación expresa del modelo'),
    offer('3-porciento', 'Extintor AFFF al 3% para hidrocarburos', 'extintor-afff-3-porciento-hidrocarburos', 'Solución al 3% según fabricante', 'Combustibles hidrocarburos', 'Petróleo y gas', 'se necesita confirmar una formulación y proporción específicas', 'vincula el equipo con el concentrado ensayado y su combustible objetivo', 'SDS, ficha, concentración, premix y listado', 'no se deben intercambiar concentrados ni proporciones sin aprobación del fabricante'),
    offer('marino', 'Extintor de espuma AFFF para uso marino', 'extintor-espuma-afff-uso-marino', 'Modelo con aprobación aplicable', 'Embarcaciones y muelles', 'Marítimo', 'se requiere documentación y resistencia ambiental para un entorno marino', 'permite comparar aprobación, corrosión, montaje y formulación en una sola cotización', 'autoridad, aprobación, salinidad, soporte y agente', 'una aprobación extranjera no demuestra por sí sola cumplimiento en México'),
  ],
});

const arAfff = createProposalSeries({
  parentId: 'espuma-ar-afff', group: 'portatiles', agentOrMaterial: 'Espuma AR-AFFF', fireClasses: ['A', 'B'], source: 'https://www.firefightingfoam.com/assets/Uploads/SALES-SHEETS/1x1-AR-AFFF-C6-FX141117A-Rev0219D.pdf', priority: 'especialidad',
  items: [
    offer('6-l-polares', 'Extintor AR-AFFF de 6 L para solventes', 'extintor-ar-afff-6-l-solventes', '6 L', 'Solventes polares de exposición contenida', 'Industria química', 'se necesita resistencia al alcohol en una presentación portátil', 'incorpora una formulación diseñada para líquidos que degradan espuma AFFF convencional', 'solvente, concentración, rating y compatibilidad', 'no todos los AR-AFFF sirven para todos los combustibles o proporciones'),
    offer('9-l-quimico', 'Extintor AR-AFFF de 9 L químico', 'extintor-ar-afff-9-l-industria-quimica', '9 L', 'Procesos químicos y almacenamiento', 'Industria química', 'se requiere mayor solución para líquidos miscibles con agua', 'aumenta la capacidad portátil manteniendo la barrera polimérica de la formulación', 'combustible, superficie, aplicación y SDS', 'la descarga incorrecta puede romper la manta de espuma y reducir su desempeño'),
    offer('1x3', 'Extintor AR-AFFF 1x3 para combustibles', 'extintor-ar-afff-1x3-combustibles', 'Formulación 1x3', 'Hidrocarburos y solventes polares compatibles', 'Petroquímica', 'se necesita una formulación de distinta proporción según el combustible', 'permite especificar la concentración correcta para hidrocarburo y solvente polar', 'proporción, premix, listado y equipo compatible', 'una formulación 1x3 no puede sustituirse por otra sin revisar todo el sistema'),
    offer('3x3', 'Extintor AR-AFFF 3x3 para solventes', 'extintor-ar-afff-3x3-solventes', 'Formulación 3x3', 'Solventes y combustibles compatibles', 'Industria', 'se requiere una concentración uniforme documentada para ambos grupos de combustible', 'simplifica la especificación sólo cuando ficha y equipo autorizan la mezcla 3x3', 'concentración, almacenamiento, viscosidad y listado', 'la viscosidad puede cambiar requisitos de boquilla y proporcionamiento'),
    offer('alcoholes', 'Extintor de espuma resistente a alcoholes', 'extintor-espuma-resistente-alcoholes', 'Capacidad según fabricante', 'Alcoholes, cetonas y solventes compatibles', 'Manufactura', 'se busca el producto por comportamiento del combustible y no por siglas', 'traduce la necesidad del comprador a una formulación AR documentada', 'familia química, miscibilidad, superficie y ficha', 'debe identificarse el líquido exacto antes de recomendar una espuma'),
  ],
});

const f3 = createProposalSeries({
  parentId: 'espuma-f3', group: 'portatiles', agentOrMaterial: 'Espuma sin flúor F3', fireClasses: ['A', 'B'], source: bioexFoam, priority: 'especialidad',
  items: [
    offer('6-l', 'Extintor de espuma F3 de 6 L', 'extintor-espuma-f3-6-l', '6 L', 'Riesgos A:B compatibles con formulación F3', 'Comercio', 'se busca una alternativa portátil sin surfactantes fluorados', 'ofrece una presentación compacta cuya eficacia depende del combustible y ensayo', 'formulación, rating, combustible y boquilla', 'F3 no es un reemplazo directo de AFFF sin validar desempeño y hardware'),
    offer('9-l', 'Extintor de espuma F3 de 9 L', 'extintor-espuma-f3-9-l', '9 L', 'Industria y almacenamiento de líquidos', 'Industria', 'se necesita mayor volumen de espuma sin flúor', 'aumenta la solución disponible manteniendo un enfoque PFAS-free documentado', 'ensayo, rating, viscosidad y aplicación', 'el comportamiento de burnback y aplicación varía entre formulaciones'),
    offer('3-porciento', 'Extintor F3 al 3% para hidrocarburos', 'extintor-f3-3-porciento-hidrocarburos', 'Formulación F3 al 3%', 'Hidrocarburos compatibles', 'Petróleo y gas', 'se requiere una concentración F3 específica para combustible no polar', 'vincula concentración, equipo y aplicación en una propuesta verificable', 'ficha, aprobación, concentración y premix', 'no debe usarse sobre solventes polares si la formulación no es resistente al alcohol'),
    offer('ar-f3', 'Extintor AR-F3 para solventes polares', 'extintor-ar-f3-solventes-polares', 'Formulación AR-F3', 'Alcoholes y solventes compatibles', 'Industria química', 'se necesita resistencia al alcohol sin espuma fluorada', 'combina objetivo ambiental y compatibilidad con combustibles polares documentados', 'SDS, ensayo, viscosidad, combustible y boquilla', 'las formulaciones AR-F3 no son intercambiables ni universales'),
    offer('aeroportuario', 'Extintor F3 para aplicación aeroportuaria', 'extintor-f3-aplicacion-aeroportuaria', 'Modelo con ensayo aplicable', 'Áreas aeroportuarias de escala portátil', 'Aeronáutica', 'se requiere una espuma sin flúor con evidencia para el escenario aeronáutico', 'permite cotizar únicamente un producto con aprobación y método de aplicación pertinentes', 'ICAO u otra aprobación, combustible, rating y montaje', 'la aplicación portátil no sustituye vehículos o sistemas ARFF requeridos por el sitio'),
  ],
});

const wetK = createProposalSeries({
  parentId: 'tipo-k-portatil', group: 'portatiles', agentOrMaterial: 'Químico húmedo', fireClasses: ['K'], source: amerexClassK, priority: 'alta',
  items: [
    offer('2-5-l', 'Extintor tipo K de 2.5 L compacto', 'extintor-tipo-k-2-5-l-compacto', '2.5 L', 'Puntos compactos de cocina', 'Restaurantes', 'se necesita una presentación contenida junto a equipos de cocción pequeños', 'aporta enfriamiento y saponificación en un formato fácil de ubicar', 'aparatos, volumen de aceite, rating y distancia', 'no sustituye el sistema de campana cuando éste es requerido'),
    offer('4-l', 'Extintor tipo K de 4 L para cocina', 'extintor-tipo-k-4-l-cocina', '4 L', 'Cocinas comerciales de escala contenida', 'Alimentos', 'se busca una capacidad intermedia para aceites y grasas calientes', 'permite ajustar carga y maniobrabilidad a la línea de cocción real', 'aparatos, aceite, rating, montaje y acceso', 'no debe descargarse de forma que salpique el aceite caliente'),
    offer('6-l', 'Extintor tipo K de 6 L para restaurante', 'extintor-tipo-k-6-l-restaurante', '6 L', 'Freidoras y líneas comerciales', 'Restaurantes', 'se requiere una capacidad recurrente para cocina profesional', 'integra equipo, señal, ubicación y mantenimiento en una propuesta empresarial', 'número de freidoras, aceite, rating y sistema fijo', 'es complemento y no reemplazo automático del sistema de supresión de campana'),
    offer('9-l', 'Extintor tipo K de 9 L industrial', 'extintor-tipo-k-9-l-industrial', '9 L', 'Comedores y cocinas de alta producción', 'Industria alimentaria', 'se necesita mayor solución húmeda para una exposición de cocina extensa', 'incrementa la carga portátil para aparatos y aceites compatibles', 'rating, peso, recorrido y configuración de cocina', 'el mayor tamaño exige verificar maniobrabilidad y ubicación'),
    offer('10-l', 'Extintor tipo K de 10 L para comedor', 'extintor-tipo-k-10-l-comedor', '10 L', 'Comedores institucionales y hoteles', 'Hospitalidad', 'se busca una presentación de gran capacidad para múltiples equipos', 'permite cotizar mayor autonomía junto con capacitación y servicio posterior', 'aparatos, cobertura del sistema, rating y acceso', 'la capacidad nominal no sustituye el cálculo por aparato y riesgo'),
  ],
});

const hfc = createProposalSeries({
  parentId: 'hfc-236fa-portatil', group: 'portatiles', agentOrMaterial: 'HFC-236fa (FE-36)', fireClasses: ['A', 'B', 'C'], source: chemoursFe36, priority: 'especialidad',
  items: [
    offer('2-5-kg', 'Extintor HFC-236fa de 2.5 kg', 'extintor-hfc-236fa-2-5-kg', '2.5 kg', 'Electrónica e instrumentación compacta', 'Tecnología', 'se necesita un agente sin residuo en una presentación ligera', 'reduce limpieza posterior y facilita protección localizada de activos sensibles', 'rating, agente autorizado, alcance y ocupación', 'la aptitud ABC debe confirmarse en la etiqueta del modelo'),
    offer('4-5-kg', 'Extintor HFC-236fa de 4.5 kg', 'extintor-hfc-236fa-4-5-kg', '4.5 kg', 'Cuartos de control y telecomunicaciones', 'Telecomunicaciones', 'se busca equilibrio entre carga y manejo para un recinto técnico', 'ofrece mayor agente sin introducir polvo en componentes y contactos', 'rating, ventilación, distancia y documentación', 'los HFC requieren manejo y recuperación responsables durante servicio'),
    offer('6-kg', 'Extintor HFC-236fa de 6 kg', 'extintor-hfc-236fa-6-kg', '6 kg', 'Centros de datos y activos críticos', 'Centros de datos', 'se requiere la mayor presentación habitual de esta familia portátil', 'aumenta la carga para un punto técnico sujeto a rating y disponibilidad', 'rating, peso, recinto, ocupación y proveedor', 'no sustituye un sistema fijo cuando el riesgo exige descarga total'),
    offer('telecom', 'Extintor HFC-236fa para telecomunicaciones', 'extintor-hfc-236fa-telecomunicaciones', 'Capacidad según rack y rating', 'Racks, nodos y salas de comunicaciones', 'Telecomunicaciones', 'se necesita proteger continuidad y reducir contaminación por agente', 'enfoca la selección en criticidad, distancia y documentación del equipo', 'energía, combustibles, recinto, rating y capacidad', 'un agente limpio no evita inspección y recuperación del equipo afectado'),
    offer('laboratorio', 'Extintor HFC-236fa para laboratorio', 'extintor-hfc-236fa-laboratorio', 'Capacidad según riesgo', 'Instrumentación y procesos de laboratorio', 'Laboratorios', 'se busca compatibilidad con activos sensibles y fuegos incipientes específicos', 'permite comparar residuo, clases, toxicidad y condiciones de ocupación', 'sustancias, rating, ventilación y ficha de seguridad', 'no debe seleccionarse sin identificar químicos incompatibles o reactivos'),
  ],
});

const halotron = createProposalSeries({
  parentId: 'halotron-portatil', group: 'portatiles', agentOrMaterial: 'Agente limpio halocarbonado', fireClasses: ['A', 'B', 'C'], source: amerexCatalog, priority: 'especialidad',
  items: [
    offer('i-2-5-lb', 'Extintor Halotron I de 2.5 lb', 'extintor-halotron-i-2-5-lb', '2.5 lb', 'Electrónica portátil y cabinas', 'Tecnología', 'se requiere una unidad compacta que no deje polvo', 'aporta una opción de agente limpio para activos sensibles de escala contenida', 'rating, capacidad, alcance y listado', 'la clase A y el alcance cambian según capacidad y modelo'),
    offer('i-5-lb', 'Extintor Halotron I de 5 lb', 'extintor-halotron-i-5-lb', '5 lb', 'Equipos electrónicos y laboratorios', 'Laboratorios', 'se necesita mayor agente limpio manteniendo formato portátil', 'equilibra limpieza posterior, capacidad y facilidad de manejo', 'rating, ocupación, documentación y montaje', 'la disponibilidad y recuperación del agente deben confirmarse'),
    offer('i-11-lb', 'Extintor Halotron I de 11 lb', 'extintor-halotron-i-11-lb', '11 lb', 'Áreas técnicas con activos de alto valor', 'Industria', 'se busca una carga superior de Halotron I para un punto especializado', 'amplía la capacidad portátil antes de evaluar una unidad móvil', 'rating, peso, alcance, ventilación y servicio', 'el peso y costo del agente exigen justificar la aplicación'),
    offer('brx-comercial', 'Extintor Halotron BrX comercial', 'extintor-halotron-brx-comercial', 'Capacidad según serie HT', 'Centros de datos y maquinaria delicada', 'Tecnología', 'se busca una alternativa vigente para equipo delicado', 'permite comparar Halotron BrX con otros agentes limpios según documentación actual', 'modelo, listado, clase, agente y disponibilidad', 'no debe presentarse como sustituto universal de Halotron I o halón'),
    offer('brx-aviacion', 'Extintor Halotron BrX para aviación', 'extintor-halotron-brx-aviacion', 'Capacidad según aeronave', 'Cabinas y aplicaciones aeronáuticas', 'Aeronáutica', 'se necesita una configuración desarrollada para requisitos de aviación', 'centra la propuesta en modelo, soporte y aprobación aeronáutica aplicables', 'aeronave, autoridad, listado, montaje y agente', 'la aptitud depende de aprobación específica y no sólo del nombre comercial'),
  ],
});

const sodiumClassD = createProposalSeries({
  parentId: 'clase-d-cloruro-sodio', group: 'portatiles', agentOrMaterial: 'Polvo clase D de cloruro de sodio', fireClasses: ['D'], source: amerexClassD, priority: 'especialidad',
  items: [
    offer('30-lb-magnesio', 'Extintor clase D de 30 lb para magnesio', 'extintor-clase-d-30-lb-magnesio', '30 lb', 'Viruta y piezas de magnesio compatibles', 'Metalmecánica', 'se requiere un polvo que forme una costra sobre metal combustible', 'combina carga especializada y aplicador de flujo suave para reducir dispersión', 'metal, forma, temperatura, agente y etiqueta', 'no se debe usar agua, CO₂ o agente no indicado sobre el metal'),
    offer('sodio', 'Extintor clase D para sodio metálico', 'extintor-clase-d-sodio-metalico', 'Capacidad según fabricante', 'Procesos con sodio compatible', 'Industria química', 'se necesita seleccionar el agente a partir del metal exacto', 'orienta la cotización a compatibilidad de cloruro de sodio y método de aplicación', 'metal, cantidad, granulometría, proceso y etiqueta', 'la compatibilidad con sodio no autoriza su uso sobre todos los metales'),
    offer('potasio', 'Extintor clase D para potasio metálico', 'extintor-clase-d-potasio-metalico', 'Capacidad según fabricante', 'Laboratorios y procesos con potasio', 'Laboratorios', 'se requiere protección específica para un metal altamente reactivo', 'obliga a confirmar agente, cantidad y procedimiento antes de suministrar', 'metal, almacenamiento, reacción, agente y capacitación', 'el contacto con agentes incompatibles puede producir una reacción violenta'),
    offer('aluminio-polvo', 'Extintor clase D para aluminio en polvo', 'extintor-clase-d-aluminio-polvo', 'Capacidad según fabricante', 'Polvo y finos de aluminio compatibles', 'Manufactura', 'se necesita controlar un fuego de partículas metálicas sin dispersarlas', 'prioriza aplicador suave y compatibilidad documentada con el polvo especial', 'aleación, tamaño de partícula, proceso y agente', 'una descarga de alta velocidad puede dispersar el metal ardiendo'),
    offer('aplicador-suave', 'Extintor clase D con aplicador de flujo suave', 'extintor-clase-d-aplicador-flujo-suave', '30 lb o modelo aplicable', 'Pilas y superficies de metal combustible', 'Industria', 'se requiere depositar polvo sin proyectar partículas incendiadas', 'diferencia el conjunto de descarga como parte crítica del producto clase D', 'agente, manguera, aplicador, distancia y metal', 'el aplicador no convierte un agente incompatible en apto para otro metal'),
  ],
});

const graphiteCopper = createProposalSeries({
  parentId: 'clase-d-grafito-cobre', group: 'portatiles', agentOrMaterial: 'Polvo clase D de grafito o cobre', fireClasses: ['D'], source: amerexClassD, priority: 'especialidad',
  items: [
    offer('cobre-litio', 'Extintor clase D de cobre para litio', 'extintor-clase-d-cobre-litio-metalico', 'Capacidad según fabricante', 'Litio metálico, no batería ion-litio', 'Laboratorios', 'se requiere polvo de cobre para una aplicación expresamente listada con litio metálico', 'separa correctamente el riesgo de litio metálico del de baterías ion-litio', 'metal, forma, cantidad, agente y listado', 'no debe anunciarse para baterías de ion-litio por compartir la palabra litio'),
    offer('grafito-metales', 'Extintor clase D de grafito para metales', 'extintor-clase-d-grafito-metales', 'Capacidad según fabricante', 'Metales compatibles con polvo de grafito', 'Metalmecánica', 'se busca una alternativa de polvo seco según el metal del proceso', 'permite cotizar composición y aplicador a partir de evidencia del fabricante', 'metal, aleación, agente, descarga y SDS', 'grafito no es una solución universal para toda clase D'),
    offer('lith-x', 'Extintor Lith-X para litio metálico', 'extintor-lith-x-litio-metalico', 'Capacidad según fabricante', 'Laboratorios y fabricación con litio metálico', 'Energía', 'se requiere una formulación comercial diseñada para litio metálico', 'identifica el agente por composición y alcance documentado, no por analogía', 'ficha vigente, metal, cantidad y método', 'la marca y disponibilidad deben confirmarse antes de ofrecer el producto'),
    offer('g-plus', 'Extintor G-Plus para metales combustibles', 'extintor-g-plus-metales-combustibles', 'Capacidad según fabricante', 'Metales compatibles indicados por fabricante', 'Industria', 'se necesita comparar un polvo grafítico especializado', 'amplía alternativas clase D sin asumir equivalencia entre formulaciones', 'composición, metal, aplicador, listado y suministro', 'no se deben mezclar polvos clase D ni reutilizar recipientes sin procedimiento'),
    offer('laboratorio', 'Extintor clase D para laboratorio metalúrgico', 'extintor-clase-d-laboratorio-metalurgico', 'Agente según metal', 'Ensayos y muestras de metales combustibles', 'Laboratorios', 'se requiere una unidad seleccionada para varios procesos, pero un metal objetivo por equipo', 'convierte el inventario de metales en una especificación de agente y capacidad', 'metales, cantidades, almacenamiento, agente y capacitación', 'un solo extintor puede no cubrir metales con agentes incompatibles entre sí'),
  ],
});

const lithiumAvd = createProposalSeries({
  parentId: 'ion-litio-avd', group: 'portatiles', agentOrMaterial: 'Dispersión acuosa de vermiculita (AVD)', fireClasses: [], source: avdRange, priority: 'especialidad',
  items: [
    offer('500-ml', 'Extintor AVD de 500 ml para baterías', 'extintor-avd-500-ml-baterias', '500 ml aerosol', 'Teléfonos y dispositivos pequeños dentro del ensayo', 'Hogar y oficina', 'se necesita una unidad compacta para dispositivos de baja energía', 'ofrece aplicación localizada de AVD con alcance limitado por el fabricante', 'energía Wh, química, tamaño, ensayo y distancia', 'no debe extrapolarse a bicicletas, vehículos o almacenamiento de gran energía'),
    offer('1-l', 'Extintor AVD de 1 L para ion-litio', 'extintor-avd-1-l-ion-litio', '1 L', 'Herramientas, laptops y equipos portátiles', 'Servicios técnicos', 'se busca más agente para baterías portátiles de energía contenida', 'permite seleccionar por energía y escenario en lugar de usar clase D como atajo', 'Wh, dispositivo, posibilidad de propagación y ensayo', 'el límite de energía protegido debe comprobarse en la documentación del modelo'),
    offer('2-l', 'Extintor AVD de 2 L para taller', 'extintor-avd-2-l-taller', '2 L', 'Reparación de movilidad y baterías pequeñas', 'Talleres', 'se requiere enfriamiento y recubrimiento para un banco de reparación', 'aumenta la reserva de agente para incidentes contenidos con acceso directo', 'química, Wh, confinamiento, ventilación y prueba', 'las celdas dañadas pueden reignitar y requieren vigilancia y gestión posterior'),
    offer('6-l', 'Extintor AVD de 6 L para baterías', 'extintor-avd-6-l-baterias', '6 L', 'Almacenamiento y carga de baterías compatibles', 'Logística', 'se necesita una presentación portátil ensayada para mayor energía', 'incorpora una capacidad con referencias de prueba específicas sin prometer cobertura universal', 'Wh, química, arreglo, NTA 8133 y modelo', 'no cubre automáticamente cualquier rack, vehículo eléctrico o sistema BESS'),
    offer('9-l', 'Extintor AVD de 9 L industrial', 'extintor-avd-9-l-industrial', '9 L', 'Áreas industriales con riesgo ion-litio', 'Industria', 'se busca la mayor carga portátil habitual antes de soluciones móviles o fijas', 'ofrece mayor tiempo de aplicación sujeto al alcance ensayado del equipo', 'Wh, propagación, acceso, ensayo, cantidad y protocolo', 'un evento con propagación o vehículo puede superar la capacidad de un portátil'),
  ],
});

export const portableExpansionProposals = [
  ...pqsAbc,
  ...pqsBc,
  ...purpleK,
  ...co2,
  ...water,
  ...waterMist,
  ...afff,
  ...arAfff,
  ...f3,
  ...wetK,
  ...hfc,
  ...halotron,
  ...sodiumClassD,
  ...graphiteCopper,
  ...lithiumAvd,
];
