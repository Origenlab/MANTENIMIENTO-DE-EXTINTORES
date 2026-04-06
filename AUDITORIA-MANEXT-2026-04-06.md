# AUDITORÍA EXPERTA — MANEXT (mantenimientodeextintores.mx)
**Fecha:** 2026-04-06
**Auditor:** Claude (Origenlab / Franko Oropeza)
**Stack:** Astro 5.x + @astrojs/sitemap | Deploy: GitHub Actions → Cloudflare/GitHub Pages
**Referencia sector:** BOMBERO, MESECI, PROYECTORED, GAMADEMEXICO

---

## RESUMEN EJECUTIVO

MANEXT tiene una base técnica sólida (Astro, AVIF, breadcrumbs, schema) y contenido de blog relativamente robusto en las piezas principales. Sin embargo, tiene **tres problemas críticos que dañan activamente su SEO**:

1. **Canibalización severa** — home, `/servicios`, `/extintores` y `/venta-de-extintores` compiten por la misma keyword raíz.
2. **Contenido duplicado masivo en blog** — 5 artículos casi idénticos sobre Clases de Fuego; múltiples pares de artículos duplicados.
3. **27 de 42 páginas de productos con contenido placeholder** — literalmente `<p>Descripción del producto.</p>`.

Además hay errores operativos graves: número de WhatsApp equivocado en el template de productos, OG images faltantes para 6 páginas, y rating falso en schema que viola las políticas de Google.

---

## 1. ESTRUCTURA DEL SITIO — MAPA COMPLETO

### Nivel L1 (Páginas principales)
| URL | Página |
|-----|--------|
| `/` | Home |
| `/servicios` | Hub de servicios |
| `/extintores` | Venta de extintores (página de conversión) |
| `/catalogo` | Catálogo interactivo (JS dinámico) |
| `/nosotros` | Historia y valores |
| `/blog/` | Blog (hub) |
| `/contacto` | Contacto + formulario WA |
| `/privacidad` | Política de privacidad |
| `/terminos` | Términos y condiciones |
| `/404` | Error 404 personalizado |

### Nivel L2 — Servicios (6 páginas)
| URL | Servicio |
|-----|---------|
| `/venta-de-extintores` | Venta de extintores |
| `/mantenimiento-preventivo` | Mantenimiento preventivo |
| `/recarga-de-extintores` | Recarga de extintores |
| `/prueba-hidrostatica` | Prueba hidrostática |
| `/capacitacion-brigadas` | Capacitación y brigadas |
| `/senalizacion` | Señalización y equipamiento |

### Nivel L2 — Catálogo por tipo (6 páginas)
| URL | Tipo |
|-----|------|
| `/polvo-quimico-seco` | PQS — Clase ABC |
| `/co2` | CO2 — Clase BC |
| `/agua-presion` | Agua a presión — Clase A |
| `/tipo-k` | Tipo K — Cocinas |
| `/espuma-afff` | Espuma AFFF — Clase AB |
| `/agentes-limpios` | Agentes Limpios |

### Nivel L3 — Productos individuales (42 páginas en `/productos/[slug]`)
Distribuidos así:
- **PQS:** 8 modelos (1kg, 2.5kg, 4.5kg, 6kg, 9kg, 13kg, 50kg rodante, 68kg rodante) + 1 página de categoría
- **CO2:** 7 modelos (2.27kg, 4.54kg, 6.81kg, 9kg, 9.08kg, 11.3kg, 13.62kg)
- **Agua:** 6 modelos (6L, 9L, 12L, 15L, 18L, 20L)
- **Tipo K:** 7 modelos (1.6gal, 2.5L, 4L, 6L, 9L, 12L, 15L) + 1 página de categoría
- **Espuma AFFF:** 6 modelos (6L, 9L, 11L, 15L, 18L, 20L)
- **Agentes Limpios:** 6 modelos (2.7kg, 4.5kg, 5.4kg, 6.8kg, 9kg, 11kg)

### Nivel L3 — Blog (41 entradas en `/blog/[slug]`)
Ver sección 5 para análisis de calidad y duplicados.

**Total de páginas indexables: ~120** (home + 9 L1 + 12 L2 + 42 productos + ~30 artículos reales de blog + legales)

---

## 2. LAYOUTS Y COMPONENTES

### `src/layouts/Layout.astro`
**El layout principal del sitio.**

