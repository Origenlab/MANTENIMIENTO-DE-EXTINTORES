# ANÁLISIS MANEXT — Estado del proyecto y comparación local ↔ live
**Fecha:** 2026-05-05
**Repo:** Origenlab/MANTENIMIENTO-DE-EXTINTORES (rama `main`, último commit `92e1d08`)
**Live:** https://mantenimientodeextintores.mx (GitHub Pages, dominio propio)
**Auditor previo:** `AUDITORIA-MANEXT-2026-04-06.md` (29 días atrás)

---

## 0. TL;DR

El proyecto tiene **buena base técnica** (Astro 6, Content Collections, AVIF, breadcrumbs, sitemap automático, deploy CI/CD) y **dolor real en contenido y SEO**. La auditoría del 6 de abril identificó 22 problemas; al día de hoy solo **3 están resueltos** (WhatsApp en productos, canonical de PQS, AggregateRating del home). Los demás siguen vivos.

**Local y live están sincronizados en commit y comportamiento** — no hay divergencia entre lo que está en GitHub y lo que sirve mantenimientodeextintores.mx, salvo el árbol `graphify-out/` y un `.DS_Store` modificado que viven solo local.

**3 sangrías abiertas que duelen ya:**

1. **22 de 42 fichas de producto siguen siendo placeholder** (`<p>Descripción del producto.</p>`) — incluida la URL `/productos/polvo-quimico-seco`, indexada en sitemap, vista por Google.
2. **5 artículos duplicados** sobre Clases de Fuego siguen indexados (canibalización pura).
3. **11 stubs de categoría de blog** con literal "Contenido principal no detectado automáticamente. Revisa el archivo original." — visibles en producción ahora mismo.

**1 falsedad de schema viva:** `/extintores` aún expone `aggregateRating: 4.9 / 287 reseñas` sin fuente verificable. Riesgo de acción manual de Google.

---

## 1. STACK Y ARQUITECTURA

| Pieza | Estado |
|---|---|
| Framework | Astro `^6.0.4` con `@astrojs/sitemap@^3.7.1` |
| Content | Content Collections (`src/content/blog/*.md`, `src/content/productos/*.md`) tipadas en `src/content.config.ts` |
| Layout | 1 layout único `src/layouts/Layout.astro` (props: title, description, canonical, og*, breadcrumbs[], schemas[], extraCss[]) |
| Componente | `src/components/Hero.astro` (subutilizado — solo lo usa `index.astro`) |
| Páginas estáticas | 21 `.astro` en `src/pages/` + 2 dinámicas (`blog/[...slug]`, `productos/[...slug]`) |
| CSS | 6 archivos en `public/css/` (style, blog-system, blog-article, catalog-system, mobile-enhancements, section-redesign) — versiones cache-bust por querystring |
| JS cliente | 2 archivos en `public/js/` (catalog-system, blog-system) — el catálogo es JS-driven sobre `public/data/products.json` |
| Datos | `public/data/products.json` (69 KB), `public/data/articles.json` (35 KB) — fuentes únicas para el catálogo dinámico |
| Imágenes | 339 archivos AVIF/PNG/SVG en `public/img/` (16 subcarpetas) |
| Deploy | `.github/workflows/deploy.yml` — Node 22, `npm run build`, `actions/deploy-pages@v4` → GitHub Pages |
| Dominio | `public/CNAME` = `mantenimientodeextintores.mx` |
| Analytics | Rybbit.io (`data-site-id="f9641f347b5a"`) |

Mapa funcional del sitio (sitemap-0.xml live, 99 URLs):

- **L1 (10):** `/`, `/servicios`, `/extintores`, `/catalogo`, `/nosotros`, `/blog/`, `/contacto`, `/privacidad`, `/terminos`, 404
- **L2 servicios (6):** venta-de-extintores, mantenimiento-preventivo, recarga-de-extintores, prueba-hidrostatica, capacitacion-brigadas, senalizacion
- **L2 catálogo por tipo (6):** polvo-quimico-seco, co2, agua-presion, tipo-k, espuma-afff, agentes-limpios
- **L3 productos (42):** `/productos/[slug]`
- **L3 blog (41):** `/blog/[slug]`

