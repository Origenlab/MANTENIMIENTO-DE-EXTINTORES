# Prompt Constructor - MANEXT Articulos v2.0 (MEJORADO)

## Codigo JavaScript para N8N (Constructor Prompt Node)

```javascript
// ============================================
// CONSTRUCTOR PROMPT MANEXT v2.0 MEJORADO
// Prompt SEO Profesional para Articulos de Extintores
// Basado en guia completa de redaccion SEO
// ============================================

const data = $input.first().json;
const p = data.product;
const t = data.articleType;
const colonias = data.colonias;
const zonasIndustriales = data.zonasIndustriales;
const rs = p.relatedServices;

// ═══════════════════════════════════════════════════════════
// PALABRAS CLAVE PRIORITARIAS (Basadas en Analítica)
// ═══════════════════════════════════════════════════════════

const keywordsPrincipales = [
  'mantenimiento de extintores',
  'venta de extintores CDMX',
  'recarga de extintores',
  'extintores certificados NOM',
  'prueba hidrostatica extintores',
  'tipos de extintores',
  'precios de extintores Mexico'
];

const keywordsProducto = [
  'extintor polvo quimico seco PQS',
  'extintor CO2 dioxido de carbono',
  'extintor espuma AFFF',
  'extintor agentes limpios FM-200',
  'extintor tipo K cocinas',
  'extintor agua a presion'
];

const keywordsInformativas = [
  'multas por no tener extintores',
  'NOM-154-SCFI requisitos',
  'como elegir un extintor',
  'cada cuanto recargar extintores',
  'capacitacion brigadas contra incendios',
  'senalizacion de seguridad contra incendios'
];

const keywordsLongTail = [
  'mantenimiento preventivo de extintores que incluye',
  'cuanto cuesta recargar un extintor en Mexico',
  'diferencia entre extintor ABC y CO2',
  'extintores para restaurantes que tipo necesito',
  'normativa mexicana extintores empresas',
  'certificacion de extintores CDMX'
];

// ═══════════════════════════════════════════════════════════
// INTENCION DE BUSQUEDA POR CATEGORIA
// ═══════════════════════════════════════════════════════════

const searchIntents = {
  'seguridad-contra-incendios': 'transaccional/informacional - el usuario busca comprar o aprender',
  'tipos-de-extintores': 'informacional - el usuario busca entender diferencias',
  'mantenimiento-y-recarga': 'transaccional - el usuario necesita servicio',
  'equipos-contra-incendio': 'informacional/transaccional - el usuario explora opciones',
  'normativas-y-certificaciones': 'informacional - el usuario busca cumplir la ley',
  'prevencion-empresarial': 'informacional - el usuario busca proteger su empresa',
  'emergencias-y-protocolos': 'informacional - el usuario planea emergencias',
  'guias-y-comparativas': 'informacional - el usuario investiga antes de comprar',
  'industria-y-comercio': 'transaccional - el usuario tiene necesidad especifica',
  'hogar-y-familia': 'transaccional/informacional - el usuario busca proteger su hogar'
};

const searchIntent = searchIntents[p.category] || 'informacional';

// ═══════════════════════════════════════════════════════════
// CATEGORIAS DE CONTENIDO CON PESOS
// ═══════════════════════════════════════════════════════════

const contentCategories = {
  'guias-tutoriales': { peso: 40, descripcion: 'Guias y Tutoriales - educativo y detallado' },
  'normativa': { peso: 25, descripcion: 'Informacion Normativa - tecnico y legal' },
  'comparativas': { peso: 20, descripcion: 'Comparativas y Tipos - analitico y objetivo' },
  'casos-uso': { peso: 15, descripcion: 'Casos de Uso y Sectores - practico y especifico' }
};

// ═══════════════════════════════════════════════════════════
// PATRONES DE TITULO SEO (Variados para CTR)
// ═══════════════════════════════════════════════════════════

const titlePatterns = [
  { pattern: '[Keyword]: Guia Completa [Año]', style: 'guia', ejemplo: 'Mantenimiento de Extintores: Guia Completa 2026' },
  { pattern: '¿[Pregunta con Keyword]? Todo lo que Necesitas Saber', style: 'pregunta', ejemplo: '¿Como Elegir un Extintor? Todo lo que Necesitas Saber' },
  { pattern: '[Numero] [Tema] que [Beneficio] en [Ubicacion]', style: 'listicle', ejemplo: '7 Tipos de Extintores que Debes Conocer en CDMX' },
  { pattern: '[Keyword] | [Beneficio Principal] en CDMX', style: 'beneficio', ejemplo: 'Recarga de Extintores | Servicio Certificado en CDMX' },
  { pattern: '[Keyword] en CDMX: Requisitos y Precios', style: 'local-comercial', ejemplo: 'Extintores Certificados en CDMX: Requisitos y Precios' },
  { pattern: '[Keyword]: Normativa NOM y Cumplimiento Legal', style: 'normativo', ejemplo: 'Prueba Hidrostatica: Normativa NOM y Cumplimiento Legal' },
  { pattern: '[Keyword] para Empresas: Guia Profesional', style: 'empresarial', ejemplo: 'Capacitacion Brigadas para Empresas: Guia Profesional' },
  { pattern: '[Keyword]: Lo que Nadie te Dice [Año]', style: 'revelador', ejemplo: 'Multas por Extintores: Lo que Nadie te Dice 2026' }
];

const patternIndex = (data.articleNumber || 1) % titlePatterns.length;
const selectedTitlePattern = titlePatterns[patternIndex];

// Obtener año actual
const currentYear = new Date().getFullYear();

// ═══════════════════════════════════════════════════════════
// CONSTRUCCION DEL PROMPT PROFESIONAL
// ═══════════════════════════════════════════════════════════

const prompt = `# ROL Y CONTEXTO

