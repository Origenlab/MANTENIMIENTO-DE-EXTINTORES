import { createProposalSeries } from './schema.mjs';

const kiddeCabinets = 'https://www.kidde.com/products/fire-extinguisher-cabinets';
const steelCabinets = 'https://www.steelfire.com/products/extinguisher-cabinets-and-stands';
const guardianBrackets = 'https://www.guardianfire.com/4/61/61/6/products/4600/Wall-Brackets-and-Covers/';
const badgerVehicle = 'https://www.badgerfire.com/products/utility-vehicle-brackets';
const steelStands = 'https://www.steelfire.com/products/stand-kits';
const bradyPhoto = 'https://tds.bradyid.com/TDSdocs/B-452.pdf';
const larsens = 'https://www.larsensmfg.com/';
const avd = 'https://www.avdfire.com/';
const sti = 'https://www.sti-usa.com/';

function offer(key, name, slug, variant, application, sector, need, value, selection, limitation, type = 'configuration') {
  return { key, name, slug, variant, application, sector, need, value, selection, limitation, type };
}

const metalCabinets = createProposalSeries({
  parentId: 'gabinete-metalico', group: 'accesorios', agentOrMaterial: 'Acero pintado o inoxidable', source: kiddeCabinets, priority: 'alta',
  items: [
    offer('sobreponer', 'Gabinete metálico de sobreponer', 'gabinete-metalico-extintor-sobreponer', 'Sobreponer', 'Muros terminados y remodelaciones', 'Comercio', 'se necesita instalar sin abrir un nicho en el muro', 'facilita montaje visible y selección por tamaño del extintor', 'capacidad, profundidad, puerta, anclaje y ambiente', 'el gabinete no debe obstruir acceso ni dificultar extracción'),
    offer('empotrar', 'Gabinete metálico para empotrar', 'gabinete-metalico-extintor-empotrar', 'Empotrado', 'Obra nueva y arquitectura integrada', 'Construcción', 'se busca una instalación enrasada con el muro', 'reduce proyección al pasillo cuando la cavidad permite el montaje', 'muro, profundidad, capacidad, marco y puerta', 'no debe cortarse un elemento estructural sin autorización del proyecto'),
    offer('semiempotrar', 'Gabinete metálico semiempotrado', 'gabinete-metalico-extintor-semiempotrado', 'Semiempotrado', 'Muros con profundidad limitada', 'Corporativos', 'se necesita disminuir la proyección sin empotrar completamente', 'equilibra espacio interior del gabinete y restricciones del muro', 'profundidad, marco, extintor, circulación y anclaje', 'la parte saliente debe revisarse contra accesibilidad y circulación'),
    offer('cristal', 'Gabinete metálico con frente de cristal', 'gabinete-metalico-extintor-cristal', 'Puerta o panel transparente', 'Áreas públicas con inspección visual', 'Institucional', 'se requiere ver el equipo sin abrir el gabinete', 'permite inspección visual y acceso mediante puerta o mecanismo definido', 'tipo de cristal, acceso, cerradura, capacidad y señal', 'el método de apertura debe ser seguro y comprensible en emergencia'),
    offer('cerradura', 'Gabinete metálico con cerradura', 'gabinete-metalico-extintor-cerradura', 'Cerradura o sello controlado', 'Áreas con riesgo de manipulación', 'Educación', 'se necesita desalentar uso no autorizado sin bloquear la emergencia', 'integra control de acceso con procedimiento y llave disponibles', 'tipo de cierre, normativa, responsables, alarma y acceso', 'una cerradura sin protocolo puede retrasar la respuesta'),
  ],
});