Total indexable ≈ 105 URLs.

---

## 2. SINCRONÍA LOCAL ↔ LIVE

Verificado vía Chrome (Browser 1) contra el sitio en producción.

| Señal | Local | Live | Comentario |
|---|---|---|---|
| sitemap.xml | generado en build | 99 URLs | ✅ Coinciden |
| Title home | "Venta de Extintores en CDMX \| Certificados NOM \| MANEXT" | igual | ✅ |
| Footer copyright | "© 2025 MANEXT…" | "© 2025 MANEXT…" | ❌ Mismo bug |
| Horario top bar | "L-V: 8:00-18:00 \| Sáb: 9:00-14:00" | igual | ⚠️ Mismo bug |
| Schema home | BreadcrumbList, LocalBusiness, FAQPage (sin AggregateRating) | igual | ✅ Fix aplicado |
| Schema /extintores | Product con `aggregateRating 4.9/287` | igual | ❌ Riesgo Google |
| WhatsApp en producto | `5215539689272` | `5215539689272` | ✅ Fix aplicado |
| `/productos/polvo-quimico-seco` | placeholder 4 líneas | placeholder en vivo | ❌ Indexado |
| `/blog/seguridad-contra-incendios` | "Contenido no detectado…" | igual, indexable | ❌ Indexado |
| `/icon.avif` | no existe en `public/` | 404 en live | ❌ Roto |
| `/img/og-venta-extintores.avif` | no existe | 404 en live | ❌ Compartir en redes muestra placeholder |
| `/tipos-de-extintores/polvo-quimico-seco-pqs` | linkeado desde 2 artículos | 404 | ❌ Enlace roto |
| `/servicios/mantenimiento-de-extintores` | linkeado desde 1 artículo | 404 | ❌ Enlace roto |
| Git status | `.DS_Store` modificado, `graphify-out/` untracked | — | Sin impacto en deploy |

**Conclusión:** El live refleja exactamente el `main` de GitHub. Todo lo que se vea mal en local se ve mal en producción. No hay tareas "pendientes de subir" — hay tareas pendientes de hacer.

---

## 3. ESTADO DE LOS 22 HALLAZGOS DEL 06-ABR

| # | Hallazgo | Prioridad original | Estado 05-may |
|---|---|---|---|
| 1 | WhatsApp incorrecto en `productos/[...slug]` | 🔴 Crítico | ✅ Resuelto (commit `e5d586a`) |
| 2 | 27/42 productos placeholder | 🔴 Crítico | 🟡 Parcial — quedan **22/42** (52%) |
| 3 | Schema AggregateRating falso 5.0/15000 en home | 🔴 Crítico | ✅ Resuelto (home limpio) |
| 3b | Schema AggregateRating falso 4.9/287 en `/extintores` | 🔴 Crítico | ❌ Pendiente |
| 4 | 5 duplicados Clases de Fuego | 🔴 Crítico | ❌ Pendiente — los 5 siguen en sitemap live |
| 5 | 6 OG images de servicios faltantes | 🟠 | ❌ Pendiente — solo existe `og-image.avif` |
| 6 | Canonical faltante en `polvo-quimico-seco.astro` | 🟠 | ✅ Resuelto |
| 7 | `logo.avif` referenciado en schemas no existe | 🟠 | ❌ Pendiente |
| 8 | `icon.avif` apple-touch-icon no existe | 🟠 | ❌ Pendiente — `/icon.avif` da 404 en live |
| 9 | Horarios contradictorios header (L-V) vs footer (Lun-Vie) | 🟠 | ❌ Pendiente |
| 10 | Copyright "© 2025" | 🟠 | ❌ Pendiente |
| 11 | 11 stubs blog "Contenido no detectado…" | 🟠 | ❌ Pendiente |
| 12 | 2 enlaces rotos `/tipos-de-extintores/...` | 🟠 | ❌ Pendiente |
| 13 | 1 enlace roto `/servicios/mantenimiento-de-extintores` | 🟠 | ❌ Pendiente |
| 14 | Carpeta duplicada `/public/img/img/` | 🟡 | ❌ Pendiente — 87 archivos, 1.3 MB |
| 15 | Typos en nombres de archivos de imagen | 🟡 | ❌ Pendiente — `img-matenimiento-preventivo` (sin "n") |
| 16 | `site.webmanifest` ausente | 🟡 | ❌ Pendiente |
| 17 | Keyword stuffing en `/extintores` | 🟡 | ❌ Pendiente |
| 18 | Schema `ProductCatalog` no reconocido por Google | 🟡 | ❌ Pendiente — debería ser `ItemList` |
| 19 | Article schema sin author/datePublished/publisher | 🟡 | ❌ Pendiente |
| 20 | Sin `pubDate` en frontmatter de artículos | 🟡 | ❌ Pendiente |
| 21 | Hero component subutilizado | 🟡 | ❌ Pendiente |
| 22 | `Crawl-delay: 1` innecesario | 🟡 | ❌ Pendiente |