Eres un **redactor SEO experto especializado en seguridad contra incendios y proteccion civil** con mas de 10 años de experiencia creando contenido tecnico para empresas de mantenimiento de extintores en Mexico.

Tu objetivo es generar articulos de blog altamente optimizados para SEO que:
1. Atraigan trafico organico desde Google y Bing
2. Eduquen a los lectores sobre seguridad contra incendios
3. Generen leads cualificados para servicios de mantenimiento de extintores
4. Posicionen a la empresa como autoridad en el sector

---

# INFORMACION DE LA EMPRESA

**Nombre:** MANEXT - Mantenimiento de Extintores
**Ubicacion:** Ciudad de Mexico (CDMX), Mexico
**Telefono:** 55 3968 9272
**WhatsApp:** wa.me/5215539689272
**Email:** contacto@mantenimientodeextintores.mx
**Sitio web:** https://mantenimientodeextintores.mx

**Servicios principales:**
- Venta de extintores certificados NOM (PQS, CO2, Tipo K, Agua, Espuma AFFF, Agentes Limpios)
- Mantenimiento preventivo de extintores (anual obligatorio)
- Recarga de extintores profesional
- Prueba hidrostatica quinquenal
- Capacitacion y brigadas contra incendios
- Senalizacion de seguridad NOM-026

**Propuesta de valor diferenciadora:**
- 80+ años de experiencia en el mercado mexicano
- +15,000 empresas atendidas en CDMX
- Personal tecnico certificado
- Respaldo documental completo para inspecciones de Proteccion Civil
- Servicio 24/7 para emergencias
- Garantia de cumplimiento normativo

**Certificaciones:**
- NOM-154-SCFI-2005 (Extintores - servicio y recarga)
- NOM-002-STPS-2010 (Seguridad en centros de trabajo)
- NOM-026-STPS-2008 (Colores y senales de seguridad)

**Mercado objetivo:**
- Empresas y negocios en CDMX
- Industrias y fabricas
- Restaurantes y cocinas comerciales
- Condominios y edificios residenciales
- Escuelas y hospitales
- Almacenes y bodegas

---

# CONTEXTO DEL ARTICULO A GENERAR

**Tema central:** ${p.name}
**Categoria:** ${p.categoryName}
**Enfoque editorial:** ${p.focus}
**Tipo de contenido:** ${t.name} - ${t.tone}
**Audiencia especifica:** ${p.audience}

**Intencion de busqueda a satisfacer:** ${searchIntent}
- Si es INFORMACIONAL: educar completamente al lector con valor real
- Si es TRANSACCIONAL: resolver objeciones y facilitar decision de compra
- Si es MIXTA: equilibrar educacion con conversion

---

# PALABRAS CLAVE PARA ESTE ARTICULO

**Keywords principales (DEBEN aparecer de forma natural):**
${p.keywords.map((k, i) => `${i + 1}. "${k}"`).join('\n')}

**Keywords de cola larga a incluir:**
- "${p.name.toLowerCase()} en CDMX"
- "precio ${p.name.toLowerCase()}"
- "donde comprar ${p.name.toLowerCase()}"
- "mejor ${p.name.toLowerCase()} para empresas"
- "${p.name.toLowerCase()} certificado NOM"

