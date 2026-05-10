---
title: "Sistemas de Detección de Incendios para Empresas en México: Guía Técnica NFPA 72"
description: "Guía técnica completa de sistemas de detección de incendios para empresas en México: tipos de detector, norma NFPA 72, paneles de alarma, integración con brigadas, requisitos NOM-002-STPS y criterios de selección por tipo de instalación."
heroImage: "img/img-index/prevencion-de-incendios.avif"
heroRight:
  - "Un sistema de detección de incendios correctamente diseñado e instalado puede detectar un conato <strong>2 a 4 minutos antes</strong> de que sea visible para un operador humano — y en ese tiempo, la diferencia entre un extintor que controla el fuego y una evacuación de emergencia puede salvar vidas e instalaciones completas."
  - "En México, la mayoría de las empresas instalan detectores de humo donde el catálogo del proveedor indica — sin análisis de riesgo, sin criterio técnico por tipo de ambiente y sin integración real con el plan de emergencia de la brigada. Esta guía documenta los <strong>criterios técnicos reales</strong> para diseñar, seleccionar e instalar un sistema de detección que funcione cuando más importa."
---

<div class="article-intro">
  <p class="article-lead">El <strong>sistema de detección de incendios</strong> es la primera línea de respuesta automática ante un siniestro — el sistema que permite a la brigada actuar antes de que el incendio se propague y a los ocupantes evacuar antes de que el humo alcance niveles letales. Sin embargo, en México la mayoría de los sistemas instalados en empresas son diseñados por catálogo: detectores de humo convencionales colocados a distancias estándar sin análisis del tipo de ambiente, la geometría del espacio ni las características del riesgo dominante. El resultado son sistemas que generan falsas alarmas frecuentes en cocinas industriales, que no detectan incendios de combustión lenta en almacenes o que se activan demasiado tarde en espacios de techo alto. Esta guía proporciona los criterios técnicos reales para tomar la decisión correcta.</p>
</div>

<nav class="toc">
  <p class="toc-title">Contenido del artículo</p>
  <ul>
    <li><a href="#como-funciona">1. Cómo funciona un sistema de detección de incendios</a></li>
    <li><a href="#tipos-detector">2. Tipos de detector: humo, calor, llama y gas — cuándo usar cada uno</a></li>
    <li><a href="#nfpa-72">3. NFPA 72: el estándar que define el sistema correcto</a></li>
    <li><a href="#panel-alarma">4. Panel de control y alarma: el cerebro del sistema</a></li>
    <li><a href="#diseno-sistema">5. Diseño del sistema por tipo de instalación</a></li>
    <li><a href="#integracion-brigada">6. Integración del sistema con la brigada contraincendios</a></li>
    <li><a href="#mantenimiento-deteccion">7. Mantenimiento y prueba del sistema de detección</a></li>
    <li><a href="#proveedores-deteccion">8. Proveedores e integradores en México</a></li>
    <li><a href="#faq-deteccion">Preguntas frecuentes</a></li>
  </ul>
</nav>

<section id="como-funciona" class="content-section">
  <h2>1. Cómo funciona un sistema de detección de incendios: arquitectura básica</h2>
  <p>Un sistema de detección de incendios es una red de dispositivos de campo conectados a un panel de control central que supervisa continuamente el estado de cada dispositivo y activa la alarma cuando alguno detecta las condiciones establecidas. Esta arquitectura tiene tres capas funcionales que deben funcionar en conjunto para que el sistema sea efectivo.</p>

  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th>Capa del sistema</th>
          <th>Componentes</th>
          <th>Función</th>
          <th>Si falla</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Detección</strong></td>
          <td>Detectores de humo, calor, llama, gas; estaciones manuales de jalón</td>
          <td>Sensar las condiciones del incendio y generar señal de alarma</td>
          <td>El sistema no detecta el incendio — no hay alarma automática</td>
        </tr>
        <tr>
          <td><strong>Control y procesamiento</strong></td>
          <td>Panel de control de alarma de incendio (FACP); módulos de zona; fuente de alimentación y batería de respaldo</td>
          <td>Recibir señales de detectores, procesarlas según la lógica programada y activar las salidas correspondientes</td>
          <td>El sistema no responde a las señales de los detectores aunque funcionen correctamente</td>
        </tr>
        <tr>
          <td><strong>Notificación</strong></td>
          <td>Sirenas, estrobos, paneles remotos, comunicación a central de monitoreo o bomberos</td>
          <td>Alertar a los ocupantes y a los servicios de emergencia</td>
          <td>La alarma se activa internamente pero nadie la recibe; los ocupantes no evacuan</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="highlight-box">
    <h4>La diferencia entre un sistema convencional y un sistema analógico-addressable</h4>
    <p>Los sistemas convencionales agrupan múltiples detectores en zonas — cuando cualquier detector de una zona activa la alarma, el panel solo indica "zona X en alarma" sin identificar cuál detector específico fue el primero en activarse. Los sistemas analógicos-addressable (o inteligentes) asignan una dirección única a cada detector — el panel identifica exactamente qué dispositivo activó la alarma, en qué estado está cada detector (normal, alarma, fallo, sucio) y puede aplicar lógica de verificación antes de activar la alarma general. Para instalaciones de más de 10 detectores o con múltiples zonas, el sistema addressable no es un lujo: reduce las falsas alarmas hasta en un 70% y permite a la brigada identificar el punto de origen del incendio antes de llegar al área.</p>
  </div>