Props recibidas:
| Prop | Tipo | Descripción |
|------|------|-------------|
| `title` | string (req) | `<title>` de la página |
| `description` | string (req) | Meta description |
| `canonical` | string (req) | URL canónica absoluta |
| `ogTitle` | string (opt) | OG Title (fallback: title) |
| `ogDescription` | string (opt) | OG Description (fallback: description) |
| `ogImage` | string (opt) | OG Image URL (fallback: `/img/og-image.avif`) |
| `breadcrumbs` | array (opt) | Migas de pan [{name, url}] |
| `schemas` | string[] (opt) | JSON-LD adicionales como strings |
| `extraCss` | string[] (opt) | CSS adicionales a cargar |

**Lo que hace:**
- Genera HTML completo con `lang="es-MX"`
- Inyecta CSS inline minificado en `<head>` para estilos críticos (good for LCP)
- Carga `/css/style.css` con preload asíncrono + noscript fallback
- Siempre inyecta `BreadcrumbList` schema
- Top info bar con teléfono, horario, WhatsApp y Facebook
- Navbar con dropdowns (Servicios, Catálogo) + menú móvil con overlay
- Breadcrumbs visuales + schema
- Footer con 4 columnas: empresa, servicios, tipos, navegación
- Analytics: Rybbit.io (id: `f9641f347b5a`)

**Problemas detectados en Layout.astro:**
- `apple-touch-icon` apunta a `/icon.avif` — **el archivo no existe** en `public/`. Solo existe `public/icon.png` e `public/icon.svg`.
- Footer copyright dice "© 2025" — **debe ser 2026**.
- Top info bar dice horario "Lun - Dom: 8:00 - 18:00" pero el footer dice "Lun-Vie: 8:00-18:00 / Sáb: 9:00-14:00" — **información contradictoria**.
- Sin Twitter handle (`@`) en las meta tags de Twitter Card — las meta `twitter:*` están pero sin cuenta asociada.
- No hay `<meta name="author">` ni `<link rel="preload">` para imagen LCP en páginas donde la hero image es crítica.

### `src/components/Hero.astro`
**Componente reutilizable de hero.**

Props: `title`, `subtitle`, `description`, `ctaPhone`, `ctaWhatsApp`, `paragraphs[]`

Renderiza una sección `.hero` con grid 2 columnas: izquierda (H1, subtitle, descripción, botones) y derecha (párrafos con HTML). CTAs generan `tel:` y `https://wa.me/521{phone}`.

**Uso:** Solo se usa en `index.astro`. El resto de páginas inlinan el HTML del hero directamente — inconsistencia que complica el mantenimiento.

### `src/pages/blog/[...slug].astro`
Template para artículos de blog. Usa `article` con `itemscope itemtype="https://schema.org/Article"` (microdata, no JSON-LD). Sidebar sticky con CTA WhatsApp y links a servicios. Carga `blog-article.css` y `blog-system.css`.

**Problema:** El schema de Article usa microdata pero **no incluye** `author`, `datePublished`, `publisher` — señales de E-E-A-T incompletas.

### `src/pages/productos/[...slug].astro`
Template para fichas de productos. Estilo dark (fondo negro/gris oscuro) con imagen prominente.

**ERROR CRÍTICO:** El botón de cotizar tiene el número equivocado:
```
https://wa.me/5215627596245  ← NÚMERO INCORRECTO
```
El número correcto es `5215539689272`. **Todos los leads de 42 páginas de producto se están perdiendo.**

---

## 3. SEO — ANÁLISIS COMPLETO

### 3.1 Titles y Meta Descriptions

| Página | Title | Descripción | Problema |
|--------|-------|-------------|---------|
| Home `/` | "Venta de Extintores en CDMX \| Certificados NOM \| MANEXT" (57 chars) | "Venta de extintores certificados NOM en CDMX..." (134 chars) | ✅ Correcto |
| `/servicios` | "Venta y Mantenimiento de Extintores Certificados \| CDMX" (56 chars) | 162 chars ✅ | ⚠️ Sin brand MANEXT en title |
| `/extintores` | "Venta de Extintores en CDMX \| Precios y Equipos Certificados NOM" (66 chars) | OK | ⚠️ Canibaliza home y /venta |
| `/venta-de-extintores` | "Venta de Extintores en CDMX \| Productos Certificados NOM \| MANEXT" (67 chars) | OK | ⚠️ Canibaliza home y /extintores |
| `/catalogo` | "Catálogo de Extintores Certificados NOM \| CDMX" | OK | ✅ Diferenciado |
| `/nosotros` | "Nosotros \| Más de 80 Años en Extintores CDMX" | OK | ✅ |
| `/contacto` | "Contacto \| Cotización de Extintores Gratis CDMX" | OK | ✅ |
| `/polvo-quimico-seco` | "Venta de Extintores de Polvo Químico Seco ABC \| PQS Certificados CDMX" | OK | ⚠️ Sin canonical explícito en props |
| Blog posts | `{title} \| MANEXT` | Variable | ⚠️ Ver sección blog |