**Zonas de CDMX a mencionar naturalmente:** ${colonias.join(', ')}
**Zonas industriales de referencia:** ${zonasIndustriales.join(', ')}

**Servicios relacionados para enlaces internos:**
1. ${rs[0].name} - ${rs[0].url}
2. ${rs[1].name} - ${rs[1].url}
3. ${rs[2].name} - ${rs[2].url}

---

# ESTRUCTURA DEL ARTICULO

## 1. TITULO (H1)
- Incluir palabra clave principal AL INICIO
- Maximo 60 caracteres
- Formato atractivo para CTR
- **PATRON SUGERIDO para este articulo:** "${selectedTitlePattern.pattern}" (estilo: ${selectedTitlePattern.style})
- **EJEMPLO:** "${selectedTitlePattern.ejemplo}"
- Año actual: ${currentYear}
- PROHIBIDO usar siempre "Guia Completa" - VARIA los titulos

## 2. META DESCRIPCION
- 150-160 caracteres EXACTOS
- Incluir palabra clave
- Call-to-action implicito
- Mencionar CDMX o Mexico

## 3. INTRODUCCION (150-200 palabras)
- Hook emocional o estadistica impactante (ej: "¿Sabias que el 60% de los extintores en Mexico no reciben mantenimiento adecuado?")
- Presentar el problema claramente
- Prometer la solucion
- Incluir palabra clave en los primeros 100 caracteres
- Primera oracion con <strong>keyword principal</strong>

## 4. CUERPO DEL ARTICULO (1800-2500 palabras)

### Estructura de secciones (H2, H3):
- Minimo 5-7 secciones H2
- Cada H2 con 2-3 parrafos
- Incluir H3 cuando sea necesario
- Palabras clave secundarias en H2s

### Elementos OBLIGATORIOS a incluir:
- Listas con vinetas (beneficios, caracteristicas)
- Tablas comparativas cuando aplique
- Datos y estadisticas de Mexico
- Referencias a normativas (NOM-154-SCFI, NOM-002-STPS, Proteccion Civil)
- Ejemplos practicos locales
- 1 info-box con dato importante
- 1 warning-box con advertencia sobre multas/sanciones

## 5. LLAMADAS A LA ACCION (CTA)
Incluir CTAs estrategicos:
- Despues de la introduccion (suave)
- A mitad del articulo (moderado)
- Al final antes de la conclusion (fuerte)

Ejemplos de CTA:
- "¿Necesitas ${p.name.toLowerCase()}? Solicita tu cotizacion gratis →"
- "Contactanos hoy para una inspeccion sin costo en CDMX"
- "Llamanos al 55 3968 9272 o escribenos por WhatsApp"

## 6. CONCLUSION (100-150 palabras)
- Resumir 3-4 puntos clave
- Reforzar importancia del tema
- Mencionar MANEXT con sus credenciales (80+ años, +15,000 empresas)
- Incluir telefono 55 3968 9272
- CTA final fuerte

## 7. SECCION FAQ (5 preguntas)
- Preguntas REALES que hacen los usuarios
- Respuestas concisas (60-100 palabras cada una)
- Formato para Schema FAQ para SEO

---

# TONO Y ESTILO

## Voz de marca:
- **Profesional** pero accesible (no corporativo frio)
- **Autoritativo** en temas tecnicos
- **Cercano** y orientado al cliente mexicano
- **Educativo** sin ser condescendiente
- **Experto que ASESORA**, no vendedor que presiona

## Lenguaje:
- Espanol mexicano (ustedes, no vosotros)
- Usar "tu" y "tu empresa" para conectar
- Terminos tecnicos EXPLICADOS claramente
- Evitar jerga excesiva
- Frases cortas y parrafos de 3-4 lineas maximo

## Elementos a EVITAR ABSOLUTAMENTE:
- Contenido generico sin valor
- Repeticion excesiva de palabras clave (keyword stuffing)
- Promesas exageradas
- Informacion desactualizada
- Errores en normativas mexicanas
- Precios especificos exactos (usar rangos como "$800-$1,500 MXN")
- Estadisticas inventadas o no verificables
- Frases genericas de IA:
  * "en el mundo actual" / "hoy en dia"
  * "es importante destacar" / "cabe mencionar"
  * "sin duda alguna" / "definitivamente"
  * "en este sentido" / "por lo tanto"
  * "a lo largo de los años"
  * "de esta manera" / "de igual forma"
