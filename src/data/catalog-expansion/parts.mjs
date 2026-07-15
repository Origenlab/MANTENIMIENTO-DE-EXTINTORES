import { createProposalSeries } from './schema.mjs';

const steelParts = 'https://www.steelfire.com/products/fire-extinguisher-parts';
const amerexManuals = 'https://amerex-fire.com/learning-center/manuals/';
const amerexCatalog = 'https://amerex-fire.com/upl/downloads/library/fire-extinguisher-product-catalog-english.pdf';
const bioex = 'https://www.bio-ex.com/en/';
const angusF3 = 'https://www.firefightingfoam.com/fire-fighting-foam/angus-fire/fluorine-free-foams/';

function offer(key, name, slug, variant, application, sector, need, value, selection, limitation, type = 'compatibility') {
  return { key, name, slug, variant, application, sector, need, value, selection, limitation, type };
}

const valves = createProposalSeries({
  parentId: 'valvulas-accionamiento', group: 'refacciones', agentOrMaterial: 'Metal y elastómeros compatibles', source: steelParts, priority: 'media',
  items: [
    offer('pqs', 'Válvula para extintor PQS', 'valvula-para-extintor-pqs', 'Rosca y presión según modelo', 'Extintores ABC o BC presurizados', 'Servicio técnico', 'se requiere sustituir el conjunto de accionamiento de un PQS', 'permite cotizar cuerpo, vástago y componentes por modelo exacto', 'marca, modelo, rosca, presión, cilindro y agente', 'una válvula parecida no es compatible si cambian rosca o presión'),
    offer('agua-espuma', 'Válvula para extintor de agua o espuma', 'valvula-extintor-agua-espuma', 'Conjunto según fabricante', 'Equipos líquidos presurizados', 'Servicio técnico', 'se necesita una válvula compatible con solución acuosa y presión', 'diferencia materiales internos y conexiones del equipo líquido', 'modelo, presión, tubo sifón, agente y rosca', 'no debe reutilizarse una válvula corroída o sin piezas autorizadas'),
    offer('quimico-humedo', 'Válvula para extintor tipo K', 'valvula-para-extintor-tipo-k', 'Acero inoxidable o modelo aplicable', 'Químico húmedo de cocina', 'Alimentos', 'se requiere compatibilidad química y sanitaria con agente húmedo', 'integra válvula, manguera y sellos específicos del equipo K', 'marca, modelo, material, agente, rosca y presión', 'no debe mezclarse con componentes de agua o espuma sin autorización'),
    offer('co2', 'Válvula para extintor CO₂', 'valvula-para-extintor-co2', 'Alta presión según cilindro', 'Cilindros CO₂ portátiles o móviles', 'Servicio técnico', 'se necesita un conjunto diseñado para CO₂ y su presión', 'centra la selección en conexión, seguridad y dispositivo de alivio', 'cilindro, rosca, presión, disco, maneral y modelo', 'trabajar válvulas de CO₂ requiere equipo y procedimiento especializado'),
    offer('cartucho', 'Mecanismo para extintor operado por cartucho', 'mecanismo-extintor-operado-cartucho', 'Actuador y receptor compatibles', 'Equipos con cartucho interno o externo', 'Industria', 'se requiere restaurar el sistema de perforación o apertura del cartucho', 'agrupa palanca, percutor, receptor y sellos por arquitectura', 'modelo, cartucho, actuador, presión y manual', 'un mecanismo incorrecto puede impedir presurización o provocar descarga'),
  ],
});

