# GUÍA MAESTRA DE CREACIÓN DE ARTÍCULOS - MANEXT Blog

## Documento de Referencia para Homogeneizar Artículos

**Archivo de referencia:** `blog/seguridad-contra-incendios/como-elegir-extintor-correcto-negocio-cdmx.html`

**Versión:** 2.0  
**Última actualización:** Noviembre 2025

---

## ÍNDICE GENERAL

1. [Quick Start - Referencia Rápida](#1-quick-start---referencia-rápida)
2. [Estructura del Archivo HTML](#2-estructura-del-archivo-html)
3. [Schema Markup y Datos Estructurados](#3-schema-markup-y-datos-estructurados)
4. [Estructura del Body](#4-estructura-del-body)
5. [Contenido del Artículo](#5-contenido-del-artículo)
6. [Fórmulas de Copywriting](#6-fórmulas-de-copywriting)
7. [Componentes Especiales](#7-componentes-especiales)
8. [Sidebar Completo](#8-sidebar-completo)
9. [CTAs y Conversión](#9-ctas-y-conversión)
10. [Directrices SEO Avanzadas](#10-directrices-seo-avanzadas)
11. [Optimización de Imágenes](#11-optimización-de-imágenes)
12. [Accesibilidad Web](#12-accesibilidad-web)
13. [Footer y Scripts](#13-footer-y-scripts)
14. [Checklist Pre-Publicación](#14-checklist-pre-publicación)
15. [Plantillas y Ejemplos](#15-plantillas-y-ejemplos)

---

## 1. QUICK START - REFERENCIA RÁPIDA

### 🚀 Para crear un artículo en 5 minutos:

```bash
# 1. Copiar plantilla base
cp blog/seguridad-contra-incendios/como-elegir-extintor-correcto-negocio-cdmx.html blog/[CATEGORIA]/[nuevo-slug].html

# 2. Reemplazar elementos clave (buscar y reemplazar):
# - [TITULO] → Tu título con keyword
# - [DESCRIPCION] → Meta description 150-160 chars
# - [CATEGORIA] → Nombre de la categoría
# - [SLUG] → URL del artículo
# - [IMAGEN] → Nombre del archivo de imagen
```

### ⚡ Elementos OBLIGATORIOS (no publicar sin estos):

| Elemento               | Requisito                | Verificación |
| ---------------------- | ------------------------ | ------------ |
| Title + H1             | Keyword principal + CDMX | ✅           |
| Meta Description       | 150-160 caracteres       | ✅           |
| Schema Article         | JSON-LD completo         | ✅           |
| Tabla de contenidos    | Mínimo 5 secciones       | ✅           |
| Imagen destacada       | WebP + Alt descriptivo   | ✅           |
| Enlaces internos       | Mínimo 8 enlaces         | ✅           |
| CTA intermedio         | 1 por cada 800 palabras  | ✅           |
| Artículos relacionados | Exactamente 4            | ✅           |

### 📊 Métricas objetivo por artículo:

- **Longitud:** 1,800 - 2,500 palabras
- **Tiempo de lectura:** 7-12 minutos
- **Densidad keyword principal:** 1-2%
- **Enlaces internos:** 8-12 por artículo
- **Imágenes:** 3-5 por artículo
- **H2:** 5-8 secciones
- **H3:** 2-4 por cada H2

---

## 2. ESTRUCTURA DEL ARCHIVO HTML

### 2.1 Declaración DOCTYPE y HTML

```html
<!DOCTYPE html>
<html lang="es-MX"></html>
```

> **Nota:** Usar `es-MX` en lugar de solo `es` para mejor geolocalización en México.

### 2.2 Sección HEAD Completa (Optimizada)

```html
<head>
  <!-- Codificación y Viewport -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Preconnect para recursos externos (mejora velocidad) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- Preload de recursos críticos -->
  <link rel="preload" href="../../css/style.css?v=14" as="style" />
  <link
    rel="preload"
    href="../../img/img-index/[IMAGEN-DESTACADA].webp"
    as="image"
  />

  <!-- Meta SEO Principales -->
  <title>[TITULO DEL ARTICULO] | MANEXT - Expertos en Extintores CDMX</title>
  <meta
    name="description"
    content="[DESCRIPCION SEO 150-160 caracteres con keyword + beneficio + CTA implícito]"
  />
  <meta
    name="keywords"
    content="[keyword1], [keyword2], [keyword3], extintores CDMX, MANEXT"
  />
  <meta name="author" content="MANEXT - Mantenimiento de Extintores" />
  <meta
    name="robots"
    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  />

  <!-- Geolocalización -->
  <meta name="geo.region" content="MX-CMX" />
  <meta name="geo.placename" content="Ciudad de México" />
  <meta name="geo.position" content="19.432608;-99.133209" />
  <meta name="ICBM" content="19.432608, -99.133209" />

  <!-- CSS Principal -->
  <link rel="stylesheet" href="../../css/style.css?v=14" />

  <!-- Open Graph (Facebook, LinkedIn) -->
  <meta property="og:title" content="[TITULO] | MANEXT" />
  <meta property="og:description" content="[DESCRIPCION 150-160 chars]" />
  <meta property="og:type" content="article" />
  <meta
    property="og:url"
    content="https://mantenimientodeextintores.mx/blog/[CATEGORIA]/[SLUG].html"
  />
  <meta
    property="og:image"
    content="https://mantenimientodeextintores.mx/img/img-index/[IMAGEN].webp"
  />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="[ALT DESCRIPTIVO DE LA IMAGEN]" />
  <meta property="og:locale" content="es_MX" />
  <meta
    property="og:site_name"
    content="MANEXT - Mantenimiento de Extintores"
  />
  <meta
    property="article:published_time"
    content="[FECHA-ISO: 2025-01-15T10:00:00-06:00]"
  />
  <meta property="article:modified_time" content="[FECHA-ISO]" />
  <meta property="article:author" content="MANEXT" />
  <meta property="article:section" content="[CATEGORIA]" />
  <meta property="article:tag" content="[TAG1]" />
  <meta property="article:tag" content="[TAG2]" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="[TITULO] | MANEXT" />
  <meta name="twitter:description" content="[DESCRIPCION]" />
  <meta
    name="twitter:image"
    content="https://mantenimientodeextintores.mx/img/img-index/[IMAGEN].webp"
  />
  <meta name="twitter:image:alt" content="[ALT DESCRIPTIVO]" />

  <!-- Canonical -->
  <link
    rel="canonical"
    href="https://mantenimientodeextintores.mx/blog/[CATEGORIA]/[SLUG].html"
  />

  <!-- Hreflang (si hay versiones en otros idiomas) -->
  <link
    rel="alternate"
    hreflang="es-MX"
    href="https://mantenimientodeextintores.mx/blog/[CATEGORIA]/[SLUG].html"
  />
  <link
    rel="alternate"
    hreflang="x-default"
    href="https://mantenimientodeextintores.mx/blog/[CATEGORIA]/[SLUG].html"
  />

  <!-- Favicon y PWA -->
  <link rel="icon" href="../../favicon.ico" sizes="any" />
  <link rel="icon" href="../../icon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="../../icon.png" />
  <link rel="manifest" href="../../site.webmanifest" />
  <meta name="theme-color" content="#d32f2f" />
  <meta name="msapplication-TileColor" content="#d32f2f" />
</head>
```

### 2.3 Variables a Reemplazar - Guía Rápida

| Variable        | Descripción                        | Ejemplo                                                                                                           |
| --------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `[TITULO]`      | Título completo con keyword        | "Cómo Elegir el Extintor Correcto para tu Negocio en CDMX"                                                        |
| `[DESCRIPCION]` | 150-160 chars, keyword + beneficio | "Guía experta para elegir extintores. 80+ años de experiencia. Asesoría gratuita y entrega en CDMX. ¡Cotiza hoy!" |
| `[CATEGORIA]`   | Carpeta de categoría               | "seguridad-contra-incendios"                                                                                      |
| `[SLUG]`        | URL amigable                       | "como-elegir-extintor-correcto-negocio-cdmx"                                                                      |
| `[IMAGEN]`      | Archivo de imagen                  | "venta-de-extintores"                                                                                             |
| `[FECHA-ISO]`   | Fecha en formato ISO               | "2025-01-15T10:00:00-06:00"                                                                                       |

---

## 3. SCHEMA MARKUP Y DATOS ESTRUCTURADOS

### 3.1 Schema Article (OBLIGATORIO)

Insertar justo después de `</head>` y antes de `<body>`:

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://mantenimientodeextintores.mx/blog/[CATEGORIA]/[SLUG].html"
    },
    "headline": "[TITULO DEL ARTICULO - Max 110 caracteres]",
    "description": "[DESCRIPCION - 150-160 caracteres]",
    "image": {
      "@type": "ImageObject",
      "url": "https://mantenimientodeextintores.mx/img/img-index/[IMAGEN].webp",
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Organization",
      "name": "MANEXT",
      "url": "https://mantenimientodeextintores.mx",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mantenimientodeextintores.mx/img/logo-manext.webp"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "MANEXT - Mantenimiento de Extintores",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mantenimientodeextintores.mx/img/logo-manext.webp",
        "width": 200,
        "height": 60
      }
    },
    "datePublished": "[FECHA-ISO]",
    "dateModified": "[FECHA-ISO]",
    "articleSection": "[CATEGORIA]",
    "keywords": "[keyword1], [keyword2], [keyword3], extintores, CDMX",
    "wordCount": [NUMERO-PALABRAS],
    "inLanguage": "es-MX",
    "isAccessibleForFree": true,
    "about": {
      "@type": "Thing",
      "name": "[TEMA PRINCIPAL]",
      "description": "[DESCRIPCION DEL TEMA]"
    }
  }
</script>
```

### 3.2 Schema BreadcrumbList (OBLIGATORIO)

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://mantenimientodeextintores.mx/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://mantenimientodeextintores.mx/blog.html"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "[NOMBRE CATEGORIA]",
        "item": "https://mantenimientodeextintores.mx/blog/[CATEGORIA]/"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "[TITULO CORTO]",
        "item": "https://mantenimientodeextintores.mx/blog/[CATEGORIA]/[SLUG].html"
      }
    ]
  }
</script>
```

### 3.3 Schema FAQPage (Si el artículo tiene preguntas frecuentes)

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "[PREGUNTA 1]",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "[RESPUESTA 1 - puede incluir HTML básico]"
        }
      },
      {
        "@type": "Question",
        "name": "[PREGUNTA 2]",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "[RESPUESTA 2]"
        }
      }
    ]
  }
</script>
```

### 3.4 Schema HowTo (Para artículos tipo guía/tutorial)

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "[TITULO DE LA GUIA]",
    "description": "[DESCRIPCION]",
    "image": "https://mantenimientodeextintores.mx/img/img-index/[IMAGEN].webp",
    "totalTime": "PT[X]M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "MXN",
      "value": "[COSTO O 0 si es gratis]"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "[MATERIAL NECESARIO 1]"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "[HERRAMIENTA 1]"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "[TITULO PASO 1]",
        "text": "[DESCRIPCION PASO 1]",
        "url": "https://mantenimientodeextintores.mx/blog/[CATEGORIA]/[SLUG].html#paso-1",
        "image": "https://mantenimientodeextintores.mx/img/img-index/[IMAGEN-PASO].webp"
      },
      {
        "@type": "HowToStep",
        "name": "[TITULO PASO 2]",
        "text": "[DESCRIPCION PASO 2]",
        "url": "https://mantenimientodeextintores.mx/blog/[CATEGORIA]/[SLUG].html#paso-2"
      }
    ]
  }
</script>
```

### 3.5 Schema LocalBusiness (Incluir en todos los artículos)

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://mantenimientodeextintores.mx/#organization",
    "name": "MANEXT - Mantenimiento de Extintores",
    "alternateName": "MANEXT",
    "description": "Empresa líder en venta, mantenimiento y recarga de extintores en CDMX con más de 80 años de experiencia.",
    "url": "https://mantenimientodeextintores.mx",
    "telephone": "+52-55-3968-9272",
    "email": "contacto@mantenimientodeextintores.mx",
    "foundingDate": "1944",
    "priceRange": "$$",
    "image": "https://mantenimientodeextintores.mx/img/img-index/venta-de-extintores.webp",
    "logo": "https://mantenimientodeextintores.mx/img/logo-manext.webp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[DIRECCION]",
      "addressLocality": "Ciudad de México",
      "addressRegion": "CDMX",
      "postalCode": "[CP]",
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.432608,
      "longitude": -99.133209
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 19.432608,
        "longitude": -99.133209
      },
      "geoRadius": "50000"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/manext",
      "https://www.instagram.com/manext",
      "https://www.linkedin.com/company/manext"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Extintores",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Venta de Extintores"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mantenimiento de Extintores"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Recarga de Extintores"
          }
        }
      ]
    }
  }
</script>
```

---

## 4. ESTRUCTURA DEL BODY

### 4.1 Menu Container

```html
<body>
  <!-- Skip Link para Accesibilidad -->
  <a href="#main-content" class="skip-link">Saltar al contenido principal</a>

  <!-- MENU -->
  <div id="menu-container"></div>
</body>
```

### 4.2 Breadcrumbs (Migas de Pan) - Con Accesibilidad Mejorada

```html
<!-- BREADCRUMBS -->
<nav class="breadcrumbs" aria-label="Ruta de navegación">
  <div class="container">
    <ol
      class="breadcrumb-list"
      itemscope
      itemtype="https://schema.org/BreadcrumbList"
    >
      <li
        class="breadcrumb-item"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <a href="../../index.html" itemprop="item">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span itemprop="name">Inicio</span>
        </a>
        <meta itemprop="position" content="1" />
      </li>
      <li
        class="breadcrumb-item"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <a href="../../blog.html" itemprop="item">
          <span itemprop="name">Blog</span>
        </a>
        <meta itemprop="position" content="2" />
      </li>
      <li
        class="breadcrumb-item"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <a href="./" itemprop="item">
          <span itemprop="name">[NOMBRE CATEGORIA]</span>
        </a>
        <meta itemprop="position" content="3" />
      </li>
      <li
        class="breadcrumb-item active"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
        aria-current="page"
      >
        <span itemprop="name">[TITULO CORTO]</span>
        <meta itemprop="position" content="4" />
      </li>
    </ol>
  </div>
</nav>
```

### 4.3 Categorías Disponibles

| Categoría                    | Carpeta                        | Temas                                                  |
| ---------------------------- | ------------------------------ | ------------------------------------------------------ |
| Seguridad Contra Incendios   | `seguridad-contra-incendios`   | Prevención, planes de emergencia, normativas generales |
| Tipos de Extintores          | `tipos-de-extintores`          | PQS, CO2, Agua, Espuma, Tipo K, Agentes limpios        |
| Mantenimiento y Recarga      | `mantenimiento-y-recarga`      | Servicio, frecuencia, costos, procesos                 |
| Equipos Contra Incendio      | `equipos-contra-incendio`      | Gabinetes, señalización, detectores, hidrantes         |
| Normativas y Certificaciones | `normativas-y-certificaciones` | NOM, NMX, Protección Civil, certificados               |
| Prevención Empresarial       | `prevencion-empresarial`       | Industrias específicas, capacitación, brigadas         |

---

## 5. CONTENIDO DEL ARTÍCULO

### 5.1 Estructura del Artículo Principal

```html
<main id="main-content">
  <article
    class="blog-post-article"
    itemscope
    itemtype="https://schema.org/Article"
  >
    <div class="container">
      <div class="blog-post-layout">
        <div class="blog-post-main">
          <!-- Contenido del artículo aquí -->
        </div>

        <aside
          class="blog-post-sidebar"
          aria-label="Información complementaria"
        >
          <!-- Sidebar aquí -->
        </aside>
      </div>
    </div>
  </article>
</main>
```

### 5.2 Header del Artículo

```html
<header class="blog-post-header">
  <span class="blog-post-category">[NOMBRE CATEGORIA]</span>
  <h1 class="blog-post-title" itemprop="headline">
    [TITULO COMPLETO DEL ARTICULO]
  </h1>
  <div class="blog-post-meta">
    <span
      class="blog-post-author"
      itemprop="author"
      itemscope
      itemtype="https://schema.org/Organization"
    >
      Por <span itemprop="name">MANEXT</span> - Expertos en Protección Contra
      Incendios
    </span>
    <time
      class="blog-post-date"
      datetime="[FECHA-ISO]"
      itemprop="datePublished"
    >
      [FECHA LEGIBLE: 15 de Enero, 2025]
    </time>
    <span class="blog-post-reading-time">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      [X] min de lectura
    </span>
  </div>
</header>
```

### 5.3 Imagen Destacada

```html
<figure class="blog-post-featured-image">
  <img
    src="../../img/img-index/[IMAGEN].webp"
    alt="[ALT DESCRIPTIVO con keyword - max 125 caracteres]"
    width="1200"
    height="630"
    loading="eager"
    fetchpriority="high"
    itemprop="image"
  />
  <figcaption class="visually-hidden">
    [DESCRIPCION COMPLETA PARA LECTORES DE PANTALLA]
  </figcaption>
</figure>
```

> **Importante:**
>
> - Imagen destacada SIEMPRE con `loading="eager"` y `fetchpriority="high"`
> - Incluir `width` y `height` para evitar CLS (Cumulative Layout Shift)
> - Alt descriptivo con keyword principal

### 5.4 Párrafo Introductorio (Lead)

```html
<div class="blog-post-content" itemprop="articleBody">
  <p class="article-lead">
    <strong>[HOOK - Pregunta o estadística impactante]</strong>
    [Desarrollo del problema que el lector enfrenta]. En MANEXT, con más de
    <strong>80 años de experiencia</strong> en protección contra incendios,
    [promesa de valor del artículo]. [Keyword principal] es fundamental para
    [beneficio].
  </p>
</div>
```

### 5.5 Tabla de Contenidos (TOC)

```html
<nav class="table-of-contents" aria-label="Tabla de contenidos del artículo">
  <h2>Contenido del Artículo</h2>
  <ol>
    <li><a href="#seccion-1">[Título Sección 1]</a></li>
    <li><a href="#seccion-2">[Título Sección 2]</a></li>
    <li><a href="#seccion-3">[Título Sección 3]</a></li>
    <li><a href="#seccion-4">[Título Sección 4]</a></li>
    <li><a href="#seccion-5">[Título Sección 5]</a></li>
    <li><a href="#preguntas-frecuentes">Preguntas Frecuentes</a></li>
    <li><a href="#conclusion">Conclusión</a></li>
  </ol>
</nav>
```

> **Requisito:** Todo artículo debe tener tabla de contenidos con **mínimo 5 secciones + FAQ + Conclusión**.

### 5.6 Estructura de Secciones de Contenido

```html
<section id="seccion-1" class="content-section">
  <h2>[TITULO DE LA SECCION - incluir keyword secundaria]</h2>

  <p>
    [Párrafo introductorio de la sección - 2-3 oraciones que establezcan el
    contexto]
  </p>

  <h3>[Subtítulo 1 - aspecto específico]</h3>
  <p>[Contenido detallado...]</p>

  <h3>[Subtítulo 2 - otro aspecto]</h3>
  <p>[Contenido detallado...]</p>

  <!-- Componente visual: lista, tabla, info-box, imagen -->

  <h4>[Sub-subtítulo para detalles específicos]</h4>
  <p>[Detalles técnicos o especificaciones...]</p>
</section>
```

### 5.7 Jerarquía de Encabezados

| Tag    | Uso                           | Cantidad            |
| ------ | ----------------------------- | ------------------- |
| `<h1>` | Título principal del artículo | **1 por página**    |
| `<h2>` | Secciones principales         | 5-8 por artículo    |
| `<h3>` | Subsecciones                  | 2-4 por cada H2     |
| `<h4>` | Puntos específicos            | Según necesidad     |
| `<h5>` | Títulos en grids/cards        | Solo en componentes |

---

## 6. FÓRMULAS DE COPYWRITING

### 6.1 Fórmula AIDA para Introducciones

```
A - ATENCIÓN: Hook inicial (estadística, pregunta, afirmación impactante)
I - INTERÉS: Desarrollar el problema/necesidad del lector
D - DESEO: Presentar la solución y beneficios
A - ACCIÓN: Indicar qué encontrará en el artículo
```

**Ejemplo AIDA:**

```html
<p class="article-lead">
  <!-- ATENCIÓN -->
  <strong
    >El 60% de los incendios en negocios de CDMX podrían evitarse con el
    extintor correcto.</strong
  >

  <!-- INTERÉS -->
  Sin embargo, muchos empresarios desconocen qué tipo de extintor necesitan
  según su giro comercial, poniendo en riesgo su inversión, empleados y
  clientes.

  <!-- DESEO -->
  En MANEXT, con más de <strong>80 años protegiendo negocios</strong> en la
  Ciudad de México, hemos desarrollado esta guía definitiva para que elijas el
  extintor perfecto para tu empresa.

  <!-- ACCIÓN -->
  Descubre los criterios técnicos, normativas aplicables y recomendaciones de
  expertos.
</p>
```

### 6.2 Fórmula PAS para Secciones de Problema

```
P - PROBLEMA: Identificar el dolor del lector
A - AGITACIÓN: Profundizar en las consecuencias
S - SOLUCIÓN: Presentar la respuesta
```

**Ejemplo PAS:**

```html
<section id="riesgos-extintor-incorrecto">
  <h2>Los Riesgos de Elegir el Extintor Incorrecto</h2>

  <!-- PROBLEMA -->
  <p>
    Muchos negocios en CDMX operan con extintores inadecuados para sus riesgos
    específicos. Un restaurante con extintor de CO2 en lugar de Tipo K, o una
    oficina con PQS cuando necesita agente limpio.
  </p>

  <!-- AGITACIÓN -->
  <p>
    Las consecuencias pueden ser devastadoras:
    <strong>el extintor no apaga el fuego</strong>, el incendio se propaga, y en
    minutos pierdes tu negocio. Además, Protección Civil puede clausurar tu
    establecimiento por incumplir la <strong>NOM-002-STPS</strong>, con multas
    de hasta $500,000 MXN.
  </p>

  <!-- SOLUCIÓN -->
  <p>
    La solución es simple: una
    <strong>evaluación profesional de riesgos</strong> que determine exactamente
    qué tipo, capacidad y cantidad de extintores necesita tu negocio. En MANEXT
    ofrecemos esta evaluación sin costo.
  </p>
</section>
```

### 6.3 Fórmula BAB para CTAs

```
B - BEFORE (Antes): Situación actual del lector
A - AFTER (Después): Situación ideal
B - BRIDGE (Puente): Cómo MANEXT lo hace posible
```

**Ejemplo BAB:**

```html
<div class="recommendation-box">
  <h4>Transforma la Seguridad de tu Negocio</h4>
  <p>
    <!-- BEFORE -->
    <strong>Hoy:</strong> Incertidumbre sobre si tus extintores son los
    correctos, riesgo de multas y preocupación constante. <br /><br />
    <!-- AFTER -->
    <strong>Mañana:</strong> Tranquilidad total con extintores certificados,
    personal capacitado y cumplimiento normativo garantizado. <br /><br />
    <!-- BRIDGE -->
    <strong>MANEXT lo hace posible</strong> con evaluación gratuita, equipos
    certificados NOM y servicio integral.
    <a href="../../contacto.html">Agenda tu evaluación hoy →</a>
  </p>
</div>
```

### 6.4 Plantillas de Hooks por Tipo de Artículo

**Para artículos informativos:**

- "¿Sabías que [estadística sorprendente]?"
- "El [X]% de [audiencia] comete este error con [tema]..."
- "[Número] de cada [número] [audiencia] no saben que..."

**Para guías prácticas:**

- "Aprende a [beneficio] en [tiempo] con esta guía paso a paso."
- "Todo lo que necesitas saber sobre [tema] en un solo artículo."
- "La guía definitiva de [tema] para [audiencia específica]."

**Para artículos de urgencia/compliance:**

- "Fecha límite: [fecha]. ¿Tu negocio cumple con [normativa]?"
- "Multas de hasta $[cantidad] por no cumplir con [requisito]."
- "Lo que Protección Civil no te dice sobre [tema]..."

**Para comparativas:**

- "[Opción A] vs [Opción B]: ¿Cuál es mejor para [situación]?"
- "Comparativa completa: [cantidad] tipos de [producto] y cuál elegir."
- "La verdad sobre [tema]: mitos vs realidades."

### 6.5 Frases de Autoridad MANEXT

Usar estas frases para establecer credibilidad:

- "Con más de **80 años de experiencia** en protección contra incendios..."
- "Como **líderes en el mercado de extintores en CDMX**..."
- "Nuestros **técnicos certificados** han atendido más de **[X] empresas**..."
- "Según nuestra experiencia con **miles de clientes** en la Ciudad de México..."
- "Los **expertos de MANEXT** recomiendan..."
- "Basándonos en **décadas de experiencia** en el sector..."

### 6.6 Llamadas a la Acción Efectivas

**CTAs de bajo compromiso:**

- "Descubre más sobre [tema]"
- "Lee nuestra guía completa"
- "Conoce nuestro catálogo"

**CTAs de compromiso medio:**

- "Solicita información sin compromiso"
- "Descarga nuestra guía gratuita"
- "Calcula tu cotización en línea"

**CTAs de alto compromiso:**

- "Agenda tu evaluación gratuita hoy"
- "Llama ahora: 55 3968 9272"
- "Cotiza en menos de 24 horas"
- "Protege tu negocio hoy mismo"

---

## 7. COMPONENTES ESPECIALES

### 7.1 Listas con Clase Especial

```html
<ul class="location-list">
  <li>
    <strong>Punto destacado:</strong> Descripción del punto con información
    relevante
  </li>
  <li>
    <strong>Otro punto importante:</strong> Más detalles que agregan valor
  </li>
  <li>Punto sin bold también es válido para información secundaria</li>
</ul>
```

**Variante numérica para pasos:**

```html
<ol class="steps-list">
  <li><strong>Paso 1 - Evaluación:</strong> Descripción del primer paso...</li>
  <li><strong>Paso 2 - Selección:</strong> Descripción del segundo paso...</li>
  <li>
    <strong>Paso 3 - Implementación:</strong> Descripción del tercer paso...
  </li>
</ol>
```

### 7.2 Info Box (Información Destacada - AZUL)

**Uso:** Datos importantes, estadísticas, información clave que el lector debe recordar.

```html
<div class="info-box" role="note" aria-label="Información importante">
  <div class="info-box-icon" aria-hidden="true">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  </div>
  <div class="info-box-content">
    <h4>Dato Clave de MANEXT</h4>
    <p>
      [ESTADÍSTICA O INFORMACIÓN IMPORTANTE]
      <br />
      <em>Fuente: [Citar fuente si aplica]</em>
    </p>
  </div>
</div>
```

### 7.3 Warning Box (Advertencia - AMARILLO/NARANJA)

**Uso:** Advertencias de seguridad, errores comunes, información crítica de cumplimiento.

```html
<div class="warning-box" role="alert" aria-label="Advertencia importante">
  <div class="warning-box-icon" aria-hidden="true">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
      ></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  </div>
  <div class="warning-box-content">
    <h4>⚠️ CRÍTICO: [TÍTULO DE ADVERTENCIA]</h4>
    <p>
      [TEXTO DE ADVERTENCIA - ser específico sobre el riesgo y consecuencias]
    </p>
  </div>
</div>
```

### 7.4 Recommendation Box (Recomendación - VERDE)

**Uso:** Recomendaciones de MANEXT, mejores prácticas, consejos de expertos.

```html
<div
  class="recommendation-box"
  role="note"
  aria-label="Recomendación de expertos"
>
  <h4>💡 Recomendación MANEXT</h4>
  <p>
    [TEXTO DE RECOMENDACIÓN ESPECÍFICA Y ACCIONABLE]
    <br /><br />
    <a href="../../contacto.html" class="recommendation-cta">
      Agenda tu evaluación gratuita →
    </a>
  </p>
</div>
```

### 7.5 Grid de Ventajas/Características

```html
<div class="advantages-grid">
  <div class="advantage-item">
    <div class="advantage-icon" aria-hidden="true">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <h5>[TÍTULO VENTAJA]</h5>
    <p>
      [DESCRIPCIÓN CONCISA - 2-3 líneas máximo]
      <br />
      <a href="../../[PAGINA].html">Ver más →</a>
    </p>
  </div>

  <!-- Usar 3 o 6 items para grid balanceado -->
</div>
```

**Íconos SVG disponibles para ventajas:**

```html
<!-- Checkmark / Aprobado -->
<svg
  width="32"
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
>
  <polyline points="20 6 9 17 4 12"></polyline>
</svg>

<!-- Escudo / Seguridad -->
<svg
  width="32"
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
>
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
</svg>

<!-- Reloj / Tiempo -->
<svg
  width="32"
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
>
  <circle cx="12" cy="12" r="10"></circle>
  <polyline points="12 6 12 12 16 14"></polyline>
</svg>

<!-- Certificado / Documento -->
<svg
  width="32"
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
>
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
  <polyline points="14 2 14 8 20 8"></polyline>
  <line x1="16" y1="13" x2="8" y2="13"></line>
  <line x1="16" y1="17" x2="8" y2="17"></line>
</svg>

<!-- Dinero / Precio -->
<svg
  width="32"
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
>
  <line x1="12" y1="1" x2="12" y2="23"></line>
  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
</svg>

<!-- Ubicación / Local -->
<svg
  width="32"
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
>
  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
  <circle cx="12" cy="10" r="3"></circle>
</svg>

<!-- Herramientas / Servicio -->
<svg
  width="32"
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
>
  <path
    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
  ></path>
</svg>

<!-- Usuarios / Equipo -->
<svg
  width="32"
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
>
  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
  <circle cx="9" cy="7" r="4"></circle>
  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
</svg>
```

### 7.6 Tablas de Datos

```html
<div class="table-responsive">
  <table class="data-table">
    <caption class="visually-hidden">
      [DESCRIPCION DE LA TABLA PARA ACCESIBILIDAD]
    </caption>
    <thead>
      <tr>
        <th scope="col">Columna 1</th>
        <th scope="col">Columna 2</th>
        <th scope="col">Columna 3</th>
        <th scope="col">Columna 4</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Columna 1">Dato 1</td>
        <td data-label="Columna 2">Dato 2</td>
        <td data-label="Columna 3">Dato 3</td>
        <td data-label="Columna 4">Dato 4</td>
      </tr>
      <!-- Más filas -->
    </tbody>
  </table>
</div>
```

**Tabla de comparación de extintores (plantilla común):**

```html
<div class="table-responsive">
  <table class="data-table comparison-table">
    <caption>
      Comparación de tipos de extintores según clase de fuego
    </caption>
    <thead>
      <tr>
        <th scope="col">Tipo de Extintor</th>
        <th scope="col">Clase A</th>
        <th scope="col">Clase B</th>
        <th scope="col">Clase C</th>
        <th scope="col">Clase K</th>
        <th scope="col">Uso Recomendado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Tipo"><strong>PQS</strong></td>
        <td data-label="Clase A">✅</td>
        <td data-label="Clase B">✅</td>
        <td data-label="Clase C">✅</td>
        <td data-label="Clase K">❌</td>
        <td data-label="Uso">Oficinas, comercios, industria general</td>
      </tr>
      <tr>
        <td data-label="Tipo"><strong>CO2</strong></td>
        <td data-label="Clase A">❌</td>
        <td data-label="Clase B">✅</td>
        <td data-label="Clase C">✅</td>
        <td data-label="Clase K">❌</td>
        <td data-label="Uso">Equipos eléctricos, servidores, laboratorios</td>
      </tr>
      <tr>
        <td data-label="Tipo"><strong>Tipo K</strong></td>
        <td data-label="Clase A">❌</td>
        <td data-label="Clase B">❌</td>
        <td data-label="Clase C">❌</td>
        <td data-label="Clase K">✅</td>
        <td data-label="Uso">Cocinas comerciales, restaurantes</td>
      </tr>
      <tr>
        <td data-label="Tipo"><strong>Agua</strong></td>
        <td data-label="Clase A">✅</td>
        <td data-label="Clase B">❌</td>
        <td data-label="Clase C">❌</td>
        <td data-label="Clase K">❌</td>
        <td data-label="Uso">Materiales sólidos: papel, madera, textiles</td>
      </tr>
      <tr>
        <td data-label="Tipo"><strong>Espuma AFFF</strong></td>
        <td data-label="Clase A">✅</td>
        <td data-label="Clase B">✅</td>
        <td data-label="Clase C">❌</td>
        <td data-label="Clase K">❌</td>
        <td data-label="Uso">Combustibles líquidos, gasolineras</td>
      </tr>
      <tr>
        <td data-label="Tipo"><strong>Agente Limpio</strong></td>
        <td data-label="Clase A">✅</td>
        <td data-label="Clase B">✅</td>
        <td data-label="Clase C">✅</td>
        <td data-label="Clase K">❌</td>
        <td data-label="Uso">Data centers, equipos sensibles, museos</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 7.7 Imágenes Intermedias con Caption

```html
<figure class="blog-post-image">
  <img
    src="../../img/img-index/[IMAGEN].webp"
    alt="[ALT DESCRIPTIVO con keyword - contexto de la imagen]"
    width="800"
    height="450"
    loading="lazy"
    decoding="async"
  />
  <figcaption class="image-caption">
    [DESCRIPCIÓN DE LA IMAGEN - incluir ubicación CDMX si aplica, ej: "Técnico
    MANEXT realizando mantenimiento de extintor en oficinas de Polanco, CDMX"]
  </figcaption>
</figure>
```

> **Notas sobre imágenes:**
>
> - Imágenes intermedias SIEMPRE con `loading="lazy"` y `decoding="async"`
> - Incluir `width` y `height` para prevenir layout shift
> - Caption descriptivo que aporte contexto
> - Mencionar zonas de CDMX cuando sea posible (Polanco, Santa Fe, Reforma, Condesa, Roma, etc.)

### 7.8 Sección de Preguntas Frecuentes (FAQ)

```html
<section id="preguntas-frecuentes" class="content-section faq-section">
  <h2>Preguntas Frecuentes sobre [TEMA]</h2>

  <div class="faq-list" itemscope itemtype="https://schema.org/FAQPage">
    <div
      class="faq-item"
      itemscope
      itemprop="mainEntity"
      itemtype="https://schema.org/Question"
    >
      <h3 itemprop="name">[PREGUNTA 1 - usar keyword si es natural]</h3>
      <div
        itemscope
        itemprop="acceptedAnswer"
        itemtype="https://schema.org/Answer"
      >
        <div itemprop="text">
          <p>
            [RESPUESTA COMPLETA - 2-4 oraciones. Incluir enlace interno si es
            relevante]
          </p>
        </div>
      </div>
    </div>

    <div
      class="faq-item"
      itemscope
      itemprop="mainEntity"
      itemtype="https://schema.org/Question"
    >
      <h3 itemprop="name">[PREGUNTA 2]</h3>
      <div
        itemscope
        itemprop="acceptedAnswer"
        itemtype="https://schema.org/Answer"
      >
        <div itemprop="text">
          <p>[RESPUESTA]</p>
        </div>
      </div>
    </div>

    <!-- Incluir 4-6 preguntas frecuentes -->
  </div>
</section>
```

**Preguntas frecuentes sugeridas por tema:**

_Para artículos de productos/extintores:_

- ¿Cuánto cuesta un extintor [tipo] en CDMX?
- ¿Cada cuánto tiempo se debe recargar un extintor [tipo]?
- ¿Qué certificaciones debe tener un extintor [tipo]?
- ¿Dónde comprar extintores [tipo] certificados en CDMX?

_Para artículos de servicios:_

- ¿Cuánto cuesta el servicio de [servicio] en CDMX?
- ¿Con qué frecuencia se debe realizar [servicio]?
- ¿Qué incluye el servicio de [servicio] de MANEXT?
- ¿MANEXT ofrece servicio de [servicio] a domicilio?

_Para artículos de normativas:_

- ¿Qué establece la [NOM/NMX] sobre [tema]?
- ¿Cuáles son las multas por incumplir [normativa]?
- ¿Cómo cumplir con [normativa] en mi negocio?
- ¿Quién verifica el cumplimiento de [normativa]?

### 7.9 CTA Intermedio (Call to Action dentro del artículo)

**Insertar 1 CTA intermedio por cada 800-1000 palabras de contenido.**

**Variante 1 - CTA Destacado (Rojo MANEXT):**

```html
<div
  class="cta-intermedio"
  style="background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin: 3rem 0; text-align: center;"
>
  <h3 style="color: white; margin-top: 0; font-size: 1.5rem;">
    [TITULO CTA - Pregunta o afirmación]
  </h3>
  <p style="color: white; font-size: 1.1rem; margin-bottom: 1.5rem;">
    [TEXTO PERSUASIVO - 1-2 oraciones con beneficio claro]
  </p>
  <div
    style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;"
  >
    <a
      href="tel:5539689272"
      style="display: inline-flex; align-items: center; gap: 0.5rem; background: white; color: #d32f2f; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 700;"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        ></path>
      </svg>
      Llamar Ahora
    </a>
    <a
      href="https://wa.me/5215539689272"
      target="_blank"
      rel="noopener"
      style="display: inline-flex; align-items: center; gap: 0.5rem; background: #25D366; color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 700;"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
        />
      </svg>
      WhatsApp
    </a>
  </div>
</div>
```

**Variante 2 - CTA Sutil (dentro del flujo del contenido):**

```html
<div class="info-box" style="border-left: 4px solid #d32f2f;">
  <div class="info-box-content">
    <p>
      <strong>¿Necesitas asesoría personalizada?</strong>
      Nuestros expertos pueden ayudarte a [beneficio específico relacionado con
      la sección].
      <a href="../../contacto.html">Solicita una evaluación gratuita</a> o llama
      al <a href="tel:5539689272">55 3968 9272</a>.
    </p>
  </div>
</div>
```

---

## 8. SIDEBAR COMPLETO

### 8.1 Estructura General del Sidebar

```html
<aside class="blog-post-sidebar" aria-label="Información complementaria">
  <!-- 1. Índice flotante (sticky) -->
  <!-- 2. CTA Widget (teléfono y WhatsApp) -->
  <!-- 3. Artículos Relacionados -->
  <!-- 4. Productos Recomendados -->
  <!-- 5. Widget Catálogo -->
</aside>
```

### 8.2 Índice Flotante (Sticky TOC)

```html
<nav class="sidebar-widget sticky-toc" aria-label="Índice del artículo">
  <h3 class="widget-title">Índice del Artículo</h3>
  <ul class="toc-list">
    <li><a href="#seccion-1">[Versión corta título 1]</a></li>
    <li><a href="#seccion-2">[Versión corta título 2]</a></li>
    <li><a href="#seccion-3">[Versión corta título 3]</a></li>
    <li><a href="#seccion-4">[Versión corta título 4]</a></li>
    <li><a href="#seccion-5">[Versión corta título 5]</a></li>
    <li><a href="#preguntas-frecuentes">FAQ</a></li>
    <li><a href="#conclusion">Conclusión</a></li>
  </ul>
</nav>
```

### 8.3 CTA Widget (Teléfono y WhatsApp)

```html
<div class="sidebar-widget cta-widget">
  <h3 class="widget-title">¿Necesitas Asesoría?</h3>
  <p>
    Nuestros expertos están listos para ayudarte con tu proyecto de seguridad
    contra incendios.
  </p>
  <a href="tel:5539689272" class="widget-cta-btn">
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      ></path>
    </svg>
    Llamar: 55 3968 9272
  </a>
  <a
    href="https://wa.me/5215539689272?text=Hola%2C%20me%20interesa%20información%20sobre%20extintores"
    class="widget-cta-btn whatsapp-btn"
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      />
    </svg>
    WhatsApp
  </a>
</div>
```

### 8.4 Artículos Relacionados Sidebar

```html
<div class="sidebar-widget related-articles-widget">
  <h3 class="widget-title">Artículos Relacionados</h3>
  <div class="sidebar-articles-grid">
    <article class="sidebar-article-card">
      <div class="sidebar-article-image">
        <img
          src="../../img/img-index/[IMAGEN].webp"
          alt="[ALT]"
          loading="lazy"
          width="100"
          height="70"
        />
      </div>
      <div class="sidebar-article-content">
        <h4>
          <a href="../[CATEGORIA]/[SLUG].html">[TITULO - max 50 chars]</a>
        </h4>
        <p class="sidebar-article-excerpt">[DESCRIPCION - 1 línea max]</p>
        <a href="../[CATEGORIA]/[SLUG].html" class="sidebar-article-link"
          >Leer más →</a
        >
      </div>
    </article>

    <!-- Incluir exactamente 4 artículos relacionados -->
  </div>
</div>
```

### 8.5 Productos Recomendados Sidebar

```html
<div class="sidebar-widget products-widget">
  <h3 class="widget-title">Equipos de Prevención</h3>
  <div class="sidebar-products-grid">
    <article class="sidebar-product-card">
      <div class="sidebar-product-image">
        <img
          src="../../img/img-index/[IMAGEN].webp"
          alt="[ALT]"
          loading="lazy"
          width="100"
          height="100"
        />
        <span class="sidebar-product-badge">[BADGE]</span>
      </div>
      <div class="sidebar-product-content">
        <h4><a href="../../[PAGINA].html">[NOMBRE PRODUCTO]</a></h4>
        <p class="sidebar-product-desc">[DESCRIPCION CORTA - 1 línea]</p>
        <div class="sidebar-product-classes">
          <span class="mini-badge class-a" title="Fuegos Clase A">A</span>
          <span class="mini-badge class-b" title="Fuegos Clase B">B</span>
          <span class="mini-badge class-c" title="Fuegos Clase C">C</span>
        </div>
        <a href="../../[PAGINA].html" class="sidebar-product-btn"
          >Ver Detalles</a
        >
      </div>
    </article>

    <!-- Incluir exactamente 4 productos -->
  </div>
</div>
```

**Badges disponibles para productos:**

| Badge       | Clase CSS          | Uso                   |
| ----------- | ------------------ | --------------------- |
| Más Vendido | `badge-bestseller` | Productos populares   |
| Premium     | `badge-premium`    | Línea alta gama       |
| Certificado | `badge-cert`       | Con certificación NOM |
| Normativa   | `badge-nom`        | Cumple NOM específica |
| Nuevo       | `badge-new`        | Productos nuevos      |
| Oferta      | `badge-sale`       | Promociones           |

**Badges de clases de fuego:**

| Clase | CSS       | Descripción                   |
| ----- | --------- | ----------------------------- |
| A     | `class-a` | Sólidos (madera, papel, tela) |
| B     | `class-b` | Líquidos inflamables          |
| C     | `class-c` | Equipos eléctricos            |
| K     | `class-k` | Aceites de cocina             |

### 8.6 Widget Catálogo Destacado

```html
<div class="sidebar-widget highlight-widget">
  <h3 class="widget-title">Catálogo Completo</h3>
  <div class="highlight-content">
    <img
      src="../../img/img-index/venta-y-mantenimiento-de-extintores.webp"
      alt="Catálogo de extintores MANEXT"
      loading="lazy"
      width="280"
      height="180"
    />
    <h4>Todos Nuestros Extintores</h4>
    <p>
      Explora nuestro catálogo completo con todos los tipos, capacidades y
      precios actualizados.
    </p>
    <a href="../../catalogo.html" class="highlight-link"
      >Ver Catálogo Completo →</a
    >
  </div>
</div>
```

---

## 9. CTAS Y CONVERSIÓN

### 9.1 Sección de Artículos Relacionados (Después del contenido)

```html
<section class="related-articles" aria-label="Artículos relacionados">
  <h2>Artículos Relacionados que Te Pueden Interesar</h2>
  <div class="related-grid">
    <article class="related-card">
      <div class="related-image">
        <img
          src="../../img/img-index/[IMAGEN].webp"
          alt="[ALT]"
          loading="lazy"
          width="300"
          height="200"
        />
      </div>
      <div class="related-content">
        <span class="related-category">[CATEGORIA]</span>
        <h3><a href="../[CATEGORIA]/[SLUG].html">[TITULO ARTICULO]</a></h3>
        <p class="related-excerpt">[EXTRACTO 2-3 líneas]</p>
      </div>
    </article>

    <!-- Incluir exactamente 4 artículos relacionados -->
  </div>
</section>
```

### 9.2 CTA Final (Sección de conversión principal)

```html
<section class="final-cta" aria-label="Llamada a la acción">
  <div class="container">
    <div class="final-cta-content">
      <div class="final-cta-text">
        <h2>¿Listo para Proteger tu Negocio con los Expertos?</h2>
        <p>
          Con más de <strong>80 años de experiencia</strong>, MANEXT es tu
          aliado de confianza en protección contra incendios. Nuestros técnicos
          certificados están listos para asesorarte y equipar tu negocio con los
          mejores extintores del mercado.
        </p>
        <ul class="final-cta-benefits">
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Evaluación de riesgos sin costo
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Extintores certificados NOM
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Entrega e instalación gratis en CDMX
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Garantía de 1 año en todos los equipos
          </li>
        </ul>
      </div>
      <div class="final-cta-buttons">
        <a href="../../contacto.html" class="btn-primary-large">
          Solicitar Cotización Gratis
        </a>
        <a href="../../catalogo.html" class="btn-secondary-large">
          Ver Catálogo de Extintores
        </a>
        <p class="final-cta-phone">
          O llámanos ahora:
          <a href="tel:5539689272"><strong>55 3968 9272</strong></a>
        </p>
      </div>
    </div>
  </div>
</section>
```

### 9.3 Variantes de CTA por Tipo de Artículo

**Para artículos informativos/educativos:**

```html
<h2>¿Tienes Dudas? Nuestros Expertos Te Asesoran</h2>
<p>
  Cada negocio es único. Permítenos evaluar tus necesidades específicas y
  recomendarte la mejor solución.
</p>
```

**Para artículos de productos:**

```html
<h2>Encuentra el Extintor Perfecto para tu Negocio</h2>
<p>
  Tenemos la más amplia variedad de extintores certificados. Cotiza hoy y recibe
  tu equipo en 24-48 horas.
</p>
```

**Para artículos de normativas/compliance:**

```html
<h2>Evita Multas y Clausuras - Cumple con la Normativa</h2>
<p>
  Te ayudamos a cumplir con NOM-002-STPS y todos los requisitos de Protección
  Civil. Asesoría experta incluida.
</p>
```

**Para artículos de emergencia/urgencia:**

```html
<h2>¿Necesitas Extintores Urgentes? Entrega en 24 Horas</h2>
<p>
  Servicio express disponible para toda la CDMX. Llámanos ahora y resuelve tu
  emergencia hoy mismo.
</p>
```

---

## 10. DIRECTRICES SEO AVANZADAS

### 10.1 Checklist SEO On-Page

| Elemento             | Requisito                                           | Ejemplo                                                                                                                |
| -------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------ |
| **Title Tag**        | Keyword principal + ubicación + marca (50-60 chars) | "Extintor PQS 4.5 kg: Precio y Características                                                                         | MANEXT CDMX" |
| **Meta Description** | Keyword + beneficio + CTA (150-160 chars)           | "Conoce todo sobre extintores PQS 4.5 kg: precios desde $450, características y usos. Envío gratis CDMX. ¡Cotiza hoy!" |
| **H1**               | Keyword principal + modificador                     | "Extintor PQS 4.5 kg: Guía Completa de Precios, Usos y Mantenimiento"                                                  |
| **URL/Slug**         | Keyword, minúsculas, guiones, sin acentos           | `extintor-pqs-4-5-kg-precio-cdmx`                                                                                      |
| **H2s**              | Keywords secundarias naturales                      | "Características del Extintor PQS", "Precios de Extintores PQS en CDMX"                                                |
| **Imágenes Alt**     | Keyword + descripción                               | "Extintor PQS 4.5 kg color rojo marca MANEXT certificado NOM"                                                          |
| **Enlaces internos** | Mínimo 8, anchor text variado                       | "mantenimiento de extintores", "recarga de extintores CDMX"                                                            |

### 10.2 Densidad de Keywords

| Tipo                     | Densidad Recomendada                    | Ubicación                                      |
| ------------------------ | --------------------------------------- | ---------------------------------------------- |
| **Keyword Principal**    | 1-2% (10-20 menciones en 2000 palabras) | Title, H1, primer párrafo, H2s, último párrafo |
| **Keywords Secundarias** | 0.5-1% cada una                         | H2s, H3s, cuerpo del texto                     |
| **Keywords LSI**         | Natural, sin forzar                     | A lo largo del contenido                       |
| **Keyword en URL**       | 1 vez                                   | Slug del artículo                              |

### 10.3 Keywords LSI (Latent Semantic Indexing)

Para cada artículo, incluir términos relacionados semánticamente. Ejemplo para "extintor PQS":

- Polvo químico seco
- Agente extintor ABC
- Fuegos clase A, B, C
- Presurizado
- Capacidad en kilogramos
- Manguera de descarga
- Manómetro
- NOM-154-SCFI
- Protección Civil
- Brigadas contra incendio

### 10.4 Estructura de URLs

**Formato correcto:**

```
https://mantenimientodeextintores.mx/blog/[categoria]/[keyword-principal-modificador].html
```

**Ejemplos:**

- ✅ `blog/tipos-de-extintores/extintor-pqs-caracteristicas-precios-cdmx.html`
- ✅ `blog/mantenimiento-y-recarga/recarga-extintores-cada-cuando-costo.html`
- ❌ `blog/articulo123.html`
- ❌ `blog/tipos-de-extintores/Extintor_PQS.html`

### 10.5 Estrategia de Enlaces Internos

**Mínimo 8 enlaces por artículo distribuidos así:**

| Destino                  | Cantidad | Anchor Text                                                   |
| ------------------------ | -------- | ------------------------------------------------------------- |
| Página de contacto       | 2-3      | "Solicita tu cotización", "Contáctanos", "Agenda evaluación"  |
| Catálogo                 | 1-2      | "Ver catálogo", "Conoce nuestros productos"                   |
| Páginas de productos     | 2-3      | "Extintor PQS", "Extintor CO2", nombre del producto           |
| Páginas de servicios     | 2-3      | "Mantenimiento de extintores", "Recarga", nombre del servicio |
| Otros artículos del blog | 2-3      | Título o tema del artículo                                    |

**Reglas de anchor text:**

- Variar los anchor text (no repetir el mismo)
- Usar keywords naturales
- Evitar "clic aquí" o "más información"
- Incluir contexto alrededor del enlace

### 10.6 Optimización para Featured Snippets

**Párrafo snippet (40-60 palabras):**

```html
<p class="snippet-target">
  Un extintor PQS (Polvo Químico Seco) es un dispositivo portátil de combate
  contra incendios que utiliza un agente extintor en polvo presurizado. Es
  efectivo contra fuegos clase A (sólidos), B (líquidos) y C (eléctricos),
  siendo el tipo más versátil para uso comercial e industrial.
</p>
```

**Lista snippet:**

```html
<h2>Pasos para Usar un Extintor Correctamente</h2>
<ol class="snippet-list">
  <li>Identificar el tipo de fuego</li>
  <li>Verificar que el extintor sea apropiado</li>
  <li>Quitar el seguro de la palanca</li>
  <li>Apuntar la boquilla a la base del fuego</li>
  <li>Apretar la palanca de descarga</li>
  <li>Barrer de lado a lado hasta apagar</li>
</ol>
```

**Tabla snippet:**

```html
<h2>Precios de Extintores PQS por Capacidad</h2>
<table class="snippet-table">
  <tr>
    <th>Capacidad</th>
    <th>Precio CDMX</th>
  </tr>
  <tr>
    <td>1 kg</td>
    <td>$280 - $350 MXN</td>
  </tr>
  <tr>
    <td>2.5 kg</td>
    <td>$380 - $450 MXN</td>
  </tr>
  <tr>
    <td>4.5 kg</td>
    <td>$450 - $550 MXN</td>
  </tr>
  <tr>
    <td>6 kg</td>
    <td>$550 - $680 MXN</td>
  </tr>
  <tr>
    <td>9 kg</td>
    <td>$750 - $900 MXN</td>
  </tr>
</table>
```

### 10.7 E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

**Elementos para demostrar E-E-A-T:**

1. **Experiencia:**

   - Mencionar los 80+ años de MANEXT
   - Incluir casos de estudio o ejemplos reales
   - Fotos de trabajos realizados

2. **Expertise:**

   - Citar normativas específicas (NOM, NMX)
   - Usar terminología técnica correcta
   - Incluir datos y estadísticas verificables

3. **Autoridad:**

   - Enlaces a fuentes oficiales (STPS, Protección Civil)
   - Mencionar certificaciones
   - Incluir testimonios o reviews

4. **Confianza:**
   - Información de contacto visible
   - Dirección física
   - Garantías y políticas claras

---

## 11. OPTIMIZACIÓN DE IMÁGENES

### 11.1 Especificaciones Técnicas

| Tipo de Imagen | Dimensiones   | Formato | Tamaño Máx | Loading |
| -------------- | ------------- | ------- | ---------- | ------- |
| Destacada/OG   | 1200 x 630 px | WebP    | 150 KB     | eager   |
| Contenido      | 800 x 450 px  | WebP    | 100 KB     | lazy    |
| Sidebar/Thumb  | 300 x 200 px  | WebP    | 50 KB      | lazy    |
| Productos      | 400 x 400 px  | WebP    | 80 KB      | lazy    |

### 11.2 Nomenclatura de Archivos

**Formato:**

```
[keyword-principal]-[descripcion]-[ubicacion].webp
```

**Ejemplos:**

- ✅ `extintor-pqs-6kg-certificado-nom.webp`
- ✅ `recarga-extintores-tecnico-cdmx.webp`
- ✅ `mantenimiento-extintor-oficina-polanco.webp`
- ❌ `IMG_12345.webp`
- ❌ `foto-1.webp`

### 11.3 Alt Text Optimizado

**Estructura:**

```
[Qué es/Qué muestra] + [Contexto relevante] + [Ubicación si aplica]
```

**Ejemplos:**

- ✅ "Extintor PQS de 6 kg color rojo con certificación NOM para uso comercial"
- ✅ "Técnico MANEXT realizando mantenimiento preventivo de extintor en oficinas de Santa Fe, CDMX"
- ✅ "Comparación visual de extintores PQS, CO2 y Tipo K para diferentes clases de fuego"
- ❌ "Imagen de extintor"
- ❌ "foto1"

### 11.4 Imágenes Disponibles

**Ubicación:** `/img/img-index/`

| Archivo                                    | Uso Recomendado                       |
| ------------------------------------------ | ------------------------------------- |
| `venta-de-extintores.webp`                 | Artículos de venta, catálogo          |
| `venta-y-mantenimiento-de-extintores.webp` | General, servicios integrales         |
| `mantenimiento-preventivo.webp`            | Artículos de mantenimiento            |
| `recarga-de-extintores.webp`               | Artículos de recarga                  |
| `prueba-hidrostatica.webp`                 | Pruebas, certificaciones              |
| `capacitacion-y-brigadas.webp`             | Capacitación, brigadas                |
| `senalizacion-y-equipamiento.webp`         | Señalización, equipos complementarios |
| `polvo-quimico-seco-pqs.webp`              | Extintores PQS                        |
| `dioxido-de-carbono-co2.webp`              | Extintores CO2                        |
| `tipo-k.webp`                              | Extintores Tipo K                     |
| `agentes-limpios.webp`                     | Extintores Agente Limpio              |
| `agua-presion.webp`                        | Extintores de Agua                    |
| `espuma-afff.webp`                         | Extintores de Espuma                  |

---

## 12. ACCESIBILIDAD WEB

### 12.1 Requisitos WCAG 2.1 Nivel AA

**Implementar en cada artículo:**

1. **Skip Link** (al inicio del body):

```html
<a href="#main-content" class="skip-link">Saltar al contenido principal</a>
```

2. **Landmarks semánticos:**

```html
<main id="main-content">
  <nav aria-label="...">
    <aside aria-label="...">
      <article>
        <section></section>
      </article>
    </aside>
  </nav>
</main>
```

3. **Encabezados jerárquicos** (H1 → H2 → H3, sin saltar niveles)

4. **Imágenes con alt text** descriptivo

5. **Enlaces descriptivos** (evitar "clic aquí")

6. **Contraste de color** mínimo 4.5:1

### 12.2 ARIA Labels Requeridos

```html
<!-- Navegación -->
<nav aria-label="Ruta de navegación">
  <nav aria-label="Tabla de contenidos del artículo">
    <nav aria-label="Índice del artículo">
      <!-- Secciones -->
      <aside aria-label="Información complementaria">
        <section aria-label="Artículos relacionados">
          <section aria-label="Llamada a la acción">
            <!-- Componentes interactivos -->
            <div role="note" aria-label="Información importante">
              <div role="alert" aria-label="Advertencia importante">
                <!-- SVGs decorativos -->
                <svg aria-hidden="true"></svg>
              </div>
            </div>
          </section>
        </section>
      </aside>
    </nav>
  </nav>
</nav>
```

### 12.3 CSS para Accesibilidad

Agregar en el CSS del sitio:

```css
/* Skip Link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #d32f2f;
  color: white;
  padding: 8px 16px;
  z-index: 100;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
}

/* Texto visualmente oculto pero accesible */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus visible */
:focus-visible {
  outline: 3px solid #d32f2f;
  outline-offset: 2px;
}
```

---

## 13. FOOTER Y SCRIPTS

### 13.1 Footer Container

```html
<!-- FOOTER -->
<div id="footer-container"></div>
```

### 13.2 Scripts de Carga (Optimizados)

```html
<script>
  // Cargar menú y footer de forma asíncrona
  (function () {
    "use strict";

    const basePath = "../../";

    // Función para ajustar rutas
    const adjustPaths = (html) => {
      return html
        .replace(
          /href="(?!http|#|tel:|mailto:|https:\/\/wa)([^"]+)"/g,
          `href="${basePath}$1"`
        )
        .replace(/src="(?!http)([^"]+)"/g, `src="${basePath}$1"`);
    };

    // Cargar menú
    fetch(basePath + "menu.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("menu-container").innerHTML = adjustPaths(data);

        // Re-ejecutar scripts del menú
        document
          .querySelectorAll("#menu-container script")
          .forEach((oldScript) => {
            const newScript = document.createElement("script");
            newScript.textContent = oldScript.textContent;
            oldScript.parentNode.replaceChild(newScript, oldScript);
          });
      })
      .catch((error) => console.error("Error cargando menú:", error));

    // Cargar footer
    fetch(basePath + "footer.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("footer-container").innerHTML =
          adjustPaths(data);
      })
      .catch((error) => console.error("Error cargando footer:", error));
  })();
</script>

<!-- Smooth scroll para tabla de contenidos -->
<script>
  document
    .querySelectorAll(".table-of-contents a, .sticky-toc a")
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          const headerOffset = 80; // Altura del header fijo
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Actualizar URL sin recargar
          history.pushState(null, null, this.getAttribute("href"));
        }
      });
    });
</script>

<!-- Tracking de lectura (opcional - para analytics) -->
<script>
  // Detectar % de scroll para analytics
  let maxScroll = 0;
  const articleContent = document.querySelector(".blog-post-content");

  if (articleContent) {
    const contentHeight = articleContent.offsetHeight;
    const contentTop = articleContent.offsetTop;

    window.addEventListener("scroll", function () {
      const scrollPosition = window.pageYOffset;
      const scrollPercent = Math.round(
        ((scrollPosition - contentTop) / contentHeight) * 100
      );

      if (scrollPercent > maxScroll && scrollPercent <= 100) {
        maxScroll = scrollPercent;

        // Enviar evento a analytics en umbrales específicos
        if ([25, 50, 75, 100].includes(maxScroll)) {
          // gtag('event', 'scroll_depth', { percent: maxScroll });
          console.log("Scroll depth:", maxScroll + "%");
        }
      }
    });
  }
</script>
```

---

## 14. CHECKLIST PRE-PUBLICACIÓN

### 14.1 Estructura HTML

- [ ] DOCTYPE html y lang="es-MX" correcto
- [ ] Meta charset utf-8
- [ ] Meta viewport configurado
- [ ] Preconnect y preload de recursos críticos
- [ ] Title con keyword + MANEXT (50-60 chars)
- [ ] Meta description (150-160 chars)
- [ ] Meta keywords relevantes
- [ ] Meta robots index, follow
- [ ] Meta geolocalización (geo.region, etc.)
- [ ] Open Graph completo (title, description, image, url)
- [ ] Twitter Card configurada
- [ ] Canonical URL correcta
- [ ] Favicon y PWA links

### 14.2 Schema Markup

- [ ] Schema Article con todos los campos
- [ ] Schema BreadcrumbList
- [ ] Schema FAQPage (si hay FAQ)
- [ ] Schema HowTo (si es guía/tutorial)
- [ ] Schema LocalBusiness

### 14.3 Contenido

- [ ] H1 único con keyword principal
- [ ] Párrafo lead con hook + keyword + valor
- [ ] Tabla de contenidos con mínimo 5 + FAQ + Conclusión
- [ ] Mínimo 5 secciones H2
- [ ] Jerarquía correcta (H2 → H3 → H4)
- [ ] Al menos 1 info-box
- [ ] Al menos 1 warning-box o recommendation-box
- [ ] Al menos 3 imágenes (1 destacada + 2 intermedias)
- [ ] Sección FAQ con 4-6 preguntas
- [ ] CTA intermedio cada 800-1000 palabras
- [ ] Sección artículos relacionados (4 items)
- [ ] Longitud 1,800-2,500 palabras

### 14.4 SEO

- [ ] Keyword principal: 1-2% densidad
- [ ] Keywords secundarias en H2s
- [ ] Keywords LSI naturales
- [ ] Mínimo 8 enlaces internos
- [ ] Anchor text variado y descriptivo
- [ ] Alt text en todas las imágenes
- [ ] URL slug optimizada

### 14.5 Sidebar

- [ ] Índice flotante con enlaces funcionales
- [ ] Widget CTA con teléfono y WhatsApp
- [ ] 4 artículos relacionados
- [ ] 4 productos recomendados
- [ ] Widget catálogo

### 14.6 CTA Final

- [ ] Título persuasivo
- [ ] Texto con beneficios claros
- [ ] Lista de 4 beneficios con íconos
- [ ] Botón primario (contacto)
- [ ] Botón secundario (catálogo)
- [ ] Teléfono de contacto

### 14.7 Accesibilidad

- [ ] Skip link al inicio
- [ ] ARIA labels en navegación
- [ ] ARIA labels en componentes
- [ ] SVGs con aria-hidden="true"
- [ ] Alt text descriptivos
- [ ] Encabezados jerárquicos

### 14.8 Rendimiento

- [ ] Imagen destacada con loading="eager"
- [ ] Imágenes intermedias con loading="lazy"
- [ ] Width y height en todas las imágenes
- [ ] Imágenes en formato WebP
- [ ] Tamaño de imágenes optimizado

### 14.9 Scripts

- [ ] Script de carga menú/footer con basePath correcto
- [ ] Script de smooth scroll para TOC
- [ ] Sin errores en consola

### 14.10 Calidad Final

- [ ] Sin errores de sintaxis HTML (validar con W3C)
- [ ] Todos los enlaces funcionando
- [ ] Responsive verificado (móvil, tablet, desktop)
- [ ] Ortografía y gramática revisada
- [ ] Información técnica verificada
- [ ] Precios y datos actualizados

---

## 15. PLANTILLAS Y EJEMPLOS

### 15.1 Comando de Creación Rápida

```bash
# Crear nuevo artículo a partir de plantilla
cp blog/seguridad-contra-incendios/como-elegir-extintor-correcto-negocio-cdmx.html blog/[CATEGORIA]/[NUEVO-SLUG].html

# Abrir para editar
code blog/[CATEGORIA]/[NUEVO-SLUG].html
```

### 15.2 Plantilla de Meta Tags (Copiar y Pegar)

```html
<title>[TITULO - max 60 chars] | MANEXT</title>
<meta
  name="description"
  content="[DESCRIPCION - 150-160 chars con keyword + beneficio + CTA]"
/>
<meta property="og:title" content="[TITULO] | MANEXT" />
<meta property="og:description" content="[DESCRIPCION]" />
<meta
  property="og:url"
  content="https://mantenimientodeextintores.mx/blog/[CATEGORIA]/[SLUG].html"
/>
<meta
  property="og:image"
  content="https://mantenimientodeextintores.mx/img/img-index/[IMAGEN].webp"
/>
<link
  rel="canonical"
  href="https://mantenimientodeextintores.mx/blog/[CATEGORIA]/[SLUG].html"
/>
```

### 15.3 Plantilla de Introducción AIDA

```html
<p class="article-lead">
  <strong>[ESTADÍSTICA IMPACTANTE O PREGUNTA]</strong>
  [1-2 oraciones desarrollando el problema/necesidad]. En MANEXT, con más de
  <strong>80 años de experiencia</strong> en protección contra incendios,
  [promesa de valor específica]. [Keyword principal] [beneficio directo para el
  lector].
</p>
```

### 15.4 Plantilla de Sección Estándar

```html
<section id="[seccion-id]" class="content-section">
  <h2>[TITULO CON KEYWORD SECUNDARIA]</h2>

  <p>
    [Párrafo introductorio - establecer contexto y relevancia - 2-3 oraciones]
  </p>

  <h3>[Subtema 1]</h3>
  <p>[Contenido detallado con ejemplos específicos]</p>

  <h3>[Subtema 2]</h3>
  <p>[Más contenido con datos o estadísticas]</p>

  <!-- Componente visual: elegir uno apropiado -->
  <div class="info-box">
    <div class="info-box-icon"><!-- SVG --></div>
    <div class="info-box-content">
      <h4>Dato Clave</h4>
      <p>[Información importante que el lector debe recordar]</p>
    </div>
  </div>

  <p>
    [Párrafo de cierre con enlace interno relevante]
    <a href="../../[PAGINA-RELACIONADA].html">[CTA contextual]</a>.
  </p>
</section>
```

### 15.5 Plantilla de FAQ Schema

```html
<section id="preguntas-frecuentes" class="content-section faq-section">
  <h2>Preguntas Frecuentes sobre [TEMA]</h2>

  <div class="faq-list">
    <div
      class="faq-item"
      itemscope
      itemprop="mainEntity"
      itemtype="https://schema.org/Question"
    >
      <h3 itemprop="name">¿[PREGUNTA CON KEYWORD]?</h3>
      <div
        itemscope
        itemprop="acceptedAnswer"
        itemtype="https://schema.org/Answer"
      >
        <div itemprop="text">
          <p>[RESPUESTA DIRECTA Y COMPLETA - 2-4 oraciones]</p>
        </div>
      </div>
    </div>
    <!-- Repetir para 4-6 preguntas -->
  </div>
</section>
```

---

## 16. AGREGAR ARTICULO AL LISTADO DEL BLOG (blog.html)

Una vez creado el artículo HTML, es necesario agregarlo al listado principal del blog para que aparezca en la página `blog.html`.

### 16.1 Ubicación del Archivo

**Archivo:** `/blog.html`

**Sección a modificar:** Buscar `<main class="blog-main" id="articles-container">`

### 16.2 Estructura de Card de Artículo

Agregar el nuevo artículo **al inicio** del contenedor (después de `<main class="blog-main" id="articles-container">`):

```html
<!-- Artículo - [TITULO CORTO] -->
<article class="blog-card" data-date="YYYY-MM-DD">
  <div class="blog-card-image">
    <img src="img/img-index/[IMAGEN].webp" alt="[ALT DESCRIPTIVO]" loading="lazy">
    <span class="blog-category">[NOMBRE CATEGORIA]</span>
  </div>
  <div class="blog-card-content">
    <h2 class="blog-card-title">
      <a href="blog/[CATEGORIA]/[SLUG].html">[TITULO COMPLETO DEL ARTICULO]</a>
    </h2>
    <p class="blog-card-excerpt">
      [DESCRIPCION BREVE - 1-2 oraciones, máximo 150 caracteres]
    </p>
    <a href="blog/[CATEGORIA]/[SLUG].html" class="blog-read-more">
      Leer más
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </a>
  </div>
</article>
```

### 16.3 Atributo data-date (OBLIGATORIO)

El atributo `data-date` es **crítico** para el sistema de paginación y ordenamiento:

```html
<article class="blog-card" data-date="2025-11-26">
```

**Formato:** `YYYY-MM-DD` (Año-Mes-Día)

**Ejemplo:** Para un artículo del 26 de noviembre de 2025 → `data-date="2025-11-26"`

> **IMPORTANTE:** El sistema de paginación ordena automáticamente los artículos por fecha, mostrando los más recientes primero. Siempre usa la fecha real de publicación.

### 16.4 Categorías Disponibles para el Badge

| Categoría | Carpeta |
|-----------|---------|
| Seguridad Contra Incendios | `seguridad-contra-incendios/` |
| Tipos de Extintores | `tipos-de-extintores/` |
| Mantenimiento y Recarga | `mantenimiento-y-recarga/` |
| Equipos Contra Incendio | `equipos-contra-incendio/` |
| Normativas y Certificaciones | `normativas-y-certificaciones/` |
| Prevención Empresarial | `prevencion-empresarial/` |

### 16.5 Sistema de Paginación

El blog incluye un sistema de paginación automático con las siguientes características:

- **Artículos por página:** 6
- **Ordenamiento:** Automático por fecha (más reciente primero)
- **Navegación:** Botones "Anterior"/"Siguiente" + números de página

**El sistema funciona automáticamente.** Solo necesitas:
1. Agregar el artículo con el atributo `data-date` correcto
2. El JavaScript ordena y pagina automáticamente

### 16.6 Actualizar Sidebar "Artículos Populares" (Opcional)

Si el nuevo artículo es destacado, agregarlo al sidebar:

**Ubicación:** Buscar `<!-- Artículos Populares -->` en blog.html

```html
<article class="popular-post">
  <div class="popular-post-image">
    <img src="img/img-index/[IMAGEN].webp" alt="[ALT]" loading="lazy">
  </div>
  <div class="popular-post-content">
    <h4><a href="blog/[CATEGORIA]/[SLUG].html">[TITULO CORTO]</a></h4>
  </div>
</article>
```

### 16.7 Ejemplo Completo de Nuevo Artículo

```html
<!-- Artículo - Venta de Extintores CDMX -->
<article class="blog-card" data-date="2025-11-26">
  <div class="blog-card-image">
    <img src="img/img-index/venta-de-extintores.webp" alt="Venta de Extintores en CDMX" loading="lazy">
    <span class="blog-category">Seguridad Contra Incendios</span>
  </div>
  <div class="blog-card-content">
    <h2 class="blog-card-title">
      <a href="blog/seguridad-contra-incendios/venta-extintores-cdmx-guia-compra-empresas.html">Venta de Extintores en CDMX: Guía Completa para Empresas 2025</a>
    </h2>
    <p class="blog-card-excerpt">
      Guía completa de compra de extintores certificados en Ciudad de México. Precios actualizados, tipos disponibles y zonas de entrega.
    </p>
    <a href="blog/seguridad-contra-incendios/venta-extintores-cdmx-guia-compra-empresas.html" class="blog-read-more">
      Leer más
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </a>
  </div>
</article>
```

### 16.8 Checklist para Agregar Artículo al Blog

- [ ] Artículo HTML creado en `blog/[categoria]/[slug].html`
- [ ] Card agregado en `blog.html` dentro de `#articles-container`
- [ ] Atributo `data-date` con fecha en formato `YYYY-MM-DD`
- [ ] Categoría correcta en `<span class="blog-category">`
- [ ] URL del enlace coincide con ubicación real del archivo
- [ ] Imagen existe en `img/img-index/`
- [ ] Excerpt de máximo 150 caracteres
- [ ] (Opcional) Agregado a "Artículos Populares" en sidebar

---

## APÉNDICE A: RECURSOS Y HERRAMIENTAS

### Herramientas SEO Recomendadas

- **Validador HTML:** https://validator.w3.org/
- **Test de Schema:** https://search.google.com/test/rich-results
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
- **Contador de palabras:** https://wordcounter.net/

### Recursos de Normativas Mexicanas

- **NOM-002-STPS:** Seguridad e higiene en centros de trabajo
- **NOM-154-SCFI:** Extintores - Requisitos de agentes extintores
- **NMX-S-042-SCFI:** Seguridad - Extintores - Especificaciones
- **Protección Civil CDMX:** https://www.proteccioncivil.cdmx.gob.mx/

---

**Documento creado por:** Sistema de Auditoría MANEXT
**Versión:** 2.1
**Fecha:** Noviembre 2025
**Última actualización:** 26 de Noviembre 2025 - Agregada sección 16 (Integración con blog.html y sistema de paginación)
**Próxima revisión:** Febrero 2026