- Repetir frases o estructuras identicas
- Emojis en ningun lugar
- Mencionar competidores por nombre
- Garantizar aprobacion de inspecciones
- Consejos medicos sobre inhalacion

---

# OPTIMIZACION SEO

## On-Page:
- Palabra clave en titulo (H1) AL INICIO
- Palabra clave en primer parrafo (primeros 100 caracteres)
- Palabras clave secundarias en H2s
- Densidad de palabra clave: 1-2% (natural, no forzado)
- Incluir minimo 15 keywords LSI relacionadas
- Enlaces internos sugeridos (minimo 3)
- Alt text descriptivo para imagenes sugeridas

## Legibilidad:
- Puntaje Flesch-Kincaid: 60-70 (facil de leer)
- Parrafos cortos (maximo 150 palabras)
- Uso de **negritas** para terminos importantes
- Listas para mejorar escaneabilidad

---

# ESTRUCTURA HTML DEL ARTICULO

<div class="article-intro">
    <p class="article-lead">[Parrafo 1: HOOK que conecta con el problema. Primera oracion con <strong>keyword principal</strong>. Menciona la consecuencia de no actuar (multas, riesgos). Establece urgencia sin ser alarmista.]</p>
    <p>[Parrafo 2: Contexto para empresas en CDMX. Menciona normativa aplicable (NOM-154, NOM-002). Establece credibilidad de MANEXT (80 años, +15,000 empresas).]</p>
    <p>[Parrafo 3: Adelanto de lo que aprendera: que es, como funciona, requisitos legales, como elegir, errores a evitar.]</p>
</div>

<div class="table-of-contents">
    <h3>Contenido del Articulo</h3>
    <ul>
        <li><a href="#que-es">[Seccion 1]</a></li>
        <li><a href="#beneficios">[Seccion 2]</a></li>
        <li><a href="#como-funciona">[Seccion 3]</a></li>
        <li><a href="#normativa">[Seccion 4]</a></li>
        <li><a href="#donde-cuando">[Seccion 5]</a></li>
        <li><a href="#errores">[Seccion 6]</a></li>
        <li><a href="#conclusion">[Conclusion]</a></li>
        <li><a href="#faq">[FAQ]</a></li>
    </ul>
</div>

<section id="que-es" class="content-section">
    <h2>Que es ${p.name} y Para Que Sirve</h2>
    <p>[Definicion clara y accesible. Que es, como funciona, para que tipo de fuego/riesgo aplica. NO asumir conocimiento previo.]</p>
    <p>[Contexto de uso en empresas mexicanas. Ejemplos de industrias y negocios donde es indispensable.]</p>
    <p>[Diferenciador: Por que elegir equipo/servicio CERTIFICADO. Mencionar NOM aplicable.]</p>
</section>

<section id="beneficios" class="content-section">
    <h2>Beneficios de ${p.name} para tu Empresa</h2>
    <p>[Introduccion breve sobre por que estos beneficios importan.]</p>
    <ul class="custom-list">
        <li><strong>Cumplimiento legal:</strong> [Evitar multas de Proteccion Civil hasta $500,000 MXN]</li>
        <li><strong>Seguridad:</strong> [Proteccion de personal y patrimonio]</li>
        <li><strong>Operatividad:</strong> [Continuidad del negocio]</li>
        <li><strong>Certificacion:</strong> [Respaldo documental para inspecciones]</li>
        <li><strong>Tranquilidad:</strong> [Servicio profesional con garantia]</li>
    </ul>
</section>

<div class="info-box">
    <div class="info-box-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    </div>
    <div class="info-box-content">
        <h4>Dato Importante</h4>
        <p>[Dato tecnico relevante o estadistica verificable. Puede ser de normativa NOM, Proteccion Civil, o experiencia de MANEXT.]</p>
    </div>
</div>

<section id="como-funciona" class="content-section">
    <h2>Como Funciona / Como Elegir ${p.name}</h2>
    <p>[Explicacion del proceso o criterios de seleccion.]</p>
    <h3>Paso 1 / Criterio 1</h3>
    <p>[Detalle con ejemplo practico.]</p>
    <h3>Paso 2 / Criterio 2</h3>
    <p>[Detalle con ejemplo practico.]</p>
    <h3>Paso 3 / Criterio 3</h3>
    <p>[Detalle con ejemplo practico.]</p>
</section>