</section>

<section id="tipos-detector" class="content-section">
  <h2>2. Tipos de detector: humo, calor, llama y gas — cuándo usar cada uno</h2>
  <p>La selección del tipo de detector para cada área de la instalación es la decisión de diseño más crítica del sistema. Un detector correcto en el ambiente incorrecto genera falsas alarmas que desensibilizan a los ocupantes y al personal de brigada — o, peor aún, no detecta el tipo de incendio que realmente puede ocurrir en ese espacio.</p>

  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th>Tipo de detector</th>
          <th>Principio de operación</th>
          <th>Detecta mejor</th>
          <th>Ambientes adecuados</th>
          <th>Ambientes donde NO usar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Fotoeléctrico (óptico)</strong></td>
          <td>Detecta partículas de humo por dispersión de luz infrarroja</td>
          <td>Humo denso de combustión lenta (plásticos, telas, espumas)</td>
          <td>Dormitorios, pasillos, oficinas, almacenes de materiales sólidos</td>
          <td>Cocinas, áreas de soldadura, zonas con vapores de pintura — falsas alarmas frecuentes</td>
        </tr>
        <tr>
          <td><strong>Ionización</strong></td>
          <td>Detecta partículas submicrónicas de combustión mediante cámara ionizada</td>
          <td>Humo de combustión rápida con llama (madera, papel, gasolina)</td>
          <td>Cuartos de equipo electrónico, salas de servidor, almacenes de materiales ligeros</td>
          <td>Zonas con vapores de solventes — falsas alarmas; zonas de alta humedad — fallo prematuro</td>
        </tr>
        <tr>
          <td><strong>Termostático / Punto fijo</strong></td>
          <td>Se activa cuando la temperatura supera un umbral fijo (57 °C, 68 °C o 93 °C según modelo)</td>
          <td>Incendios de combustión rápida con alta generación de calor</td>
          <td>Cocinas industriales, hornos, áreas de proceso con calor normal, zonas sucias</td>
          <td>Ambientes donde la temperatura ambiente puede acercarse al umbral — falsas alarmas</td>
        </tr>
        <tr>
          <td><strong>Termovelocimétrico (ROR)</strong></td>
          <td>Se activa cuando la tasa de incremento de temperatura supera 8–12 °C/min</td>
          <td>Incendios en desarrollo con incremento rápido de temperatura</td>
          <td>Almacenes, naves industriales, garajes, áreas de carga</td>
          <td>Zonas con incrementos de temperatura naturales rápidos (hornos que se encienden, zonas de proceso)</td>
        </tr>
        <tr>
          <td><strong>Detector de llama (IR/UV)</strong></td>
          <td>Detecta radiación ultravioleta o infrarroja emitida por la llama</td>
          <td>Incendios de llama abierta con baja generación de humo (hidrógeno, alcoholes)</td>
          <td>Plantas petroquímicas, áreas de almacenamiento de gases inflamables, hangares</td>
          <td>Zonas con luz solar directa (UV) o fuentes de calor infrarrojo (hornos) — falsas alarmas</td>
        </tr>
        <tr>
          <td><strong>Detector lineal de humo (beam)</strong></td>
          <td>Haz de luz proyectado entre emisor y receptor — la atenuación del haz activa la alarma</td>
          <td>Humo en espacios de gran volumen y techo alto</td>
          <td>Naves industriales, almacenes en rack de altura ≥8 m, atrios, teatros</td>
          <td>Espacios pequeños — innecesario y más costoso que detectores puntuales</td>
        </tr>
        <tr>
          <td><strong>Detector de gas (CO / gas natural / LP)</strong></td>
          <td>Sensor electroquímico o catalítico para detección de gas específico</td>
          <td>Fugas de gas antes de la ignición; CO de combustión incompleta</td>
          <td>Cocinas industriales, salas de calderas, garajes cerrados, cuartos de maquinaria</td>
          <td>No reemplaza a los detectores de incendio — es sistema complementario</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="solution-box">
    <h4>La regla de selección de detector por tipo de riesgo en instalaciones industriales</h4>
    <ul>
      <li><strong>Almacenes de materiales plásticos, telas, espumas:</strong> Fotoeléctrico — la combustión lenta de plásticos produce humo denso antes de la llama</li>
      <li><strong>Almacenes de productos combustibles en rack de altura (&gt;6 m):</strong> Detector lineal de haz + detector de calor en nivel de piso</li>
      <li><strong>Cocinas industriales y áreas de proceso con calor:</strong> Termostático + detector de gas — nunca fotoeléctrico ni ionización</li>
      <li><strong>Salas de servidores y centros de datos:</strong> Sistema VESDA (detección muy temprana por aspiración de aire) — detecta partículas de humo antes de que sean visibles</li>
      <li><strong>Plantas petroquímicas y áreas de líquidos inflamables:</strong> Detector de llama UV/IR + detector de gas inflamable + detector de calor</li>
      <li><strong>Oficinas y áreas administrativas:</strong> Fotoeléctrico estándar con alarma audible zonal</li>
    </ul>
  </div>