const gauges = createProposalSeries({
  parentId: 'manometros-extintor', group: 'refacciones', agentOrMaterial: 'Manómetro compatible con extintor', source: steelParts, priority: 'media',
  items: [
    offer('pqs', 'Manómetro para extintor PQS', 'manometro-para-extintor-pqs', 'Escala y rosca según modelo', 'Extintores ABC y BC presurizados', 'Servicio técnico', 'se necesita indicar presión operable en un PQS específico', 'permite seleccionar rango, rosca y orientación conforme al fabricante', 'presión de trabajo, escala, rosca, diámetro y modelo', 'la zona verde de un manómetro no es universal entre equipos'),
    offer('agua', 'Manómetro para extintor de agua', 'manometro-para-extintor-agua', 'Rango según equipo', 'Agua a presión y agua con aditivo', 'Servicio técnico', 'se requiere un indicador compatible con presión y agente acuoso', 'diferencia rango y materiales del conjunto de agua', 'presión, rosca, material, escala y fabricante', 'no debe instalarse un manómetro de rango distinto aunque la rosca coincida'),
    offer('espuma', 'Manómetro para extintor de espuma', 'manometro-para-extintor-espuma', 'Rango según fabricante', 'AFFF, AR-AFFF o F3 autorizada', 'Servicio técnico', 'se necesita verificar presión en un equipo de solución espumante', 'vincula indicador, agente y válvula dentro del modelo aprobado', 'modelo, presión, agente, rosca y orientación', 'la compatibilidad química y calibración deben confirmarse'),
    offer('tipo-k', 'Manómetro para extintor tipo K', 'manometro-para-extintor-tipo-k', 'Escala para químico húmedo', 'Equipos de cocina presurizados', 'Alimentos', 'se requiere reemplazar el indicador sin contaminar el agente', 'prioriza materiales y rango correspondientes al equipo K', 'marca, modelo, rango, rosca y material', 'el servicio debe preservar limpieza y compatibilidad del químico húmedo'),
    offer('agente-limpio', 'Manómetro para extintor de agente limpio', 'manometro-extintor-agente-limpio', 'Rango según agente y modelo', 'HFC u otro agente presurizado', 'Tecnología', 'se necesita un indicador para la presión y temperatura del agente', 'obliga a confirmar química, carga y curva del fabricante', 'agente, temperatura, presión, escala, rosca y modelo', 'no todos los agentes limpios utilizan el mismo rango o método de carga'),
  ],
});

const hoses = createProposalSeries({
  parentId: 'mangueras-boquillas', group: 'refacciones', agentOrMaterial: 'Manguera, boquilla y conexiones', source: steelParts, priority: 'media',
  items: [
    offer('pqs-portatil', 'Manguera para extintor PQS portátil', 'manguera-extintor-pqs-portatil', 'Longitud y rosca según modelo', 'Equipos ABC o BC portátiles', 'Servicio técnico', 'se requiere sustituir una manguera cuarteada u obstruida', 'restaura conducción y orientación con un conjunto compatible', 'marca, modelo, longitud, rosca, presión y boquilla', 'no debe repararse con abrazaderas o piezas no autorizadas'),
    offer('pqs-movil', 'Manguera para extintor PQS móvil', 'manguera-extintor-pqs-movil', 'Conjunto de gran longitud', 'Unidades rodantes industriales', 'Industria', 'se necesita una manguera de mayor longitud y caudal', 'integra conexiones, boquilla y presión conforme a la unidad móvil', 'modelo, longitud, diámetro, presión, agente y carrete', 'dobleces, abrasión o conexión incorrecta pueden impedir la descarga'),
    offer('agua-espuma', 'Manguera para extintor de agua y espuma', 'manguera-extintor-agua-espuma', 'Con boquilla aplicadora', 'Equipos líquidos portátiles', 'Servicio técnico', 'se requiere compatibilidad con solución acuosa y patrón de aplicación', 'combina manguera y boquilla seleccionadas al agente y alcance', 'agente, modelo, longitud, boquilla, rosca y presión', 'la boquilla afecta el patrón y no debe sustituirse por una genérica'),
    offer('tipo-k', 'Manguera para extintor tipo K', 'manguera-extintor-tipo-k', 'Con aplicador de químico húmedo', 'Extintores para cocina', 'Alimentos', 'se necesita una descarga suave que reduzca salpicadura', 'mantiene el patrón previsto para aplicar químico húmedo', 'modelo, agente, boquilla, longitud, material y presión', 'un chorro incorrecto puede dispersar aceite caliente'),
    offer('boquilla', 'Boquilla de descarga para extintor', 'boquilla-descarga-para-extintor', 'Tipo según agente', 'Reemplazo de conjunto terminal', 'Servicio técnico', 'se requiere recuperar el patrón de descarga original', 'selecciona geometría, material y conexión a partir del agente', 'agente, patrón, rosca, material, modelo y caudal', 'una boquilla universal puede alterar desempeño y rating'),
  ],
});