**Canibalización crítica:** Home, `/servicios`, `/extintores` y `/venta-de-extintores` **compiten por "venta de extintores CDMX"**. Google no sabe cuál priorizar. La intención de estas páginas debe diferenciarse claramente o consolidarse.

### 3.2 H1/H2/H3 — Jerarquía

**Index:**
- H1: "Venta de Extintores Certificados — Protección Contra Incendios en CDMX" ✅
- H2s: "Normas y Certificaciones de Protección Civil", "Nuestros Servicios", etc. ✅
- Pero: la sección `.benefits` tiene `<h2 class="sr-only">` invisible — la jerarquía visual empieza en H3, lo cual confunde crawlers.

**Servicios hub (`/servicios`):**
- H1: "Venta de Extintores y Equipos Contra Incendios — Recarga y Mantenimiento" ✅
- H2s: "Venta de Extintores Certificados", "Mantenimiento de Extintores Preventivo" — estos son sub-servicios, correcto.

**Páginas de tipo de extintor (e.g. `/polvo-quimico-seco`):**
- H1: bien diferenciados por tipo ✅

**Blog posts:**
- Estructura de `<h2>`/`<h3>` generalmente buena en los artículos largos.
- Los artículos "stub" (category pages) no tienen jerarquía real.

### 3.3 Canonicals

- Todas las páginas principales tienen canonical absoluto ✅
- **`/polvo-quimico-seco.astro` no pasa prop `canonical`** al Layout — el Layout recibirá `canonical=""` undefined. El `<link rel="canonical">` generará una URL vacía o incorrecta. ⚠️

### 3.4 Trailing Slash

`trailingSlash: 'never'` en `astro.config.mjs` ✅. El nav y el footer usan `/blog/` con slash (excepción), los demás sin slash. Consistente excepto por `/blog/`.

### 3.5 Schema Markup — JSON-LD

| Página | Schema | Problema |
|--------|--------|---------|
| Todas | `BreadcrumbList` ✅ | OK |
| Home | `LocalBusiness` | ⚠️ **`ratingValue: "5"`, `reviewCount: "15000"` — falsificado** |
| Home | `FAQPage` ✅ | OK |
| `/extintores` | `Product` | ⚠️ `ratingValue: "4.9"`, `reviewCount: "287"` — sin fuente verificable |
| Servicios L2 | `Service` ✅ | OK pero imagen `logo.avif` no existe |
| `/catalogo` | `ProductCatalog` | ⚠️ **Tipo no reconocido por Google** — usar `ItemList` |
| `/productos/[slug]` | Sin schema | ❌ Falta `Product` JSON-LD (solo hay microdata en blog) |
| Blog | `Article` microdata | ⚠️ Incompleto — falta `author`, `datePublished`, `publisher` |

**Problema grave con schema de ratings falsos:** Google puede aplicar acciones manuales (penalización) por schema con ratings fabricados sin fuente verificable (Reviews reales). Los `15,000 reseñas con 5 estrellas perfectas` son un red flag enorme.

### 3.6 Open Graph / Social

- OG tags completos en todas las páginas ✅
- Twitter Card `summary_large_image` ✅
- `og:locale` = `es_MX` ✅
- **OG Images faltantes (archivos no existen en el repo):**
  - `/img/og-venta-extintores.avif` ← no existe
  - `/img/og-mantenimiento-preventivo.avif` ← no existe
  - `/img/og-recarga-extintores.avif` ← no existe
  - `/img/og-prueba-hidrostatica.avif` ← no existe
  - `/img/og-capacitacion-brigadas.avif` ← no existe
  - `/img/og-senalizacion.avif` ← no existe
  - Solo existe: `/img/og-image.avif` (usado como fallback en otras páginas)
- **Las 6 páginas de servicio más importantes compartirán el OG image genérico cuando se compartan en redes sociales.**

### 3.7 Sitemap y Robots