</section>

<section id="nfpa-72" class="content-section">
  <h2>3. NFPA 72: el estándar que define el diseño correcto del sistema</h2>
  <p>La <strong>NFPA 72, National Fire Alarm and Signaling Code</strong>, es el estándar internacional de referencia para el diseño, instalación, inspección, prueba y mantenimiento de sistemas de alarma de incendio. En México, la NOM-002-STPS-2010 exige sistemas de detección en instalaciones de riesgo especial y extra, pero no especifica parámetros técnicos de diseño con el detalle de la NFPA 72 — que es la referencia que usan los ingenieros en protección contraincendios y los peritos en México.</p>

  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th>Requisito NFPA 72</th>
          <th>Especificación</th>
          <th>Impacto en el diseño</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cobertura de detección</td>
          <td>Radio máximo de cobertura de 9.1 m (30 ft) por detector puntual en techo plano; ajuste por geometría y altura</td>
          <td>Determina el número mínimo de detectores por área — más detectores de los que la mayoría de diseños básicos instalan</td>
        </tr>
        <tr>
          <td>Alimentación eléctrica</td>
          <td>Alimentación principal + batería de respaldo mínima de 24 horas en standby y 5 minutos en alarma plena</td>
          <td>El sistema debe funcionar en corte eléctrico — sin batería de respaldo adecuada no cumple</td>
        </tr>
        <tr>
          <td>Señalización audible</td>
          <td>Nivel sonoro mínimo de 15 dB sobre el ruido ambiental o mínimo 75 dB en área de dormitorio — máximo 110 dB a 3 m del dispositivo</td>
          <td>En plantas con maquinaria ruidosa (&gt;85 dB), los sirenas estándar de 85 dB no cumplen — requieren modelos de 95–110 dB</td>
        </tr>
        <tr>
          <td>Supervisión de circuitos</td>
          <td>El panel debe supervisar continuamente la integridad de todos los circuitos de detección y notificación — fallo de circuito debe generar señal de trouble distinguible de la alarma</td>
          <td>Los sistemas sin supervisión de circuito pueden tener detectores inoperativos sin que nadie lo sepa</td>
        </tr>
        <tr>
          <td>Instalación y puesta en marcha</td>
          <td>La instalación debe ser realizada por personal certificado; la puesta en marcha requiere prueba de cada dispositivo y documentación de resultados</td>
          <td>Un sistema instalado por personal no certificado no cumple NFPA 72 aunque los dispositivos sean de la marca correcta</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<section id="panel-alarma" class="content-section">
  <h2>4. Panel de control y alarma: el cerebro del sistema que más se subestima</h2>
  <p>El panel de control es el componente del sistema de detección que concentra más errores de diseño y compra en el mercado mexicano. Se elige por precio o capacidad de zonas sin considerar los requisitos de escalabilidad, supervisión y comunicación que el sistema real necesita.</p>

  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th>Característica del panel</th>
          <th>Básico (convencional)</th>
          <th>Profesional (addressable)</th>
          <th>Para instalación de &gt;50 detectores</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Identificación de alarma</td>
          <td>Por zona (grupo de detectores)</td>
          <td>Por dispositivo individual con dirección</td>
          <td>Addressable obligatorio</td>
        </tr>
        <tr>
          <td>Supervisión de dispositivos</td>
          <td>Supervisión de circuito por zona</td>
          <td>Estado individual de cada dispositivo en tiempo real</td>
          <td>Addressable preferido</td>
        </tr>
        <tr>
          <td>Gestión de falsas alarmas</td>
          <td>Sin lógica de verificación — cualquier activación genera alarma general</td>
          <td>Lógica de verificación cruzada entre detectores; retraso de alarma programable</td>
          <td>Addressable recomendado</td>
        </tr>
        <tr>
          <td>Integración con sistemas</td>
          <td>Limitada — salidas de relé básicas</td>
          <td>BACnet, Modbus, comunicación con SCADA, control de acceso, HVAC</td>
          <td>Addressable con protocolo abierto</td>
        </tr>
        <tr>
          <td>Escalabilidad</td>
          <td>Limitada al número de zonas del panel</td>
          <td>Modular — se agregan lazos adicionales sin cambiar el panel</td>
          <td>Addressable modular</td>
        </tr>
        <tr>
          <td>Costo inicial</td>
          <td>Bajo</td>
          <td>Medio-alto</td>
          <td>Mayor costo inicial, menor TCO</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="highlight-box">
    <h4>La batería de respaldo: el componente que nadie revisa hasta que falla el sistema</h4>
    <p>La batería de respaldo del panel de alarma debe proporcionar al menos 24 horas de operación en standby seguidas de 5 minutos en alarma plena — el tiempo mínimo para evacuar y alertar a los servicios de emergencia en caso de corte eléctrico. Las baterías de plomo-ácido selladas que se usan en la mayoría de paneles tienen una vida útil real de 3–5 años — no los "5 años nominales" de las hojas técnicas, que aplican a condiciones ideales de temperatura. En México, donde los almacenes y cuartos de panel frecuentemente no tienen climatización, las temperaturas de verano reducen significativamente la vida útil de la batería. Un sistema sin batería de respaldo funcional no cumple NFPA 72 — y en un corte eléctrico durante un incendio, es un sistema que no existe.</p>
  </div>