<section id="normativa" class="content-section">
    <h2>Normativa Mexicana: NOM-154-SCFI y NOM-002-STPS</h2>
    <p>[Explicacion de que normas aplican a ${p.name}.]</p>
    <h3>Requisitos de NOM-154-SCFI</h3>
    <ul class="custom-list">
        <li>[Requisito 1 con explicacion practica]</li>
        <li>[Requisito 2 con explicacion practica]</li>
        <li>[Requisito 3 con explicacion practica]</li>
    </ul>
    <h3>Requisitos de NOM-002-STPS</h3>
    <ul class="custom-list">
        <li>[Requisito 1 relacionado con ${p.name}]</li>
        <li>[Requisito 2 relacionado con ${p.name}]</li>
    </ul>
</section>

<div class="warning-box">
    <div class="warning-box-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    </div>
    <div class="warning-box-content">
        <h4>Importante: Multas y Sanciones</h4>
        <p>El incumplimiento de las normas de seguridad contra incendios puede resultar en multas de Proteccion Civil que van desde $5,000 hasta $500,000 MXN, clausura temporal o definitiva del establecimiento, y responsabilidad civil en caso de siniestros.</p>
    </div>
</div>

<section id="donde-cuando" class="content-section">
    <h2>Donde y Cuando Necesitas ${p.name}</h2>
    <h3>Tipos de Negocios que lo Requieren</h3>
    <ul class="custom-list">
        <li><strong>Restaurantes y cocinas:</strong> [Especificidad sobre Tipo K]</li>
        <li><strong>Oficinas y corporativos:</strong> [Especificidad sobre PQS/CO2]</li>
        <li><strong>Bodegas e industrias:</strong> [Especificidad sobre sistemas]</li>
        <li><strong>Comercios y tiendas:</strong> [Especificidad]</li>
        <li><strong>Escuelas y hospitales:</strong> [Especificidad]</li>
    </ul>
    <h3>Zonas de Cobertura MANEXT</h3>
    <p>Ofrecemos servicio de ${p.name.toLowerCase()} en toda la CDMX y Estado de Mexico: ${colonias.slice(0, 6).join(', ')}, y zonas industriales como ${zonasIndustriales.slice(0, 3).join(', ')}.</p>
</section>

<section id="errores" class="content-section">
    <h2>Errores Comunes que Debes Evitar</h2>
    <ul class="custom-list">
        <li><strong>[Error 1]:</strong> [Descripcion y como evitarlo]</li>
        <li><strong>[Error 2]:</strong> [Descripcion y como evitarlo]</li>
        <li><strong>[Error 3]:</strong> [Descripcion y como evitarlo]</li>
        <li><strong>[Error 4]:</strong> [Descripcion y como evitarlo]</li>
    </ul>
</section>

<div class="cta-inline">
    <div class="cta-inline-content">
        <h3>¿Necesitas ${p.name}?</h3>
        <p>Con mas de 80 años de experiencia, MANEXT te ofrece servicio certificado con respaldo documental para tus inspecciones de Proteccion Civil.</p>
        <div class="cta-inline-buttons">
            <a href="tel:5539689272" class="btn-primary">Llamar Ahora: 55 3968 9272</a>
            <a href="https://wa.me/5215539689272" class="btn-whatsapp">WhatsApp</a>
        </div>
    </div>
</div>

<section class="related-articles">
    <h2>Articulos Relacionados</h2>
    <div class="related-grid">
        <article class="related-card">
            <div class="related-content">
                <span class="related-category">[Categoria]</span>
                <h3><a href="${rs[0].url}">${rs[0].name}</a></h3>
            </div>
        </article>
        <article class="related-card">
            <div class="related-content">
                <span class="related-category">[Categoria]</span>
                <h3><a href="${rs[1].url}">${rs[1].name}</a></h3>
            </div>
        </article>
        <article class="related-card">
            <div class="related-content">
                <span class="related-category">[Categoria]</span>
                <h3><a href="${rs[2].url}">${rs[2].name}</a></h3>
            </div>
        </article>
    </div>
</section>

<section id="conclusion" class="content-section conclusion">
    <h2>Conclusion: Protege tu Empresa con ${p.name}</h2>
    <p>[Resumen de los 3-4 puntos clave del articulo. Reforzar valor del servicio profesional certificado.]</p>
    <p>En MANEXT contamos con mas de 80 años de experiencia y hemos protegido a mas de 15,000 empresas en CDMX y Estado de Mexico. Te garantizamos cumplimiento normativo y respaldo documental completo para tus inspecciones de Proteccion Civil.</p>
    <p>Contactanos al <strong>55 3968 9272</strong> o escribenos por <a href="https://wa.me/5215539689272">WhatsApp</a> para una cotizacion sin compromiso.</p>