**robots.txt:**
- `User-agent: *` → `Allow: /` ✅
- Bloqueos lógicos para rutas de desarrollo ✅
- `Sitemap: https://mantenimientodeextintores.mx/sitemap.xml` ✅
- `Crawl-delay: 1` — innecesario con Cloudflare, puede limitar velocidad de indexación

**sitemap.xml:**
- Generado automáticamente por `@astrojs/sitemap` en el build ✅
- No existe en el repositorio (solo post-build) — correcto para Astro
- **Problema:** Las páginas de blog con contenido duplicado/thin se incluirán en el sitemap y serán crawleadas, diluyendo PageRank.

### 3.8 Interlinking interno

**Bueno:**
- Footer enlaza a todas las páginas L1 y L2 ✅
- Sidebar de blog enlaza a 3 servicios principales ✅
- Algunos artículos enlazan a páginas de servicio ✅

**Problemas:**
- **2 enlaces rotos** en contenido de blog apuntando a `/tipos-de-extintores/polvo-quimico-seco-pqs` — URL que **no existe** (la correcta sería `/polvo-quimico-seco`).
- **1 enlace roto** en blog apuntando a `/servicios/mantenimiento-de-extintores` — URL que **no existe** (la correcta sería `/mantenimiento-preventivo`).
- Las páginas de producto (`/productos/[slug]`) **no enlazan de regreso** a su categoría tipo-extintor ni a los servicios — isla de contenido.
- No existe un hub de blog con paginación real — `/blog/` es una página estática que no lista artículos automáticamente (usa JS externo con `articles.json`).

---

## 4. CONTENIDO — ANÁLISIS POR SECCIÓN

### 4.1 Home (`/`)
**Calidad: BUENA**
- Hero con H1 diferenciado, propuesta de valor clara, CTAs dobles ✅
- Sección de beneficios (4 cards) con íconos SVG ✅
- Sección de certificaciones (NOM-154, NOM-002, NOM-026, Garantía) ✅
- Sección de servicios con imágenes AVIF y links correctos ✅
- Sección de tipos de extintor con imágenes ✅
- Testimonios (5 reseñas con nombres y fotos) ✅
- FAQ (4 preguntas con schema) ✅
- CTA final de WhatsApp ✅

**Problemas:**
- La foto de logo en el `<header>` es la imagen `venta-y-mantenimiento-de-extintores.avif` — no es un logo vectorial, sino una foto de producto. Problema de branding.
- `h2 class="sr-only"` en benefits section — ocultando semántica a crawlers.

### 4.2 Páginas de servicio — Calidad general: BUENA-MEDIA
Las 6 páginas de servicio tienen contenido suficientemente diferenciado entre sí, con estructura hero + secciones + FAQ. La más completa es `/mantenimiento-preventivo`. La más débil es `/senalizacion` (ver sección blog para duplicados).

**Problema transversal:** Los heroes de servicios están inline (no usan el componente `<Hero>`) con HTML minificado — dificulta mantenimiento y futuros cambios visuales.

### 4.3 Páginas de tipo de extintor — Calidad: MEDIA
`/polvo-quimico-seco`, `/co2`, `/agua-presion`, `/tipo-k`, `/espuma-afff`, `/agentes-limpios` — tienen contenido aceptable pero con densidad de keywords excesiva (keyword stuffing evidente). Ejemplo en `/extintores`:

> "Además de la **venta de extintores en la CDMX**, **damos mantenimiento** y **recarga de extintores** a domicilio. La **recarga de extintores en CDMX** es obligatoria... Nuestro servicio de **recarga y mantenimiento de extintores**... Para **venta y recarga de extintores**... **mantenimiento y recarga de extintores** programado... **venta y mantenimiento de extintores**..."

Esto es keyword stuffing que Google puede penalizar con el algoritmo Helpful Content.

### 4.4 Productos (`/productos/[slug]`) — Calidad: MUY MALA
**27 de 42 fichas de producto tienen únicamente:** `<p>Descripción del producto.</p>`

Esto representa el **64% del catálogo con thin content absoluto**. Estas páginas:
- No aportan valor a usuarios ni a Google
- Se indexan y diluyen el PageRank del sitio
- Son un riesgo de penalización por contenido de baja calidad
- Desperdician el trabajo de crear las rutas `/productos/[slug]`

**Solo tienen contenido real:**
- Agentes Limpios (6 modelos con contenido detallado) ✅
- Espuma AFFF (6 modelos con contenido) ✅
- PQS 4.5kg → placeholder
- Tipo K → placeholders