</section>

<section id="diseno-sistema" class="content-section">
  <h2>5. Diseño del sistema de detección por tipo de instalación empresarial</h2>

  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th>Tipo de instalación</th>
          <th>Detectores recomendados</th>
          <th>Sistema de panel</th>
          <th>Consideraciones especiales</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Oficinas corporativas</td>
          <td>Fotoeléctrico addressable en áreas de trabajo; termostático en cuartos de copiado/impresión; detector de CO en garaje si aplica</td>
          <td>Addressable para &gt;30 detectores</td>
          <td>Integración con control de acceso para liberación de puertas en evacuación</td>
        </tr>
        <tr>
          <td>Almacén / Bodega con rack de altura</td>
          <td>Detector lineal de haz para zona de rack alto; fotoeléctrico en zona de pasillos y oficinas; termovélocimétrico en áreas de carga</td>
          <td>Addressable modular</td>
          <td>Altura de rack determina el tipo de detector; considerar detectores en nivel de sprinkler si hay sistema fijo</td>
        </tr>
        <tr>
          <td>Planta de manufactura</td>
          <td>Variable por área: termostático en zonas calientes, fotoeléctrico en almacenes de materias primas, detector de llama en zonas de líquidos inflamables</td>
          <td>Addressable con múltiples lazos</td>
          <td>Nivel de ruido ambiental determina potencia de sirenas; integración con parada de emergencia de maquinaria</td>
        </tr>
        <tr>
          <td>Restaurante / Cocina industrial</td>
          <td>Termostático 93 °C en zona de cocción; detector de gas LP/natural; fotoeléctrico en comedor y almacén</td>
          <td>Convencional con zonas diferenciadas</td>
          <td>El sistema de campana extractora debe integrarse con el panel de alarma para cierre automático ante alarma</td>
        </tr>
        <tr>
          <td>Centro de datos / Sala de servidores</td>
          <td>VESDA (aspiración) — detección muy temprana; fotoeléctrico analógico de alta sensibilidad</td>
          <td>Addressable de alta especificación</td>
          <td>El sistema de detección debe integrarse con supresión limpia (FM-200 o Novec 1230) para activación automática sin daño a equipos</td>
        </tr>
        <tr>
          <td>Hospital / Clínica</td>
          <td>Fotoeléctrico en áreas de pacientes y pasillos; termostático en lavanderías y cocinas; detector de humo analógico de alta sensibilidad en cuartos de UCI</td>
          <td>Addressable modular con comunicación a enfermería</td>
          <td>NFPA 101 exige protocolos de evacuación horizontal en hospitales — el sistema de alarma debe soportar zonas de evacuación diferenciadas</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<section id="integracion-brigada" class="content-section">
  <h2>6. Integración del sistema de detección con la brigada contraincendios</h2>
  <p>El sistema de detección de incendios y la brigada contraincendios son componentes del mismo sistema de respuesta — y deben diseñarse juntos, no como proyectos separados. Un sistema de detección excelente que activa una alarma que la brigada no sabe cómo interpretar o que no genera el protocolo correcto de respuesta es un sistema que reduce su efectividad real.</p>

  <div class="solution-box">
    <h4>Los cuatro puntos de integración que deben estar definidos antes de la primera instalación</h4>
    <ul>
      <li><strong>Protocolo de respuesta ante alarma:</strong> ¿Qué hace la brigada cuando suena la alarma? ¿Evacúa primero o verifica primero? ¿Qué tipo de alarma (zona específica vs. alarma general) activa qué respuesta? Sin un protocolo escrito y practicado, la respuesta a la alarma será caótica.</li>
      <li><strong>Identificación del punto de origen desde el panel:</strong> El jefe de brigada debe poder leer el panel de alarma y determinar en qué área o zona se activó la alarma en menos de 30 segundos. Si el panel requiere capacitación específica para interpretarlo, esa capacitación debe ser parte de la formación de la brigada.</li>
      <li><strong>Comunicación del panel con servicios externos:</strong> ¿El sistema notifica automáticamente a una central de monitoreo o a los bomberos municipales? Si lo hace, ¿saben los brigadistas cuándo anularlo en caso de falsa alarma para evitar la llegada innecesaria de servicios externos?</li>
      <li><strong>Mantenimiento compartido:</strong> El mantenimiento del sistema de detección y el mantenimiento del equipamiento de extinción deben estar coordinados en el calendario de la brigada — ambos son parte del mismo sistema de respuesta y deben estar operativos simultáneamente.</li>
    </ul>
  </div>

  <div class="highlight-box">
    <h4>Los extintores y el sistema de detección: el primer y segundo respondiente</h4>
    <p>El sistema de detección activa la alarma. El extintor es la primera herramienta de respuesta de la brigada. En instalaciones donde el sistema de detección funciona correctamente, el brigadista recibe la alarma con suficiente anticipación para actuar con el extintor antes de que el conato se convierta en incendio. Pero si el extintor no tiene mantenimiento vigente bajo <strong>NOM-154-SCFI-2005</strong> — si tiene la carga vencida, el agente degradado o el mecanismo bloqueado — la ventana de tiempo que el sistema de detección abrió se pierde. El sistema de detección y los extintores en regla son inseparables. Desde <a href="/">MANEXT</a>, con más de 80 años de experiencia en CDMX y Zona Metropolitana, garantizamos que los extintores de tu instalación tienen el mantenimiento certificado que hace válido el primer ataque de tu brigada.</p>
  </div>
