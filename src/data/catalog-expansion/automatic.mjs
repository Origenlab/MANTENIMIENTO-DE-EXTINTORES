import { createProposalSeries } from './schema.mjs';

const modularDcp = 'https://safexfire.com/product/modular-dcp/';
const naffcoDry = 'https://www.naffco.com/en/dry-powder';
const chemoursFe36 = 'https://www.chemours.com/en/brands-and-products/fire-suppressants/products/fe36';
const amerexManuals = 'https://amerex-fire.com/learning-center/manuals/';
const ansulR102 = 'https://www.ansul.com/restaurant-systems/r-102-restaurant-fire-suppression-system/r102_restaurant_fire_suppression_system_fsp/r-102-restaurant-fire-suppression-system';

function offer(key, name, slug, variant, application, sector, need, value, selection, limitation, type = 'configuration') {
  return { key, name, slug, variant, application, sector, need, value, selection, limitation, type };
}

const ceiling = createProposalSeries({
  parentId: 'automatico-techo-pqs', group: 'automaticos', agentOrMaterial: 'Polvo químico seco', fireClasses: ['A', 'B', 'C'], source: modularDcp, priority: 'especialidad',
  items: [
    offer('2-kg', 'Extintor automático de techo PQS de 2 kg', 'extintor-automatico-techo-pqs-2-kg', '2 kg', 'Gabinetes o espacios pequeños compatibles', 'Comercio', 'se requiere descarga térmica localizada en un volumen contenido', 'ofrece una unidad modular compacta sujeta a temperatura y cobertura del fabricante', 'volumen, altura, temperatura, rating y agente', 'no debe instalarse sin verificar patrón de descarga y obstrucciones'),
    offer('5-kg', 'Extintor automático de techo PQS de 5 kg', 'extintor-automatico-techo-pqs-5-kg', '5 kg', 'Cuartos técnicos y almacenes pequeños', 'Industria ligera', 'se necesita una carga modular intermedia para descarga automática', 'aumenta agente manteniendo instalación suspendida y activación térmica', 'área, altura, bulbo, cobertura y montaje', 'una sola unidad puede no cubrir geometrías u obstáculos complejos'),
    offer('10-kg', 'Extintor automático de techo PQS de 10 kg', 'extintor-automatico-techo-pqs-10-kg', '10 kg', 'Bodegas y áreas de proceso compatibles', 'Logística', 'se requiere mayor carga en una unidad automática modular', 'permite diseñar cantidad y separación a partir de documentación del modelo', 'cobertura, altura, temperatura, cantidad y estructura', 'no equivale a un sistema fijo diseñado ni sustituye detección y alarma requeridas'),
    offer('15-kg', 'Extintor automático de techo PQS de 15 kg', 'extintor-automatico-techo-pqs-15-kg', '15 kg', 'Espacios industriales de mayor volumen', 'Industria', 'se busca la mayor capacidad modular habitual', 'aporta carga superior con activación térmica donde el fabricante lo autoriza', 'peso, anclaje, cobertura, bulbo y mantenimiento', 'la estructura debe soportar el equipo y las fuerzas de descarga'),
    offer('temperatura-selectiva', 'Extintor de techo con bulbo térmico', 'extintor-techo-bulbo-termico-seleccionado', 'Temperatura según modelo', 'Ambientes con temperatura operativa definida', 'Industria', 'se necesita elegir temperatura de activación sin falsas descargas', 'diferencia el elemento térmico como parte esencial de la especificación', 'temperatura ambiente, techo, bulbo, agente y cobertura', 'una temperatura incorrecta puede retrasar o provocar activación no deseada'),
  ],
});