### 4.5 Nosotros — Calidad: EXCELENTE
Historia narrativa con timeline 1943→presente, valores, equipo. Es la página más humana y bien escrita. Genera confianza. ✅

### 4.6 Contacto — Calidad: MUY BUENA
Múltiples canales (teléfono, WhatsApp, email), formulario que redirige a WhatsApp, horarios, dirección física, área de cobertura. Muy completo. ✅

---

## 5. BLOG — ANÁLISIS DE CALIDAD Y DUPLICADOS

**Total de archivos en `/src/content/blog/`:** 41

### 5.1 Artículos de calidad real (estimado: ~20)
Los artículos más completos (4,000-8,000 palabras) con estructura TOC, tablas comparativas, FAQ y CTAs:
- `multas-no-tener-extintores-montos-evitarlas.md` ✅
- `proteccion-civil-cdmx-requisitos-extintores.md` ✅
- `extintores-restaurantes-requisitos-normativa-cdmx.md` ✅
- `vida-util-extintor-cuando-reemplazarlo.md` ✅
- `precios-extintores-cdmx-guia-actualizada.md` ✅
- `nom-002-stps-seguridad-incendios-trabajo.md` ✅
- `nom-154-scfi-guia-completa-cumplimiento-extintores.md` ✅

### 5.2 Duplicados confirmados — PROBLEMA CRÍTICO

**Grupo 1 — Clases de fuego (5 artículos casi idénticos):**
| Slug | Title |
|------|-------|
| `clases-clases-de-fuego-a-b-c-d-k-guia-tecnica-completa` | "Clases de Fuego A B C D K: Guía Técnica Completa" |
| `clases-clases-fuego-a-b-c-d-k-guia-tecnica-completa` | "Clases de Fuego A B C D K: Guía Técnica Completa 2024" |
| `clases-de-fuego-a-b-c-d-k-guia-completa-extintor` | "Clases de Fuego A B C D K: Guía Completa para Elegir Extintor" |
| `clases-de-fuego-extintor-correcto` | "Clases de Fuego: A B C D K y el Extintor Correcto" |
| `clases-fuego-a-b-c-d-k-guia-completa` | "Clases de Fuego A, B, C, D y K" |

**→ Acción: Consolidar en UN artículo canónico. Redirigir los 4 restantes con 301.**

**Grupo 2 — Recarga de extintores (2 duplicados):**
- `recarga-de-extintores-certificada-nom-154-cdmx-manext`
- `recarga-de-extintores-certificada-nom-154-manext-cdmx`

**Grupo 3 — Señalización (2 duplicados):**
- `senalizacion-contra-incendios-nom-equipamiento-de-segur`
- `senalizacion-contra-incendios-nom-equipamiento-profesio`

**Grupo 4 — Capacitación de brigadas (2 duplicados):**
- `capacitacion-brigadas-contra-incendio-formacion-cdmx`
- `capacitacion-de-brigadas-contra-incendio-certificada-cd`

**Grupo 5 — Prueba hidrostática (2 artículos):**
- `prueba-hidrostatica-extintores-2026`
- `prueba-hidrostatica-extintores-guia-tecnica`
*(estos dos podrían diferenciarse más — uno general y uno específico 2026)*

### 5.3 Category stubs — Thin Content
Estos archivos generan páginas indexables con contenido placeholder:
- `index.md` → "Contenido principal no detectado automáticamente."
- `emergencias-y-protocolos.md` → idem
- `seguridad-contra-incendios.md` → idem
- `equipos-contra-incendio.md` → idem
- `guias-y-comparativas.md` → idem
- `hogar-y-familia.md` → idem
- `industria-y-comercio.md` → idem
- `mantenimiento-y-recarga.md` → idem
- `normativas-y-certificaciones.md` → idem
- `prevencion-empresarial.md` → idem
- `tipos-de-extintores.md` → idem

**11 páginas con thin content puro.** Deben o bien llenarse con contenido real o bloquearse del índice con `noindex`.

### 5.4 Artículos sin heroImage
La mayoría de artículos no tienen `heroImage` en el frontmatter. El template de blog los muestra sin imagen de cabecera. Solo los 8 artículos con imágenes AVIF en `img-blog/` tienen visual: clases de fuego, comparativa, extintores restaurantes, multas, NOM-002, precios, protección civil, vida útil.

### 5.5 Artículos sin pubDate
El schema de `content.config.ts` tiene `pubDate` como opcional. Ninguno de los artículos revisados tiene `pubDate` en el frontmatter. Esto impide incluir `datePublished` en los schemas de Article, afectando E-E-A-T y la elegibilidad para rich results de artículos de noticias.