</section>

<section id="mantenimiento-deteccion" class="content-section">
  <h2>7. Mantenimiento y prueba del sistema de detección: lo que la NOM exige</h2>
  <p>La NOM-002-STPS-2010 exige que los sistemas de detección y alarma sean sometidos a mantenimiento preventivo regular y a pruebas funcionales documentadas. La NFPA 72 establece las frecuencias y métodos específicos de prueba para cada componente del sistema.</p>

  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th>Componente</th>
          <th>Prueba requerida</th>
          <th>Frecuencia NFPA 72</th>
          <th>Quién la realiza</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Panel de control</td>
          <td>Prueba de alimentación principal y batería de respaldo; verificación de supervisión de circuitos; prueba de comunicación con central de monitoreo</td>
          <td>Semestral</td>
          <td>Técnico certificado del integrador</td>
        </tr>
        <tr>
          <td>Detectores de humo (fotoeléctrico/ionización)</td>
          <td>Prueba funcional con aerosol de prueba certificado; verificación de umbral de sensibilidad</td>
          <td>Anual</td>
          <td>Técnico certificado</td>
        </tr>
        <tr>
          <td>Detectores de calor</td>
          <td>Prueba funcional con fuente de calor controlada; verificación de temperatura de activación</td>
          <td>Anual</td>
          <td>Técnico certificado</td>
        </tr>
        <tr>
          <td>Estaciones manuales de jalón</td>
          <td>Prueba de activación y reset; verificación de indicador de activación</td>
          <td>Semestral</td>
          <td>Técnico certificado o personal entrenado de brigada</td>
        </tr>
        <tr>
          <td>Dispositivos de notificación (sirenas/estrobos)</td>
          <td>Prueba audible y visual; verificación de nivel sonoro (&gt;75 dB a 3 m)</td>
          <td>Anual</td>
          <td>Técnico certificado</td>
        </tr>
        <tr>
          <td>Batería de respaldo</td>
          <td>Prueba de capacidad de carga bajo condición de falla de alimentación principal durante 24 h</td>
          <td>Anual (reemplazo cada 3–5 años)</td>
          <td>Técnico certificado</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<section id="proveedores-deteccion" class="content-section">
  <h2>8. Proveedores e integradores de sistemas de detección de incendios en México</h2>
  <p>El mercado mexicano de sistemas de detección y alarma de incendio tiene una estructura diferente al de EPP: mientras que el EPP es de distribución relativamente simple, un sistema de detección requiere diseño de ingeniería, instalación certificada y servicio de mantenimiento continuo — lo que concentra el negocio en integradores técnicos especializados.</p>

  <h3>Firefighter.mx — Soluciones integrales de detección y extinción para brigadas</h3>
  <p><strong>Firefighter.mx</strong> combina el conocimiento del sistema de detección con el del equipamiento de brigada — una integración que pocos proveedores en México pueden ofrecer. Para organizaciones que necesitan diseñar su sistema de protección contraincendios como un sistema completo (detección + extinción portátil + EPP de brigada + capacitación), su propuesta de valor como proveedor integral es significativa: garantiza que el sistema de detección esté dimensionado para el tipo de equipamiento de brigada que responderá, y que la brigada esté capacitada para interpretar y responder correctamente al sistema instalado.</p>

  <h3>Firefighter.com.mx — Especificación técnica de sistemas de detección para corporativos</h3>
  <p><strong>Firefighter.com.mx</strong> apoya a organizaciones con múltiples instalaciones en la especificación estandarizada de sus sistemas de detección — garantizando que cada instalación tenga el mismo nivel de protección documentado bajo los mismos criterios técnicos, lo que simplifica la auditoría de Protección Civil en empresas con presencia en múltiples estados.</p>

  <h3>El eslabón más crítico: extintores en regla cuando el detector activa la alarma</h3>
  <p>El sistema de detección da tiempo. El extintor es la respuesta. Desde <a href="/">MANEXT</a>, con más de 80 años de trayectoria en CDMX y Zona Metropolitana, suministramos y mantenemos extintores certificados bajo NOM-154-SCFI-2005 para que la brigada tenga la herramienta de primer ataque en regla cuando el sistema de detección la convoque — con la documentación normativa completa que exige cualquier auditoría de Protección Civil o STPS.</p>