const co2Horns = createProposalSeries({
  parentId: 'trompeta-co2', group: 'refacciones', agentOrMaterial: 'Trompeta o difusor para CO₂', source: amerexManuals, priority: 'media',
  items: [
    offer('directa', 'Trompeta directa para extintor CO₂', 'trompeta-directa-extintor-co2', 'Montaje directo', 'CO₂ portátil compacto', 'Servicio técnico', 'se requiere reemplazar el difusor unido al conjunto de válvula', 'orienta la descarga con una pieza dimensionada al modelo', 'modelo, rosca, tamaño, aislamiento y capacidad', 'la trompeta se enfría intensamente y debe tener zona segura de agarre'),
    offer('manguera', 'Trompeta CO₂ con manguera', 'trompeta-co2-con-manguera', 'Conjunto flexible', 'CO₂ portátil de mayor capacidad', 'Servicio técnico', 'se necesita dirigir la descarga a distancia del cilindro', 'integra manguera, conexión y corneta como conjunto compatible', 'capacidad, manguera, presión, corneta y roscas', 'no debe combinarse una manguera de presión o longitud no autorizada'),
    offer('agarre', 'Trompeta CO₂ con agarre aislado', 'trompeta-co2-agarre-aislado', 'Empuñadura aislante', 'Operación manual de CO₂', 'Todos los sectores', 'se requiere una zona de sujeción protegida frente al frío', 'diferencia el componente de seguridad que permite orientar la corneta', 'material, aislamiento, modelo, diámetro y montaje', 'el usuario no debe sujetar superficies no aisladas durante descarga'),
    offer('difusor', 'Difusor de descarga para CO₂', 'difusor-descarga-para-co2', 'Difusor según capacidad', 'Equipos con salida compacta', 'Servicio técnico', 'se necesita el terminal específico en lugar de una corneta grande', 'restaura expansión y dirección conforme al diseño del fabricante', 'modelo, orificio, rosca, capacidad y presión', 'modificar el orificio puede cambiar descarga y seguridad'),
    offer('rodante', 'Corneta con válvula para CO₂ rodante', 'corneta-valvula-co2-rodante', 'Manguera y cierre en corneta', 'Unidades móviles de 50 o 100 lb', 'Industria', 'se requiere controlar descarga desde el extremo de la manguera', 'combina corneta, válvula y aislamiento para una unidad industrial', 'modelo, presión, manguera, válvula, corneta y repuestos', 'el conjunto debe probarse y mantenerse como parte de la unidad completa'),
  ],
});

const seals = createProposalSeries({
  parentId: 'sellos-empaques', group: 'refacciones', agentOrMaterial: 'Elastómeros, pasadores y sellos', source: steelParts, priority: 'media',
  items: [
    offer('oring', 'Kit de O-rings para extintor', 'kit-o-rings-para-extintor', 'Material y medidas según modelo', 'Sellado de válvula y conexiones', 'Servicio técnico', 'se requiere renovar elastómeros durante mantenimiento', 'agrupa medidas y materiales compatibles en un kit trazable', 'marca, modelo, agente, material, medida y ubicación', 'un O-ring de tamaño correcto puede fallar si el material es incompatible'),
    offer('vastago', 'Sello de vástago para válvula', 'sello-vastago-valvula-extintor', 'Empaque según válvula', 'Mecanismo de accionamiento', 'Servicio técnico', 'se necesita detener fuga en el vástago sin cambiar piezas al azar', 'identifica el empaque a partir de la válvula y presión', 'válvula, vástago, presión, material, agente y manual', 'no debe reutilizarse un sello deformado o contaminado'),
    offer('pasador', 'Pasador de seguridad para extintor', 'pasador-seguridad-para-extintor', 'Pasador y cadena compatibles', 'Mecanismo manual portátil', 'Servicio técnico', 'se requiere asegurar la palanca sin impedir extracción', 'restaura el elemento de seguridad con geometría correcta', 'válvula, diámetro, longitud, cadena y sello', 'un pasador improvisado puede trabarse o liberarse accidentalmente'),
    offer('sello-inviolable', 'Sello plástico para extintor', 'sello-plastico-seguridad-extintor', 'Sello de ruptura controlada', 'Evidencia visual de manipulación', 'Mantenimiento', 'se necesita identificar activación sin bloquear la operación', 'permite inspección rápida con resistencia de ruptura apropiada', 'resistencia, color, lote, pasador y procedimiento', 'no debe usarse un cincho demasiado resistente que impida retirar el pasador'),
    offer('collarin', 'Collarín de servicio para extintor PQS', 'collarin-servicio-extintor-pqs', 'Collarín conforme al servicio', 'PQS sometido a mantenimiento o recarga', 'Mantenimiento', 'se requiere evidencia física colocada durante el servicio aplicable', 'vincula intervención, fecha y prestador dentro del control documental', 'equipo, categoría, material, fecha, etiqueta y norma', 'no es una certificación de fábrica ni reemplaza el dictamen del prestador'),
  ],
});