---

## 6. MARKETING Y CONVERSIÓN

### 6.1 Propuesta de valor
- "Protegiendo a México desde 1943" ✅ — diferenciador de legado
- "+80 años de experiencia" ✅ — consistente
- "NOM-154-SCFI y NOM-002-STPS" — mención normativa correcta ✅
- "Entrega en 48 horas CDMX" ✅ — urgencia y conveniencia
- "Cotización gratuita 24/7" ✅

### 6.2 CTAs
- Teléfono y WhatsApp en TODAS las páginas ✅
- Top bar, header, hero, sidebar, footer — cobertura máxima ✅
- Formulario en /contacto que redirige a WhatsApp ✅ (aunque sin backend — no hay captura de datos si el usuario cierra WA)

### 6.3 Trust signals
- Testimonios con nombres y fotos de avatar en home ✅
- Timeline histórico en /nosotros ✅
- Certificaciones NOM visibles ✅
- Google Site Verification presente ✅
- Facebook link ✅
- **Falta:** Número de clientes atendidos visible (solo en nosotros: "15,000 clientes"), falta en home
- **Falta:** Dirección física en home (solo aparece en /contacto)

### 6.4 Diferenciadores vs competencia
| Diferenciador | MANEXT | Sector (BOMBERO/MESECI) |
|---------------|--------|------------------------|
| Años de experiencia | 83 años (1943) | Varía |
| Catálogo digital filtrable | ✅ (JS dinámico) | Parcial |
| Cobertura explícita | ✅ 9 municipios listados | Parcial |
| Horario dominical | ✅ | Varía |
| Prueba hidrostática | ✅ página dedicada | Pocas empresas |
| Precios publicados | ❌ No hay precios | Igual en sector |

---

## 7. IMÁGENES

### 7.1 Formatos
- **100% AVIF** en todo el sitio ✅ — excelente rendimiento, Google lo indexa bien
- Sin JPG, PNG ni WebP en contenido del sitio — consistente ✅

### 7.2 Alt Text
- Las imágenes de servicio tienen alt descriptivos y contextuales ✅
- Las imágenes de hero/tipo tienen alt con marca+producto ✅
- Las fichas de producto sin contenido real tienen `alt={entry.data.title}` — minimalista pero funcional

### 7.3 Imágenes faltantes (errores activos)
| Imagen referenciada | Estado |
|--------------------|--------|
| `/img/og-venta-extintores.avif` | ❌ No existe |
| `/img/og-mantenimiento-preventivo.avif` | ❌ No existe |
| `/img/og-recarga-extintores.avif` | ❌ No existe |
| `/img/og-prueba-hidrostatica.avif` | ❌ No existe |
| `/img/og-capacitacion-brigadas.avif` | ❌ No existe |
| `/img/og-senalizacion.avif` | ❌ No existe |
| `/img/logo.avif` | ❌ No existe (referenciado en schemas de Service) |
| `/icon.avif` | ❌ No existe (referenciado como apple-touch-icon) |

**Total: 8 imágenes faltantes en producción.**

### 7.4 Estructura de carpetas — Problemas
- **Carpeta duplicada:** `/public/img/img/` es un duplicado espejo de `/public/img/` — contiene las mismas imágenes de todas las subcarpetas. Desperdicio de almacenamiento, posible confusión en rutas.
- **También duplicado:** `/public/img/img-ventas-de-extintores/img-capacitacion-y-brigadas/` — otra copia de imágenes de capacitación.
- **Typo en carpeta:** `img-matenimiento-preventivo` ← falta "n", debería ser `img-mantenimiento-preventivo`
- **Typos en nombres de archivo:**
  - `prueba-hisdrostatica-para-extintores-co2.avif` ← "hisdrostatica"
  - `purbea-hisdrostatica-para-extintores-con-agentes-limpios.avif` ← "purbea" y "hisdrostatica"
  - `extintores-porque-s-polvo-quimico-seco-tipo-abc.avif` ← "porque-s"
  - `señalizaion-y-equipamiento.avif` ← "señalizaion"
  - `polias-de-mantenimiento-anual.avif` ← "polias" (¿pólizas?)

### 7.5 Optimización
- Sin `width`/`height` en algunas imágenes de blog (provoca CLS) ⚠️
- Las imágenes de producto en el template usan altura fija `380px object-fit:contain` — adecuado ✅
- `loading="lazy"` en imágenes secundarias ✅
- `loading="eager"` en imagen hero de artículo ✅