const specialtyCabinets = createProposalSeries({
  parentId: 'gabinete-fibra-inoxidable', group: 'accesorios', agentOrMaterial: 'Fibra de vidrio, HDPE o acero inoxidable', source: steelCabinets, priority: 'media',
  items: [
    offer('fibra-exterior', 'Gabinete de fibra de vidrio exterior', 'gabinete-fibra-vidrio-extintor-exterior', 'Fibra de vidrio', 'Patios e instalaciones a la intemperie', 'Industria', 'se necesita protección frente a humedad y corrosión ambiental', 'ofrece un cuerpo no metálico para ambientes exteriores compatibles', 'UV, sello, tamaño, montaje y drenaje', 'resistencia a intemperie depende de materiales y clasificación del modelo'),
    offer('inoxidable', 'Gabinete inoxidable para extintor', 'gabinete-inoxidable-para-extintor', 'Acero inoxidable', 'Cocinas, laboratorios y áreas lavables', 'Alimentos', 'se busca una superficie durable y fácil de limpiar', 'combina protección del equipo con acabado resistente sujeto al grado', 'grado de acero, capacidad, puerta, limpieza y montaje', 'inoxidable no significa inmune a todos los químicos o ambientes'),
    offer('marino', 'Gabinete marino para extintor', 'gabinete-marino-para-extintor', 'Material resistente a salinidad', 'Muelles, embarcaciones e instalaciones costeras', 'Marítimo', 'se necesita mayor resistencia a sal y humedad', 'prioriza herrajes, sello y material adecuados al ambiente marino', 'salinidad, grado, herrajes, drenaje y anclaje', 'debe revisarse corrosión periódicamente aunque el material sea resistente'),
    offer('hdpe', 'Gabinete HDPE para extintor', 'gabinete-hdpe-para-extintor', 'Polietileno moldeado', 'Exterior, transporte y ambientes industriales', 'Logística', 'se busca un gabinete ligero y resistente a impactos moderados', 'ofrece construcción moldeada con menos puntos de corrosión', 'UV, temperatura, cierre, tamaño y montaje', 'la compatibilidad química y UV depende de la resina y ficha'),
    offer('corrosivo', 'Gabinete para ambiente corrosivo', 'gabinete-extintor-ambiente-corrosivo', 'Material según agente ambiental', 'Plantas químicas y tratamiento de agua', 'Industria química', 'se requiere seleccionar material a partir de los contaminantes del sitio', 'convierte ambiente, limpieza y exposición en especificación del gabinete', 'químicos, concentración, material, sello y herrajes', 'ningún material debe considerarse universalmente resistente a corrosión'),
  ],
});

const wallBrackets = createProposalSeries({
  parentId: 'soporte-pared', group: 'accesorios', agentOrMaterial: 'Acero o acero inoxidable', source: guardianBrackets, priority: 'alta',
  items: [
    offer('gancho', 'Gancho de pared para extintor', 'gancho-pared-para-extintor', 'Gancho compatible', 'Muros interiores y equipos ligeros', 'Comercio', 'se requiere un montaje sencillo usando el aro o soporte del cilindro', 'mantiene el equipo elevado y visible con mínima ocupación', 'oreja, diámetro, peso, tornillo y muro', 'no debe usarse si el fabricante exige una ménsula específica'),
    offer('mensula', 'Ménsula de pared para extintor', 'mensula-pared-para-extintor', 'Ménsula compatible', 'Equipos portátiles de distintos diámetros', 'Corporativos', 'se necesita apoyo y retención más definidos que un gancho', 'distribuye el peso mediante una pieza seleccionada al cilindro', 'diámetro, base, peso, pared y tornillería', 'una ménsula incompatible puede dañar o liberar el equipo'),
    offer('correa', 'Soporte de pared con correa', 'soporte-pared-extintor-con-correa', 'Abrazadera o correa', 'Áreas con contacto accidental', 'Educación', 'se requiere retención adicional contra golpes o desprendimiento', 'añade una sujeción liberable sin ocultar el extintor', 'diámetro, cierre, peso, acceso y montaje', 'la correa debe poder liberarse rápidamente en emergencia'),
    offer('reforzado', 'Soporte reforzado para extintor', 'soporte-reforzado-pared-extintor', 'Acero pesado', 'Equipos grandes y ambientes industriales', 'Industria', 'se necesita soportar mayor peso o vibración incidental', 'aporta construcción robusta y anclaje dimensionado al muro', 'peso, diámetro, carga, anclaje y ambiente', 'la resistencia final depende también del sustrato y la instalación'),
    offer('inoxidable', 'Soporte inoxidable para extintor', 'soporte-inoxidable-pared-extintor', 'Acero inoxidable', 'Cocinas, laboratorios y zonas húmedas', 'Alimentos', 'se busca reducir corrosión y facilitar limpieza', 'combina montaje compatible con material adecuado al ambiente', 'grado, diámetro, peso, herrajes y limpieza', 'el grado inoxidable debe corresponder a químicos y humedad reales'),
  ],
});