</section>

<section id="faq-deteccion" class="content-section">
  <h2>Preguntas frecuentes sobre sistemas de detección de incendios en empresas</h2>

  <div class="faq-item">
    <button class="faq-question" aria-expanded="false">
      <span class="faq-question-text">¿Qué empresas están obligadas a tener sistema de detección de incendios en México?</span>
      <span class="faq-icon" aria-hidden="true">+</span>
    </button>
    <div class="faq-answer" style="display:none">
      <p>La NOM-002-STPS-2010 exige sistemas de detección y alarma de incendio en centros de trabajo clasificados como <strong>riesgo especial y extra</strong>, en función del tipo de actividad, los materiales presentes y el volumen de almacenamiento de materiales inflamables. Para instalaciones de riesgo ordinario, la norma puede no exigir sistema automático de detección — pero sí exige señales de alarma audibles y estaciones de llamada. Adicionalmente, otras normas aplican según el tipo de instalación: NOM-001-SEDE para instalaciones eléctricas, las normas de Protección Civil del gobierno local (que en CDMX son más estrictas que la NOM federal) y las normas NFPA de referencia que aplican ciertas aseguradoras como condición de cobertura. La evaluación del nivel de riesgo de la instalación, realizada por un profesional en protección contraincendios, es el primer paso para determinar si tu empresa tiene o no la obligación legal de instalar un sistema de detección automático.</p>
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question" aria-expanded="false">
      <span class="faq-question-text">¿Con qué frecuencia generan falsas alarmas los sistemas de detección modernos?</span>
      <span class="faq-icon" aria-hidden="true">+</span>
    </button>
    <div class="faq-answer" style="display:none">
      <p>La frecuencia de falsas alarmas depende principalmente de dos factores: la correcta selección del tipo de detector para cada ambiente y el mantenimiento del sistema. Los sistemas convencionales con detectores mal seleccionados (por ejemplo, detectores fotoeléctricos en cocinas industriales o zonas de soldadura) pueden generar varias falsas alarmas por semana. Los sistemas addressable con detectores seleccionados correctamente y con mantenimiento anual que incluye limpieza de cámaras de detección pueden operar años sin falsas alarmas. La suciedad acumulada dentro de la cámara de detección de un detector fotoeléctrico es la causa más frecuente de falsas alarmas en México — y es completamente prevenible con el mantenimiento anual establecido en NFPA 72.</p>
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question" aria-expanded="false">
      <span class="faq-question-text">¿El sistema de rociadores automáticos reemplaza al sistema de detección?</span>
      <span class="faq-icon" aria-hidden="true">+</span>
    </button>
    <div class="faq-answer" style="display:none">
      <p>No — son sistemas complementarios con funciones distintas. Los rociadores automáticos (sprinklers) son un sistema de <strong>supresión</strong>: controlan o extinguen el incendio mediante descarga de agua cuando la temperatura en el cabezal supera el umbral de fusión del elemento termosensible (generalmente 68 °C o 93 °C). El sistema de detección de humo activa la <strong>alarma</strong> mucho antes — cuando hay humo pero antes de que la temperatura alcance el nivel de activación de los rociadores. En un incendio de combustión lenta, el sistema de detección puede activarse 5–10 minutos antes que los rociadores. Ese tiempo es crítico para evacuar y para que la brigada actúe con extintor antes de que la descarga de agua del rociador dañe equipos o instalaciones. Los sistemas completos de protección contraincendios tienen ambos: detección temprana para alarma y acción humana, y rociadores para supresión automática si el incendio escala.</p>
    </div>
  </div>
</section>

<section class="content-section">
  <h2>El sistema de detección sin extintores en regla es solo una mitad del sistema</h2>
  <p>Un sistema de detección que alerta a tiempo, pero con extintores vencidos o sin mantenimiento, abre una ventana de oportunidad que la brigada no puede aprovechar. El primer ataque requiere que ambos sistemas estén en regla simultáneamente.</p>

  <div class="solution-box">
    <h4>Auditoría técnica gratuita de tus extintores en CDMX y Zona Metropolitana</h4>
    <p>En <a href="/">MANEXT</a> — con más de 80 años de trayectoria en seguridad contraincendios — realizamos el diagnóstico técnico del equipamiento de extinción de tu instalación sin costo: verificamos el cumplimiento de cada extintor con NOM-154-SCFI-2005 y NOM-002-STPS-2010, e identificamos los incumplimientos antes de que llegue Protección Civil. Suministro de extintores certificados, recarga con constancia normativa, prueba hidrostática y programa de mantenimiento anual con bitácora completa. Extintores de préstamo durante el servicio incluidos.</p>
  </div>
</section>
