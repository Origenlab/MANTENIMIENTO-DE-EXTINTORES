# GUIA COMPLETA: Sistema de Generacion Automatica de Articulos SEO
## MEDEDUL v10.0 - NeuronWriter + Claude + N8N + GitHub

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ███╗   ███╗███████╗██████╗ ███████╗██████╗ ██╗   ██╗██╗                   ║
║   ████╗ ████║██╔════╝██╔══██╗██╔════╝██╔══██╗██║   ██║██║                   ║
║   ██╔████╔██║█████╗  ██║  ██║█████╗  ██║  ██║██║   ██║██║                   ║
║   ██║╚██╔╝██║██╔══╝  ██║  ██║██╔══╝  ██║  ██║██║   ██║██║                   ║
║   ██║ ╚═╝ ██║███████╗██████╔╝███████╗██████╔╝╚██████╔╝███████╗              ║
║   ╚═╝     ╚═╝╚══════╝╚═════╝ ╚══════╝╚═════╝  ╚═════╝ ╚══════╝              ║
║                                                                              ║
║   WORKFLOW AUTOMATIZADO DE CONTENIDO SEO v10.0                              ║
║   Documentacion Tecnica Completa                                             ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## TABLA DE CONTENIDOS

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Arquitectura del Sistema](#2-arquitectura-del-sistema)
3. [Stack Tecnologico](#3-stack-tecnologico)
4. [Configuracion Inicial](#4-configuracion-inicial)
5. [Estructura del Sitio Web](#5-estructura-del-sitio-web)
6. [Workflow N8N Paso a Paso](#6-workflow-n8n-paso-a-paso)
7. [Clases CSS del Sistema](#7-clases-css-del-sistema)
8. [Formato de Datos y Schemas](#8-formato-de-datos-y-schemas)
9. [Prompts y Configuracion de Claude](#9-prompts-y-configuracion-de-claude)
10. [Integracion con NeuronWriter](#10-integracion-con-neuronwriter)
11. [Publicacion en GitHub](#11-publicacion-en-github)
12. [Sistema de Notificaciones](#12-sistema-de-notificaciones)
13. [Mantenimiento y Operacion](#13-mantenimiento-y-operacion)
14. [Troubleshooting](#14-troubleshooting)
15. [Checklist de Implementacion](#15-checklist-de-implementacion)
16. [Anexos](#16-anexos)

---

## 1. RESUMEN EJECUTIVO

### 1.1 Que es este sistema?

Este sistema automatiza completamente la creacion, optimizacion SEO y publicacion de articulos para el blog de **mesas-de-dulces.com**. Combina inteligencia artificial con analisis SEO en tiempo real para generar contenido que:

- **Posiciona** en la primera pagina de Google
- **Conecta** emocionalmente con el publico objetivo
- **Convierte** lectores en contactos de WhatsApp

### 1.2 Flujo simplificado

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  TRIGGER    │────▶│ NEURONWRITER│────▶│   CLAUDE    │────▶│   GITHUB    │
│  (N8N)      │     │  (SEO/NLP)  │     │ (Contenido) │     │(Publicacion)│
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                    │
                    ┌─────────────┐                                 │
                    │  TELEGRAM   │◀────────────────────────────────┘
                    │(Notificacion)│
                    └─────────────┘
```

### 1.3 Resultados por ejecucion

| Entregable | Descripcion |
|------------|-------------|
| **Articulo HTML** | Archivo `.html` optimizado para SEO en `/blog/` |
| **Card en Blog** | Entrada en `articles.json` para listado |
| **Sitemap** | URL agregada a `sitemap.xml` |
| **Notificacion** | Mensaje en Telegram con URL y score NLP |

### 1.4 Metricas clave

- **Frecuencia**: Cada 3 dias automatico + manual ilimitado
- **Tiempo de ejecucion**: ~5-7 minutos por articulo
- **Longitud promedio**: 2,000+ palabras
- **Score NLP objetivo**: 70+ (competitivo con top 5 Google)

---

## 2. ARQUITECTURA DEL SISTEMA

### 2.1 Diagrama de arquitectura completo

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                           N8N WORKFLOW ENGINE                                ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐  ║
║  │                        FASE 1: INICIALIZACION                          │  ║
║  │  ┌──────────────┐    ┌──────────────┐                                  │  ║
║  │  │   Trigger    │    │   Trigger    │                                  │  ║
║  │  │  Programado  │    │   Manual     │                                  │  ║
║  │  │  (3 dias)    │    │  (on-demand) │                                  │  ║
║  │  └──────┬───────┘    └──────┬───────┘                                  │  ║
║  │         └────────┬──────────┘                                          │  ║
║  │                  ▼                                                      │  ║
║  │         ┌──────────────┐                                               │  ║
║  │         │   Selector   │  • Producto aleatorio (sin repetir)          │  ║
║  │         │  Inteligente │  • Tipo de articulo                          │  ║
║  │         │              │  • Imagen hero                                │  ║
║  │         │              │  • Colonias CDMX                              │  ║
║  │         └──────┬───────┘                                               │  ║
║  └────────────────┼───────────────────────────────────────────────────────┘  ║
║                   ▼                                                          ║
║  ┌────────────────────────────────────────────────────────────────────────┐  ║
║  │                     FASE 2: ANALISIS SEO (NeuronWriter)                │  ║
║  │  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐             │  ║
║  │  │   Crear      │    │    Wait      │    │   Obtener    │             │  ║
║  │  │   Query      │───▶│   65 seg     │───▶│  Resultados  │             │  ║
║  │  │              │    │              │    │              │             │  ║
║  │  └──────────────┘    └──────────────┘    └──────┬───────┘             │  ║
║  │                                                  ▼                     │  ║
║  │  Datos obtenidos:                       ┌──────────────┐              │  ║
║  │  • Terminos NLP                         │   Procesar   │              │  ║
║  │  • People Also Ask                      │    Datos     │              │  ║
║  │  • Competidores top 5                   │              │              │  ║
║  │  • Score promedio                       └──────┬───────┘              │  ║
║  └────────────────────────────────────────────────┼───────────────────────┘  ║
║                                                   ▼                          ║
║  ┌────────────────────────────────────────────────────────────────────────┐  ║
║  │                    FASE 3: GENERACION DE CONTENIDO                     │  ║
║  │  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐             │  ║
║  │  │  Constructor │    │   Preparar   │    │   Claude     │             │  ║
║  │  │   Prompt     │───▶│   Request    │───▶│   Sonnet     │             │  ║
║  │  │              │    │              │    │   API        │             │  ║
║  │  └──────────────┘    └──────────────┘    └──────┬───────┘             │  ║
║  │                                                  ▼                     │  ║
║  │  Contenido generado:                    ┌──────────────┐              │  ║
║  │  • Titulo SEO                           │   Validar    │              │  ║
║  │  • Meta descripcion                     │  Respuesta   │              │  ║
║  │  • HTML completo (2000+ palabras)       │  + Slug      │              │  ║
║  │  • FAQ Schema                           └──────┬───────┘              │  ║
║  └────────────────────────────────────────────────┼───────────────────────┘  ║
║                                                   ▼                          ║
║  ┌────────────────────────────────────────────────────────────────────────┐  ║
║  │                      FASE 4: EVALUACION SEO                            │  ║
║  │  ┌──────────────┐    ┌──────────────┐                                 │  ║
║  │  │ NeuronWriter │    │   Procesar   │                                 │  ║
║  │  │   Evaluar    │───▶│  Score NLP   │  Score: 70-85 tipico           │  ║
║  │  │  Contenido   │    │              │                                 │  ║
║  │  └──────────────┘    └──────┬───────┘                                 │  ║
║  └────────────────────────────────────────────────┼───────────────────────┘  ║
║                                                   ▼                          ║
║  ┌────────────────────────────────────────────────────────────────────────┐  ║
║  │                       FASE 5: CONSTRUCCION                             │  ║
║  │  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐             │  ║
║  │  │   Obtener    │    │  Construir   │    │  Construir   │             │  ║
║  │  │  Template    │───▶│    HTML      │───▶│    Card      │             │  ║
║  │  │   GitHub     │    │  (replace)   │    │  (JSON)      │             │  ║
║  │  └──────────────┘    └──────────────┘    └──────┬───────┘             │  ║
║  └────────────────────────────────────────────────┼───────────────────────┘  ║
║                                                   ▼                          ║
║  ┌────────────────────────────────────────────────────────────────────────┐  ║
║  │                       FASE 6: PUBLICACION                              │  ║
║  │  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐             │  ║
║  │  │    Subir     │    │  Actualizar  │    │  Actualizar  │             │  ║
║  │  │  Articulo    │───▶│   articles   │───▶│   sitemap    │             │  ║
║  │  │   .html      │    │    .json     │    │    .xml      │             │  ║
║  │  └──────────────┘    └──────────────┘    └──────┬───────┘             │  ║
║  └────────────────────────────────────────────────┼───────────────────────┘  ║
║                                                   ▼                          ║
║  ┌────────────────────────────────────────────────────────────────────────┐  ║
║  │                       FASE 7: NOTIFICACION                             │  ║
║  │  ┌──────────────┐    ┌──────────────┐                                 │  ║
║  │  │   Telegram   │    │     FIN      │                                 │  ║
║  │  │   Mensaje    │───▶│              │                                 │  ║
║  │  └──────────────┘    └──────────────┘                                 │  ║
║  └────────────────────────────────────────────────────────────────────────┘  ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

### 2.2 Componentes externos

| Componente | Funcion | Endpoint |
|------------|---------|----------|
| **NeuronWriter** | Analisis SERP y terminos NLP | `app.neuronwriter.com/neuron-api/` |
| **Claude (Anthropic)** | Generacion de contenido | `api.anthropic.com/v1/messages` |
| **GitHub API** | Almacenamiento y publicacion | `api.github.com/repos/` |
| **Telegram Bot** | Notificaciones | `api.telegram.org/bot` |

---

## 3. STACK TECNOLOGICO

### 3.1 Servicios requeridos

```
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICIOS EXTERNOS                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │    N8N      │  │ NeuronWriter│  │  Anthropic  │             │
│  │  Workflow   │  │    SEO      │  │   Claude    │             │
│  │  Engine     │  │  Analysis   │  │     AI      │             │
│  │             │  │             │  │             │             │
│  │  Self-host  │  │  Plan API   │  │  API Key    │             │
│  │  o Cloud    │  │  $49/mes    │  │  Pay-as-go  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐                              │
│  │   GitHub    │  │  Telegram   │                              │
│  │    Repo     │  │    Bot      │                              │
│  │             │  │             │                              │
│  │  Token con  │  │  @BotFather │                              │
│  │  repo perms │  │  gratuito   │                              │
│  └─────────────┘  └─────────────┘                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Credenciales necesarias

Crear un archivo `.env` o configurar en N8N:

```env
# ═══════════════════════════════════════════════════
# NEURONWRITER
# Obtener en: neuronwriter.com > Settings > API
# ═══════════════════════════════════════════════════
NEURONWRITER_API_KEY=n-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEURONWRITER_PROJECT_ID=xxxxxxxxxxxxxxxx

# ═══════════════════════════════════════════════════
# ANTHROPIC (CLAUDE)
# Obtener en: console.anthropic.com > API Keys
# ═══════════════════════════════════════════════════
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxx

# ═══════════════════════════════════════════════════
# GITHUB
# Crear en: github.com > Settings > Developer settings > Personal access tokens
# Permisos: repo (full control)
# ═══════════════════════════════════════════════════
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=TuOrganizacion
GITHUB_REPO=TuRepositorio
GITHUB_BRANCH=main

# ═══════════════════════════════════════════════════
# TELEGRAM
# Crear bot con @BotFather
# Obtener chat_id enviando mensaje al bot y usando getUpdates
# ═══════════════════════════════════════════════════
TELEGRAM_BOT_TOKEN=xxxxxxxxxx:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TELEGRAM_CHAT_ID=xxxxxxxxx
```

### 3.3 Costos estimados mensuales

| Servicio | Plan | Costo | Notas |
|----------|------|-------|-------|
| N8N | Self-hosted | $0 | Requiere servidor |
| N8N | Cloud Starter | $20/mes | 5 workflows activos |
| NeuronWriter | Business | $49/mes | 50 queries/mes |
| Claude API | Pay-as-you-go | ~$5-15/mes | ~$0.15 por articulo |
| GitHub | Free | $0 | Repos publicos/privados |
| Telegram | Free | $0 | Bots gratuitos |
| **TOTAL** | | **$25-85/mes** | |

---

## 4. CONFIGURACION INICIAL

### 4.1 Paso 1: Configurar NeuronWriter

1. Crear cuenta en [neuronwriter.com](https://neuronwriter.com)
2. Ir a **Settings > API**
3. Copiar `API Key`
4. Crear un proyecto para tu sitio
5. Copiar el `Project ID` de la URL

```
URL del proyecto: https://app.neuronwriter.com/projects/bfac34935e7b9b8d/...
                                                    └──────────────────┘
                                                       Este es el ID
```

### 4.2 Paso 2: Configurar Anthropic

1. Crear cuenta en [console.anthropic.com](https://console.anthropic.com)
2. Ir a **API Keys**
3. Crear nueva key con nombre descriptivo
4. Copiar y guardar (solo se muestra una vez)

### 4.3 Paso 3: Configurar GitHub

1. Ir a GitHub > **Settings > Developer settings > Personal access tokens > Tokens (classic)**
2. Click en **Generate new token (classic)**
3. Nombre: "N8N Workflow MEDEDUL"
4. Expiracion: Recomendado 1 ano
5. Scopes: Marcar **repo** (full control)
6. Generar y copiar token

### 4.4 Paso 4: Configurar Telegram Bot

```bash
# 1. Abrir Telegram y buscar @BotFather
# 2. Enviar /newbot
# 3. Seguir instrucciones para nombrar el bot
# 4. Copiar el token que te da

# 5. Para obtener tu chat_id:
# - Enviar cualquier mensaje a tu nuevo bot
# - Abrir en navegador:
https://api.telegram.org/bot<TU_TOKEN>/getUpdates

# 6. Buscar en la respuesta:
"chat":{"id":772938445,...}
              └────────┘
           Este es tu chat_id
```

### 4.5 Paso 5: Importar workflow en N8N

1. Abrir N8N
2. Click en **...** (menu) > **Import from File**
3. Seleccionar: `workflow-MEDEDUL-mesas-dulces-v10-neuronwriter.json`
4. Actualizar credenciales en cada nodo HTTP Request

---

## 5. ESTRUCTURA DEL SITIO WEB

### 5.1 Arbol de archivos requeridos

```
/tu-sitio-web/
│
├── /blog/
│   ├── index.html                    # Listado de articulos
│   ├── config.js                     # Configuracion del blog
│   ├── articles.json                 # Base de datos de articulos
│   ├── TEMPLATE-ARTICULO.html        # Plantilla para nuevos articulos
│   └── [articulos-generados].html    # Articulos del workflow
│
├── /css/
│   ├── styles.css                    # Estilos globales
│   ├── blog.css                      # Estilos del listado
│   ├── blog-article.css              # Estilos de articulos (CRITICO)
│   └── mobile-first.css              # Responsive
│
├── /img/galeria/
│   └── [imagenes-hero].avif          # Imagenes para articulos
│
└── sitemap.xml                       # Sitemap del sitio
```

### 5.2 Archivo: blog/config.js

```javascript
// ═══════════════════════════════════════════════════════════════
// CONFIGURACION CENTRAL DEL BLOG
// Este archivo define categorias, validacion y defaults
// ═══════════════════════════════════════════════════════════════

const BLOG_CONFIG = {
    // Rutas de archivos
    paths: {
        jsonFile: 'articles.json',
        templateFile: 'TEMPLATE-ARTICULO.html',
        articlesDir: '/blog/',
        imagesDir: '../img/galeria/'
    },

    // Reglas de validacion
    validation: {
        slugPattern: /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
        slugMinLength: 10,
        slugMaxLength: 70,
        requiredFields: ['id', 'title', 'excerpt', 'category', 'image', 'slug', 'readTime']
    },

    // Categorias disponibles
    // IMPORTANTE: Deben coincidir con las del workflow
    categories: {
        'bodas': {
            name: 'Bodas',
            color: '#E91E8C',
            icon: '💒',
            cta: 'Cotizar Mesa Boda'
        },
        'xv-anos': {
            name: 'XV Anos',
            color: '#9C27B0',
            icon: '👑',
            cta: 'Cotizar XV Anos'
        },
        'baby-shower': {
            name: 'Baby Shower',
            color: '#00BCD4',
            icon: '👶',
            cta: 'Cotizar Baby Shower'
        },
        'corporativos': {
            name: 'Corporativos',
            color: '#607D8B',
            icon: '🏢',
            cta: 'Solicitar Cotizacion'
        },
        'infantiles': {
            name: 'Infantiles',
            color: '#FF9800',
            icon: '🎂',
            cta: 'Ver Opciones Infantil'
        },
        'estaciones': {
            name: 'Estaciones',
            color: '#795548',
            icon: '🍫',
            cta: 'Cotizar Estacion'
        }
    },

    // Valores por defecto
    defaults: {
        image: '../img/galeria/candy-bar-boda-rosa-dorado-elegante-peonias.avif',
        readTime: '8 min lectura',
        cta: 'Leer Mas'
    },

    // Paginacion
    pagination: {
        itemsPerPage: 12
    }
};
```

### 5.3 Archivo: blog/articles.json

```json
{
  "version": "2.0",
  "lastUpdate": "2025-01-31",
  "totalArticles": 58,
  "articles": [
    {
      "id": 1738300800000,
      "title": "Mesa de Dulces Infantil: Guia Completa para Fiestas Magicas",
      "excerpt": "Descubre como crear la mesa de dulces perfecta para fiestas infantiles. Tips de expertos, tendencias y todo lo que necesitas saber.",
      "category": "infantiles",
      "image": "../img/galeria/candy-bar-fiesta-ninos-arcoiris-dulces.avif",
      "slug": "mesa-de-dulces-infantil-guia-completa-para-fiestas-magi-polanco",
      "readTime": "10 min lectura",
      "cta": "Ver Opciones Infantil",
      "nlpScore": 78,
      "metaDescription": "Guia completa para crear mesas de dulces infantiles en CDMX. Tips profesionales, tendencias y cotizacion sin compromiso.",
      "metaKeywords": "mesa dulces infantil, candy bar ninos, fiesta infantil cdmx",
      "breadcrumbText": "Mesa Dulces Infantil"
    }
    // ... mas articulos (el mas reciente primero)
  ]
}
```

### 5.4 Archivo: blog/TEMPLATE-ARTICULO.html

```html
<!DOCTYPE html>
<html lang="es-MX">
<head>
    <!-- Analytics -->
    <script src="https://app.rybbit.io/api/script.js" data-site-id="xxx" defer></script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow">

    <!-- SEO Basico -->
    <title>{{TITULO}} | {{SITE_NAME}} CDMX</title>
    <meta name="description" content="{{META_DESCRIPTION}}">
    <meta name="keywords" content="{{META_KEYWORDS}}">
    <meta name="author" content="{{SITE_NAME}} - Mesas de Dulces Profesionales">
    <link rel="canonical" href="https://{{SITE_DOMAIN}}/blog/{{SLUG}}">

    <!-- Open Graph -->
    <meta property="og:title" content="{{TITULO}}">
    <meta property="og:description" content="{{META_DESCRIPTION}}">
    <meta property="og:image" content="https://{{SITE_DOMAIN}}/{{IMAGEN_PRINCIPAL}}">
    <meta property="og:url" content="https://{{SITE_DOMAIN}}/blog/{{SLUG}}">
    <meta property="og:type" content="article">
    <meta property="og:locale" content="es_MX">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{TITULO}}">
    <meta name="twitter:description" content="{{META_DESCRIPTION}}">
    <meta name="twitter:image" content="https://{{SITE_DOMAIN}}/{{IMAGEN_PRINCIPAL}}">

    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="../img/branding/favicon-32x32.png">
    <meta name="theme-color" content="#E91E8C">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- CSS -->
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/header-footer.css">
    <link rel="stylesheet" href="../css/blog-article.css">
    <link rel="stylesheet" href="../css/mobile-first.css">

    <!-- Article Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "{{TITULO}}",
        "description": "{{META_DESCRIPTION}}",
        "image": "https://{{SITE_DOMAIN}}/{{IMAGEN_PRINCIPAL}}",
        "author": {
            "@type": "Organization",
            "name": "{{SITE_NAME}}"
        },
        "publisher": {
            "@type": "Organization",
            "name": "{{SITE_NAME}}",
            "logo": {
                "@type": "ImageObject",
                "url": "https://{{SITE_DOMAIN}}/img/branding/logo.avif"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://{{SITE_DOMAIN}}/blog/{{SLUG}}"
        }
    }
    </script>

    <!-- FAQ Schema -->
    <script type="application/ld+json">
    {{FAQ_SCHEMA}}
    </script>
</head>
<body>
    <!-- HEADER DEL SITIO -->

    <main class="article-main">
        <div class="article-container">

            <!-- Breadcrumb -->
            <nav class="article-breadcrumb" aria-label="Breadcrumb">
                <ol itemscope itemtype="https://schema.org/BreadcrumbList">
                    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                        <a itemprop="item" href="/"><span itemprop="name">Inicio</span></a>
                        <meta itemprop="position" content="1">
                    </li>
                    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                        <a itemprop="item" href="/blog/"><span itemprop="name">Blog</span></a>
                        <meta itemprop="position" content="2">
                    </li>
                    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                        <span itemprop="name">{{BREADCRUMB_TEXT}}</span>
                        <meta itemprop="position" content="3">
                    </li>
                </ol>
            </nav>

            <div class="article-layout">
                <!-- Contenido principal -->
                <article class="article-body" itemscope itemtype="https://schema.org/Article">

                    <!-- Hero -->
                    <header class="article-hero">
                        <span class="article-category article-category-{{CATEGORIA_SLUG}}">{{CATEGORIA}}</span>
                        <h1 itemprop="headline">{{TITULO}}</h1>
                        <div class="article-meta">
                            <span class="read-time">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                {{TIEMPO_LECTURA}}
                            </span>
                        </div>
                    </header>

                    <!-- Imagen principal -->
                    <figure class="article-featured-image">
                        <img
                            src="../{{IMAGEN_PRINCIPAL}}"
                            alt="{{IMAGEN_ALT}}"
                            width="1200"
                            height="450"
                            itemprop="image"
                            onerror="this.onerror=null;this.src='../img/galeria/default.avif';">
                        <figcaption class="visually-hidden">{{TITULO}} - {{SITE_NAME}} CDMX</figcaption>
                    </figure>

                    <!-- Contenido del articulo -->
                    <div class="article-content" itemprop="articleBody">
                        <!-- ========== CONTENIDO GENERADO POR WORKFLOW ========== -->
                        {{CONTENIDO}}
                        <!-- ========== FIN CONTENIDO ========== -->

                        <!-- CTA Final -->
                        <div class="article-cta">
                            <h3>¿Listo para crear tu mesa de dulces perfecta?</h3>
                            <p>Transformamos tu evento en una experiencia inolvidable. Cotiza sin compromiso.</p>
                            <a href="https://wa.me/{{SITE_WHATSAPP}}?text=Hola!%20Lei%20el%20articulo%20{{SLUG}}%20y%20me%20interesa%20cotizar" class="btn-cta" target="_blank" rel="noopener">
                                <svg viewBox="0 0 24 24" fill="currentColor"><!-- WhatsApp icon --></svg>
                                Cotizar Mesa de Dulces
                            </a>
                        </div>

                        <!-- Compartir -->
                        <div class="article-share">
                            <span>Compartir articulo:</span>
                            <div class="share-links">
                                <a href="https://www.facebook.com/sharer/sharer.php?u=https://{{SITE_DOMAIN}}/blog/{{SLUG}}" target="_blank" rel="noopener" aria-label="Compartir en Facebook">
                                    <!-- Facebook icon -->
                                </a>
                                <a href="https://pinterest.com/pin/create/button/?url=https://{{SITE_DOMAIN}}/blog/{{SLUG}}" target="_blank" rel="noopener" aria-label="Compartir en Pinterest">
                                    <!-- Pinterest icon -->
                                </a>
                                <a href="https://wa.me/?text={{TITULO}}%20-%20https://{{SITE_DOMAIN}}/blog/{{SLUG}}" target="_blank" rel="noopener" aria-label="Compartir en WhatsApp">
                                    <!-- WhatsApp icon -->
                                </a>
                            </div>
                        </div>
                    </div>
                </article>

                <!-- Sidebar -->
                <aside class="article-sidebar">
                    <div class="sidebar-sticky">
                        <!-- Widget CTA WhatsApp -->
                        <div class="sidebar-widget sidebar-cta-whatsapp">
                            <div class="sidebar-cta-badge">Atencion Personalizada</div>
                            <h4>¿Planeas tu Evento?</h4>
                            <p>Creamos mesas de dulces elegantes para cualquier ocasion</p>
                            <a href="https://wa.me/{{SITE_WHATSAPP}}" class="sidebar-cta-btn-wa" target="_blank" rel="noopener">
                                Cotizar por WhatsApp
                            </a>
                            <span class="sidebar-cta-phone"><a href="tel:{{SITE_PHONE}}">{{SITE_PHONE_DISPLAY}}</a></span>
                        </div>

                        <!-- Widget Servicios -->
                        <div class="sidebar-widget">
                            <h3 class="sidebar-widget-title">Servicios Destacados</h3>
                            <div class="sidebar-services-grid">
                                <a href="../candy-bar-eventos/mesa-dulces-boda" class="sidebar-service-item">
                                    <span class="service-icon">💒</span>
                                    <span class="service-name">Bodas</span>
                                </a>
                                <!-- Mas servicios -->
                            </div>
                        </div>

                        <!-- Widget Zonas -->
                        <div class="sidebar-widget">
                            <h3 class="sidebar-widget-title">Zonas de Cobertura</h3>
                            <div class="sidebar-zones-grid">
                                <span class="sidebar-zone-tag">Polanco</span>
                                <span class="sidebar-zone-tag">Lomas</span>
                                <span class="sidebar-zone-tag">Santa Fe</span>
                                <!-- Mas zonas -->
                            </div>
                            <p class="sidebar-zones-note">Toda CDMX y Area Metropolitana</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </main>

    <!-- FOOTER DEL SITIO -->

</body>
</html>
```

### 5.5 Variables del template

| Variable | Descripcion | Fuente |
|----------|-------------|--------|
| `{{TITULO}}` | Titulo H1 del articulo | Claude JSON: `title` |
| `{{SLUG}}` | URL amigable (sin .html) | Generado en "Validar Respuesta" |
| `{{META_DESCRIPTION}}` | Meta descripcion SEO | Claude JSON: `metaDescription` |
| `{{META_KEYWORDS}}` | Keywords SEO | Claude JSON: `metaKeywords` |
| `{{CATEGORIA}}` | Nombre de categoria | CONFIG.categories[].name |
| `{{CATEGORIA_SLUG}}` | Slug de categoria | product.category |
| `{{IMAGEN_PRINCIPAL}}` | Ruta de imagen hero | Selector Inteligente |
| `{{IMAGEN_ALT}}` | Alt text de imagen | Titulo + "Mededul CDMX" |
| `{{BREADCRUMB_TEXT}}` | Texto corto breadcrumb | Claude JSON: `breadcrumbText` |
| `{{TIEMPO_LECTURA}}` | Tiempo estimado | Claude JSON: `readingTime` |
| `{{CONTENIDO}}` | HTML del articulo | Claude JSON: `contenidoHTML` |
| `{{FAQ_SCHEMA}}` | JSON-LD FAQ | Generado en "Validar Respuesta" |
| `{{SITE_DOMAIN}}` | Dominio | mesas-de-dulces.com |
| `{{SITE_NAME}}` | Nombre negocio | Mededul |
| `{{SITE_PHONE}}` | Telefono formato intl | +525525226442 |
| `{{SITE_PHONE_DISPLAY}}` | Telefono display | 55 2522 6442 |
| `{{SITE_WHATSAPP}}` | Numero WhatsApp | 525525226442 |

---

## 6. WORKFLOW N8N PASO A PASO

### 6.1 Nodo 1-2: Triggers

**Trigger Programado:**
```json
{
  "parameters": {
    "rule": {
      "interval": [
        {
          "daysInterval": 3,
          "triggerAtHour": 10
        }
      ]
    }
  },
  "name": "Trigger Programado",
  "type": "n8n-nodes-base.scheduleTrigger"
}
```

**Trigger Manual:**
```json
{
  "parameters": {},
  "name": "Trigger Manual",
  "type": "n8n-nodes-base.manualTrigger"
}
```

### 6.2 Nodo 3: Selector Inteligente

**Tipo:** Code
**Proposito:** Seleccionar producto, tipo, imagen y ubicaciones sin repetir

```javascript
// ═══════════════════════════════════════════════════════════════
// SELECTOR INTELIGENTE v10.0
// Selecciona contenido sin repeticiones usando estado persistente
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  baseUrl: 'https://mesas-de-dulces.com',
  github: {
    owner: 'Origenlab',
    repo: 'MEDEDUL',
    branch: 'main'
  },
  empresa: {
    nombre: 'Mededul',
    telefono: '55 2522 6442',
    whatsapp: '525525226442'
  },
  neuronWriter: {
    apiKey: 'TU_API_KEY',
    projectId: 'TU_PROJECT_ID',
    engine: 'google.com.mx',
    language: 'Spanish'
  },

  // Productos disponibles para articulos
  products: [
    {
      id: 'mesa-dulces-bodas',
      name: 'Mesa de Dulces para Bodas',
      category: 'bodas',
      categoryName: 'Bodas',
      focus: 'mesas de dulces elegantes para bodas en CDMX',
      audience: 'Parejas que celebran bodas en venues exclusivos',
      keywords: ['mesa dulces boda CDMX', 'candy bar boda elegante'],
      neuronKeyword: 'mesa de dulces para boda'
    },
    {
      id: 'mesa-dulces-xv-anos',
      name: 'Mesa de Dulces para XV Anos',
      category: 'xv-anos',
      categoryName: 'XV Anos',
      focus: 'celebraciones de quinceanera memorables',
      audience: 'Familias celebrando XV anos',
      keywords: ['mesa dulces XV anos', 'candy bar quinceanera'],
      neuronKeyword: 'mesa de dulces xv anos'
    },
    // ... mas productos
  ],

  // Tipos de articulo
  articleTypes: [
    { id: 'guia-completa', name: 'Guia Completa', tone: 'educativo y detallado' },
    { id: 'tendencias', name: 'Tendencias', tone: 'vanguardista y actual' },
    { id: 'consejos', name: 'Consejos Profesionales', tone: 'experto y practico' },
    { id: 'inspiracion', name: 'Inspiracion', tone: 'aspiracional y visual' },
    { id: 'planificacion', name: 'Planificacion', tone: 'organizado y detallado' }
  ],

  // Imagenes por categoria
  images: {
    'bodas': [
      '../img/galeria/candy-bar-boda-rosa-dorado-elegante-peonias.avif',
      '../img/galeria/candy-bar-boda-contemporanea-geometrico.avif',
      // ... mas imagenes
    ],
    // ... mas categorias
  },

  // Colonias CDMX
  colonias: [
    'Polanco', 'Lomas de Chapultepec', 'Santa Fe', 'Pedregal',
    'Condesa', 'Roma', 'Interlomas', 'Bosques de las Lomas',
    'San Angel', 'Coyoacan', 'Tecamachalco', 'Del Valle'
  ],

  // Venues de referencia
  venues: [
    'Hacienda de los Morales', 'Casa de las Campanas',
    'Four Seasons Mexico City', 'St. Regis Mexico City'
  ]
};

// ═══════════════════════════════════════════════════════════════
// ESTADO PERSISTENTE
// Evita repeticiones entre ejecuciones del workflow
// ═══════════════════════════════════════════════════════════════

const state = $getWorkflowStaticData('global');
if (!state.usedProducts) state.usedProducts = [];
if (!state.usedImages) state.usedImages = [];
if (!state.usedTypes) state.usedTypes = [];
if (!state.articleCount) state.articleCount = 0;

// Seleccionar producto sin repetir
let availableProducts = CONFIG.products.filter(p => !state.usedProducts.includes(p.id));
if (availableProducts.length === 0) {
  state.usedProducts = [];
  availableProducts = CONFIG.products;
}
const product = availableProducts[Math.floor(Math.random() * availableProducts.length)];
state.usedProducts.push(product.id);

// Seleccionar tipo de articulo sin repetir
let availableTypes = CONFIG.articleTypes.filter(t => !state.usedTypes.includes(t.id));
if (availableTypes.length === 0) {
  state.usedTypes = [];
  availableTypes = CONFIG.articleTypes;
}
const articleType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
state.usedTypes.push(articleType.id);

// Seleccionar imagen sin repetir
let categoryImages = CONFIG.images[product.category] || CONFIG.images['bodas'];
let availableImages = categoryImages.filter(i => !state.usedImages.includes(i));
if (availableImages.length === 0) {
  state.usedImages = state.usedImages.filter(i => !categoryImages.includes(i));
  availableImages = categoryImages;
}
const heroImage = availableImages[Math.floor(Math.random() * availableImages.length)];
state.usedImages.push(heroImage);

// Seleccionar colonias y venues aleatorios
const colonias = [...CONFIG.colonias].sort(() => Math.random() - 0.5).slice(0, 4);
const venues = [...CONFIG.venues].sort(() => Math.random() - 0.5).slice(0, 3);

state.articleCount++;
const articleId = Date.now();

// Output
return [{
  json: {
    CONFIG,
    product,
    articleType,
    heroImage,
    colonias,
    venues,
    articleId,
    articleNumber: state.articleCount,
    neuronWriter: CONFIG.neuronWriter
  }
}];
```

### 6.3 Nodos 4-6: NeuronWriter Analysis

**Nodo 4: Crear Query**
```
Tipo: HTTP Request
Metodo: POST
URL: https://app.neuronwriter.com/neuron-api/0.5/writer/new-query
Headers:
  X-API-KEY: {{apiKey}}
  Content-Type: application/json
Body:
{
  "project": "{{projectId}}",
  "keyword": "{{product.neuronKeyword}}",
  "engine": "google.com.mx",
  "language": "Spanish"
}
```

**Nodo 5: Wait**
```
Tipo: Wait
Tiempo: 65 segundos
Razon: NeuronWriter necesita tiempo para analizar SERP
```

**Nodo 6: Obtener Resultados**
```
Tipo: HTTP Request
Metodo: POST
URL: https://app.neuronwriter.com/neuron-api/0.5/writer/get-query
Body:
{
  "query": "{{queryId}}"
}
```

### 6.4 Nodo 7: Procesar Datos NeuronWriter

```javascript
// ═══════════════════════════════════════════════════════════════
// PROCESAR DATOS NEURONWRITER
// Extrae terminos NLP, PAA, competidores y metricas
// ═══════════════════════════════════════════════════════════════

const neuronData = $input.first().json;
const prevData = $('Selector Inteligente').first().json;
const queryId = $('NeuronWriter: Crear Query').first().json.query;

// Extraer terminos NLP para el contenido
const contentTerms = neuronData.terms_txt?.content_basic || '';
const contentTermsWithRanges = neuronData.terms_txt?.content_basic_w_ranges || '';
const titleTerms = neuronData.terms_txt?.title || '';
const h2Terms = neuronData.terms_txt?.h2 || '';
const entities = neuronData.terms_txt?.entities || '';

// Extraer preguntas PAA (People Also Ask)
const paaQuestions = (neuronData.ideas?.people_also_ask || [])
  .slice(0, 6)
  .map(q => typeof q === 'object' ? q.q : q);

// Extraer preguntas de contenido
const contentQuestions = (neuronData.ideas?.content_questions || [])
  .slice(0, 6)
  .map(q => typeof q === 'object' ? q.q : q);

// Metricas objetivo
const targetWordCount = neuronData.metrics?.word_count?.target || 2000;
const targetReadability = neuronData.metrics?.readability?.target || 40;

// Competidores top 5
const competitors = (neuronData.competitors || []).slice(0, 5).map(c => ({
  rank: c.rank || 0,
  url: c.url || '',
  title: c.title || '',
  score: c.content_score || 0
}));

// Calcular score promedio de competidores
const avgScore = competitors.length > 0
  ? Math.round(competitors.reduce((sum, c) => sum + (c.score || 0), 0) / competitors.length)
  : 70;

console.log('NeuronWriter Data Processed:');
console.log('- Content Terms:', contentTerms.length > 0 ? 'OK' : 'EMPTY');
console.log('- PAA Questions:', paaQuestions.length);
console.log('- Competitors:', competitors.length);
console.log('- Avg Score:', avgScore);

return [{
  json: {
    ...prevData,
    neuronData: {
      queryId,
      contentTerms,
      contentTermsWithRanges,
      titleTerms,
      h2Terms,
      entities,
      paaQuestions,
      contentQuestions,
      targetWordCount,
      avgCompetitorScore: avgScore,
      competitors,
      hasData: contentTerms.length > 0 || paaQuestions.length > 0
    }
  }
}];
```

### 6.5 Nodo 8: Constructor Prompt

Ver seccion 9 para el prompt completo.

### 6.6 Nodo 9: Preparar Request Claude

```javascript
const d = $input.first().json;

const systemPrompt = `Eres un MAESTRO REDACTOR de contenido editorial premium para eventos de alta gama. Tu escritura combina:

1. **PRECISION SEO**: Dominas el SEO On-Page con estructura semantica impecable. USAS LOS TERMINOS NLP DE NEURONWRITER.

2. **NARRATIVA DE LUJO**: Escribes como editor senior de Vogue Novias, Martha Stewart Weddings.

3. **COPYWRITING DE CONVERSION**: Cada seccion mueve al lector hacia WhatsApp.

4. **AUTORIDAD EXPERTA**: Conocimiento profundo de eventos en CDMX.

REGLAS INVIOLABLES:
✓ Contenido minimo: 2000 palabras
✓ Parrafos: 60-100 palabras cada uno
✓ Keyword principal: primer parrafo con <strong>
✓ Elementos obligatorios: 2 highlight-box, 1 tabla, 6 FAQ
✓ Enlaces internos: EXACTAMENTE 2

✗ PROHIBIDO: Precios, fechas, CSS personalizado, frases vacias

✓ FORMATO: Responde UNICAMENTE con JSON valido.`;

const body = {
  model: 'claude-sonnet-4-20250514',
  max_tokens: 16000,
  temperature: 0.8,
  system: systemPrompt,
  messages: [
    { role: 'user', content: d.prompt }
  ]
};

return [{ json: { ...d, claudeBody: JSON.stringify(body) } }];
```

### 6.7 Nodo 10: Claude API

```
Tipo: HTTP Request
Metodo: POST
URL: https://api.anthropic.com/v1/messages
Headers:
  Content-Type: application/json
  x-api-key: {{ANTHROPIC_API_KEY}}
  anthropic-version: 2023-06-01
Body: {{claudeBody}}
Timeout: 300000 (5 minutos)
Retry: 3 intentos
```

### 6.8 Nodo 11: Validar Respuesta

```javascript
// ═══════════════════════════════════════════════════════════════
// VALIDAR RESPUESTA DE CLAUDE
// Parsea JSON, valida campos, genera slug SEO
// ═══════════════════════════════════════════════════════════════

const response = $input.first().json;
const data = $('Constructor Prompt').first().json;
const p = data.product;
const colonias = data.colonias;

// Parsear respuesta de Claude
let content;
try {
  let raw = response.content[0].text
    .replace(/```json\n?/gi, '')
    .replace(/```\n?/gi, '')
    .trim();
  content = JSON.parse(raw);
} catch(e) {
  throw new Error('Error parseando JSON de Claude: ' + e.message);
}

// Limpiar titulo (eliminar anos si Claude los incluyo)
content.title = content.title
  .replace(/\s*(20[2-3][0-9])\s*/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

// Validar campos requeridos
if (!content.title || content.title.length < 20) {
  throw new Error('Titulo invalido: ' + (content.title || 'VACIO'));
}
if (!content.contenidoHTML || content.contenidoHTML.length < 500) {
  throw new Error('Contenido HTML muy corto');
}

// ═══════════════════════════════════════════════════════════════
// GENERADOR DE SLUG SEO-FRIENDLY
// ═══════════════════════════════════════════════════════════════

function generateSlug(text) {
  if (!text) return null;

  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, '')      // Solo alfanumericos
    .replace(/\s+/g, '-')              // Espacios a guiones
    .replace(/-+/g, '-')               // Multiples guiones a uno
    .replace(/^-+|-+$/g, '')           // Guiones al inicio/fin
    .replace(/-(20[2-3][0-9])/g, '')   // Eliminar anos
    .substring(0, 55);
}

// Truncar slug en palabra completa
function truncateSlugClean(slug, maxLength) {
  if (slug.length <= maxLength) return slug;

  let truncated = slug.substring(0, maxLength);
  const lastDash = truncated.lastIndexOf('-');

  if (lastDash > 20) {
    truncated = truncated.substring(0, lastDash);
  }

  return truncated;
}

let slug = generateSlug(content.title);

// Asegurar que el slug tenga keywords relevantes
if (!slug.includes('mesa') && !slug.includes('candy') && !slug.includes('dulces')) {
  slug = 'mesa-dulces-' + slug;
}

// Agregar ubicacion si no la tiene
if (!slug.includes('cdmx') && !slug.includes('polanco') && !slug.includes('santa-fe')) {
  const colonia = colonias[0].toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  slug = slug + '-' + colonia;
}

// Truncar a max 70 caracteres en palabra completa
slug = truncateSlugClean(slug, 70);

console.log('TITULO:', content.title);
console.log('SLUG SEO:', slug);

// Construir FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': content.faq.map(f => ({
    '@type': 'Question',
    'name': f.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': f.answer
    }
  }))
};

return [{
  json: {
    ...data,
    content,
    slug,
    faqSchemaJSON: JSON.stringify(faqSchema)
  }
}];
```

### 6.9 Nodos 12-13: Evaluacion NLP

**Nodo 12: Evaluar Contenido**
```
Tipo: HTTP Request
Metodo: POST
URL: https://app.neuronwriter.com/neuron-api/0.5/writer/evaluate-content
Body:
{
  "query": "{{queryId}}",
  "html": "{{contenidoHTML}}",
  "title": "{{title}}",
  "description": "{{metaDescription}}"
}
continueOnFail: true
```

**Nodo 13: Procesar Score**
```javascript
const evalResult = $input.first().json;
const prevData = $('Validar Respuesta').first().json;

let nlpScore = 'N/A';
if (evalResult && evalResult.content_score !== undefined) {
  nlpScore = evalResult.content_score;
  console.log('NLP Score:', nlpScore);
}

return [{ json: { ...prevData, nlpScore } }];
```

### 6.10 Nodos 14-16: Construccion HTML

**Nodo 14: Obtener Template**
```
Tipo: HTTP Request
Metodo: GET
URL: https://api.github.com/repos/{{OWNER}}/{{REPO}}/contents/blog/TEMPLATE-ARTICULO.html
Headers:
  Authorization: token {{GITHUB_TOKEN}}
```

**Nodo 15: Construir HTML**
```javascript
// ═══════════════════════════════════════════════════════════════
// CONSTRUIR HTML
// Reemplaza variables del template con contenido generado
// ═══════════════════════════════════════════════════════════════

const data = $('Procesar Score NLP').first().json;
const templateResp = $input.first().json;
const c = data.content;
const p = data.product;
const slug = data.slug;
const heroImage = data.heroImage;
const faqSchemaJSON = data.faqSchemaJSON;

// Configuracion del sitio
const SITE = {
  domain: 'mesas-de-dulces.com',
  name: 'Mededul',
  phone: '+525525226442',
  phoneDisplay: '55 2522 6442',
  whatsapp: '525525226442'
};

// Decodificar template
let template = Buffer.from(templateResp.content, 'base64').toString('utf8');

// Ruta de imagen
const imagePath = heroImage.replace('../', '');

// Reemplazar TODAS las variables
let html = template
  .replace(/\{\{TITULO\}\}/g, c.title)
  .replace(/\{\{SLUG\}\}/g, slug)
  .replace(/\{\{META_DESCRIPTION\}\}/g, c.metaDescription)
  .replace(/\{\{META_KEYWORDS\}\}/g, c.metaKeywords)
  .replace(/\{\{CATEGORIA\}\}/g, p.categoryName)
  .replace(/\{\{CATEGORIA_SLUG\}\}/g, p.category)
  .replace(/\{\{IMAGEN_PRINCIPAL\}\}/g, imagePath)
  .replace(/\{\{IMAGEN_ALT\}\}/g, c.title + ' - Mededul CDMX')
  .replace(/\{\{BREADCRUMB_TEXT\}\}/g, c.breadcrumbText)
  .replace(/\{\{TIEMPO_LECTURA\}\}/g, c.readingTime)
  .replace(/\{\{CONTENIDO\}\}/g, c.contenidoHTML)
  .replace(/\{\{FAQ_SCHEMA\}\}/g, faqSchemaJSON)
  .replace(/\{\{SITE_DOMAIN\}\}/g, SITE.domain)
  .replace(/\{\{SITE_NAME\}\}/g, SITE.name)
  .replace(/\{\{SITE_PHONE\}\}/g, SITE.phone)
  .replace(/\{\{SITE_PHONE_DISPLAY\}\}/g, SITE.phoneDisplay)
  .replace(/\{\{SITE_WHATSAPP\}\}/g, SITE.whatsapp);

const htmlBase64 = Buffer.from(html).toString('base64');

return [{ json: { ...data, articleHtml: html, articleHtmlBase64: htmlBase64 } }];
```

**Nodo 16: Construir Card**
```javascript
const data = $input.first().json;
const c = data.content;
const p = data.product;

const articleEntry = {
  id: data.articleId,
  title: c.title,
  excerpt: c.excerpt,
  category: p.category,
  image: data.heroImage,
  slug: data.slug,
  readTime: c.readingTime,
  cta: c.cta,
  nlpScore: data.nlpScore,
  metaDescription: c.metaDescription,
  metaKeywords: c.metaKeywords,
  breadcrumbText: c.breadcrumbText
};

console.log('Card Entry:', articleEntry.slug);

return [{ json: { ...data, articleEntry } }];
```

### 6.11 Nodos 17-23: Publicacion GitHub

Ver seccion 11 para detalles de publicacion.

### 6.12 Nodo 24: Telegram

```
Tipo: HTTP Request
Metodo: POST
URL: https://api.telegram.org/bot{{BOT_TOKEN}}/sendMessage
Body:
{
  "chat_id": "{{CHAT_ID}}",
  "text": "✅ MEDEDUL v10.0\n\n📝 Articulo #{{totalArticles}}\n{{articleTitle}}\n\n📊 NLP Score: {{nlpScore}}\n\n🔗 https://mesas-de-dulces.com/blog/{{slug}}",
  "parse_mode": "HTML"
}
continueOnFail: true
```

---

## 7. CLASES CSS DEL SISTEMA

### 7.1 Clases que DEBE generar el contenido

El prompt instruye a Claude a usar SOLO estas clases CSS:

```css
/* ═══════════════════════════════════════════════════════════════
   CLASES CSS PARA CONTENIDO GENERADO POR WORKFLOW
   Archivo: css/blog-article.css
   ═══════════════════════════════════════════════════════════════ */

/* Variables CSS requeridas */
:root {
    --rosa-principal: #E91E8C;
    --rosa-claro: #FF6BB3;
    --rosa-hover: #C4177A;
}

/* ═══════════════════════════════════════════════════════════════
   1. INTRODUCCION DEL ARTICULO
   ═══════════════════════════════════════════════════════════════ */
.article-intro {
    font-size: 1.15rem;
    line-height: 1.9;
    color: #444;
    margin-bottom: 40px;
    padding: 0;
}

.article-intro p {
    margin-bottom: 20px;
}

.article-intro p:first-child::first-letter {
    font-size: 3.5rem;
    float: left;
    line-height: 1;
    margin-right: 12px;
    margin-top: 5px;
    color: var(--rosa-principal);
    font-weight: 700;
}

/* ═══════════════════════════════════════════════════════════════
   2. TABLA DE CONTENIDOS
   ═══════════════════════════════════════════════════════════════ */
.toc {
    background: linear-gradient(135deg, rgba(233, 30, 140, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
    border-radius: 16px;
    padding: 30px;
    margin: 40px 0;
    border: 1px solid rgba(233, 30, 140, 0.1);
}

.toc h4 {
    color: var(--rosa-principal);
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.toc h4::before {
    content: '📑';
    font-size: 1.2rem;
}

.toc ol {
    counter-reset: toc-counter;
    list-style: none;
    padding: 0;
    margin: 0;
}

.toc li {
    counter-increment: toc-counter;
    padding: 12px 0;
    border-bottom: 1px solid rgba(233, 30, 140, 0.08);
}

.toc li:last-child {
    border-bottom: none;
}

.toc li::before {
    content: counter(toc-counter) ".";
    color: var(--rosa-principal);
    font-weight: 700;
    margin-right: 10px;
}

.toc a {
    color: #444;
    text-decoration: none;
    transition: color 0.3s ease;
}

.toc a:hover {
    color: var(--rosa-principal);
}

/* ═══════════════════════════════════════════════════════════════
   3. LISTA DE BENEFICIOS
   ═══════════════════════════════════════════════════════════════ */
.benefits-list {
    list-style: none;
    padding: 0;
    margin: 30px 0;
}

.benefits-list li {
    padding: 15px 0 15px 35px;
    position: relative;
    border-bottom: 1px solid rgba(233, 30, 140, 0.1);
    line-height: 1.7;
}

.benefits-list li:last-child {
    border-bottom: none;
}

.benefits-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    top: 15px;
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, var(--rosa-principal), var(--rosa-claro));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
}

.benefits-list li strong {
    color: var(--rosa-principal);
    display: inline;
}

/* ═══════════════════════════════════════════════════════════════
   4. LISTA DE PASOS
   ═══════════════════════════════════════════════════════════════ */
.steps-list {
    counter-reset: step-counter;
    list-style: none;
    padding: 0;
    margin: 30px 0;
}

.steps-list li {
    counter-increment: step-counter;
    padding: 25px 0 25px 70px;
    position: relative;
    border-bottom: 1px solid rgba(233, 30, 140, 0.1);
}

.steps-list li:last-child {
    border-bottom: none;
}

.steps-list li::before {
    content: counter(step-counter);
    position: absolute;
    left: 0;
    top: 25px;
    width: 45px;
    height: 45px;
    background: linear-gradient(135deg, var(--rosa-principal), var(--rosa-claro));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
    box-shadow: 0 4px 15px rgba(233, 30, 140, 0.25);
}

.steps-list li strong {
    display: block;
    color: var(--rosa-principal);
    font-size: 1.15rem;
    margin-bottom: 8px;
}

.steps-list li p {
    margin: 0;
    color: #555;
    line-height: 1.7;
}

/* ═══════════════════════════════════════════════════════════════
   5. HIGHLIGHT BOX (Tips/Consejos)
   ═══════════════════════════════════════════════════════════════ */
.highlight-box {
    background: linear-gradient(135deg, rgba(233, 30, 140, 0.06) 0%, rgba(255, 107, 179, 0.03) 100%);
    border-radius: 16px;
    padding: 28px 30px;
    margin: 35px 0;
    border-left: 4px solid var(--rosa-principal);
    position: relative;
    box-shadow: 0 5px 20px rgba(233, 30, 140, 0.08);
}

.highlight-box::before {
    content: '💡';
    position: absolute;
    top: -12px;
    left: 20px;
    background: #fff;
    padding: 5px 10px;
    border-radius: 8px;
    font-size: 1.3rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.highlight-box h4 {
    color: var(--rosa-principal);
    font-weight: 700;
    margin-bottom: 12px;
    font-size: 1.1rem;
}

.highlight-box p {
    margin: 0;
    color: #444;
    line-height: 1.8;
}

/* Variante para errores/advertencias */
.highlight-box.error-highlight::before {
    content: '⚠️';
}

/* ═══════════════════════════════════════════════════════════════
   6. TABLA COMPARATIVA
   ═══════════════════════════════════════════════════════════════ */
.table-responsive {
    overflow-x: auto;
    margin: 35px 0;
    -webkit-overflow-scrolling: touch;
}

.comparison-table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
    min-width: 600px;
}

.comparison-table thead tr {
    background: linear-gradient(135deg, var(--rosa-principal), var(--rosa-claro));
}

.comparison-table th {
    color: #fff;
    padding: 18px 15px;
    text-align: left;
    font-weight: 600;
    font-size: 0.95rem;
}

.comparison-table td {
    padding: 15px;
    border-bottom: 1px solid #eee;
    color: #444;
    font-size: 0.9rem;
    line-height: 1.6;
}

.comparison-table tbody tr:last-child td {
    border-bottom: none;
}

.comparison-table tbody tr:hover td {
    background: rgba(233, 30, 140, 0.03);
}

/* ═══════════════════════════════════════════════════════════════
   7. SECCION FAQ
   ═══════════════════════════════════════════════════════════════ */
.faq-section {
    margin: 40px 0;
}

.faq-section .faq-item {
    margin-bottom: 15px;
    border: 1px solid rgba(233, 30, 140, 0.15);
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    transition: box-shadow 0.3s ease;
}

.faq-section .faq-item:hover {
    box-shadow: 0 5px 20px rgba(233, 30, 140, 0.1);
}

.faq-section .faq-question {
    padding: 20px 50px 20px 20px;
    background: linear-gradient(135deg, rgba(233, 30, 140, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
    cursor: pointer;
    font-weight: 600;
    color: #333;
    position: relative;
    transition: all 0.3s ease;
    font-size: 1rem;
    line-height: 1.5;
}

.faq-section .faq-question:hover {
    background: linear-gradient(135deg, rgba(233, 30, 140, 0.08) 0%, rgba(255, 255, 255, 0) 100%);
}

.faq-section .faq-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 28px;
    height: 28px;
    background: var(--rosa-principal);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
    font-weight: 300;
    transition: transform 0.3s ease;
}

.faq-section .faq-answer {
    padding: 0 20px 20px;
    color: #555;
    line-height: 1.8;
    font-size: 0.95rem;
}

.faq-section .faq-answer p {
    margin: 0;
}

/* ═══════════════════════════════════════════════════════════════
   8. CTA DEL ARTICULO
   ═══════════════════════════════════════════════════════════════ */
.article-cta {
    background: linear-gradient(135deg, var(--rosa-principal) 0%, var(--rosa-claro) 100%);
    border-radius: 20px;
    padding: 50px 40px;
    text-align: center;
    color: #fff;
    margin-top: 50px;
    box-shadow: 0 10px 40px rgba(233, 30, 140, 0.3);
}

.article-cta h3 {
    color: #fff;
    font-size: 1.6rem;
    margin-bottom: 12px;
    font-weight: 700;
}

.article-cta p {
    color: rgba(255,255,255,0.9);
    margin-bottom: 10px;
    font-size: 1.05rem;
    line-height: 1.7;
}

.article-cta .btn-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #fff;
    color: var(--rosa-principal);
    padding: 16px 35px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1rem;
    text-decoration: none;
    transition: all 0.3s ease;
    margin-top: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.article-cta .btn-cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.article-cta .btn-cta svg {
    width: 20px;
    height: 20px;
    fill: var(--rosa-principal);
}

/* ═══════════════════════════════════════════════════════════════
   9. CTA BOX (Alternativo inline)
   ═══════════════════════════════════════════════════════════════ */
.cta-box {
    background: linear-gradient(135deg, var(--rosa-principal) 0%, var(--rosa-claro) 100%);
    border-radius: 16px;
    padding: 35px 30px;
    text-align: center;
    color: #fff;
    margin: 40px 0;
    box-shadow: 0 10px 30px rgba(233, 30, 140, 0.2);
}

.cta-box h3 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 12px;
    font-weight: 700;
}

.cta-box p {
    color: rgba(255,255,255,0.92);
    margin-bottom: 20px;
    font-size: 1.05rem;
    line-height: 1.7;
}

/* ═══════════════════════════════════════════════════════════════
   10. BOTON WHATSAPP
   ═══════════════════════════════════════════════════════════════ */
.btn.btn-whatsapp,
a.btn.btn-whatsapp {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
    color: #fff !important;
    padding: 16px 32px;
    border-radius: 50px;
    font-size: 1.05rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
    border: none;
    cursor: pointer;
}

.btn.btn-whatsapp:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
    background: linear-gradient(135deg, #22c55e 0%, #0d7a6b 100%);
}

.btn.btn-whatsapp svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
}

/* ═══════════════════════════════════════════════════════════════
   11. RESPONSIVE
   ═══════════════════════════════════════════════════════════════ */
@media (max-width: 768px) {
    .article-intro {
        font-size: 1.05rem;
    }

    .article-intro p:first-child::first-letter {
        font-size: 2.8rem;
    }

    .toc {
        padding: 22px 18px;
    }

    .highlight-box {
        padding: 22px 18px;
        margin: 30px 0;
    }

    .benefits-list li {
        padding: 12px 0 12px 30px;
    }

    .benefits-list li::before {
        width: 20px;
        height: 20px;
        font-size: 10px;
    }

    .steps-list li {
        padding: 20px 0 20px 55px;
    }

    .steps-list li::before {
        width: 38px;
        height: 38px;
        font-size: 1rem;
    }

    .article-cta {
        padding: 35px 20px;
    }

    .article-cta h3 {
        font-size: 1.3rem;
    }

    .cta-box {
        padding: 28px 20px;
    }

    .btn.btn-whatsapp {
        padding: 14px 24px;
        font-size: 0.95rem;
        width: 100%;
    }

    .faq-section .faq-question {
        padding: 16px 45px 16px 16px;
        font-size: 0.95rem;
    }
}
```

---

## 8. FORMATO DE DATOS Y SCHEMAS

### 8.1 Respuesta esperada de Claude

```json
{
  "title": "Mesa de Dulces para Bodas: Guia Completa CDMX",
  "metaDescription": "Descubre como crear la mesa de dulces perfecta para tu boda en CDMX. Guia profesional con tips de expertos. Cotiza gratis.",
  "metaKeywords": "mesa dulces boda, candy bar boda, mesa postres boda, mesas dulces cdmx, candy bar elegante",
  "excerpt": "Crea la mesa de dulces perfecta para tu boda con nuestra guia completa. Tips de expertos y tendencias para bodas en CDMX.",
  "breadcrumbText": "Mesa Dulces Bodas",
  "readingTime": "10 min lectura",
  "cta": "Cotizar Mesa Boda",
  "contenidoHTML": "<div class=\"article-intro\"><p>Tu <strong>mesa de dulces para boda</strong> es mucho mas que una simple estacion de postres...</p></div><nav class=\"toc\"><h4>En Este Articulo</h4><ol><li><a href=\"#que-es\">Que es y Por Que es Tendencia</a></li>...</ol></nav><h2 id=\"que-es\">Que es una Mesa de Dulces para Boda</h2><p>...</p>",
  "faq": [
    {
      "question": "Que incluye una mesa de dulces para boda?",
      "answer": "Una mesa de dulces profesional incluye seleccion curada de 15-25 variedades de dulces artesanales, montaje completo con mobiliario elegante, decoracion tematica coordinada con tu boda, cristaleria y contenedores premium, y servicio de instalacion y desmontaje."
    },
    {
      "question": "Cuanto cuesta una mesa de dulces para boda en CDMX?",
      "answer": "El costo varia segun el numero de invitados, seleccion de dulces y nivel de personalizacion. Ofrecemos opciones para diferentes presupuestos. Solicita una cotizacion personalizada sin compromiso para recibir una propuesta adaptada a tu evento."
    }
  ],
  "imageIdeas": [
    "Mesa de dulces elegante para boda en jardin con flores blancas y rosas",
    "Detalle de macarons y chocolates artesanales en cristaleria dorada",
    "Invitados disfrutando del candy bar en recepcion de boda"
  ]
}
```

### 8.2 FAQ Schema generado

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Que incluye una mesa de dulces para boda?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Una mesa de dulces profesional incluye seleccion curada de 15-25 variedades..."
      }
    },
    {
      "@type": "Question",
      "name": "Cuanto cuesta una mesa de dulces para boda en CDMX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El costo varia segun el numero de invitados..."
      }
    }
  ]
}
```

### 8.3 Entry para articles.json

```json
{
  "id": 1738300800000,
  "title": "Mesa de Dulces para Bodas: Guia Completa CDMX",
  "excerpt": "Crea la mesa de dulces perfecta para tu boda con nuestra guia completa. Tips de expertos y tendencias para bodas en CDMX.",
  "category": "bodas",
  "image": "../img/galeria/candy-bar-boda-rosa-dorado-elegante-peonias.avif",
  "slug": "mesa-dulces-bodas-guia-completa-cdmx-polanco",
  "readTime": "10 min lectura",
  "cta": "Cotizar Mesa Boda",
  "nlpScore": 78,
  "metaDescription": "Descubre como crear la mesa de dulces perfecta para tu boda en CDMX. Guia profesional con tips de expertos. Cotiza gratis.",
  "metaKeywords": "mesa dulces boda, candy bar boda, mesa postres boda",
  "breadcrumbText": "Mesa Dulces Bodas"
}
```

---

## 9. PROMPTS Y CONFIGURACION DE CLAUDE

Ver el prompt completo en el archivo del workflow. Los puntos clave son:

### 9.1 Reglas criticas del prompt

```markdown
## REGLAS CRITICAS - OBLIGATORIAS

### PROHIBIDO ABSOLUTAMENTE:

**1. CERO FECHAS:**
- NO incluir anos (2024, 2025, etc.)
- NO meses ni temporadas especificas
- Contenido debe ser EVERGREEN

**2. CERO PRECIOS:**
- NO precios especificos ($500, $1000)
- NO rangos de precios
- Solo: "solicita cotizacion"

**3. CERO CSS PERSONALIZADO:**
- NO etiquetas <style>
- NO style="..." inline
- USAR SOLO clases existentes:
  * article-intro, toc
  * benefits-list, steps-list
  * highlight-box, comparison-table
  * faq-section, faq-item
  * article-cta, btn-cta
```

### 9.2 Estructura obligatoria

1. `<div class="article-intro">` - Introduccion
2. `<nav class="toc">` - Tabla de contenidos
3. Secciones H2 con IDs
4. `<ul class="benefits-list">` - Beneficios
5. `<ol class="steps-list">` - Pasos
6. `<div class="highlight-box">` - Tips (minimo 2)
7. `<table class="comparison-table">` - Tabla comparativa
8. `<div class="faq-section">` - FAQs (6 obligatorias)
9. `<div class="article-cta">` - CTA final

---

## 10. INTEGRACION CON NEURONWRITER

### 10.1 Flujo de datos

```
1. Crear Query → keyword del producto
2. Esperar 65s → analisis SERP
3. Obtener Resultados → terminos NLP, PAA, competidores
4. Generar contenido → usa terminos en prompt
5. Evaluar contenido → score NLP del articulo
```

### 10.2 Datos que proporciona

| Dato | Uso en el prompt |
|------|------------------|
| `content_basic` | Terminos NLP para el contenido |
| `title` | Terminos para el titulo |
| `h2` | Terminos para subtitulos |
| `entities` | Entidades a mencionar |
| `people_also_ask` | Preguntas para FAQ |
| `competitors` | Analisis de competencia |
| `content_score` | Score NLP del contenido generado |

---

## 11. PUBLICACION EN GITHUB

### 11.1 Archivos que se actualizan

1. **Articulo HTML**: `/blog/[slug].html`
2. **JSON de articulos**: `/blog/articles.json`
3. **Sitemap**: `/sitemap.xml`

### 11.2 Commits generados

```
Add article: mesa-dulces-bodas-guia-completa-cdmx-polanco
Add to blog: mesa-dulces-bodas-guia-completa-cdmx-polanco
Add sitemap: mesa-dulces-bodas-guia-completa-cdmx-polanco
```

---

## 12. SISTEMA DE NOTIFICACIONES

### 12.1 Mensaje de Telegram

```
✅ MEDEDUL v10.0 - NeuronWriter

📝 Articulo #58
Mesa de Dulces para Bodas: Guia Completa CDMX

📊 NLP Score: 78

🔗 https://mesas-de-dulces.com/blog/mesa-dulces-bodas-guia-completa-cdmx-polanco

🤖 Claude Sonnet + NeuronWriter
✅ articles.json actualizado
🗺️ sitemap.xml actualizado
```

---

## 13. MANTENIMIENTO Y OPERACION

### 13.1 Agregar nueva categoria

1. Editar `blog/config.js` - agregar categoria
2. Editar nodo "Selector Inteligente" - agregar producto
3. Agregar imagenes en `CONFIG.images`

### 13.2 Cambiar frecuencia

Editar nodo "Trigger Programado":
```json
{
  "daysInterval": 1,  // Diario
  "triggerAtHour": 10
}
```

### 13.3 Limpiar estado

En N8N: Settings > Static Data > Eliminar workflow data

### 13.4 Actualizar FALLBACK_ARTICLES

Cuando el JSON crece, actualizar fallback en `blog/index.html`:

```javascript
// En consola del navegador:
copy(JSON.stringify(articles.slice(0, 60), null, 2));
// Pegar en FALLBACK_ARTICLES
```

---

## 14. TROUBLESHOOTING

| Error | Causa | Solucion |
|-------|-------|----------|
| "NeuronWriter query not ready" | Tiempo insuficiente | Aumentar Wait a 90s |
| "Error parseando JSON" | Claude incluyo texto extra | El codigo ya lo maneja |
| "Articulo ya existe" | Slug duplicado | Verificar estado, reiniciar |
| "422 Unprocessable" GitHub | SHA cambio | Ejecutar de nuevo |
| Cards no aparecen | FALLBACK desactualizado | Actualizar FALLBACK |
| Estilos no aplican | Clases no definidas | Verificar CSS |

---

## 15. CHECKLIST DE IMPLEMENTACION

### Pre-requisitos
- [ ] Cuenta NeuronWriter con plan API
- [ ] Cuenta Anthropic con credito
- [ ] Repositorio GitHub con token
- [ ] Bot Telegram creado

### Configuracion sitio
- [ ] `blog/config.js` configurado
- [ ] `blog/articles.json` creado
- [ ] `blog/TEMPLATE-ARTICULO.html` listo
- [ ] `css/blog-article.css` con todas las clases

### Workflow N8N
- [ ] Workflow importado
- [ ] Credenciales actualizadas
- [ ] Test manual exitoso
- [ ] Trigger programado activado

### Verificacion
- [ ] Articulo publicado correctamente
- [ ] Card aparece en listado
- [ ] Sitemap actualizado
- [ ] Notificacion recibida

---

## 16. ANEXOS

### 16.1 Endpoints de APIs

```
NeuronWriter:
POST https://app.neuronwriter.com/neuron-api/0.5/writer/new-query
POST https://app.neuronwriter.com/neuron-api/0.5/writer/get-query
POST https://app.neuronwriter.com/neuron-api/0.5/writer/evaluate-content

Claude:
POST https://api.anthropic.com/v1/messages

GitHub:
GET  https://api.github.com/repos/{owner}/{repo}/contents/{path}
PUT  https://api.github.com/repos/{owner}/{repo}/contents/{path}

Telegram:
POST https://api.telegram.org/bot{token}/sendMessage
```

### 16.2 Versiones

| Componente | Version |
|------------|---------|
| Workflow | v10.0 |
| Claude Model | claude-sonnet-4-20250514 |
| NeuronWriter API | 0.5 |
| N8N | Compatible 1.0+ |

---

**Documento creado:** 2025-01-31
**Ultima actualizacion:** 2025-01-31
**Autor:** Sistema automatizado con Claude Opus 4.5

---

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   FIN DEL DOCUMENTO                                                          ║
║                                                                              ║
║   Para soporte: github.com/Origenlab/MEDEDUL/issues                         ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```