const vehicleBrackets = createProposalSeries({
  parentId: 'soporte-vehicular', group: 'accesorios', agentOrMaterial: 'Acero con sistema de retención', source: badgerVehicle, priority: 'alta',
  items: [
    offer('automovil', 'Soporte vehicular para extintor compacto', 'soporte-vehicular-extintor-compacto', 'Automóvil', 'Cabina o cajuela de vehículo ligero', 'Flotillas', 'se necesita retener un cilindro pequeño durante la conducción', 'facilita acceso y evita que el equipo quede suelto', 'diámetro, peso, ubicación, tornillos y liberación', 'no debe instalarse donde interfiera con pedales, bolsas de aire o pasajeros'),
    offer('camion', 'Soporte para extintor de camión', 'soporte-extintor-para-camion', 'Camión', 'Cabina o chasis de transporte', 'Logística', 'se requiere mayor resistencia a vibración y uso continuo', 'incorpora cierre y estructura pesada para un entorno de transporte', 'cilindro, vibración, intemperie, pernos y acceso', 'el montaje exterior requiere protección contra corrosión y suciedad'),
    offer('autotanque', 'Soporte para extintor de autotanque', 'soporte-extintor-autotanque', 'Autotanque', 'Vehículos de combustibles y materiales', 'Petróleo y gas', 'se necesita sujeción robusta y ubicación acorde al procedimiento', 'integra retención, acceso y ambiente severo en una configuración', 'capacidad, normativa, vibración, corrosión y ubicación', 'debe coordinarse con requisitos de transporte y del vehículo'),
    offer('maquinaria', 'Soporte para extintor de maquinaria', 'soporte-extintor-maquinaria-pesada', 'Maquinaria pesada', 'Construcción, minería y campo', 'Construcción', 'se requiere resistir polvo, impacto y vibración', 'protege y retiene el equipo junto al puesto de operación', 'cilindro, vibración, golpes, ambiente y liberación', 'una funda o caja puede ser necesaria además del soporte'),
    offer('marino', 'Soporte marino para extintor', 'soporte-marino-para-extintor', 'Vehicular/marino', 'Embarcaciones y equipos costeros', 'Marítimo', 'se necesita retención y materiales adecuados a humedad salina', 'combina cierre seguro y acabado resistente sujeto a ficha', 'diámetro, salinidad, material, liberación y autoridad', 'la corrosión oculta debe revisarse en inspecciones periódicas'),
  ],
});

const floorStands = createProposalSeries({
  parentId: 'portaextintor-piso', group: 'accesorios', agentOrMaterial: 'Acero, polímero o fibra', source: steelStands, priority: 'alta',
  items: [
    offer('sencillo', 'Portaextintor de piso sencillo', 'portaextintor-piso-sencillo', 'Un extintor', 'Áreas sin muro disponible', 'Comercio', 'se necesita ubicar un equipo sin perforar pared', 'crea un punto visible y reubicable con base estable', 'diámetro, altura, estabilidad, señal y circulación', 'no debe invadir rutas de evacuación ni volcarse con facilidad'),
    offer('doble', 'Portaextintor de piso doble', 'portaextintor-piso-doble', 'Dos extintores', 'Puntos con agentes complementarios', 'Industria', 'se requiere colocar dos equipos diferenciados en una estación', 'agrupa agentes complementarios manteniendo acceso individual', 'diámetros, pesos, etiquetas, base y separación', 'los equipos deben identificarse para evitar usar el agente incorrecto'),
    offer('pedestal-senal', 'Pedestal para extintor con señal', 'pedestal-extintor-con-senal', 'Pedestal señalizado', 'Vestíbulos, eventos y áreas abiertas', 'Institucional', 'se busca mejorar visibilidad vertical del punto de protección', 'integra soporte y señal sin depender de un muro', 'altura, señal, base, extintor y flujo peatonal', 'la señal no sustituye delimitación o ubicación normativa cuando aplica'),
    offer('gabinete', 'Estación de piso con gabinete', 'estacion-piso-gabinete-extintor', 'Gabinete y base', 'Exterior o áreas temporales', 'Construcción', 'se necesita proteger el equipo en una estación autónoma', 'combina resguardo, estabilidad y visibilidad en un conjunto', 'ambiente, gabinete, base, acceso y capacidad', 'debe evitar acumulación de agua y mantener apertura inmediata'),
    offer('movil', 'Portaextintor móvil de piso', 'portaextintor-movil-de-piso', 'Base con ruedas', 'Áreas de trabajo que cambian de ubicación', 'Eventos', 'se requiere mover una estación entre zonas controladas', 'ofrece movilidad sin convertir el extintor en unidad rodante de descarga', 'ruedas, freno, estabilidad, peso y recorrido', 'debe inmovilizarse durante uso y no sustituye ubicaciones permanentes'),
  ],
});

