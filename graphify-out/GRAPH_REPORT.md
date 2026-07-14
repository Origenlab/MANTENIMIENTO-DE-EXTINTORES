# Graph Report - MANEXT  (2026-07-14)

## Corpus Check
- 226 files · ~578,305 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 873 nodes · 817 edges · 227 communities (219 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fcc258ea`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- catalog-system.js
- Estudio de mercado y taxonomía maestra para el catálogo MANEXT
- Diseño aprobado para el nuevo catálogo de extintores MANEXT
- catalogo.astro
- blog-system.js
- ANÁLISIS MANEXT — Estado del proyecto y comparación local ↔ live
- package.json
- MANEXT — Plantilla de fichas de producto del catálogo
- precios-extintores-cdmx-guia-actualizada.md
- vida-util-extintor-cuando-reemplazarlo.md
- extintores-restaurantes-requisitos-normativa-cdmx.md
- package.json
- 6.1 Extintores portátiles
- producto-extintor-pqs-4-5kg.md
- Diseño: catálogo MANEXT con sidebar y paginación
- ../layouts/Layout.astro
- producto-extintor-pqs-6kg.md
- producto-extintor-co2-4-54kg.md
- producto-extintor-pqs-9kg.md
- producto-extintor-tipo-k-6L.md
- GUÍA MAESTRA DE CREACIÓN DE ARTÍCULOS - MANEXT Blog
- 14. CHECKLIST PRE-PUBLICACIÓN
- 7. COMPONENTES ESPECIALES
- webpack.config.prod.js
- ../components/Hero.astro
- [...slug].astro
- 16. AGREGAR ARTICULO AL LISTADO DEL BLOG (blog.html)
- 3. SEO — ANÁLISIS COMPLETO
- 10. DIRECTRICES SEO AVANZADAS
- 5. CONTENIDO DEL ARTÍCULO
- AUDITORÍA EXPERTA — MANEXT (mantenimientodeextintores.mx)
- CHANGELOG SEO — MANEXT (mantenimientodeextintores.mx)
- Global Constraints
- Global Constraints
- 6. FÓRMULAS DE COPYWRITING
- 8. SIDEBAR COMPLETO
- 4. CONTENIDO — ANÁLISIS POR SECCIÓN
- 15. PLANTILLAS Y EJEMPLOS
- 3. SCHEMA MARKUP Y DATOS ESTRUCTURADOS
- 1. ESTRUCTURA DEL SITIO — MAPA COMPLETO
- 5. BLOG — ANÁLISIS DE CALIDAD Y DUPLICADOS
- 7. IMÁGENES
- astro.config.mjs
- 11. OPTIMIZACIÓN DE IMÁGENES
- 2. LAYOUTS Y COMPONENTES
- 6. MARKETING Y CONVERSIÓN
- 8. CSS Y TÉCNICO
- agentes-limpios.astro
- agua-presion.astro
- co2.astro
- espuma-afff.astro
- polvo-quimico-seco.astro
- tipo-k.astro
- 12. ACCESIBILIDAD WEB
- 2. ESTRUCTURA DEL ARCHIVO HTML
- 4. ESTRUCTURA DEL BODY
- 9. CTAS Y CONVERSIÓN
- 9. ERRORES Y BUGS ACTIVOS
- MANEXT — Memoria operativa
- content.config.ts
- AGENTS.md
- 13. FOOTER Y SCRIPTS
- tsconfig.json
- mantenimiento-preventivo.astro
- recarga-de-extintores.astro
- hospitales.astro
- senalizacion.astro
- SectionHeader CSS (.sh)

## God Nodes (most connected - your core abstractions)
1. `../layouts/Layout.astro` - 27 edges
2. `../components/Hero.astro` - 23 edges
3. `GUÍA MAESTRA DE CREACIÓN DE ARTÍCULOS - MANEXT Blog` - 20 edges
4. `MANEXT — Plantilla de fichas de producto del catálogo` - 17 edges
5. `Estudio de mercado y taxonomía maestra para el catálogo MANEXT` - 17 edges
6. `../components/SectionHeader.astro` - 15 edges
7. `Diseño aprobado para el nuevo catálogo de extintores MANEXT` - 15 edges
8. `Diseño: catálogo MANEXT con sidebar y paginación` - 14 edges
9. `AUDITORÍA EXPERTA — MANEXT (mantenimientodeextintores.mx)` - 13 edges
10. `14. CHECKLIST PRE-PUBLICACIÓN` - 11 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (227 total, 8 thin omitted)

### Community 0 - "catalog-system.js"
Cohesion: 0.16
Nodes (26): clearFilters(), filterProducts(), getBasePath(), getCategoryById(), getImageUrl(), getProductUrl(), getRelatedProducts(), getWhatsAppUrl() (+18 more)

### Community 1 - "Estudio de mercado y taxonomía maestra para el catálogo MANEXT"
Cohesion: 0.04
Nodes (47): 10.1 Clústeres transaccionales prioritarios, 10.2 Clústeres por sector, 10.3 Requisitos on-page por categoría, 10.4 Evitar canibalización, 10. Mapa SEO y arquitectura de demanda, 11.1 Normas que deben tratarse correctamente, 11.2 Afirmaciones que requieren evidencia por SKU, 11.3 Lenguaje recomendado (+39 more)

### Community 2 - "Diseño aprobado para el nuevo catálogo de extintores MANEXT"
Cohesion: 0.07
Nodes (29): 10. Correcciones de contenido incluidas, 11. Comportamiento sin JavaScript y errores, 12. Rendimiento y accesibilidad, 13. Criterios de aceptación, 14. Decisión de implementación, 1. Objetivo del diseño, 2. Principios, 3. Arquitectura de información (+21 more)

### Community 3 - "catalogo.astro"
Cohesion: 0.11
Nodes (24): ../components/catalog/CatalogCard.astro, searchText, ../components/catalog/CatalogFilters.astro, ../../components/catalog/ProductDetailTemplate.astro, faqSchema, productSchema, ../components/catalog/QuoteForm.astro, ../../data/catalog-product-details.mjs (+16 more)

### Community 4 - "blog-system.js"
Cohesion: 0.17
Nodes (24): createPagination(), filterByCategory(), getArticleUrl(), getBasePath(), getCategoryById(), getFilteredArticles(), getImageUrl(), getRelatedArticles() (+16 more)

### Community 5 - "ANÁLISIS MANEXT — Estado del proyecto y comparación local ↔ live"
Cohesion: 0.07
Nodes (26): 0. TL;DR, 1. STACK Y ARQUITECTURA, 2. SINCRONÍA LOCAL ↔ LIVE, 3. ESTADO DE LOS 22 HALLAZGOS DEL 06-ABR, 4.1 Productos refactorizados (progreso real), 4.2 Productos que faltan rellenar (22), 4.3 Stubs de blog (11) — todos indexables, todos en sitemap live, 4.4 Duplicados clases de fuego (5) — cuentas reales (+18 more)

### Community 6 - "package.json"
Cohesion: 0.08
Nodes (24): copy-webpack-plugin, html-webpack-plugin, author, description, devDependencies, copy-webpack-plugin, html-webpack-plugin, webpack (+16 more)

### Community 8 - "MANEXT — Plantilla de fichas de producto del catálogo"
Cohesion: 0.08
Nodes (24): 1. Investigar y validar, 2. Preparar imágenes, 3. Conectar la card, 4. Agregar el detalle, 5. Revisar la ruta, 6. Añadir pruebas, 7. Verificación obligatoria, Anatomía visual obligatoria (+16 more)

### Community 9 - "precios-extintores-cdmx-guia-actualizada.md"
Cohesion: 0.09
Nodes (21): 1. Tipo de agente extintor, 2. Capacidad (kg o litros), 3. Certificación NOM-154-SCFI, 4. Material del cilindro, 5. Marca y garantía, Agentes limpios (Halotron, FM-200, Novec), Costo total de propiedad a 5 años, Cuándo comprar nuevo vs. mantener el que tienes (+13 more)

### Community 10 - "vida-util-extintor-cuando-reemplazarlo.md"
Cohesion: 0.09
Nodes (21): 1. Vigencia del servicio (1 año), 2. Vigencia de la prueba hidrostática (5 años), 3. Vida útil del cilindro (12–25 años según tipo), Análisis de costo real, Cuándo reemplazar es más inteligente, Cuándo reparar (mantenimiento) es la decisión correcta, Cómo maximizar la vida útil, Disposición correcta de extintores dados de baja (+13 more)

### Community 11 - "extintores-restaurantes-requisitos-normativa-cdmx.md"
Cohesion: 0.10
Nodes (19): Altura y colocación reglamentaria, Calendario de mantenimiento obligatorio, Cómo calcular cuántos extintores necesitas, Especificaciones técnicas del Tipo K, Extintor Tipo K: obligatorio en toda cocina comercial, Extintores por zona: cocina, comedor, bar y almacén, Lista de verificación mensual (para el encargado), Multas y sanciones (+11 more)

### Community 12 - "package.json"
Cohesion: 0.12
Nodes (15): astro, @astrojs/sitemap, dependencies, astro, @astrojs/sitemap, name, private, scripts (+7 more)

### Community 13 - "6.1 Extintores portátiles"
Cohesion: 0.12
Nodes (16): 6.1 Extintores portátiles, 6.2 Extintores móviles y equipos industriales, 6.3 Equipos automáticos y de aplicación local, 6.4 Gabinetes, soportes y protección física, 6.5 Señalización e identificación, 6.6 Refacciones y consumibles, 6.7 Equipamiento complementario directo, 6. Taxonomía maestra recomendada (+8 more)

### Community 14 - "producto-extintor-pqs-4-5kg.md"
Cohesion: 0.12
Nodes (15): Agente Extintor, Construcción del Cilindro, ¿Cuántos extintores de 4.5 kg necesito según la NOM?, ¿Cómo verifico que mi extintor está en buen estado?, Especificaciones Técnicas, Extintor de Polvo Químico Seco ABC 4.5 kg, Instalación y Ubicación, Lo Que Incluye tu Compra en MANEXT (+7 more)

### Community 15 - "Diseño: catálogo MANEXT con sidebar y paginación"
Cohesion: 0.13
Nodes (14): Accesibilidad y experiencia, Arquitectura de la sección, Componentes y responsabilidades, Cuadrícula de productos, Decisiones aprobadas, Diseño: catálogo MANEXT con sidebar y paginación, Estado en URL, Fuera de alcance (+6 more)

### Community 16 - "../layouts/Layout.astro"
Cohesion: 0.21
Nodes (6): ../components/SectionHeader.astro, ../layouts/Layout.astro, faqSchema, serviceSchema, faqSchema, serviceSchema

### Community 17 - "producto-extintor-pqs-6kg.md"
Cohesion: 0.15
Nodes (12): Aplicaciones Recomendadas, Características Destacadas, ¿Cuál es la diferencia real entre el extintor de 4.5 kg y el de 6 kg?, ¿Cuánto cuesta la recarga anual de este extintor?, Especificaciones Técnicas, ¿Este extintor sirve para cocinas comerciales?, Extintor de Polvo Químico Seco ABC 6 kg, ¿Incluye la prueba hidrostática? (+4 more)

### Community 18 - "producto-extintor-co2-4-54kg.md"
Cohesion: 0.17
Nodes (11): Aplicaciones Recomendadas, Características Destacadas, ¿Cuánto cuesta la recarga de CO2?, ¿Es efectivo contra incendios de papel o madera?, Especificaciones Técnicas, Extintor de Dióxido de Carbono CO2 4.54 kg (10 lb), Normas y Certificaciones, ¿Por qué no tiene manómetro? (+3 more)

### Community 19 - "producto-extintor-pqs-9kg.md"
Cohesion: 0.17
Nodes (11): Aplicaciones Recomendadas, ¿Cada cuánto necesita mantenimiento este extintor?, Características Destacadas, ¿El peso de 14.5 kg no dificulta su uso?, Especificaciones Técnicas, Extintor de Polvo Químico Seco ABC 9 kg, Normas y Certificaciones, Preguntas Frecuentes (+3 more)

### Community 20 - "producto-extintor-tipo-k-6L.md"
Cohesion: 0.17
Nodes (11): Aplicaciones Recomendadas, ¿Cada cuánto se recarga el extintor Tipo K?, Características Destacadas, Especificaciones Técnicas, Extintor Tipo K 6 Litros — Especializado en Cocinas Comerciales, Normas y Certificaciones, ¿Por qué no puedo usar un extintor PQS en la cocina?, Preguntas Frecuentes (+3 more)

### Community 21 - "GUÍA MAESTRA DE CREACIÓN DE ARTÍCULOS - MANEXT Blog"
Cohesion: 0.18
Nodes (10): 1. QUICK START - REFERENCIA RÁPIDA, APÉNDICE A: RECURSOS Y HERRAMIENTAS, Documento de Referencia para Homogeneizar Artículos, ⚡ Elementos OBLIGATORIOS (no publicar sin estos):, GUÍA MAESTRA DE CREACIÓN DE ARTÍCULOS - MANEXT Blog, Herramientas SEO Recomendadas, 📊 Métricas objetivo por artículo:, 🚀 Para crear un artículo en 5 minutos: (+2 more)

### Community 22 - "14. CHECKLIST PRE-PUBLICACIÓN"
Cohesion: 0.18
Nodes (11): 14.10 Calidad Final, 14.1 Estructura HTML, 14.2 Schema Markup, 14.3 Contenido, 14.4 SEO, 14.5 Sidebar, 14.6 CTA Final, 14.7 Accesibilidad (+3 more)

### Community 23 - "7. COMPONENTES ESPECIALES"
Cohesion: 0.20
Nodes (10): 7.1 Listas con Clase Especial, 7.2 Info Box (Información Destacada - AZUL), 7.3 Warning Box (Advertencia - AMARILLO/NARANJA), 7.4 Recommendation Box (Recomendación - VERDE), 7.5 Grid de Ventajas/Características, 7.6 Tablas de Datos, 7.7 Imágenes Intermedias con Caption, 7.8 Sección de Preguntas Frecuentes (FAQ) (+2 more)

### Community 24 - "webpack.config.prod.js"
Cohesion: 0.20
Nodes (7): path, common, { merge }, common, CopyPlugin, HtmlWebpackPlugin, { merge }

### Community 25 - "../components/Hero.astro"
Cohesion: 0.20
Nodes (5): ../components/Hero.astro, aboutSchema, faqSchema, faqSchema, productSchema

### Community 27 - "16. AGREGAR ARTICULO AL LISTADO DEL BLOG (blog.html)"
Cohesion: 0.22
Nodes (9): 16.1 Ubicación del Archivo, 16.2 Estructura de Card de Artículo, 16.3 Atributo data-date (OBLIGATORIO), 16.4 Categorías Disponibles para el Badge, 16.5 Sistema de Paginación, 16.6 Actualizar Sidebar "Artículos Populares" (Opcional), 16.7 Ejemplo Completo de Nuevo Artículo, 16.8 Checklist para Agregar Artículo al Blog (+1 more)

### Community 28 - "3. SEO — ANÁLISIS COMPLETO"
Cohesion: 0.22
Nodes (9): 3.1 Titles y Meta Descriptions, 3.2 H1/H2/H3 — Jerarquía, 3.3 Canonicals, 3.4 Trailing Slash, 3.5 Schema Markup — JSON-LD, 3.6 Open Graph / Social, 3.7 Sitemap y Robots, 3.8 Interlinking interno (+1 more)

### Community 29 - "10. DIRECTRICES SEO AVANZADAS"
Cohesion: 0.25
Nodes (8): 10.1 Checklist SEO On-Page, 10.2 Densidad de Keywords, 10.3 Keywords LSI (Latent Semantic Indexing), 10.4 Estructura de URLs, 10.5 Estrategia de Enlaces Internos, 10.6 Optimización para Featured Snippets, 10.7 E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness), 10. DIRECTRICES SEO AVANZADAS

### Community 30 - "5. CONTENIDO DEL ARTÍCULO"
Cohesion: 0.25
Nodes (8): 5.1 Estructura del Artículo Principal, 5.2 Header del Artículo, 5.3 Imagen Destacada, 5.4 Párrafo Introductorio (Lead), 5.5 Tabla de Contenidos (TOC), 5.6 Estructura de Secciones de Contenido, 5.7 Jerarquía de Encabezados, 5. CONTENIDO DEL ARTÍCULO

### Community 31 - "AUDITORÍA EXPERTA — MANEXT (mantenimientodeextintores.mx)"
Cohesion: 0.25
Nodes (7): 10. COMPARACIÓN CON OTROS 4 SITIOS DEL SECTOR, 11. PLAN DE ACCIÓN PRIORIZADO, AUDITORÍA EXPERTA — MANEXT (mantenimientodeextintores.mx), RESUMEN EJECUTIVO, Sprint 1 — URGENTE (esta semana), Sprint 2 — CRÍTICO SEO (2 semanas), Sprint 3 — MEJORAS (1 mes)

### Community 32 - "CHANGELOG SEO — MANEXT (mantenimientodeextintores.mx)"
Cohesion: 0.25
Nodes (7): 0. Baseline (validate-dist.py sobre dist/ existente), 1. Cambios aplicados (working tree, requieren build para reflejarse en dist), 2. Verificado-OK (sin cambios necesarios), 3. PROPUESTOS (NO aplicados), 4. Manuales Cloudflare (dashboard, fuera del repo), 5. Commit sugerido + push (Mac-side, Desktop Commander), CHANGELOG SEO — MANEXT (mantenimientodeextintores.mx)

### Community 33 - "Global Constraints"
Cohesion: 0.25
Nodes (7): Catálogo profesional de extintores MANEXT Implementation Plan, Global Constraints, Task 1: Fuente única de datos y funciones puras, Task 2: Portada Astro renderizada en servidor, Task 3: Sistema visual responsive, Task 4: Progressive enhancement for filtering and quoting, Task 5: Verification and self-review

### Community 34 - "Global Constraints"
Cohesion: 0.25
Nodes (7): Catálogo MANEXT Sidebar and Pagination Implementation Plan, Global Constraints, Task 1: Define the pagination behavior with failing tests, Task 2: Add sidebar and pagination markup contracts, Task 3: Implement client-side pagination and URL state, Task 4: Build the professional responsive layout, Task 5: Verify in the integrated browser

### Community 35 - "6. FÓRMULAS DE COPYWRITING"
Cohesion: 0.29
Nodes (7): 6.1 Fórmula AIDA para Introducciones, 6.2 Fórmula PAS para Secciones de Problema, 6.3 Fórmula BAB para CTAs, 6.4 Plantillas de Hooks por Tipo de Artículo, 6.5 Frases de Autoridad MANEXT, 6.6 Llamadas a la Acción Efectivas, 6. FÓRMULAS DE COPYWRITING

### Community 36 - "8. SIDEBAR COMPLETO"
Cohesion: 0.29
Nodes (7): 8.1 Estructura General del Sidebar, 8.2 Índice Flotante (Sticky TOC), 8.3 CTA Widget (Teléfono y WhatsApp), 8.4 Artículos Relacionados Sidebar, 8.5 Productos Recomendados Sidebar, 8.6 Widget Catálogo Destacado, 8. SIDEBAR COMPLETO

### Community 37 - "4. CONTENIDO — ANÁLISIS POR SECCIÓN"
Cohesion: 0.29
Nodes (7): 4.1 Home (`/`), 4.2 Páginas de servicio — Calidad general: BUENA-MEDIA, 4.3 Páginas de tipo de extintor — Calidad: MEDIA, 4.4 Productos (`/productos/[slug]`) — Calidad: MUY MALA, 4.5 Nosotros — Calidad: EXCELENTE, 4.6 Contacto — Calidad: MUY BUENA, 4. CONTENIDO — ANÁLISIS POR SECCIÓN

### Community 38 - "15. PLANTILLAS Y EJEMPLOS"
Cohesion: 0.33
Nodes (6): 15.1 Comando de Creación Rápida, 15.2 Plantilla de Meta Tags (Copiar y Pegar), 15.3 Plantilla de Introducción AIDA, 15.4 Plantilla de Sección Estándar, 15.5 Plantilla de FAQ Schema, 15. PLANTILLAS Y EJEMPLOS

### Community 39 - "3. SCHEMA MARKUP Y DATOS ESTRUCTURADOS"
Cohesion: 0.33
Nodes (6): 3.1 Schema Article (OBLIGATORIO), 3.2 Schema BreadcrumbList (OBLIGATORIO), 3.3 Schema FAQPage (Si el artículo tiene preguntas frecuentes), 3.4 Schema HowTo (Para artículos tipo guía/tutorial), 3.5 Schema LocalBusiness (Incluir en todos los artículos), 3. SCHEMA MARKUP Y DATOS ESTRUCTURADOS

### Community 40 - "1. ESTRUCTURA DEL SITIO — MAPA COMPLETO"
Cohesion: 0.33
Nodes (6): 1. ESTRUCTURA DEL SITIO — MAPA COMPLETO, Nivel L1 (Páginas principales), Nivel L2 — Catálogo por tipo (6 páginas), Nivel L2 — Servicios (6 páginas), Nivel L3 — Blog (41 entradas en `/blog/[slug]`), Nivel L3 — Productos individuales (42 páginas en `/productos/[slug]`)

### Community 41 - "5. BLOG — ANÁLISIS DE CALIDAD Y DUPLICADOS"
Cohesion: 0.33
Nodes (6): 5.1 Artículos de calidad real (estimado: ~20), 5.2 Duplicados confirmados — PROBLEMA CRÍTICO, 5.3 Category stubs — Thin Content, 5.4 Artículos sin heroImage, 5.5 Artículos sin pubDate, 5. BLOG — ANÁLISIS DE CALIDAD Y DUPLICADOS

### Community 42 - "7. IMÁGENES"
Cohesion: 0.33
Nodes (6): 7.1 Formatos, 7.2 Alt Text, 7.3 Imágenes faltantes (errores activos), 7.4 Estructura de carpetas — Problemas, 7.5 Optimización, 7. IMÁGENES

### Community 43 - "astro.config.mjs"
Cohesion: 0.50
Nodes (4): _dateCache, lastmodForUrl(), ROOT, sourceDate()

### Community 44 - "11. OPTIMIZACIÓN DE IMÁGENES"
Cohesion: 0.40
Nodes (5): 11.1 Especificaciones Técnicas, 11.2 Nomenclatura de Archivos, 11.3 Alt Text Optimizado, 11.4 Imágenes Disponibles, 11. OPTIMIZACIÓN DE IMÁGENES

### Community 45 - "2. LAYOUTS Y COMPONENTES"
Cohesion: 0.40
Nodes (5): 2. LAYOUTS Y COMPONENTES, `src/components/Hero.astro`, `src/layouts/Layout.astro`, `src/pages/blog/[...slug].astro`, `src/pages/productos/[...slug].astro`

### Community 46 - "6. MARKETING Y CONVERSIÓN"
Cohesion: 0.40
Nodes (5): 6.1 Propuesta de valor, 6.2 CTAs, 6.3 Trust signals, 6.4 Diferenciadores vs competencia, 6. MARKETING Y CONVERSIÓN

### Community 47 - "8. CSS Y TÉCNICO"
Cohesion: 0.40
Nodes (5): 8.1 CSS, 8.2 JavaScript, 8.3 Performance técnica, 8.4 Accesibilidad, 8. CSS Y TÉCNICO

### Community 48 - "agentes-limpios.astro"
Cohesion: 0.40
Nodes (4): extTipos, faqSchema, productSchema, string

### Community 49 - "agua-presion.astro"
Cohesion: 0.40
Nodes (4): extTipos, faqSchema, schema, string

### Community 50 - "co2.astro"
Cohesion: 0.40
Nodes (4): extTipos, faqSchema, productSchema, string

### Community 51 - "espuma-afff.astro"
Cohesion: 0.40
Nodes (4): extTipos, faqSchema, productSchema, string

### Community 52 - "polvo-quimico-seco.astro"
Cohesion: 0.40
Nodes (4): extTipos, faqSchema, productSchema, string

### Community 53 - "tipo-k.astro"
Cohesion: 0.40
Nodes (4): extTipos, faqSchema, productSchema, string

### Community 54 - "12. ACCESIBILIDAD WEB"
Cohesion: 0.50
Nodes (4): 12.1 Requisitos WCAG 2.1 Nivel AA, 12.2 ARIA Labels Requeridos, 12.3 CSS para Accesibilidad, 12. ACCESIBILIDAD WEB

### Community 55 - "2. ESTRUCTURA DEL ARCHIVO HTML"
Cohesion: 0.50
Nodes (4): 2.1 Declaración DOCTYPE y HTML, 2.2 Sección HEAD Completa (Optimizada), 2.3 Variables a Reemplazar - Guía Rápida, 2. ESTRUCTURA DEL ARCHIVO HTML

### Community 56 - "4. ESTRUCTURA DEL BODY"
Cohesion: 0.50
Nodes (4): 4.1 Menu Container, 4.2 Breadcrumbs (Migas de Pan) - Con Accesibilidad Mejorada, 4.3 Categorías Disponibles, 4. ESTRUCTURA DEL BODY

### Community 57 - "9. CTAS Y CONVERSIÓN"
Cohesion: 0.50
Nodes (4): 9.1 Sección de Artículos Relacionados (Después del contenido), 9.2 CTA Final (Sección de conversión principal), 9.3 Variantes de CTA por Tipo de Artículo, 9. CTAS Y CONVERSIÓN

### Community 58 - "9. ERRORES Y BUGS ACTIVOS"
Cohesion: 0.50
Nodes (4): 9. ERRORES Y BUGS ACTIVOS, 🔴 CRÍTICOS (afectan conversión o penalización), 🟠 IMPORTANTES (afectan SEO y confianza), 🟡 MENORES (calidad, mantenimiento)

### Community 59 - "MANEXT — Memoria operativa"
Cohesion: 0.50
Nodes (3): Catálogo y fichas de producto, MANEXT — Memoria operativa, Próximo producto sugerido

### Community 60 - "content.config.ts"
Cohesion: 0.50
Nodes (3): blogCollection, collections, productosCollection

### Community 62 - "13. FOOTER Y SCRIPTS"
Cohesion: 0.67
Nodes (3): 13.1 Footer Container, 13.2 Scripts de Carga (Optimizados), 13. FOOTER Y SCRIPTS

## Knowledge Gaps
- **474 isolated node(s):** `ROOT`, `_dateCache`, `name`, `type`, `version` (+469 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `GUÍA MAESTRA DE CREACIÓN DE ARTÍCULOS - MANEXT Blog` connect `GUÍA MAESTRA DE CREACIÓN DE ARTÍCULOS - MANEXT Blog` to `6. FÓRMULAS DE COPYWRITING`, `8. SIDEBAR COMPLETO`, `15. PLANTILLAS Y EJEMPLOS`, `3. SCHEMA MARKUP Y DATOS ESTRUCTURADOS`, `11. OPTIMIZACIÓN DE IMÁGENES`, `5. CONTENIDO DEL ARTÍCULO`, `2. ESTRUCTURA DEL ARCHIVO HTML`, `12. ACCESIBILIDAD WEB`, `14. CHECKLIST PRE-PUBLICACIÓN`, `4. ESTRUCTURA DEL BODY`, `7. COMPONENTES ESPECIALES`, `16. AGREGAR ARTICULO AL LISTADO DEL BLOG (blog.html)`, `10. DIRECTRICES SEO AVANZADAS`, `13. FOOTER Y SCRIPTS`, `9. CTAS Y CONVERSIÓN`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `../layouts/Layout.astro` connect `../layouts/Layout.astro` to `mantenimiento-preventivo.astro`, `recarga-de-extintores.astro`, `hospitales.astro`, `catalogo.astro`, `senalizacion.astro`, `agentes-limpios.astro`, `agua-presion.astro`, `co2.astro`, `espuma-afff.astro`, `polvo-quimico-seco.astro`, `tipo-k.astro`, `../components/Hero.astro`, `[...slug].astro`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `Estudio de mercado y taxonomía maestra para el catálogo MANEXT` connect `Estudio de mercado y taxonomía maestra para el catálogo MANEXT` to `6.1 Extintores portátiles`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `ROOT`, `_dateCache`, `name` to the rest of the system?**
  _474 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Estudio de mercado y taxonomía maestra para el catálogo MANEXT` be split into smaller, more focused modules?**
  _Cohesion score 0.041666666666666664 - nodes in this community are weakly interconnected._
- **Should `Diseño aprobado para el nuevo catálogo de extintores MANEXT` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `catalogo.astro` be split into smaller, more focused modules?**
  _Cohesion score 0.11330049261083744 - nodes in this community are weakly interconnected._