**Score:** 3 resueltos, 1 parcial, 19 pendientes. Conversión real ≈ 14%.

Hallazgo nuevo verificado en este análisis: el commit `e5d586a` ("fix: WhatsApp number, remove fake ratings schema, copyright 2026, unify hours") **solo cumplió 2 de los 4 fixes** que prometía su mensaje. Footer 2025 y horarios siguen sin tocarse.

---

## 4. NUEVO: HALLAZGOS DESDE EL 06-ABR

### 4.1 Productos refactorizados (progreso real)
Commits posteriores muestran trabajo serio en fichas:
- `92e1d08` — PQS 4.5 kg con specs verificadas NOM-100/104/045/154
- `01d17b6` — Tipo K 6L profesional
- `a70c37c` — PQS 6/9 kg + CO2 4.54 kg

Los productos enriquecidos pasan de ~4 líneas a ~74 líneas con FAQs, specs, interlinking. Patrón claro de plantilla.

### 4.2 Productos que faltan rellenar (22)
```
polvo-quimico-seco            ← URL canónica de categoría — peor caso
tipo-k                        ← URL canónica de categoría
producto-extintor-pqs-1kg
producto-extintor-pqs-2-5kg
producto-extintor-pqs-13kg
producto-extintor-pqs-50kg-rodante
producto-extintor-pqs-68kg-rodante
producto-extintor-co2-2-27kg
producto-extintor-co2-6-81kg
producto-extintor-co2-9kg
producto-extintor-co2-9-08kg
producto-extintor-co2-11-3kg
producto-extintor-co2-13-62kg
producto-extintor-agua-6L
producto-extintor-agua-9L
producto-extintor-agua-12L
producto-extintor-tipo-k-1-6gal
producto-extintor-tipo-k-2-5L
producto-extintor-tipo-k-4L
producto-extintor-tipo-k-9L
producto-extintor-tipo-k-12L
producto-extintor-tipo-k-15L
```
Falta también ficha para agua-15L/18L/20L, espuma-afff-* (no aparecen en placeholders pero hay que verificar contenido individual). Frontmatter `price` definido en schema pero **0/42 productos lo usan**.

