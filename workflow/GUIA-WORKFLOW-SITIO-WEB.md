# GUIA COMPLETA: Workflow de Generacion de Articulos + Configuracion de Sitio

**Version:** 1.0
**Fecha:** Enero 2027
**Proyecto Base:** MEDEDUL - Mesas de Dulces CDMX

---

## INDICE

1. [Estructura de Archivos](#1-estructura-de-archivos)
2. [CSS Global - Header Spacer y Breadcrumb](#2-css-global---header-spacer-y-breadcrumb)
3. [CSS Blog Article](#3-css-blog-article)
4. [Template HTML de Articulos](#4-template-html-de-articulos)
5. [Workflow N8N - Estructura Completa](#5-workflow-n8n---estructura-completa)
6. [Variables a Personalizar](#6-variables-a-personalizar)
7. [Checklist de Implementacion](#7-checklist-de-implementacion)

---

## 1. ESTRUCTURA DE ARCHIVOS

```
/proyecto
├── css/
│   ├── styles.css           # CSS global (header-spacer, breadcrumb)
│   ├── header-footer.css    # Estilos del header fijo
│   └── blog-article.css     # Estilos de articulos del blog
├── blog/
│   ├── TEMPLATE-ARTICULO.html   # Template para N8N
│   └── index.html               # Listado de articulos
├── workflow/
│   └── workflow-NOMBRE-vX.json  # Workflow de N8N
└── img/
    └── galeria/                 # Imagenes para articulos
```

---

## 2. CSS GLOBAL - HEADER SPACER Y BREADCRUMB

### Problema a Resolver
Cuando el header tiene `position: fixed`, el contenido se mete debajo. Se necesita un "espaciador" que reserve el espacio.

### Solucion en `styles.css`

```css
/* ==========================================
   HEADER SPACER - Reserva espacio del header fijo
   ========================================== */

/* Espaciador para header fijo - usar antes de breadcrumb */
.header-spacer {
    height: 180px;        /* Ajustar segun altura de top-bar + header */
    width: 100%;
    display: block;
}

/* ==========================================
   BREADCRUMB - Modulo independiente
   ========================================== */

.breadcrumb-section {
    background: var(--gris-claro);  /* o #f8f9fa */
    padding: 10px 0 5px 0;          /* IMPORTANTE: poco padding abajo */
    border-bottom: 1px solid #eee;
    margin-top: -10px;              /* Ajuste fino */
    margin-bottom: 0;
    position: relative;
    z-index: 10;
}

.breadcrumb {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
    flex-wrap: wrap;
    margin: 0;      /* CRITICO: sin margin */
    padding: 0;     /* CRITICO: sin padding */
}

.breadcrumb a {
    color: var(--gris-texto);
    text-decoration: none;
    transition: color 0.3s ease;
}

.breadcrumb a:hover {
    color: var(--rosa-principal);  /* Color principal del sitio */
}

.breadcrumb svg {
    width: 14px;
    height: 14px;
    color: #999;
    flex-shrink: 0;
}

.breadcrumb span {
    color: var(--negro-suave);
    font-weight: 500;
}

/* ==========================================
   RESPONSIVE
   ========================================== */

@media (max-width: 768px) {
    .header-spacer {
        height: 130px;   /* Menos altura en movil */
    }

    .breadcrumb-section {
        margin-top: -10px;
        padding: 10px 0 5px 0;
    }

    .breadcrumb {
        font-size: 0.85rem;
        gap: 8px;
        margin: 0;
        padding: 0;
    }
}
```

### Calculo de Altura del Header Spacer

```
header-spacer = top-bar + header + margen

Ejemplo MEDEDUL:
- Top bar: ~38px
- Header: ~82px
- Margen extra: ~60px
- TOTAL: 180px desktop, 130px movil
```

---

## 3. CSS BLOG ARTICLE

### Archivo: `css/blog-article.css`

```css
/* ==========================================
   VARIABLES
   ========================================== */

:root {
    --rosa-principal: #E91E8C;    /* Color principal - CAMBIAR */
    --rosa-claro: #FF6BB3;        /* Color secundario - CAMBIAR */
    --texto-oscuro: #1a1a1a;
    --texto-gris: #555;
    --fondo-rosa: #fff5f8;        /* Fondo suave - CAMBIAR */
}

/* ==========================================
   BREADCRUMB PARA BLOG (sobreescribe global)
   ========================================== */

.breadcrumb-section,
section.breadcrumb-section {
    background: #f8f9fa !important;
    padding: 10px 0 5px 0 !important;
    margin-top: -10px !important;
    margin-bottom: 0 !important;
    position: relative !important;
    z-index: 10 !important;
    border-bottom: 1px solid #eee !important;
}

.breadcrumb-section .breadcrumb,
.breadcrumb-section nav.breadcrumb {
    margin: 0 !important;
    padding: 0 !important;
}

article {
    margin: 0 !important;
    padding: 0 !important;
}

/* ==========================================
   ARTICLE HERO - Seccion principal del articulo
   ========================================== */

header.article-hero,
.article-hero {
    position: relative;
    min-height: 500px;           /* Altura generosa */
    display: flex;
    align-items: center;
    overflow: hidden;
    /* Gradiente pastel - PERSONALIZAR COLORES */
    background: linear-gradient(180deg, #ffd6e7 0%, #ffe8f0 30%, #fff5f8 70%, #ffffff 100%);
    padding: 150px 0 100px;      /* Mucho aire */
    margin: 0 !important;
    margin-top: 0 !important;
    border: none !important;
}

/* Efecto decorativo */
.article-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background:
        radial-gradient(ellipse at 10% 0%, rgba(233, 30, 140, 0.06) 0%, transparent 50%),
        radial-gradient(ellipse at 90% 100%, rgba(233, 30, 140, 0.04) 0%, transparent 40%);
    pointer-events: none;
}

/* Degradado inferior */
.article-hero::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to bottom, transparent, #ffffff);
    pointer-events: none;
}

.article-hero-content {
    position: relative;
    z-index: 3;
    padding: 10px 0 30px;
    width: 100%;
}

.article-hero .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
}

/* Tag de categoria */
.article-category-tag {
    display: inline-block;
    background: linear-gradient(135deg, #E91E8C 0%, #FF6BB3 100%);
    color: #fff;
    padding: 6px 18px;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 18px;
    box-shadow: 0 4px 15px rgba(233, 30, 140, 0.25);
}

/* Titulo H1 */
.article-hero h1 {
    font-size: 2.2rem;
    color: var(--texto-oscuro);
    line-height: 1.3;
    margin: 0 auto 18px;
    font-weight: 700;
    max-width: 750px;
    text-align: center;
}

/* Meta info */
.article-hero-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    color: var(--texto-gris);
    font-size: 0.9rem;
    flex-wrap: wrap;
}

.article-hero-meta span {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255, 255, 255, 0.7);
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
}

.article-hero-meta svg {
    width: 16px;
    height: 16px;
    color: var(--rosa-principal);
}

/* ==========================================
   RESPONSIVE HERO
   ========================================== */

@media (max-width: 768px) {
    .breadcrumb-section,
    section.breadcrumb-section {
        margin-top: -10px !important;
        padding: 10px 0 5px 0 !important;
    }

    .breadcrumb-section .breadcrumb {
        font-size: 0.85rem;
        gap: 8px;
        margin: 0 !important;
        padding: 0 !important;
    }

    .article-hero {
        min-height: 350px;
        padding: 80px 0 60px;
        margin-top: 0 !important;
    }

    .article-hero h1 {
        font-size: 1.6rem;
        line-height: 1.3;
    }

    .article-hero-meta {
        gap: 15px;
        font-size: 0.85rem;
    }

    .article-category-tag {
        padding: 6px 15px;
        font-size: 0.7rem;
    }
}
```

---

## 4. TEMPLATE HTML DE ARTICULOS

### Archivo: `blog/TEMPLATE-ARTICULO.html`

### Estructura Critica (orden importante):

```html
</header>  <!-- Cierre del header principal -->

<!-- Espaciador para header fijo -->
<div class="header-spacer"></div>

<!-- ========== BREADCRUMB ========== -->
<section class="breadcrumb-section">
    <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Inicio</a>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
            <a href="/blog/">Blog</a>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
            <a href="/blog/?categoria={{CATEGORIA_SLUG}}">{{CATEGORIA}}</a>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
            <span>{{BREADCRUMB_TEXT}}</span>
        </nav>
    </div>
</section>

<!-- ========== ARTICLE ========== -->
<article itemscope itemtype="https://schema.org/Article">
<meta itemprop="author" content="{{EMPRESA}}">
<meta itemprop="publisher" content="{{EMPRESA}}">

<header class="article-hero">
<div class="article-hero-content">
<div class="container">
<span class="article-category-tag" itemprop="articleSection">{{CATEGORIA}}</span>
<h1 itemprop="headline">{{TITULO}}</h1>
<div class="article-hero-meta">
<span itemprop="timeRequired">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
{{TIEMPO_LECTURA}}
</span>
<span>
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
Guia Profesional
</span>
</div>
</div>
</div>
</header>

<!-- Resto del contenido... -->
```

### Variables del Template (N8N reemplaza):

| Variable | Descripcion | Ejemplo |
|----------|-------------|---------|
| `{{TITULO}}` | Titulo H1 (40-65 chars) | "Guia Completa de Mesas de Dulces" |
| `{{SLUG}}` | URL amigable | "guia-mesas-dulces-bodas-cdmx" |
| `{{META_DESCRIPTION}}` | SEO (150-160 chars) | "Descubre las mejores mesas..." |
| `{{META_KEYWORDS}}` | Keywords SEO | "mesa dulces, candy bar, CDMX" |
| `{{CATEGORIA}}` | Nombre categoria | "Bodas" |
| `{{CATEGORIA_SLUG}}` | Slug categoria | "bodas" |
| `{{IMAGEN_PRINCIPAL}}` | Ruta imagen | "img/galeria/imagen.avif" |
| `{{IMAGEN_ALT}}` | Alt de imagen | "Mesa de dulces elegante" |
| `{{BREADCRUMB_TEXT}}` | Texto corto (15-25 chars) | "Guia Bodas" |
| `{{TIEMPO_LECTURA}}` | Tiempo lectura | "10 min lectura" |
| `{{CONTENIDO}}` | HTML del articulo | "<div class='article-intro'>..." |
| `{{FAQ_SCHEMA}}` | JSON-LD FAQs | "{\"@context\":..." |

---

## 5. WORKFLOW N8N - ESTRUCTURA COMPLETA

### Nodos del Workflow:

```
1. Trigger Manual / Programado
        ↓
2. Selector Inteligente (Code)
   - Selecciona producto/categoria sin repetir
   - Selecciona tipo de articulo
   - Selecciona imagen
        ↓
3. Constructor Prompt (Code)
   - Genera el prompt para ChatGPT
        ↓
4. Preparar Request (Code)
   - Formatea el body para la API
        ↓
5. ChatGPT API (HTTP Request)
   - Llama a OpenAI
        ↓
6. Validar Respuesta (Code)
   - Parsea JSON
   - Genera slug SEO
   - Construye FAQ Schema
        ↓
7. Obtener Template (HTTP Request)
   - GET desde GitHub
        ↓
8. Procesar Template (Code)
   - Reemplaza variables
        ↓
9. Subir a GitHub (HTTP Request)
   - PUT el archivo HTML
        ↓
10. Notificacion (opcional)
```

### Configuracion de APIs:

```javascript
// OpenAI API
{
    method: "POST",
    url: "https://api.openai.com/v1/chat/completions",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-proj-TU_API_KEY"
    },
    body: {
        model: "gpt-4o",
        messages: [...],
        temperature: 0.85,
        max_tokens: 16000,
        response_format: { type: "json_object" }
    },
    timeout: 180000
}

// GitHub API - Obtener archivo
{
    method: "GET",
    url: "https://api.github.com/repos/OWNER/REPO/contents/PATH",
    headers: {
        "Authorization": "Bearer ghp_TU_TOKEN",
        "Accept": "application/vnd.github.v3+json"
    }
}

// GitHub API - Subir archivo
{
    method: "PUT",
    url: "https://api.github.com/repos/OWNER/REPO/contents/PATH",
    headers: {
        "Authorization": "Bearer ghp_TU_TOKEN",
        "Accept": "application/vnd.github.v3+json"
    },
    body: {
        message: "Add article: slug-del-articulo",
        content: "BASE64_DEL_HTML",
        branch: "main"
    }
}
```

### Prompt para ChatGPT (Estructura):

```javascript
const prompt = `Eres un PERIODISTA EXPERTO especializado en [INDUSTRIA].

MISION: Crear un articulo editorial de revista de lujo.

CONTEXTO:
- Tema: ${product.name}
- Categoria: ${product.categoryName}
- Keywords: ${product.keywords.join(', ')}
- Zonas a mencionar: ${colonias.join(', ')}

REGLAS:
1. PROHIBIDO: precios, fechas, listas largas
2. OBLIGATORIO: 2000+ palabras narrativas, descripciones sensoriales

ESTRUCTURA HTML:
<div class="article-intro">...</div>
<nav class="toc">...</nav>
<h2 id="seccion">...</h2>
<div class="highlight-box">...</div>
<div class="faq-section">...</div>

RESPUESTA JSON:
{
  "title": "...",
  "metaDescription": "...",
  "contenidoHTML": "..."
}`;
```

---

## 6. VARIABLES A PERSONALIZAR

### Por Proyecto:

| Variable | Descripcion | Donde Cambiar |
|----------|-------------|---------------|
| `--rosa-principal` | Color principal | CSS variables |
| `--rosa-claro` | Color secundario | CSS variables |
| `header-spacer height` | Altura del espaciador | styles.css |
| `GitHub owner/repo` | Repositorio | Workflow JSON |
| `OpenAI API Key` | Clave API | Workflow JSON |
| `GitHub Token` | Token acceso | Workflow JSON |
| `Empresa nombre` | Nombre empresa | Workflow CONFIG |
| `Telefono/WhatsApp` | Contacto | Workflow CONFIG |
| `Categories` | Categorias del sitio | Workflow CONFIG |
| `Products` | Productos/servicios | Workflow CONFIG |
| `Images` | Rutas de imagenes | Workflow CONFIG |

### Colores Sugeridos por Industria:

```css
/* Eventos/Bodas */
--principal: #E91E8C;  /* Rosa */
--secundario: #FF6BB3;

/* Restaurantes */
--principal: #D4A853;  /* Dorado */
--secundario: #8B4513;

/* Salud/Bienestar */
--principal: #2E8B57;  /* Verde */
--secundario: #90EE90;

/* Tecnologia */
--principal: #0066CC;  /* Azul */
--secundario: #00BFFF;

/* Inmobiliaria */
--principal: #1a1a1a;  /* Negro */
--secundario: #D4A853;
```

---

## 7. CHECKLIST DE IMPLEMENTACION

### Paso 1: Estructura Base
- [ ] Crear carpetas: css/, blog/, workflow/, img/galeria/
- [ ] Copiar styles.css con header-spacer y breadcrumb
- [ ] Copiar blog-article.css con estilos del hero
- [ ] Ajustar colores en CSS variables

### Paso 2: Template
- [ ] Crear TEMPLATE-ARTICULO.html
- [ ] Incluir `<div class="header-spacer"></div>` despues del header
- [ ] Incluir breadcrumb-section antes del article
- [ ] Verificar todas las variables {{VARIABLE}}

### Paso 3: Calcular Header Spacer
- [ ] Medir altura del top-bar (si existe)
- [ ] Medir altura del header
- [ ] Sumar + margen (20-40px)
- [ ] Actualizar .header-spacer height en CSS

### Paso 4: Workflow N8N
- [ ] Crear nuevo workflow
- [ ] Configurar Selector Inteligente con productos del sitio
- [ ] Actualizar prompt con industria especifica
- [ ] Configurar API keys (OpenAI, GitHub)
- [ ] Configurar rutas de imagenes
- [ ] Probar con trigger manual

### Paso 5: Pruebas
- [ ] Generar articulo de prueba
- [ ] Verificar breadcrumb visible (no bajo header)
- [ ] Verificar hero con altura correcta
- [ ] Verificar responsive en movil
- [ ] Verificar SEO (meta tags, schema)

### Paso 6: Ajustes Finos
- [ ] Si breadcrumb bajo header: aumentar header-spacer
- [ ] Si mucho espacio: reducir header-spacer
- [ ] Si hero muy pequeno: aumentar min-height y padding
- [ ] Commit y push a GitHub

---

## NOTAS IMPORTANTES

### El Problema del Header Fijo

```
PROBLEMA:
┌─────────────────────────┐
│ HEADER (position:fixed) │ ← Flota sobre todo
├─────────────────────────┤
│ BREADCRUMB              │ ← Se mete DEBAJO del header
│ HERO                    │
└─────────────────────────┘

SOLUCION:
┌─────────────────────────┐
│ HEADER (position:fixed) │
├─────────────────────────┤
│ HEADER-SPACER (180px)   │ ← Reserva el espacio
├─────────────────────────┤
│ BREADCRUMB              │ ← Ahora visible
│ HERO                    │
└─────────────────────────┘
```

### Orden de CSS (Especificidad)

```html
<!-- Cargar en este orden -->
<link rel="stylesheet" href="css/styles.css">        <!-- Global -->
<link rel="stylesheet" href="css/header-footer.css"> <!-- Header -->
<link rel="stylesheet" href="css/blog-article.css">  <!-- Articulos (sobreescribe) -->
```

### Debug Visual

Si algo no funciona, agregar colores temporales:

```css
.header-spacer { background: red !important; }
.breadcrumb-section { background: yellow !important; }
.article-hero { background: blue !important; }
```

---

**Fin de la guia**