---

## 8. CSS Y TÉCNICO

### 8.1 CSS
- **Inline crítico** en `<head>` de Layout: ~4KB de CSS para header, nav, hero, breadcrumbs — excelente para LCP ✅
- Carga asíncrona del CSS principal con fallback noscript ✅
- Versionado de CSS con `?v=` en querystring ✅ (cache busting)
- **CSS en archivos separados:**
  - `style.css?v=18` — estilos globales
  - `section-redesign.css?v=1` — nuevo sistema de secciones (cargado solo donde se necesita)
  - `blog-article.css?v=5` — artículos del blog
  - `blog-system.css?v=8` — listado del blog
  - `catalog-system.css?v=4` — catálogo dinámico
  - `mobile-enhancements.css?v=1` — mejoras móvil (cargado en todas las páginas)
- **Sin Google Fonts** — usa 'Segoe UI' del sistema ✅ excelente para performance

### 8.2 JavaScript
- `catalog-system.js?v=4` — JS para el catálogo filtrable dinámico
- `blog-system.js` — JS para el hub de blog
- `app.js` — referenciado en /contacto pero no existe confirmado en repositorio (podría ser generado o faltante) ⚠️
- JS inline en Layout para navegación móvil — apropiado para funcionalidad crítica ✅

### 8.3 Performance técnica
- `_headers` con cache headers adecuados (1 año para assets, 1 hora para HTML) ✅
- `preconnect` a `wa.me` y `dns-prefetch` a `app.rybbit.io` ✅
- `dns-prefetch` a `wa.me` ✅
- Sin Google Tag Manager ni scripts pesados de terceros ✅
- Rybbit.io con `defer` ✅

### 8.4 Accesibilidad
- `skip-link` ("Saltar al contenido principal") ✅
- `role="banner"`, `role="navigation"`, `role="menubar"` en nav ✅
- `aria-expanded`, `aria-haspopup` en dropdowns ✅
- `aria-label` en logo e íconos sociales ✅
- `aria-current="page"` aplicado via JS ✅
- HTML de blog es raw (sin procesamiento de accesibilidad) — depende del contenido generado

---

## 9. ERRORES Y BUGS ACTIVOS

### 🔴 CRÍTICOS (afectan conversión o penalización)

| # | Error | Ubicación | Impacto |
|---|-------|-----------|---------|
| 1 | **WhatsApp incorrecto** `5627596245` en lugar de `5539689272` | `src/pages/productos/[...slug].astro:59` | 100% de leads de 42 páginas de producto se pierden |
| 2 | **27 de 42 productos con placeholder** `<p>Descripción del producto.</p>` | `/src/content/productos/*.md` | Thin content, penalización, no indexar |
| 3 | **Schema AggregateRating falso** 5.0/15,000 y 4.9/287 reseñas sin fuente | `index.astro`, `extintores.astro` | Riesgo de acción manual por Google |
| 4 | **5 artículos duplicados** sobre Clases de Fuego | `/src/content/blog/clases-*` | Canibalización, dilución de PageRank |

### 🟠 IMPORTANTES (afectan SEO y confianza)

| # | Error | Ubicación | Impacto |
|---|-------|-----------|---------|
| 5 | **6 OG images faltantes** | Service pages | Thumbnails rotos en WhatsApp/redes |
| 6 | **Canonical faltante** en `/polvo-quimico-seco` | `polvo-quimico-seco.astro` | URL canónica indefinida |
| 7 | **`logo.avif` no existe** | Schema de Service pages | Error en schema validator |
| 8 | **`icon.avif` no existe** | Layout.astro (apple-touch-icon) | Error en mobile bookmark |
| 9 | **Horarios contradictorios** header vs footer | Layout.astro | Confusión de usuario |
| 10 | **Copyright 2025** en footer | Layout.astro | Apariencia de abandono |
| 11 | **11 stubs de categoría** blog con "Contenido no detectado" | `/src/content/blog/*.md` | Thin content indexado |
| 12 | **2 enlaces rotos** a `/tipos-de-extintores/polvo-quimico-seco-pqs` | Blog posts | 404 en click |
| 13 | **1 enlace roto** a `/servicios/mantenimiento-de-extintores` | Blog post | 404 en click |

### 🟡 MENORES (calidad, mantenimiento)