### 4.3 Stubs de blog (11) — todos indexables, todos en sitemap live
```
blog/index                              "Blog"
blog/seguridad-contra-incendios         "Seguridad Contra Incendios"
blog/equipos-contra-incendio            "Equipos Contra Incendio"
blog/emergencias-y-protocolos           "Emergencias y Protocolos de Incendio"
blog/guias-y-comparativas               "Guías y Comparativas de Extintores"
blog/hogar-y-familia                    "Extintores para Hogar y Familia"
blog/industria-y-comercio               "Extintores para Industria y Comercio"
blog/mantenimiento-y-recarga            "Mantenimiento y Recarga de Extintores"
blog/normativas-y-certificaciones       "Normativas y Certificaciones NOM"
blog/prevencion-empresarial             "Prevención de Incendios Empresarial"
blog/tipos-de-extintores                "Tipos de Extintores"
```
Verificado en `/blog/seguridad-contra-incendios` (live): 288 caracteres, indexable. Google los está crawleando.

### 4.4 Duplicados clases de fuego (5) — cuentas reales
| Slug | Líneas | Acción sugerida |
|---|---|---|
| `clases-clases-fuego-a-b-c-d-k-guia-tecnica-completa` | 399 | **Mantener canónico** |
| `clases-de-fuego-a-b-c-d-k-guia-completa-extintor` | 355 | 301 → canónico |
| `clases-clases-de-fuego-a-b-c-d-k-guia-tecnica-completa` | 352 | 301 → canónico |
| `clases-de-fuego-extintor-correcto` | 93 | 301 → canónico |
| `clases-fuego-a-b-c-d-k-guia-completa` | 10 | borrar archivo |

### 4.5 Otros duplicados detectados
- `recarga-de-extintores-certificada-nom-154-cdmx-manext` ↔ `recarga-de-extintores-certificada-nom-154-manext-cdmx` (par)
- `senalizacion-contra-incendios-nom-equipamiento-de-segur` ↔ `senalizacion-contra-incendios-nom-equipamiento-profesio` (par)
- `capacitacion-brigadas-contra-incendio-formacion-cdmx` ↔ `capacitacion-de-brigadas-contra-incendio-certificada-cd` (par)
- `prueba-hidrostatica-extintores-2026` ↔ `prueba-hidrostatica-extintores-guia-tecnica` (diferenciables, ver acción)

### 4.6 Basura técnica confirmada
- **`public/img/img/`** — 87 archivos, 1.3 MB, copia espejo de subcarpetas. Borrar carpeta entera tras verificar referencias.
- **`public/img/img-matenimiento-preventivo/`** — typo (debe ser `mantenimiento`). 5 imágenes adentro. Renombrar y actualizar referencias.
- **`graphify-out/`** — 4 archivos no committeados de un análisis anterior. Decidir: agregar a `.gitignore` o borrar.
- **`.audit/DOCUMENTO-ARTICULOS.md`** — guía interna obsoleta (referencia a `blog/seguridad-contra-incendios/...html`, esquema HTML pre-Astro). Mover fuera del repo o borrar.
- **`.DS_Store`** committeado anteriormente (modificado en working tree). Agregar `.DS_Store` a `.gitignore`.
- **`public/img/webpack.*.js`** — 3 configs de webpack en una carpeta de imágenes. Sin uso en este Astro. Borrar.

### 4.7 Schemas vivos en producción (riesgo concreto)
| Página live | Schema | Problema |
|---|---|---|
| `/extintores` | Product con `aggregateRating: 4.9/287` | Sin fuente verificable. Acción manual de Google posible |
| `/productos/[slug]` | solo BreadcrumbList | **Falta Product JSON-LD** — perdiendo rich results de producto |
| `/blog/[slug]` | microdata Article incompleta | sin author, datePublished, publisher → no E-E-A-T |
| `/catalogo` | `ProductCatalog` (no en vocab Google) | Debería ser `ItemList` |

---

## 5. CALIDAD DEL CONTENIDO POR ÁREA

### Home `/`
✅ Hero, beneficios, certificaciones, tipos, testimonios con foto+nombre, FAQ con schema, CTA final.
⚠️ El logo del header es una foto AVIF (`venta-y-mantenimiento-de-extintores.avif`), no un logo vectorial.
⚠️ `<h2 class="sr-only">` oculta semántica en sección de beneficios.

