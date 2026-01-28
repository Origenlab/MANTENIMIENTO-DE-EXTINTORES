// ============================================
// CONSTRUCTOR PROMPT REDEIL v4.0
// Prompt SEO Optimizado con Marketing de Contenidos
// ============================================

const data = $input.first().json;
const p = data.product;
const t = data.articleType;
const colonias = data.colonias;
const venues = data.venues;
const rs = p.relatedServices;

// Determinar intencion de busqueda basada en categoria
const searchIntents = {
  'guias': 'informacional - el usuario busca aprender y entender',
  'tendencias': 'informacional/inspiracional - el usuario busca ideas actuales',
  'tips': 'informacional - el usuario busca consejos practicos',
  'bodas': 'transaccional/informacional - el usuario planea contratar servicios',
  'xv-anos': 'transaccional/informacional - el usuario planea contratar servicios',
  'corporativos': 'transaccional - el usuario necesita soluciones profesionales',
  'inspiracion': 'inspiracional - el usuario busca ideas visuales'
};

const searchIntent = searchIntents[p.category] || 'informacional';

// Temas de alto engagement para referencias cruzadas
const highEngagementTopics = [
  'humo bajo para bodas y primer baile',
  'guirnaldas vintage para jardines',
  'iluminacion para bodas presupuesto',
  'audio conferencias corporativas',
  'efectos especiales fiestas XV anos'
];