const wheels = createProposalSeries({
  parentId: 'ruedas-ejes', group: 'refacciones', agentOrMaterial: 'Ruedas, ejes y herrajes', source: amerexManuals, priority: 'media',
  items: [
    offer('rueda', 'Rueda para extintor móvil', 'rueda-para-extintor-movil', 'Diámetro y carga según unidad', 'Equipos rodantes industriales', 'Servicio técnico', 'se requiere recuperar desplazamiento estable de la unidad', 'selecciona rueda, buje y material según peso y terreno', 'modelo, diámetro, eje, carga, material y terreno', 'una rueda parecida puede alterar altura, estabilidad o capacidad de carga'),
    offer('eje', 'Eje para extintor rodante', 'eje-para-extintor-rodante', 'Longitud y diámetro según chasis', 'Unidades móviles de uno o dos cilindros', 'Servicio técnico', 'se necesita sustituir un eje doblado o corroído', 'restaura geometría y alineación sin modificar el recipiente', 'modelo, ancho, diámetro, fijación, carga y material', 'no debe soldarse al cilindro ni improvisarse su fijación'),
    offer('maneral', 'Maneral para extintor móvil', 'maneral-para-extintor-movil', 'Asa o bastidor compatible', 'Traslado de unidades rodantes', 'Industria', 'se requiere una zona segura para empujar o inclinar el equipo', 'recupera ergonomía y control de la plataforma durante movimiento', 'modelo, altura, fijación, peso y recubrimiento', 'un maneral débil puede fallar al inclinar la unidad'),
    offer('carrete', 'Carrete para manguera de extintor móvil', 'carrete-manguera-extintor-movil', 'Soporte o carrete compatible', 'Organización de manguera industrial', 'Industria', 'se necesita evitar arrastre, doblez y daño durante almacenamiento', 'mantiene la manguera lista y ordenada sobre el carro', 'longitud, diámetro, radio, bastidor y fijación', 'un radio insuficiente puede colapsar o dañar la manguera'),
    offer('herrajes', 'Kit de herrajes para unidad móvil', 'kit-herrajes-unidad-extintor-movil', 'Tornillería y retenes según modelo', 'Chasis, eje, manguera y cilindro', 'Servicio técnico', 'se requiere reponer fijaciones sin mezclar grados o medidas', 'agrupa piezas compatibles para restaurar el ensamble', 'modelo, plano, rosca, grado, material y ubicación', 'herrajes genéricos pueden aflojarse, corroerse o fallar bajo carga'),
  ],
});