### Servicios L2 (6 páginas)
🟢 `/mantenimiento-preventivo` — la más completa.
🟡 Resto — bien diferenciadas pero con HTML inline minificado en hero (no usan `<Hero>`). Difícil mantener.
🔴 `/senalizacion` — contiene 2 enlaces a URLs 404.

### Tipos de extintor L2 (6 páginas)
🟢 Texto razonable.
🟡 Densidad de keywords excesiva en `/extintores` ("venta de extintores" y variantes 30+ veces).

### Productos L3 (42)
🔴 22/42 placeholder. La URL más visible — categoría `polvo-quimico-seco` — **es placeholder**.
🟡 Plantilla de los buenos (PQS 4.5/6/9, CO2 4.54, K 6L) es sólida y replicable.

### Blog (41 archivos)
🟢 ~20 artículos profundos (4-8k palabras) bien estructurados.
🔴 11 stubs vacíos indexados.
🔴 5 duplicados de clases de fuego.
🔴 3 pares de duplicados (recarga, señalización, capacitación).
🟡 Sin `pubDate` en ningún artículo → schema Article sin `datePublished`.

---

## 6. INVENTARIO DE ARCHIVOS Y DEPENDENCIAS

```
src/
├─ components/Hero.astro
├─ content.config.ts
├─ content/
│  ├─ blog/         41 .md  (11 stubs + 5 duplicados clases + 3 pares dup)
│  └─ productos/    42 .md  (22 placeholder)
├─ layouts/Layout.astro     325 líneas
└─ pages/
   ├─ 404.astro
   ├─ index.astro            (1301 líneas — refactor recomendado)
   ├─ servicios L1+L2 (8)
   ├─ tipos L2 (6)
   ├─ legales (2)
   ├─ catalogo.astro
   └─ {blog,productos}/[...slug].astro

public/
├─ css/  (6 archivos versionados)
├─ js/   (catalog-system, blog-system)
├─ data/ (products.json 69KB, articles.json 35KB)
├─ img/  339 archivos
│  ├─ img/                       ← 87 archivos basura (1.3 MB)
│  ├─ img-matenimiento-...       ← typo
│  └─ webpack.*.js               ← restos webpack
├─ CNAME, _headers, googlee27371...html, favicon.ico, icon.png, icon.svg
└─ NO HAY: robots.txt local (pero el live responde — debe estar en _headers o GH Pages)

.github/workflows/deploy.yml     Node 22, npm ci, build, deploy Pages
astro.config.mjs                 site, sitemap, trailingSlash:'never'
.gitignore                       node_modules, dist, .astro
```

---

## 7. PLAN DE TRABAJO PROPUESTO (3 sprints)

### Sprint 1 — STOP THE BLEEDING (1-2 días)

| # | Tarea | Archivo |
|---|---|---|
| 1 | Footer copyright `© 2025 → © 2026` | `src/layouts/Layout.astro:311` |
| 2 | Quitar AggregateRating `4.9/287` de `/extintores` | `src/pages/extintores.astro:4` |
| 3 | Unificar horarios — top bar y footer en una sola fuente | `Layout.astro` líneas 82 y 274 |
| 4 | Crear `public/icon.avif` (1024×1024) o cambiar `apple-touch-icon` a `icon.png` | `Layout.astro:75` |
| 5 | Crear `public/img/logo.avif` o cambiar referencias de schema a logo existente | schemas en service pages |
| 6 | Arreglar 3 enlaces rotos en blog: `/tipos-de-extintores/polvo-quimico-seco-pqs` → `/polvo-quimico-seco`, `/servicios/mantenimiento-de-extintores` → `/mantenimiento-preventivo` | `src/content/blog/senalizacion-*.md`, `recarga-*-cdmx-manext.md` |

### Sprint 2 — DESINDEXAR BASURA Y CONSOLIDAR (1 semana)