const covers = createProposalSeries({
  parentId: 'funda-extintor', group: 'accesorios', agentOrMaterial: 'Vinil reforzado o material técnico', source: guardianBrackets, priority: 'media',
  items: [
    offer('interior', 'Funda interior para extintor', 'funda-interior-para-extintor', 'Interior', 'Áreas con polvo ligero', 'Comercio', 'se necesita mantener limpio un equipo visible', 'reduce suciedad superficial conservando extracción rápida', 'tamaño, apertura, visibilidad y ambiente', 'no debe ocultar señalización, inspección ni acceso'),
    offer('uv', 'Funda UV para extintor exterior', 'funda-uv-extintor-exterior', 'Protección UV', 'Patios y zonas expuestas al sol', 'Industria', 'se busca proteger manguera y etiqueta de radiación solar', 'añade barrera exterior seleccionada al tamaño del cilindro', 'UV, temperatura, tamaño, cierre y ventilación', 'una funda no reemplaza un gabinete cuando hay lluvia intensa o impacto'),
    offer('impermeable', 'Funda impermeable para extintor', 'funda-impermeable-para-extintor', 'Exterior húmedo', 'Áreas con lluvia o lavado', 'Logística', 'se necesita reducir ingreso de agua y suciedad', 'protege componentes sin sacrificar apertura mediante cierre accesible', 'sellado, drenaje, tamaño, material y acceso', 'la condensación puede persistir y requiere inspección frecuente'),
    offer('industrial', 'Funda industrial para extintor', 'funda-industrial-para-extintor', 'Uso pesado', 'Plantas con polvo y abrasión', 'Industria pesada', 'se requiere un material reforzado para un entorno severo', 'combina espesor, costuras y sujeción adaptados a operación industrial', 'abrasión, químicos, temperatura, tamaño y cierre', 'debe comprobarse compatibilidad química del material'),
    offer('ventana', 'Funda para extintor con ventana', 'funda-extintor-con-ventana-inspeccion', 'Ventana transparente', 'Puntos donde se revisa manómetro y etiqueta', 'Corporativos', 'se necesita inspección visual sin retirar completamente la cubierta', 'permite ver componentes críticos manteniendo protección ambiental', 'posición de ventana, modelo, UV, cierre y lectura', 'la ventana no elimina la revisión física mensual requerida'),
  ],
});

const carts = createProposalSeries({
  parentId: 'carro-portaextintor', group: 'accesorios', agentOrMaterial: 'Acero con ruedas y herrajes', source: steelStands, priority: 'media',
  items: [
    offer('cilindro', 'Carro para cilindro de extintor', 'carro-para-cilindro-extintor', 'Un cilindro', 'Conversión o soporte de equipo pesado autorizado', 'Industria', 'se necesita desplazar un cilindro compatible con seguridad', 'aporta base, eje y maneral seleccionados al diámetro y peso', 'cilindro, centro de gravedad, eje, sujeción y ruedas', 'no todo portátil puede convertirse en móvil sin autorización del fabricante'),
    offer('manguera', 'Carro portaextintor con manguera', 'carro-portaextintor-con-manguera', 'Carro y soporte de manguera', 'Unidades móviles de descarga remota', 'Industria', 'se requiere ordenar y proteger la manguera durante traslado', 'integra carrete o soporte para evitar arrastre y dobleces', 'longitud, radio, boquilla, peso y fijación', 'una manguera mal enrollada puede bloquear o retrasar la descarga'),
    offer('co2', 'Carro para extintor CO₂ de 20 lb', 'carro-extintor-co2-20-lb', 'CO₂ 20 lb compatible', 'Salas técnicas y laboratorios', 'Tecnología', 'se necesita mejorar movilidad de un CO₂ portátil pesado', 'reduce carga de transporte conservando la configuración del equipo autorizado', 'modelo, diámetro, peso, sujeción y corneta', 'el carro no convierte el equipo en un CO₂ rodante de mayor capacidad'),
    offer('clase-d', 'Carro para extintor clase D', 'carro-para-extintor-clase-d', 'Clase D 30 lb compatible', 'Laboratorios y metalmecánica', 'Metalmecánica', 'se necesita desplazar un cilindro clase D y su aplicador', 'mantiene agente, manguera y aplicador organizados cerca del riesgo', 'modelo, metal, manguera, aplicador y ruedas', 'el agente debe seguir siendo compatible con el metal presente'),
    offer('especial', 'Carro portaextintor de fabricación especial', 'carro-portaextintor-fabricacion-especial', 'Configuración a medida', 'Equipos con geometría o accesorios particulares', 'Industria', 'se necesita una plataforma que no existe como accesorio estándar', 'permite diseñar soporte sin alterar el recipiente ni los componentes de presión', 'planos, peso, centro, material, ruedas y sujeción', 'la fabricación no debe modificar ni soldar el cilindro presurizado'),
  ],
});