| # | Error | Ubicación |
|---|-------|-----------|
| 14 | Carpeta duplicada `/public/img/img/` | Sistema de archivos |
| 15 | Typos en nombres de archivos de imágenes (5 archivos) | `/public/img/` |
| 16 | `site.webmanifest` ausente | `public/` |
| 17 | Keyword stuffing excesivo en `/extintores` | `extintores.astro` |
| 18 | `ProductCatalog` schema no reconocido por Google | `catalogo.astro` |
| 19 | Article schema sin `author`, `datePublished` | Blog template |
| 20 | Sin `pubDate` en ningún artículo | Blog frontmatter |
| 21 | Hero component subutilizado — HTML inline en 11 páginas | Páginas de servicio |
| 22 | Crawl-delay: 1 innecesario | `robots.txt` |

---

## 10. COMPARACIÓN CON OTROS 4 SITIOS DEL SECTOR

| Dimensión | MANEXT | BOMBERO | MESECI | PROYECTORED | GAMADEMEXICO |
|-----------|--------|---------|--------|-------------|--------------|
| Stack | Astro ✅ | Astro ✅ | Astro ✅ | Astro ✅ | Astro ✅ |
| Imágenes AVIF | ✅ | ✅ | ✅ | ✅ | ✅ |
| Schema avanzado | Parcial | Parcial | Parcial | Parcial | Parcial |
| Blog con contenido real | ✅ (parcial) | ✅ | ✅ | — | — |
| Catálogo JS dinámico | ✅ ÚNICO | ❌ | ❌ | ❌ | ❌ |
| Fichas de producto | ✅ (64% vacías) | — | — | — | — |
| Duplicados en blog | MUY GRAVE | Menor | Menor | — | — |
| Horario dominical | ✅ | Varía | Varía | — | — |
| Copyright actualizado | ❌ 2025 | Revisar | Revisar | — | — |
| Número WA correcto | ❌ (productos) | ✅ | ✅ | ✅ | ✅ |

**MANEXT destaca positivamente** en: catálogo interactivo dinámico (único en el sector), profundidad de contenido de blog en artículos principales, página Nosotros con historia detallada, y cobertura de área geográfica más explícita.

**MANEXT está por debajo** en: duplicación de blog (peor del sector), contenido de fichas de producto (problema único), y número de WhatsApp incorrecto (error no visto en otros sitios).

---

## 11. PLAN DE ACCIÓN PRIORIZADO

### Sprint 1 — URGENTE (esta semana)
1. ✅ Corregir WhatsApp en `productos/[...slug].astro` line 59: `5627596245` → `5215539689272`
2. ✅ Corregir copyright footer: "2025" → "2026"
3. ✅ Corregir inconsistencia de horarios: unificar en "Lun-Dom 8:00-18:00" o la versión correcta
4. ✅ Agregar `canonical` a `polvo-quimico-seco.astro`
5. ✅ Eliminar o corregir `AggregateRating` con datos falsos (o reemplazar con datos reales de Google Business Profile)

### Sprint 2 — CRÍTICO SEO (2 semanas)
6. 🔄 Consolidar los 5 artículos duplicados de Clases de Fuego → 1 artículo + 4 redirects 301
7. 🔄 Consolidar pares de duplicados: recarga, señalización, capacitación
8. 🔄 Añadir `noindex` a los 11 stubs de categoría de blog (o llenarlos con contenido real)
9. 🔄 Corregir los 3 enlaces rotos en blog (2× `/tipos-de-extintores/`, 1× `/servicios/mantenimiento-de-extintores`)
10. 🔄 Llenar o noindex las 27 fichas de producto con placeholder

### Sprint 3 — MEJORAS (1 mes)
11. 📋 Crear las 6 OG images faltantes para páginas de servicio (1200×630px AVIF)
12. 📋 Crear `logo.avif` para schemas
13. 📋 Crear `icon.avif` o cambiar apple-touch-icon a `icon.png`
14. 📋 Agregar `site.webmanifest`
15. 📋 Añadir `pubDate` a todos los artículos de blog
16. 📋 Completar Article schema con author, datePublished, publisher
17. 📋 Reemplazar `ProductCatalog` schema por `ItemList` en catálogo
18. 📋 Eliminar carpeta duplicada `/public/img/img/`
19. 📋 Eliminar Crawl-delay del robots.txt
20. 📋 Diferenciar estrategia de keywords entre home, /servicios, /extintores y /venta-de-extintores

---

*Auditoría generada con análisis directo del repositorio. Basada en lectura completa de layouts, componentes, páginas, contenido de blog, datos JSON, configuración y estructura de archivos.*