| # | Tarea |
|---|---|
| 7 | Decidir destino de los 11 stubs de blog: rellenar (4-5 categorías importantes) o `noindex` (6-7 menores) o redirect → blog index |
| 8 | Consolidar 5 duplicados clases de fuego → 1 canónico + 4 redirects 301 (vía `_headers` o regenerar contenido en archivo único) |
| 9 | Consolidar 3 pares de duplicados (recarga, señalización, capacitación) |
| 10 | Rellenar las 22 fichas de producto con la plantilla validada en commits 92e1d08/01d17b6/a70c37c (specs reales, FAQs, interlinking) |
| 11 | Agregar Product JSON-LD a `productos/[...slug].astro` (name, description, brand, offers, image) |
| 12 | Cambiar `ProductCatalog` → `ItemList` en `catalogo.astro` |

### Sprint 3 — POLISH Y E-E-A-T (2-3 semanas)

| # | Tarea |
|---|---|
| 13 | Crear 6 OG images de servicios (1200×630 AVIF, marca consistente) |
| 14 | Agregar `pubDate` a todos los artículos. Schema Article con `author`, `datePublished`, `publisher` |
| 15 | Crear `public/site.webmanifest` |
| 16 | Borrar `public/img/img/` (87 archivos, 1.3 MB) tras verificar 0 referencias |
| 17 | Renombrar `img-matenimiento-preventivo` → `img-mantenimiento-preventivo` y actualizar referencias |
| 18 | Borrar `public/img/webpack.*.js` (3 archivos sin uso) |
| 19 | Mover `.audit/` y `graphify-out/` fuera del repo o agregar al `.gitignore` |
| 20 | Agregar `.DS_Store` al `.gitignore` |
| 21 | Diferenciar intent SEO entre `/`, `/servicios`, `/extintores`, `/venta-de-extintores` (eliminar canibalización) |
| 22 | Refactor: extender `<Hero>` para sustituir HTML inline en 11 páginas |
| 23 | Logo del header: vectorizar (SVG) o reemplazar por logo dedicado |

---

## 8. RIESGOS / OBSERVACIONES PARA NO ROMPER NADA

- **Cambios masivos en blog requieren redirects.** Si se borran archivos `.md`, las URLs salen del sitemap pero pueden seguir indexadas en Google por semanas. Manejar con `_headers` (Cloudflare) o la regla nativa de GitHub Pages no aplica — verificar opciones.
- **`public/_headers`** existe — es config Cloudflare/Pages. Antes de tocarlo, leerlo completo (no se inspeccionó en este análisis).
- **`graphify-out/` no committeado** indica que alguna herramienta lo regenera. Confirmar antes de borrar.
- **Productos con frontmatter `price` definido** pero ninguno lo usa: o se inicia política de precios públicos (que el sector no tiene) o se quita del schema.
- **Layout.astro tiene 325 líneas inline** con CSS crítico minificado. Tocarlo invalida el HMR / cache. Cualquier edit en Sprint 1 afecta todas las 99 páginas — probar build localmente antes de push.

---

## 9. CÓMO EMPEZAR HOY

```bash
# Reset estado limpio
cd /Users/frankoropeza/Documents/Claude/Projects/MANEXT
git status
git checkout main
git pull --rebase

# Branch para Sprint 1
git checkout -b sprint1-stop-the-bleeding

# Build + dev local
npm ci
npm run dev   # http://localhost:4321

# Tras los 6 cambios, build y verificar dist/
npm run build
npx serve dist
```

Verificar después de cada cambio:
1. `/` carga sin error en consola
2. Footer dice 2026
3. `/extintores` schema sin aggregateRating (DevTools → Application → JSON-LD)
4. `/polvo-quimico-seco` (página, no producto) carga
5. Click en cualquier link de blog que mencione "polvo químico seco" → no debe ir a 404

---

*Análisis generado por inspección directa del repo + crawl en vivo del sitio (Browser 1, 2026-05-05).*