const signs = createProposalSeries({
  parentId: 'senalizacion-extintor', group: 'accesorios', agentOrMaterial: 'Sustrato rígido o fotoluminiscente', source: bradyPhoto, priority: 'alta',
  items: [
    offer('fotoluminiscente', 'Señal fotoluminiscente para extintor', 'senal-fotoluminiscente-para-extintor', 'Fotoluminiscente', 'Ubicación visible con pérdida potencial de luz', 'Institucional', 'se necesita identificar el equipo con material que conserve luminancia', 'mejora localización cuando el material está cargado e instalado correctamente', 'norma, luminancia, sustrato, tamaño y ubicación', 'fotoluminiscencia depende de carga de luz y condiciones del producto'),
    offer('bandera', 'Señal tipo bandera para extintor', 'senal-bandera-para-extintor', 'Perpendicular al muro', 'Pasillos y corredores largos', 'Corporativos', 'se requiere visibilidad lateral desde ambos sentidos', 'proyecta la identificación fuera del plano del muro', 'ángulo, altura, tamaño, fijación y recorrido', 'no debe convertirse en obstáculo ni quedar oculta por puertas'),
    offer('direccional', 'Señal direccional de extintor', 'senal-direccional-de-extintor', 'Flecha direccional', 'Rutas donde el equipo no es visible directamente', 'Comercio', 'se necesita guiar hacia una ubicación cercana', 'complementa la señal principal con orientación clara y coherente', 'sentido, distancia, visibilidad, norma y montaje', 'una flecha incorrecta o ambigua aumenta el tiempo de localización'),
    offer('piso', 'Marcaje de piso para extintor', 'marcaje-piso-zona-extintor', 'Delimitación de piso', 'Bodegas y plantas industriales', 'Logística', 'se requiere mantener libre el espacio frente al equipo', 'hace visible la zona que no debe obstruirse por mercancía', 'dimensiones, tránsito, material, color y ubicación', 'el marcaje se desgasta y necesita inspección y reposición'),
    offer('clases', 'Señal de clases de fuego para extintor', 'senal-clases-fuego-extintor', 'Identificación A/B/C/D/K', 'Puntos con agentes diferentes', 'Industria', 'se necesita ayudar a distinguir el uso permitido de cada equipo', 'presenta pictogramas coherentes con la etiqueta del extintor', 'agente, clases, pictogramas, idioma y tamaño', 'no debe contradecir el rating o las instrucciones del fabricante'),
  ],
});