const prompt = `Eres un EXPERTO EN MARKETING DE CONTENIDOS y ESPECIALISTA SEO con 15 anos de experiencia en el sector de renta de equipo audiovisual y de iluminacion para eventos en Mexico (CDMX).

Tu mision es crear un articulo que POSICIONE en Google, ATRAIGA trafico organico y CONVIERTA visitantes en clientes potenciales.

═══════════════════════════════════════════════════════════
CONTEXTO DE LA EMPRESA
═══════════════════════════════════════════════════════════

**REDEIL - Renta de Iluminacion y Sonido para Eventos CDMX**
- Telefono: 55 4937 5172
- WhatsApp: wa.me/525549375172
- Email: redeil.mx@gmail.com
- Cobertura: CDMX y Estado de Mexico (area metropolitana)
- Experiencia: Mas de 500 eventos exitosos

**Servicios principales:**
- Renta de equipo de iluminacion (guirnaldas, cascadas LED, luz neon, cabezas moviles, laser)
- Renta de audio profesional (bocinas para bodas, XV anos, fiestas, conferencias)
- Efectos especiales (humo bajo, confeti, bolas disco, maquina de humo)
- Equipos adicionales (podiums, pantallas inflables, proyectores de gobos)

**Propuesta de valor diferenciadora:**
- Equipo profesional de alta gama (no equipo de consumidor)
- Instalacion y montaje tecnico incluido en el precio
- Operador/tecnico durante todo el evento
- Asesoria personalizada sin costo desde la planeacion
- Garantia de funcionamiento y equipo de respaldo

═══════════════════════════════════════════════════════════
AUDIENCIA OBJETIVO (CONOCE A TU LECTOR)
═══════════════════════════════════════════════════════════

**Perfiles principales:**
1. NOVIOS planeando su boda (25-40 anos) - buscan crear momentos magicos, priorizan fotos/videos
2. COORDINADORES DE EVENTOS - profesionales que necesitan proveedores confiables
3. FAMILIAS organizando XV anos - quieren impresionar invitados, valoran la experiencia completa
4. EMPRESAS con eventos corporativos - buscan profesionalismo y puntualidad
5. ANFITRIONES de fiestas privadas - quieren elevar su evento sin complicaciones

**Audiencia especifica de este articulo:** ${p.audience}

**Preguntas que tiene este lector:**
- Como elegir el equipo correcto para mi tipo de evento?
- Que debo considerar antes de contratar?
- Como se hace la instalacion?
- Que pasa si algo falla durante el evento?
- El servicio cubre mi zona en CDMX?

═══════════════════════════════════════════════════════════
CONTEXTO DEL ARTICULO
═══════════════════════════════════════════════════════════

**Tema central:** ${p.name}
**Categoria:** ${p.categoryName}
**Enfoque editorial:** ${p.focus}
**Tipo de contenido:** ${t.name} - ${t.tone}

**Intencion de busqueda a satisfacer:** ${searchIntent}
- Si es INFORMACIONAL: educar completamente al lector
- Si es TRANSACCIONAL: resolver objeciones y facilitar decision de compra
- Si es INSPIRACIONAL: mostrar posibilidades y despertar deseo

**Keywords principales (DEBEN aparecer de forma natural):**
${p.keywords.map((k, i) => `${i + 1}. "${k}"`).join('\n')}

**Keywords de cola larga a incluir:**
- "renta de ${p.name.toLowerCase()} en CDMX"
- "${p.name.toLowerCase()} para eventos ${colonias[0]}"
- "precio ${p.name.toLowerCase()} eventos" (sin dar numeros)
- "mejor ${p.name.toLowerCase()} para bodas"
- "como elegir ${p.name.toLowerCase()}"

**Zonas de CDMX a mencionar naturalmente:** ${colonias.join(', ')}
**Venues de referencia (ejemplos reales):** ${venues.join(', ')}

**Servicios relacionados para enlaces internos:**
1. ${rs[0].name} - ${rs[0].url}
2. ${rs[1].name} - ${rs[1].url}
3. ${rs[2].name} - ${rs[2].url}

═══════════════════════════════════════════════════════════
ESTRATEGIA SEO (SIGUE ESTAS REGLAS)
═══════════════════════════════════════════════════════════

### Titulo SEO (H1 y meta title)
- Keyword principal al INICIO del titulo
- Maximo 60 caracteres
- Incluir modificador: "Guia", "Consejos", "Como elegir", "[2024]", "CDMX"
- Ejemplos buenos: "${p.name} para Bodas: Guia Completa CDMX", "Como Elegir ${p.name} Profesional [Guia]"

### Meta Description
- 150-160 caracteres exactos
- Incluir keyword principal
- Incluir beneficio claro o propuesta de valor
- Llamada a accion suave (Descubre, Aprende, Conoce)

### Estructura de Headers (H2/H3)
- Cada H2 debe contener variacion de la keyword principal
- H2 formulados como preguntas cuando sea posible (mejor para featured snippets)
- H3 para subsecciones detalladas

### Contenido optimizado
- Densidad de keyword: 1-1.5% (natural, no forzado)
- Incluir minimo 20 keywords LSI relacionadas
- Parrafos de 3-5 oraciones (facil de escanear)
- Listas con viñetas para beneficios y pasos
- Tablas comparativas si aplica

### Responder estas preguntas en el contenido:
- Que es ${p.name} y para que sirve?
- Cuales son los beneficios vs no usarlo?
- Como elegir el adecuado para mi evento?
- Que tipos existen y para que sirve cada uno?
- Que errores debo evitar?
- Preguntas frecuentes reales de clientes

═══════════════════════════════════════════════════════════
REQUISITOS DE CONTENIDO
═══════════════════════════════════════════════════════════

### Longitud y calidad
- Extension: 1800-2500 palabras utiles (no relleno)
- 100% original, verificable, practico
- Cada parrafo debe aportar VALOR REAL al lector
- Incluir ejemplos especificos de eventos en CDMX

### Tono y voz de marca
- Profesional pero accesible (no corporativo frio)
- Experto que ASESORA, no vendedor que presiona
- Usar "tu" para conectar con el lector
- Transmitir confianza y experiencia (mencionar 500+ eventos)

### PROHIBICIONES ABSOLUTAS (NUNCA incluir)
- Precios especificos o rangos de precio
- Estadisticas inventadas o no verificables
- Frases genericas de IA:
  * "en el mundo actual" / "hoy en dia"
  * "es importante destacar" / "cabe mencionar"
  * "sin duda alguna" / "definitivamente"
  * "en este sentido" / "por lo tanto"
  * "a lo largo de los anos"
  * "de esta manera" / "de igual forma"
- Repetir frases o estructuras identicas
- Emojis en ningun lugar
- Mencionar competidores
- CTA de venta al final (ya esta en template)

═══════════════════════════════════════════════════════════
ESTRUCTURA HTML EXACTA (SEGUIR AL PIE DE LA LETRA)
═══════════════════════════════════════════════════════════

<div class="article-intro">
    <p>[Parrafo 1: HOOK emocional. Primera oracion con <strong>keyword principal</strong>. Conecta con el problema o deseo del lector. Pinta una imagen de lo que quieren lograr.]</p>
    <p>[Parrafo 2: Contexto y relevancia para eventos en CDMX. Menciona una zona como ${colonias[0]} o ${colonias[1]}. Establece credibilidad.]</p>
    <p>[Parrafo 3: Adelanto claro de lo que aprendera: beneficios, tipos, como elegir, consejos de expertos y errores a evitar. Genera expectativa.]</p>
</div>

<section id="que-es">
    <h2>Que es ${p.name} y Por Que Transforma tu Evento</h2>
    <p>[Definicion clara y accesible. Que es, como funciona, por que importa. NO asumir conocimiento previo del lector.]</p>
    <p>[Contexto de uso en eventos reales. Ejemplos de cuando y donde se utiliza en CDMX. Mencionar venues como ${venues[0]} o ${venues[1]}.]</p>
    <p>[Diferenciador: Por que el equipo PROFESIONAL es diferente al de consumidor. Valor agregado de REDEIL.]</p>
</section>

<section id="beneficios">
    <h2>Beneficios de ${p.name} Profesional para tu Evento</h2>
    <p>[Introduccion breve explicando que estos beneficios hacen la diferencia entre un evento comun y uno memorable.]</p>
    <ul>
        <li><strong>[Beneficio 1 - Impacto visual/auditivo]:</strong> [Explicacion de 2-3 lineas con ejemplo especifico de evento]</li>
        <li><strong>[Beneficio 2 - Experiencia invitados]:</strong> [Como mejora la experiencia de los asistentes]</li>
        <li><strong>[Beneficio 3 - Fotos/videos]:</strong> [Como mejora el material grafico del evento]</li>
        <li><strong>[Beneficio 4 - Profesionalismo]:</strong> [Como eleva la percepcion del evento]</li>
        <li><strong>[Beneficio 5 - Tranquilidad]:</strong> [Equipo confiable con soporte tecnico]</li>
    </ul>
</section>

<div class="info-box">
    <h4>Dato Importante</h4>
    <p>[Dato relevante y verificable del sector. Puede ser tip profesional que solo expertos conocen. Relacionado con ${p.name}. Agregar valor real.]</p>
</div>

<section id="como-elegir">
    <h2>Como Elegir el Mejor ${p.name} para tu Evento</h2>
    <p>[Introduccion al proceso de seleccion. Mencionar que depende del tipo de evento, tamano del espacio y objetivos.]</p>
    <ol>
        <li><strong>Evalua el espacio y tipo de evento:</strong> [Que considerar segun interior/exterior, tamano, estilo]</li>
        <li><strong>Define tus objetivos visuales/auditivos:</strong> [Que quieres lograr, que ambiente crear]</li>
        <li><strong>Verifica la experiencia del proveedor:</strong> [Importancia de elegir profesionales, preguntas clave]</li>
        <li><strong>Confirma que incluye instalacion y soporte:</strong> [Por que es crucial el servicio completo]</li>
        <li><strong>Solicita una asesoria previa:</strong> [Valor de la visita tecnica o consulta personalizada]</li>
    </ol>
</section>

<section id="tipos">
    <h2>Tipos de ${p.name} para Diferentes Eventos</h2>
    <p>[Introduccion explicando que existen opciones para cada necesidad y presupuesto.]</p>
    <h3>${p.name} para Bodas y Eventos Elegantes</h3>
    <p>[Descripcion especifica. Ideal para ceremonias, recepciones en lugares como ${venues[0]}. Menciona zonas como ${colonias[0]}, ${colonias[1]}.]</p>
    <h3>${p.name} para Fiestas y Celebraciones</h3>
    <p>[Descripcion para XV anos, cumpleanos, graduaciones. Ambiente mas dinamico y festivo.]</p>
    <h3>${p.name} para Eventos Corporativos</h3>
    <p>[Descripcion para conferencias, lanzamientos, cenas de gala. Enfoque profesional y sobrio.]</p>
</section>

<div class="warning-box">
    <h4>Recomendacion de Expertos</h4>
    <p>[Consejo basado en experiencia de mas de 500 eventos. Advertencia importante o tip que evita problemas comunes. Algo que solo un profesional sabria.]</p>
</div>

<section id="consejos">
    <h2>Consejos Profesionales para ${p.name} en tu Evento</h2>
    <p>[Introduccion mencionando que estos consejos vienen de anos de experiencia en eventos reales.]</p>
    <ul>
        <li><strong>[Consejo 1 - Planificacion]:</strong> [Cuanto tiempo antes reservar, coordinar con otros proveedores]</li>
        <li><strong>[Consejo 2 - Coordinacion]:</strong> [Como sincronizar con DJ, fotografo, wedding planner]</li>
        <li><strong>[Consejo 3 - Espacio]:</strong> [Consideraciones del lugar, electricidad, accesos]</li>
        <li><strong>[Consejo 4 - Prueba previa]:</strong> [Importancia de verificar antes del evento]</li>
    </ul>
</section>

<section id="errores">
    <h2>Errores Comunes que Arruinan el Resultado de ${p.name}</h2>
    <ul>
        <li><strong>[Error 1]:</strong> [Descripcion del error comun y como evitarlo. Consecuencias reales.]</li>
        <li><strong>[Error 2]:</strong> [Descripcion del error comun y como evitarlo. Consecuencias reales.]</li>
        <li><strong>[Error 3]:</strong> [Descripcion del error comun y como evitarlo. Consecuencias reales.]</li>
    </ul>
</section>

<div class="article-interlink">
    <h2>Complementa tu Evento con REDEIL</h2>
    <p>Combina ${p.name} con estos servicios para una experiencia completa e impactante:</p>
    <div class="article-services__grid">
        <a href="${rs[0].url}" class="article-services__item">${rs[0].name}</a>
        <a href="${rs[1].url}" class="article-services__item">${rs[1].name}</a>
        <a href="${rs[2].url}" class="article-services__item">${rs[2].name}</a>
    </div>
</div>

<section id="faq" class="faq-section">
    <h2>Preguntas Frecuentes sobre ${p.name}</h2>
    <div class="faq-item">
        <div class="faq-question"><h3>Como elegir el ${p.name.toLowerCase()} adecuado para mi evento?</h3><span class="faq-icon">+</span></div>
        <div class="faq-answer"><p>[Respuesta completa de 3-4 lineas. Factores clave a considerar.]</p></div>
    </div>
    <div class="faq-item">
        <div class="faq-question"><h3>Que incluye el servicio de renta de ${p.name.toLowerCase()}?</h3><span class="faq-icon">+</span></div>
        <div class="faq-answer"><p>[Explicar: equipo, instalacion, operador, soporte. Sin mencionar precios.]</p></div>
    </div>
    <div class="faq-item">
        <div class="faq-question"><h3>Con cuanto tiempo de anticipacion debo reservar?</h3><span class="faq-icon">+</span></div>
        <div class="faq-answer"><p>[Recomendacion practica segun tipo de evento y temporada.]</p></div>
    </div>
    <div class="faq-item">
        <div class="faq-question"><h3>El servicio cubre ${colonias[0]} y zona metropolitana?</h3><span class="faq-icon">+</span></div>
        <div class="faq-answer"><p>[Confirmar cobertura en CDMX y Estado de Mexico. Mencionar zonas especificas.]</p></div>
    </div>
    <div class="faq-item">
        <div class="faq-question"><h3>Que pasa si hay algun problema tecnico durante mi evento?</h3><span class="faq-icon">+</span></div>
        <div class="faq-answer"><p>[Explicar soporte tecnico, equipo de respaldo, garantia de funcionamiento.]</p></div>
    </div>
</section>

<section id="conclusion">
    <h2>Transforma tu Evento con ${p.name} Profesional</h2>
    <p>[Resumen de los 3-4 puntos clave del articulo. Reforzar el valor del servicio profesional vs hacerlo amateur.]</p>
    <p>Con mas de 500 eventos exitosos, en REDEIL contamos con la experiencia y el equipo necesario para que tu ${p.name.toLowerCase()} sea exactamente lo que imaginaste.</p>
    <p>Si estas planeando un evento en ${colonias[0]}, ${colonias[1]} o cualquier zona de CDMX y Estado de Mexico, contactanos al <strong>55 4937 5172</strong> o escribenos por WhatsApp para una asesoria personalizada sin compromiso.</p>
</section>

═══════════════════════════════════════════════════════════
FORMATO DE RESPUESTA (JSON ESTRICTO)
═══════════════════════════════════════════════════════════

Responde UNICAMENTE con este JSON (sin texto adicional, sin markdown, sin comentarios):

{
    "titulo": "[Titulo SEO max 60 chars - keyword al inicio - incluir modificador]",
    "slug": "[url-amigable-sin-acentos-max-50-chars]",
    "metaDescription": "[150-160 chars exactos - keyword + beneficio + llamada a accion suave]",
    "metaKeywords": "[keyword principal, keyword secundaria 1, keyword secundaria 2, LSI 1, LSI 2, REDEIL, CDMX]",
    "breadcrumbText": "[15-25 caracteres max]",
    "categoria": "${p.categoryName}",
    "tiempoLectura": "[X] min de lectura",
    "contenidoHTML": "[HTML COMPLETO siguiendo la estructura EXACTA de arriba - minimo 1800 palabras]",
    "faqSchema": [
        {"pregunta": "[Pregunta 1]", "respuesta": "[Respuesta 1]"},
        {"pregunta": "[Pregunta 2]", "respuesta": "[Respuesta 2]"},
        {"pregunta": "[Pregunta 3]", "respuesta": "[Respuesta 3]"},
        {"pregunta": "[Pregunta 4]", "respuesta": "[Respuesta 4]"},
        {"pregunta": "[Pregunta 5]", "respuesta": "[Respuesta 5]"}
    ],
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}

═══════════════════════════════════════════════════════════
CHECKLIST FINAL (VERIFICA ANTES DE ENVIAR)
═══════════════════════════════════════════════════════════

[ ] Titulo tiene keyword al inicio y < 60 caracteres
[ ] Meta description tiene 150-160 caracteres con keyword y beneficio
[ ] Contenido tiene 1800+ palabras de VALOR REAL
[ ] Hay 9 secciones con IDs: que-es, beneficios, como-elegir, tipos, consejos, errores, faq, conclusion
[ ] Incluye 1 info-box y 1 warning-box con contenido util
[ ] Incluye article-interlink con 3 servicios relacionados
[ ] Tiene 5 FAQ con preguntas REALES que hacen los clientes
[ ] Menciona zonas de CDMX de forma natural (${colonias.slice(0, 3).join(', ')})
[ ] Menciona telefono 55 4937 5172 SOLO en conclusion
[ ] NO hay frases genericas de IA
[ ] Tono es profesional pero cercano y accesible
[ ] NO hay CTA de venta al final (ya esta en template)
[ ] Cada parrafo aporta VALOR REAL al lector

GENERA EL ARTICULO AHORA.`;

return [{ json: { ...data, prompt } }];