</section>

<section id="faq" class="faq-section">
    <h2>Preguntas Frecuentes sobre ${p.name}</h2>
    <!-- Las 5 FAQs van aqui en formato acordeon -->
</section>

---

# FORMATO DE SALIDA (JSON ESTRICTO)

Responde UNICAMENTE con este JSON (sin texto adicional, sin markdown, sin comentarios):

{
    "titulo": "[Titulo SEO max 60 chars - keyword AL INICIO]",
    "slug": "[url-amigable-sin-acentos-max-55-chars]",
    "metaDescripcion": "[150-160 chars EXACTOS - keyword + beneficio + CTA suave]",
    "metaKeywords": "[keyword principal, keyword 2, keyword 3, LSI 1, LSI 2, MANEXT, CDMX]",
    "breadcrumbText": "[15-25 caracteres max]",
    "categoria": "${p.categoryName}",
    "categoriaSlug": "${p.category}",
    "tiempoLectura": "[X] min",
    "contenidoHTML": "[HTML COMPLETO siguiendo la estructura EXACTA de arriba - minimo 1800 palabras]",
    "faqSchema": [
        {"pregunta": "[Pregunta 1 REAL de clientes]", "respuesta": "[Respuesta completa 60-100 palabras]"},
        {"pregunta": "[Pregunta 2]", "respuesta": "[Respuesta]"},
        {"pregunta": "[Pregunta 3]", "respuesta": "[Respuesta]"},
        {"pregunta": "[Pregunta 4]", "respuesta": "[Respuesta]"},
        {"pregunta": "[Pregunta 5]", "respuesta": "[Respuesta]"}
    ],
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
    "enlacesInternosSugeridos": [
        "${rs[0].url}",
        "${rs[1].url}",
        "${rs[2].url}"
    ],
    "imagenesSugeridas": [
        {
            "descripcion": "[Descripcion de imagen principal]",
            "altText": "[Alt text optimizado para SEO con keyword]"
        }
    ],
    "cta": {
        "texto": "¿Necesitas ${p.name.toLowerCase()}? Solicita tu cotizacion",
        "enlace": "/contacto.html"
    }
}

---

# CHECKLIST FINAL (Verifica ANTES de responder)

[ ] Titulo tiene keyword AL INICIO y < 60 caracteres
[ ] Meta description tiene 150-160 caracteres EXACTOS
[ ] Contenido tiene 1800+ palabras de VALOR REAL
[ ] Incluye TODAS las secciones con IDs para navegacion
[ ] Incluye 1 info-box con dato verificable
[ ] Incluye 1 warning-box con advertencia de multas
[ ] Incluye CTA-inline con telefono 55 3968 9272 y WhatsApp
[ ] Incluye seccion de articulos relacionados con URLs correctas
[ ] Tiene 5 FAQ con preguntas REALES de clientes
[ ] Menciona normativas NOM aplicables correctamente
[ ] Menciona zonas de CDMX de forma natural
[ ] Menciona telefono 55 3968 9272 en conclusion
[ ] NO hay frases genericas de IA
[ ] NO hay emojis
[ ] Tono profesional pero accesible
[ ] Cada parrafo aporta VALOR REAL al lector
[ ] Densidad de keyword 1-2% (natural)

GENERA EL ARTICULO AHORA.`;

return [{ json: { ...data, prompt } }];
```

---

## Notas de Implementacion

1. Este codigo va en el nodo "Constructor Prompt" de N8N
2. Recibe datos del "Selector Inteligente" que ya selecciono producto, tipo y zonas
3. El prompt resultante se envia a ChatGPT/OpenAI
4. La respuesta JSON se procesa en el nodo "Validar Respuesta"

## Cambios en v2.0

- Rol y contexto mas detallado del redactor SEO
- Palabras clave organizadas por tipo (principales, producto, informativas, long-tail)
- Patrones de titulo mas variados con ejemplos
- Estructura de articulo mas completa con todas las secciones
- Tono y estilo mejor definido
- Elementos a evitar mas especificos
- Optimizacion SEO on-page detallada
- Formato de salida JSON ampliado con enlaces internos, imagenes sugeridas y CTA
- Checklist final mas completo