const blankets = createProposalSeries({
  parentId: 'manta-contra-incendio', group: 'accesorios', agentOrMaterial: 'Tejido resistente al fuego según fabricante', source: larsens, priority: 'media',
  items: [
    offer('cocina', 'Manta contra incendio para cocina', 'manta-contra-incendio-cocina', 'Tamaño doméstico/comercial', 'Sofocación de recipientes o ropa según instrucciones', 'Restaurantes', 'se necesita una barrera manual compacta junto a la cocina', 'ofrece sofocación sin descarga de agente en un incidente contenido', 'tamaño, material, gabinete, instrucciones y ubicación', 'no debe usarse cuando acercarse al fuego sea inseguro'),
    offer('comercial', 'Manta contra incendio comercial', 'manta-contra-incendio-comercial', 'Tamaño comercial', 'Locales, talleres y áreas de servicio', 'Comercio', 'se requiere mayor superficie que una manta doméstica', 'amplía cobertura para incidentes compatibles y protección de emergencia', 'medida, material, ensayo, gabinete y entrenamiento', 'no sustituye extintores ni equipo de protección personal'),
    offer('laboratorio', 'Manta contra incendio para laboratorio', 'manta-contra-incendio-laboratorio', 'Tamaño según mesa o persona', 'Laboratorios y áreas educativas', 'Laboratorios', 'se necesita una manta accesible para incidentes compatibles', 'integra gabinete, señal e instrucciones dentro del protocolo del laboratorio', 'químicos, material, tamaño, ubicación y procedimiento', 'algunos químicos reaccionan o siguen ardiendo bajo una manta'),
    offer('soldadura', 'Manta ignífuga para soldadura', 'manta-ignifuga-para-soldadura', 'Manta de trabajo en caliente', 'Contención de chispas y escoria', 'Metalmecánica', 'se necesita proteger superficies durante trabajo en caliente', 'actúa como barrera preventiva seleccionada por temperatura y proceso', 'temperatura, tejido, escoria, tamaño y soporte', 'una manta de soldadura no es automáticamente una manta de escape'),
    offer('vehiculo-electrico', 'Manta de contención para vehículo eléctrico', 'manta-contencion-vehiculo-electrico', 'Tamaño para vehículo', 'Contención de humo y propagación alrededor de EV', 'Movilidad eléctrica', 'se requiere una herramienta especializada para aislar un vehículo', 'ofrece contención operacional dentro de un protocolo entrenado', 'vehículo, tamaño, ensayo, personal, EPP y recuperación', 'no extingue automáticamente la batería ni elimina gases tóxicos o reignición'),
  ],
});

const controls = createProposalSeries({
  parentId: 'alarma-gabinete', group: 'accesorios', agentOrMaterial: 'Dispositivo de alarma, sello o identificación', source: sti, priority: 'media',
  items: [
    offer('alarma-local', 'Alarma local para gabinete de extintor', 'alarma-local-gabinete-extintor', 'Alarma audible', 'Áreas públicas con riesgo de manipulación', 'Educación', 'se necesita alertar cuando se abre o retira el equipo', 'añade aviso local sin impedir acceso al extintor', 'contacto, alimentación, volumen, montaje y restablecimiento', 'la alarma no debe bloquear la apertura ni sustituye supervisión central'),
    offer('contacto-puerta', 'Contacto de puerta para gabinete', 'contacto-puerta-gabinete-extintor', 'Interruptor magnético o mecánico', 'Gabinetes integrados a monitoreo', 'Corporativos', 'se requiere detectar apertura dentro de un sistema existente', 'entrega una señal simple para lógica o alarma del inmueble', 'tipo de contacto, voltaje, cableado, panel y puerta', 'debe verificarse compatibilidad eléctrica y condición normal del circuito'),
    offer('sello', 'Sello inviolable para extintor', 'sello-inviolable-para-extintor', 'Sello de seguridad', 'Control visual de activación o manipulación', 'Todos los sectores', 'se necesita evidencia visual de que el pasador fue alterado', 'facilita inspección sin impedir la operación manual', 'resistencia de ruptura, color, pasador, lote y uso', 'un sello no demuestra carga, presión ni condición interna del extintor'),
    offer('collarin', 'Collar de garantía para extintor', 'collarin-garantia-para-extintor', 'Collarín de servicio', 'Equipos sometidos a mantenimiento', 'Servicio técnico', 'se requiere evidencia física asociada al servicio aplicable', 'identifica intervención conforme al procedimiento y documentación', 'categoría, material, fecha, servicio y norma', 'no debe colocarse como certificación de un producto nuevo o no intervenido'),
    offer('qr', 'Etiqueta QR para control de extintor', 'etiqueta-qr-control-extintor', 'QR e identificador de activo', 'Inventarios y programas multisede', 'Corporativos', 'se necesita relacionar el equipo con historial e inspecciones', 'mejora trazabilidad cuando el QR apunta a un sistema mantenido', 'ID, datos, privacidad, adhesivo, acceso y proceso', 'el QR no sustituye etiqueta reglamentaria ni revisión física'),
  ],
});

export const accessoryExpansionProposals = [
  ...metalCabinets,
  ...specialtyCabinets,
  ...wallBrackets,
  ...vehicleBrackets,
  ...floorStands,
  ...covers,
  ...carts,
  ...signs,
  ...blankets,
  ...controls,
];