const cleanAutomatic = createProposalSeries({
  parentId: 'automatico-agente-limpio', group: 'automaticos', agentOrMaterial: 'Agente limpio vigente', fireClasses: ['A', 'B', 'C'], source: chemoursFe36, priority: 'especialidad',
  items: [
    offer('fe36-2-kg', 'Extintor automático FE-36 de 2 kg', 'extintor-automatico-fe36-2-kg', '2 kg o equivalente', 'Gabinetes eléctricos compactos', 'Tecnología', 'se necesita descarga sin polvo dentro de un volumen pequeño', 'combina agente limpio y activación automática sujeto a diseño del fabricante', 'agente, volumen, concentración, activación y listado', 'no debe calcularse una concentración a partir del peso sin ingeniería'),
    offer('fe36-5-kg', 'Extintor automático FE-36 de 5 kg', 'extintor-automatico-fe36-5-kg', '5 kg o equivalente', 'Cuartos eléctricos de escala contenida', 'Energía', 'se requiere mayor agente limpio en una unidad modular', 'amplía la carga para un recinto definido sin introducir residuo sólido', 'volumen, ocupación, agente, concentración y ventilación', 'la seguridad de ocupantes y productos de descomposición deben evaluarse'),
    offer('hfc227ea', 'Extintor automático HFC-227ea', 'extintor-automatico-hfc-227ea', 'Capacidad según volumen', 'Racks y recintos técnicos compatibles', 'Telecomunicaciones', 'se busca un agente gaseoso específico disponible por fabricante', 'permite comparar química, concentración y documentación antes de cotizar', 'volumen, agente, boquillas, detección y listado', 'la disponibilidad y regulación ambiental deben confirmarse al proyecto'),
    offer('fk5112', 'Extintor automático con fluorocetona', 'extintor-automatico-fluorocetona', 'Capacidad según fabricante', 'Activos críticos y electrónica', 'Centros de datos', 'se necesita una alternativa de fluido limpio con suministro trazable', 'condiciona la propuesta a fabricante, agente vigente y documentación real', 'agente, origen, volumen, concentración y listado', 'no debe prometerse Novec 1230 ni inventario sin confirmar trazabilidad actual'),
    offer('tubo-deteccion', 'Extintor automático con tubo de detección', 'extintor-automatico-tubo-deteccion', 'Unidad local según gabinete', 'Gabinetes eléctricos y maquinaria', 'Industria', 'se requiere detectar calor en el punto y descargar agente localmente', 'integra detección lineal y cilindro en una configuración de aplicación directa', 'tubo, temperatura, agente, volumen y ruta', 'la compatibilidad del tubo y el agente depende del sistema completo listado'),
  ],
});

const detectorUnit = createProposalSeries({
  parentId: 'detextintor', group: 'automaticos', agentOrMaterial: 'PQS o agente compatible', fireClasses: ['A', 'B', 'C'], source: modularDcp, priority: 'especialidad',
  items: [
    offer('bulbo', 'Detextintor con bulbo térmico', 'detextintor-bulbo-termico', 'Temperatura según bulbo', 'Punto fijo con activación térmica', 'Comercio', 'se necesita activación autónoma por temperatura', 'ofrece una respuesta local sin depender de operación manual inmediata', 'temperatura, cobertura, agente, altura y montaje', 'no detecta necesariamente humo ni sustituye alarma de evacuación'),
    offer('eslabon-fusible', 'Detextintor con eslabón fusible', 'detextintor-eslabon-fusible', 'Fusible según temperatura', 'Maquinaria o recinto con mecanismo térmico', 'Industria', 'se requiere liberar la descarga al fundirse un elemento calibrado', 'diferencia un mecanismo mecánico de activación que debe mantenerse accesible', 'temperatura, tensión, agente, boquillas y manual', 'suciedad, corrosión o montaje incorrecto pueden afectar el mecanismo'),
    offer('tubo-lineal', 'Detextintor con tubo detector lineal', 'detextintor-tubo-detector-lineal', 'Longitud según sistema', 'Gabinetes y recorridos de riesgo', 'Tecnología', 'se necesita detección continua cerca del foco probable', 'lleva el elemento sensor a lo largo del volumen protegido', 'longitud, radio, temperatura, presión y agente', 'el trazado y radios deben respetar el manual del sistema'),
    offer('deteccion-calor', 'Detextintor con detector de calor', 'detextintor-detector-calor', 'Configuración con señal eléctrica', 'Cuartos técnicos y paneles', 'Energía', 'se necesita separar la detección eléctrica del mecanismo de descarga', 'permite integrar lógica, alarma y activación con supervisión', 'detector, panel, señal, actuador y energía de respaldo', 'requiere diseño de controles y no debe cablearse como un dispositivo aislado'),
    offer('deteccion-humo', 'Detextintor con detección de humo', 'detextintor-deteccion-humo', 'Configuración supervisada', 'Recintos limpios con detección temprana', 'Centros de datos', 'se busca iniciar una secuencia antes del aumento térmico', 'combina aviso temprano, lógica y descarga cuando el sistema lo permite', 'tipo de humo, confirmación, retardo, alarma y agente', 'una sola señal puede no ser suficiente; debe revisarse la lógica de liberación'),
  ],
});