const powders = createProposalSeries({
  parentId: 'agentes-pqs-especiales', group: 'refacciones', agentOrMaterial: 'Polvo químico seco o polvo clase D', source: amerexCatalog, priority: 'especialidad',
  items: [
    offer('abc', 'Agente PQS ABC para recarga profesional', 'agente-pqs-abc-recarga-profesional', 'Formulación según fabricante', 'Servicio de extintores multipropósito', 'Mantenimiento', 'se necesita reponer agente conforme al equipo y procedimiento', 'permite documentar composición, lote y compatibilidad del PQS ABC', 'fabricante, formulación, porcentaje, lote, equipo y norma', 'no se deben mezclar polvos de distinta formulación o procedencia'),
    offer('bc', 'Agente PQS BC para recarga profesional', 'agente-pqs-bc-recarga-profesional', 'Bicarbonato compatible', 'Extintores para riesgos B:C', 'Mantenimiento', 'se requiere un polvo BC trazable y compatible con el equipo', 'diferencia composición BC de formulaciones multipropósito ABC', 'química, lote, fabricante, equipo y procedimiento', 'un agente BC no convierte el extintor en apto para clase A'),
    offer('purple-k', 'Agente Purple-K para extintor', 'agente-purple-k-para-extintor', 'Bicarbonato de potasio', 'Equipos BC especializados', 'Petróleo y gas', 'se necesita reponer agente Purple-K sin contaminar su composición', 'preserva la química especializada mediante manejo y equipo dedicados', 'fabricante, lote, equipo, pureza, contaminación y carga', 'mezclar con BC regular o ABC puede alterar desempeño y servicio'),
    offer('nacl', 'Polvo clase D de cloruro de sodio', 'polvo-clase-d-cloruro-sodio', 'Agente NaCl específico', 'Extintores para metales compatibles', 'Metalmecánica', 'se requiere un polvo especial vinculado al metal presente', 'permite cotizar agente, cantidad y equipo sin llamarlo universal', 'metal, formulación, fabricante, lote y aplicador', 'no debe usarse sobre litio metálico u otros metales si la ficha no lo indica'),
    offer('cobre', 'Polvo clase D de cobre para litio', 'polvo-clase-d-cobre-litio-metalico', 'Agente de cobre específico', 'Extintores para litio metálico', 'Energía', 'se necesita una formulación de cobre expresamente indicada', 'separa litio metálico de baterías ion-litio y exige trazabilidad', 'metal, fabricante, lote, equipo, cantidad y ficha', 'no debe ofrecerse para baterías ion-litio sin evidencia de ensayo'),
  ],
});

const concentrates = createProposalSeries({
  parentId: 'concentrados-soluciones', group: 'refacciones', agentOrMaterial: 'Concentrado o solución húmeda', source: bioex, priority: 'especialidad',
  items: [
    offer('afff-3', 'Concentrado AFFF al 3%', 'concentrado-afff-3-porciento', '3%', 'Hidrocarburos y equipos compatibles', 'Petróleo y gas', 'se requiere una proporción AFFF documentada para el sistema', 'vincula concentración, lote y hardware sin asumir intercambiabilidad', 'SDS, aprobación, combustible, equipo, lote y vida útil', 'no debe mezclarse con otro concentrado ni descargarse sin controles ambientales'),
    offer('afff-6', 'Concentrado AFFF al 6%', 'concentrado-afff-6-porciento', '6%', 'Equipos diseñados para mezcla al 6%', 'Industria', 'se necesita mantener la concentración prevista por el fabricante', 'permite cotizar un insumo específico con documentación y trazabilidad', 'equipo, proporción, combustible, SDS, lote y almacenamiento', 'una formulación al 6% no se reemplaza por 3% sin rediseño'),
    offer('ar-afff', 'Concentrado AR-AFFF para solventes', 'concentrado-ar-afff-solventes', '1x3, 3x3 u otra proporción', 'Alcoholes y líquidos polares compatibles', 'Industria química', 'se requiere resistencia al alcohol para un combustible identificado', 'incorpora membrana polimérica y concentración según ficha', 'solvente, viscosidad, proporción, equipo, SDS y lote', 'no todos los AR-AFFF son compatibles con cualquier proporcionador'),
    offer('f3', 'Concentrado de espuma sin flúor F3', 'concentrado-espuma-sin-fluor-f3', 'F3 según aprobación', 'Proyectos con transición PFAS-free', 'Industria', 'se busca una formulación sin surfactantes fluorados', 'permite comparar desempeño, hardware y aprobación antes de migrar', 'combustible, ensayo, viscosidad, equipo, lote y limpieza', 'F3 puede exigir cambio de proporcionador, boquillas o estrategia'),
    offer('quimico-humedo', 'Solución química húmeda tipo K', 'solucion-quimica-humeda-tipo-k', 'Agente según sistema o extintor', 'Servicio de equipos para cocina', 'Alimentos', 'se necesita reponer agente húmedo compatible y trazable', 'mantiene formulación, concentración y materiales del equipo K', 'fabricante, modelo, agente, lote, cantidad y procedimiento', 'no debe prepararse una mezcla casera ni combinar soluciones distintas'),
  ],
});

export const partsExpansionProposals = [
  ...valves,
  ...gauges,
  ...hoses,
  ...co2Horns,
  ...seals,
  ...wheels,
  ...powders,
  ...concentrates,
];