const engine = createProposalSeries({
  parentId: 'compartimiento-motor', group: 'automaticos', agentOrMaterial: 'Agente definido por riesgo', fireClasses: ['A', 'B', 'C'], source: amerexManuals, priority: 'especialidad',
  items: [
    offer('vehiculo-ligero', 'Sistema para compartimiento de motor vehicular', 'sistema-compartimiento-motor-vehicular', 'Configuración según motor', 'Vehículos de servicio y flotilla', 'Transporte', 'se requiere detectar y descargar cerca del motor', 'integra cilindro, detección, boquillas y activación manual opcional', 'combustible, volumen, temperatura, boquillas y montaje', 'no se debe adaptar un kit sin validar el motor y el vehículo'),
    offer('autobus', 'Sistema contra incendio para motor de autobús', 'sistema-incendio-motor-autobus', 'Sistema según compartimiento', 'Autobuses y transporte colectivo', 'Transporte público', 'se necesita protección automática en un motor de difícil acceso', 'permite diseñar detección y distribución para un compartimiento trasero', 'motor, ventilación, geometría, agente y normativa', 'la instalación debe coordinarse con fabricante y mantenimiento del vehículo'),
    offer('maquinaria-pesada', 'Sistema para motor de maquinaria pesada', 'sistema-motor-maquinaria-pesada', 'Configuración industrial', 'Excavadoras, cargadores y equipo móvil', 'Construcción', 'se requiere resistencia a polvo, vibración y temperatura', 'combina hardware robusto y cobertura local para maquinaria de trabajo', 'motor, hidráulico, vibración, agente y boquillas', 'el ambiente severo exige inspección y repuestos específicos'),
    offer('mineria', 'Sistema contra incendio para equipo minero', 'sistema-incendio-equipo-minero', 'Proyecto según equipo', 'Maquinaria subterránea o a cielo abierto', 'Minería', 'se necesita proteger motor, hidráulico y combustible en operación crítica', 'integra detección, descarga y controles adaptados al equipo minero', 'equipo, zonas, agente, redundancia y procedimiento', 'requiere ingeniería y no se resuelve con un cilindro aislado'),
    offer('generador', 'Sistema para compartimiento de generador', 'sistema-incendio-compartimiento-generador', 'Configuración según gabinete', 'Plantas de emergencia y generadores', 'Energía', 'se requiere protección local donde existen combustible y electricidad', 'permite diseñar agente, detección y corte del equipo en una secuencia', 'combustible, volumen, ventilación, paro y agente', 'la descarga sin paro o sin sellado puede no alcanzar concentración efectiva'),
  ],
});

const kitchen = createProposalSeries({
  parentId: 'sistema-campana-cocina', group: 'automaticos', agentOrMaterial: 'Químico húmedo preingenierizado', fireClasses: ['K'], source: ansulR102, priority: 'alta',
  items: [
    offer('aparato-especifico', 'Sistema de cocina por aparato específico', 'sistema-cocina-aparato-especifico', 'Boquillas por aparato', 'Freidoras, planchas y equipos definidos', 'Restaurantes', 'se necesita dirigir cada boquilla al riesgo de un aparato', 'optimiza distribución mediante un diseño probado para la configuración exacta', 'aparatos, dimensiones, boquillas, ducto y agente', 'mover o cambiar un aparato puede invalidar el diseño'),
    offer('cobertura-superpuesta', 'Sistema de cocina de cobertura superpuesta', 'sistema-cocina-cobertura-superpuesta', 'Diseño overlapping', 'Líneas de cocción con flexibilidad autorizada', 'Cadenas de alimentos', 'se requiere cierta flexibilidad dentro de zonas de cobertura listadas', 'permite reorganización limitada cuando el manual y boquillas lo contemplan', 'zonas, aparatos, boquillas, campana y manual', 'la flexibilidad no elimina límites de posición, tamaño y tipo de aparato'),
    offer('food-truck', 'Sistema de supresión para food truck', 'sistema-supresion-food-truck', 'Configuración móvil', 'Cocinas móviles y remolques', 'Alimentos', 'se necesita proteger una cocina sometida a vibración y espacio reducido', 'integra campana, aparatos, cilindro y activación en un vehículo', 'aparatos, combustible, vibración, ventilación y autoridad', 'debe coordinarse con gas, electricidad y requisitos del vehículo'),
    offer('cocina-industrial', 'Sistema de supresión para cocina industrial', 'sistema-supresion-cocina-industrial', 'Capacidad según aparatos', 'Comedores, hoteles y producción alimentaria', 'Hospitalidad', 'se requiere proteger múltiples aparatos y una campana extensa', 'convierte el inventario de cocción en cilindros, boquillas y zonas', 'aparatos, ductos, campanas, agente y disparo', 'no se dimensiona por metros cuadrados generales del local'),
    offer('ducto-plenum', 'Sistema de cocina para ducto y plenum', 'sistema-cocina-ducto-plenum', 'Boquillas para ventilación', 'Ductos, filtros, plenum y campana', 'Restaurantes', 'se necesita incluir la ruta de grasa además de los aparatos', 'extiende la protección a componentes de ventilación señalados por el sistema', 'ducto, plenum, filtros, boquillas y limpieza', 'la acumulación de grasa y falta de limpieza comprometen la protección'),
  ],
});

export const automaticExpansionProposals = [
  ...ceiling,
  ...cleanAutomatic,
  ...detectorUnit,
  ...engine,
  ...kitchen,
];
