# Auditoría del catálogo de productos — MANEXT

**Fecha:** 16 de julio de 2026
**Alcance:** `/catalogo/` (276 fichas) + `/productos/` (42 páginas) — código, datos, contenido, SEO, rendimiento
**Método:** ejecución real del grafo de módulos con Node 22, inspección del `dist/` construido (463 HTML), suite de tests, y verificación cruzada contra el sitemap emitido.
**Estado de la suite:** 71/71 tests en verde — y aun así hay tres defectos en producción. Ese contraste es el hallazgo estructural del informe.

---

## 0. Resumen ejecutivo

El catálogo **no está roto**: la integridad referencial es impecable (0 IDs duplicados, 0 slugs duplicados, 0 `parentId` rotos, 0 imágenes faltantes, 0 enlaces internos rotos), la validación corre en build y falla rápido, los metadatos son 100% únicos y están dentro de rango, y la accesibilidad es sólida. El andamiaje es bueno.

El problema es de **otra naturaleza**: el sistema escala contenido más rápido de lo que escala calidad. 276 fichas se generan desde 46 semillas y 2 textos realmente autorales. Eso produce cuatro clases de daño:

| # | Hallazgo | Impacto | Severidad |
|---|---|---|---|
| 1 | `undefined` visible en HTML y en JSON-LD de una ficha viva | Credibilidad + schema inválido | 🔴 **En vivo** |
| 2 | El `ItemList` declara anclas: 269/276 URLs ignoran la ficha real que sí existe | Google colapsa 276 productos en 1 URL | 🔴 **SEO** |
| 3 | Lead con gramática rota en 230/230 fichas derivadas | Texto bajo el H1, primera impresión | 🔴 **Calidad** |
| 4 | 42 páginas `/productos/*` huérfanas compiten con el catálogo | Canibalización + thin content | 🔴 **SEO** |
| 5 | 7 productos con dos páginas y canonicals contradictorios | Señal contradictoria en las queries de más volumen | 🔴 **SEO** |
| 6 | 6.8 MB de `<select>` duplicado (32% del HTML del catálogo) | Rendimiento, Core Web Vitals | 🟠 |
| 7 | Se testea una implementación que no se ejecuta | Los tests no protegen nada de lo anterior | 🟠 |
| 8 | 287 teléfonos hardcodeados en 72 archivos, 3 formatos | Mantenimiento | 🟠 |

**Diagnóstico en una línea:** el código es correcto; el contenido que produce, no. Y la suite verde lo oculta.

---

## 1. Arquitectura actual

Coexisten **dos sistemas de producto paralelos**. Uno está vivo; el otro es un muerto indexado.

```
SISTEMA A — VIVO                        SISTEMA B — MUERTO
src/data/catalog-products.mjs           src/content/productos/*.md  (42 MD)
  ├── 46 definiciones autorales           └── src/pages/productos/[...slug].astro
  └── + 230 derivados (expansion)
        ↓                                       ↓
src/pages/catalogo/[slug].astro         /productos/<id>   → 42 URLs
        ↓                                       ↓
/catalogo/<slug>  → 276 URLs            0 enlaces entrantes
        ↓                               42 en el sitemap
Enlazado desde catalogo.astro           22 de 42 son stubs vacíos
277 en el sitemap
```

**Verificado:** `grep -rno 'href="/productos/[^"]*"' src/` → **0 resultados**. Nada en el sitio enlaza a esas 42 páginas. Su único consumidor es su propio `getStaticPaths`. Pero están las 42 en el sitemap, indexables, compitiendo por las mismas queries que el catálogo real.

Ejemplo directo de canibalización:

| URL huérfana | Contenido | Compite contra |
|---|---|---|
| `/productos/producto-extintor-tipo-k-6l` | `<p>Descripción del producto.</p>` | `/catalogo/extintor-tipo-k-6-l-restaurante` |
| `/productos/producto-extintor-co2-9kg` | `<p>Descripción del producto.</p>` | 7 fichas CO₂ reales |

---

## 2. Hallazgos críticos — con evidencia

### 🔴 2.1 — `undefined` impreso en producción

**Archivo:** `src/data/catalog-expansion/accessories.mjs:89`

`offer()` (`accessories.mjs:13`) declara **10 parámetros obligatorios**. La llamada de la línea 89 pasa **9**: omite `sector`. Todos los argumentos se corren un lugar a la izquierda y `limitation` queda `undefined`.

```js
// accessories.mjs:13 — la firma
function offer(key, name, slug, variant, application, sector, need, value, selection, limitation, type = 'configuration')

// accessories.mjs:89 — la llamada rota (falta 'sector', pasa 9 args)
offer('clase-d', 'Carro para extintor clase D', 'carro-para-extintor-clase-d',
      'Clase D 30 lb compatible', 'Laboratorios y metalmecánica',
      /* ← aquí falta el sector */
      'se necesita desplazar un cilindro clase D y su aplicador',
      'mantiene agente, manguera y aplicador organizados cerca del riesgo',
      'modelo, metal, manguera, aplicador y ruedas',
      'el agente debe seguir siendo compatible con el metal presente')
```

Es la **única anomalía de aridad en las 49 llamadas del archivo**. Consecuencia medida en `dist/catalogo/carro-para-extintor-clase-d/index.html` — **4 ocurrencias literales**, una de ellas dentro del `FAQPage` schema:

```
limitations[0] → "undefined Si el escenario cambia, MANEXT compara otra variante..."
benefitAngles  → "undefined Explicarlo desde la cotización permite comparar..."
FAQPage JSON-LD → P: "¿Qué limitación tiene carro para extintor clase d?"
                  R: "undefined MANEXT contrasta este límite con el combustible..."
```

Efecto colateral: `sector` quedó capturado como la frase `'se necesita desplazar un cilindro clase D y su aplicador'`, que se inyecta en `secondaryKeywords` (`publication.mjs:48`) generando keywords sin sentido.

**Por qué pasó el filtro:** `schema.mjs:65` valida `limitations.length === 0`, no el **contenido** del array. `[undefined]` tiene longitud 1 → pasa.

---

### 🔴 2.2 — El `ItemList` tira 269 URLs a la basura

**Archivo:** `src/lib/catalog-utils.mjs:103`

```js
url: product.detailUrl ? `${baseUrl}${product.detailUrl}` : `${baseUrl}/catalogo/#${product.id}`
```

La expresión **nunca consulta `productPageUrl`** — el campo que sí contiene la ficha canónica y que está presente en 276/276 productos (`catalog-products.mjs:834`).

Medición sobre `dist/catalogo/index.html`:

| URL emitida en el ItemList | Cantidad |
|---|---|
| `.../catalogo/#<id>` (ancla) | **269** |
| `.../polvo-quimico-seco` etc. (página de servicio) | 7 |
| `.../catalogo/<slug>` (**la ficha real del producto**) | **0** |

Las anclas *resuelven* — no es un enlace roto, es **válido pero incorrecto**. Cada `Product` del ItemList declara como URL un fragmento de una página de 1.25 MB, en vez de su propia ficha canónica, que existe y está construida. Google deduplica fragmentos contra la URL base: **los 276 productos colapsan a una sola URL**.

Es el hallazgo con mayor coste de oportunidad del informe. Las 276 fichas están hechas, funcionan, tienen metadatos únicos — y el schema no las declara.

---

### 🔴 2.3 — Gramática rota en 230/230 fichas derivadas

**Archivo:** `src/data/catalog-expansion/publication.mjs:56` (y `:79`, `:35`)

```js
humanLead: `${proposal.h1} responde a una necesidad concreta: ${proposal.need} ${proposal.valueProposition}`
```

**Ninguno de los 230 `need` ni `valueProposition` termina en punto** (verificado: 230/230). El template concatena sin puntuación. Resultado renderizado justo bajo el H1 (`ProductDetailTemplate:132`):

> "Extintor PQS ABC de 1 kg vehicular responde a una necesidad concreta: se necesita un equipo compacto con soporte compatible para un vehículo **ofrece** una presentación transportable para un punto vehicular, sujeta al rating y al montaje"

El mismo defecto en `faqs[0].answer` (`publication.mjs:79`), que además **baja a minúscula a media frase**:

> "...para un vehículo En ese escenario, **ofrece** una presentación transportable... al montaje **La** recomendación final requiere..."

Y en `buyerScenario` (`:35`), que `applyEditorialProfile:533` inyecta como `benefitsIntro`.

Es el párrafo más visible de la ficha, roto de forma idéntica en 230 páginas.

---

### 🔴 2.4 — Siete productos con dos páginas y canonicals que se contradicen

`detailUrl` y `productPageUrl` apuntan a páginas distintas del mismo producto, y **cada una se autoproclama canónica**:

| Producto | Página de servicio (`detailUrl`) | Ficha de catálogo (canonical propio) |
|---|---|---|
| `pqs-abc-portatil` | `/polvo-quimico-seco` | `/catalogo/pqs-abc-portatil` |
| `co2-portatil` | `/co2` | `/catalogo/extintor-co2-portatil` |
| `agua-presion-portatil` | `/agua-presion` | `/catalogo/agua-presion-portatil` |
| `tipo-k-portatil` | `/tipo-k` | `/catalogo/tipo-k-portatil` |
| `espuma-afff-portatil` | `/espuma-afff` | `/catalogo/espuma-afff-portatil` |
| `hfc-236fa-portatil` | `/agentes-limpios` | `/catalogo/extintor-agente-limpio-hfc-236fa` |
| `senalizacion-extintor` | `/senalizacion` | `/catalogo/senalizacion-extintor` |

El `ItemList` apunta a la columna izquierda; el canonical de la ficha, a la derecha. **Señal contradictoria a Google exactamente en los 7 productos de mayor volumen de búsqueda.**

Sumado: si además se cuentan los stubs de `/productos/`, `tipo-k` tiene **tres** URLs (`/tipo-k`, `/catalogo/tipo-k-portatil`, `/productos/tipo-k`).

---

### 🔴 2.5 — Las 42 páginas `/productos/*`

| Métrica | Valor |
|---|---|
| Archivos | 42 |
| Con `image` / `price` / `category` en frontmatter | **0 / 0 / 0** (3 de 5 campos del schema, sin usar) |
| Páginas mostrando la **misma** imagen genérica | **42 (100%)** |
| Stubs con cuerpo `<p>Descripción del producto.</p>` | **22 (52%)** |
| Thin content <300 palabras | **26 (62%)** |
| Con HTML crudo embebido | 37 (88%) |
| Markdown limpio | **5 (12%)** |
| Enlaces internos entrantes | **0** |
| En el sitemap | **42** |

**Bug de slug — 18 archivos (43%).** El loader `glob()` pasa por `githubSlug()`, que minusculiza. `producto-extintor-agua-12L.md` → `/productos/producto-extintor-agua-12l`. Esto rompe **4 enlaces internos** (GH Pages es case-sensitive → 404):

| Archivo:línea | Link escrito | URL real |
|---|---|---|
| `producto-extintor-pqs-4-5kg.md:97` | `/productos/producto-extintor-tipo-k-6L` | `...-6l` |
| `producto-extintor-pqs-6kg.md:74` | `/productos/producto-extintor-tipo-k-6L` | `...-6l` |
| `producto-extintor-tipo-k-6L.md:70` | `/productos/producto-extintor-tipo-k-9L` | `...-9l` |
| `producto-extintor-tipo-k-6L.md:72` | `/productos/producto-extintor-tipo-k-4L` | `...-4l` |

**CSS muerto.** `<Content />` no recibe el hash de scope de Astro, así que las reglas `.description-section h2/h3/p/ul/li` y `.highlight-box` del template **no aplican a ningún producto**. El styling del cuerpo entero es CSS inerte. (Ironía: `.warning-box` sí se ve, porque está definida global en otra hoja.)

**Jerarquía de headings:** el template emite `h1` → `h3` ("Cotiza este producto") → luego el `h2` del contenido. Orden real **h1 → h3 → h2**.

---

## 3. Contenido generado: el alcance real

**276/276 fichas tienen copy de plantilla.** No son solo los 230 derivados.

| Capa | Fichas | Origen |
|---|---|---|
| Base de ficha 100% generada | **274/276** | `details.mjs:359` |
| Base autoral real | **2** (`co2-portatil`, `hfc-236fa-portatil`) | `details.mjs:5-286` |
| Perfil editorial de plantilla (`publication.mjs`) | 230 | `:28` |
| Perfil editorial de plantilla (`profile.mjs`) | 46 | `:25` |

Los 46 "autorales" también son plantilla: `catalog-editorial/{portables,industrial-automatic,accessories-parts}.mjs` los tres llaman `buildEditorialProfiles(seeds)`. Lo autoral son los *seeds* — 5 frases. La prosa es andamiaje.

### Repetición medida

| Métrica | Valor |
|---|---|
| FAQs renderizadas | 2208 (8 × 276) |
| Preguntas únicas | 2208 |
| **Respuestas únicas** | **1603 → 605 duplicados exactos** |
| Respuesta más clonada | **×230 idéntica** |
| `compliance.text` únicos | **3 / 276** |
| Fichas con relleno `"Aplicación técnica N"` | **230** (`details.mjs:386`) |
| Fichas con capacidad placeholder | **36** (`'Según fabricante'`) |
| Imágenes distintas para 276 productos | **9** (`images.generic` cubre 72) |

Clonada ×230 (`publication.mjs:103`):

> "Sí. Cuando corresponde, la cotización puede integrar suministro, instalación, señalización, mantenimiento, recarga, refacciones o capacitación. Cada alcance se confirma por escrito."

**El riesgo SEO no es duplicate-content clásico** — los metadatos están perfectamente diferenciados (276/276 `title`, `description`, `h1`, `og:*` únicos; 0 fuera de rango). El riesgo es **thin content a escala**: 230 páginas cuyo cuerpo es la misma plantilla con 5 sustituciones, foto genérica compartida y capacidad placeholder. Es el perfil exacto que *Helpful Content* penaliza.

**Atenuante honesto:** el copy declara explícitamente que no presume stock ni certificación. Eso es correcto y hay que conservarlo.

---

## 4. Errores de contenido normativo — riesgo de negocio

Esto excede lo técnico. **30 de los 42 archivos de `/productos/` citan mal la norma**, y el propio repo se contradice.

| Claim publicado | Realidad | Archivos |
|---|---|---|
| "Extintor certificado **NOM-154-SCFI**" | NOM-154-SCFI-2005 norma el **servicio de mantenimiento y recarga**, no la fabricación del equipo | **30** (77 menciones) |
| "Cumple **NOM-002-STPS**" (como atributo del producto) | NOM-002-STPS-2010 obliga al **centro de trabajo / patrón**, no al equipo | 10 (16 menciones) |

**El repo ya sabe la respuesta correcta.** Los 5 archivos markdown bien escritos citan `NOM-100-STPS-1994` (fabricación), `NOM-104-STPS` (agente PQS) y `NOM-045-SCFI-2000` (manómetro). `producto-extintor-pqs-4-5kg.md` titula "Certificado NOM-100 y NOM-154" mientras `pqs-1kg/2-5kg/13kg` dicen solo "NOM-154-SCFI". Hay dos castas editoriales que no concuerdan sobre qué norma certifica el producto.

Para una empresa cuya propuesta de valor es el **cumplimiento normativo**, publicar la norma equivocada en 30 páginas es el error más caro del informe — no por SEO, por autoridad.

### Otros conflictos de contenido

- **Contradicción comercial.** Los 3 archivos de Novec (`11kg`, `5-4kg`, `6-8kg`) atacan al FM-200 — *"vida atmosférica: solo 5 días vs. 33 años del FM-200"* — mientras MANEXT **vende FM-200** en `2-7kg`, `4-5kg`, `9kg`. El catálogo se desprestigia a sí mismo.
- **Dato dudoso.** `producto-extintor-agente-limpio-5-4kg.md:5` — *"los 270 años del CO2"*. La vida atmosférica del CO₂ no es un valor único (típicamente 300–1000+ años); "270 años" no corresponde a ninguna cifra estándar. Los claims de Novec (GWP 1, 5 días) y FM-200 (~33 años) sí son correctos.
- **Por verificar.** Branding "Novec 1230 de 3M" en 3 archivos. 3M anunció su salida de la fabricación de PFAS hacia finales de 2025 — conviene validar disponibilidad antes de seguir vendiéndolo por nombre.
- **Vida útil inconsistente entre familias.** Espuma "10 años", tipo-k-6L "12 años", agente limpio "12/15 años", PQS/CO₂ "20/25 años". Puede ser legítimo, pero `agente-limpio-11kg.md:5` mezcla "3 años" y "15 años" en el mismo archivo.
- **45/276 `<title>` arrancan en minúscula** (`"extintor PQS ABC portátil | MANEXT"`) — origen `profile.mjs:34` / `schema.mjs:116`, que interpolan `seed.keyword` tal cual. Los H1 están bien (0/276) porque `profile.mjs:33` sí aplica `capitalize`.

---

## 5. Rendimiento

### 🟠 6.8 MB de `<select>` duplicado — 32% del HTML del catálogo

`ProductDetailTemplate:346` pasa `products={catalogProducts}` (los 276) a `QuoteForm`, que los expande a `<option>` (`QuoteForm:42`) **en cada una de las 276 fichas**.

| Métrica | Valor |
|---|---|
| `dist/catalogo/` HTML total | **23 MB** (276 × ~79 KB) |
| El `<select id="quote-product">` en 1 ficha | **25.3 KB** |
| × 276 fichas | **6.8 MB — ~32% del HTML del catálogo** |
| `dist/catalogo/index.html` | **1.25 MB** |

Cada visitante de una ficha descarga el catálogo completo dentro de un dropdown que casi nadie abre.

### 🟠 Trailing slash: 25 URLs con salto 301 innecesario

`astro.config.mjs:99` declara `trailingSlash: 'never'`. El sitemap obedece; el canonical de `/catalogo`, no:

```
sitemap:   <loc>https://mantenimientodeextintores.mx/catalogo</loc>     ← sin slash
canonical: <link rel="canonical" href=".../catalogo/">                  ← CON slash  (catalogo.astro:34)
```

Además, 25 URLs internas distintas llevan trailing slash contra la política del sitio → un 301 en cada clic:

| URL | Usos |
|---|---|
| `/mantenimiento-preventivo/` | **276** (`publication.mjs:112`, `profile.mjs:64`, `ProductDetailTemplate:245`) |
| `/catalogo/` | **230** (`publication.mjs:113`) |
| `/venta-de-extintores/` | 90 |
| `/servicios/` | 78 |
| `/senalizacion/` | 60 |

Mismo problema en `buildCatalogSchema` (`catalog-utils.mjs:92`) y en los breadcrumbs (`catalogo.astro:38`, `ProductDetailTemplate:102`).

---

## 6. Calidad de código

### 🟠 Se testea una implementación que no se ejecuta

| Función de `catalog-utils.mjs` | Consumidor en producción |
|---|---|
| `buildCatalogSchema` | ✅ `catalogo.astro:16,28` |
| `filterCatalog` | ❌ **solo `tests/catalog.test.mjs`** |
| `paginateCatalog` | ❌ **solo tests** |
| `buildQuoteMessage` | ❌ **solo tests** |
| `normaliseSearch` | ❌ solo interno de `filterCatalog` |

El filtrado, la paginación y el mensaje de WhatsApp **reales** los hace `public/js/catalog-system.js` en el cliente (`normalise():7`, paginación propia, `WHATSAPP_NUMBER:4`).

**Se testea lógica que no corre, y corre lógica que no se testea.** Los 71 tests pasan verde sobre una implementación paralela. Por eso los tres bugs críticos viven en producción con la suite en verde: nada cubre las URLs del `ItemList`, la aridad de `offer()`, ni la gramática de las plantillas.

### 🟠 Código muerto: `applyEditorialProfile` pisa medio `createGeneratedProductDetail`

Verificado empíricamente sobre las 276 fichas:

| Campo generado | Sobrevive |
|---|---|
| `seo.description` (`details:490` ← `buildMetaDescription`) | **0/276** |
| `faqs` (`details:480-487`) | **0/276** |
| `benefits` (`details:445-450`) | **0/276** |
| `lead` (`details:414`) | **0/276** |

`applyEditorialProfile` (`details:501`) los sobrescribe siempre. `buildMetaDescription` (`details:339-357`) y sus 6 FAQs son **~50 líneas inalcanzables**.

**Efecto colateral relevante:** `details:527` hace `[editorial.notFor, ...detail.limitations.slice(0,3)]` → **descarta la 4ª limitación**. El disclaimer *"La imagen es ilustrativa..."* (`details:468`) **no aparece en ninguna de las 276 fichas** — justo donde 230 usan foto genérica compartida.

### Duplicación estructural

- **Tres implementaciones de `buildMetaDescription`:** `profile.mjs:3`, `details.mjs:339` (muerta), `schema.mjs:81`.
- **`catalog-editorial/profile.mjs` es casi-clon de `catalog-expansion/publication.mjs`:** mismo mapa grupo→link (`profile.mjs:17` vs `publication.mjs:8`, los mismos 5 grupos con labels casi idénticos), los mismos 8 FAQs, los mismos 4 `benefitAngles`, los mismos campos `notFor`/`differentiator`/`humanLead`/`humanDescription`. **Dos plantillas paralelas que hay que sincronizar a mano.**

### Otro código muerto

- `getCatalogProductDetail` (`details:558`) — **0 usos**.
- `CatalogCard:39` — `productPageUrl || detailUrl || '#guia-seleccion'`: como `productPageUrl` está en 276/276, **las dos ramas de fallback son inalcanzables**.
- `detailUrl` — su único consumidor real es `buildCatalogSchema:103`, y ahí está mal usado (§2.2).
- Imports muertos: **ninguno** ✅

### 🟠 Agujeros de validación

`schema.mjs` valida y corre en build (fail-fast, correcto). Pero probando con datos inyectados:

| Agujero | Evidencia |
|---|---|
| `fireClasses: ['Z','Q','banana']` **pasa** | `schema.mjs:41-45` solo hace `Array.isArray` |
| `group: 'inventado'` **pasa** | nunca se coteja con `catalogGroups` |
| `limitations: [undefined]` **pasa** | `schema.mjs:65` checa `.length`, no contenido → **dejó pasar §2.1** |
| `availability` no se valida | no está en `requiredStrings` |

### 🟡 `Object.freeze` inconsistente — y al revés

| Archivo | `Object.freeze` |
|---|---|
| `catalog-products.mjs` (46 autorales) | **0** |
| `catalog-product-details.mjs` | **0** |
| `catalog-expansion/{portables,industrial,automatic,accessories,parts}.mjs` | **0** |
| `catalog-expansion/publication.mjs` | 4 |
| `catalog-editorial/profile.mjs` | 1 |

Lo derivado está congelado; **lo autoral, que es la fuente de verdad, es mutable.**

### 🟠 287 teléfonos hardcodeados en 72 archivos

Ningún módulo de constantes. Tres formatos conviviendo: `5215614612594` (wa.me), `5614612594` (tel:), `56 1461 2594` (display).

| Zona | Archivos |
|---|---|
| `src/content/blog/` | 45 |
| `src/pages/` | 24 |
| `src/layouts/Layout.astro` | 1 (×5) |
| `src/components/catalog/QuoteForm.astro` | 1 (`:31`, `:118`) |
| `public/js/catalog-system.js` | 1 (`:4`) |

Más `"telephone": "+525614612594"` en JSON-LD de `nosotros.astro:27`, `contacto.astro:17`, `servicios.astro:18`. **Un cambio de número exige tocar 72 archivos en 3 formatos.**

### `QuoteForm.astro` — sin captura de lead

No hay `action` ni endpoint. `<form novalidate>` (`:35`) **desactiva la validación nativa del browser**; todo depende de JS. `catalog-system.js:376` construye el `wa.me` y abre WhatsApp. Sin JS no hay envío — solo el `<noscript>` (`:118`) con link manual. **Cero registro server-side**: si el usuario no completa el hand-off a WhatsApp, el lead se pierde sin rastro.

---

## 7. Lo que está bien (no tocar)

Vale la pena decirlo explícitamente, porque el refactor no debe destruirlo:

- **Integridad referencial impecable:** 0 IDs/slugs duplicados, 0 `parentId` rotos, 0 imágenes faltantes, 0 enlaces internos rotos en las 301 URLs distintas.
- **Validación real que corre en build y falla rápido** (`publication.mjs:128`, `:172`; `details.mjs:503`).
- **Metadatos 100% únicos y en rango:** 276/276 `seo.title` ≤60, `metaDescription` 120–160. La validación de `schema.mjs:50-55` funciona.
- **Accesibilidad sólida:** 0 `<img>` sin `alt` (278/278), 1 `<h1>` por página, labels asociados (`QuoteForm:37-44` envuelve los controles → asociación implícita válida), `caption.sr-only` (`:225`), `<th scope="row">` (`:229`), `aria-hidden` en decorativos.
- **Sin CSS inline en `ProductDetailTemplate`** — usa `extraCss={['/css/catalog-product-detail.css?v=3']}`, cacheable y compartido.
- **Ausencia de `offers`/`brand` en el `Product` schema: decisión ética, no bug.** `tests/catalog.test.mjs:116-118` lo *exige*: `assert.equal(serialised.includes('"brand"'), false, 'resold products must not be branded as MANEXT')`. Producto de reventa, sin precio público. El costo es no obtener rich results — es un costo aceptado conscientemente. **Conservar.**
- **Cobertura de schema correcta:** `BreadcrumbList`, `ItemList`, `Product` y `FAQPage` presentes en catálogo y fichas. El defecto está en las URLs, no en la cobertura.
- **Sin imports muertos.**

---

## 8. Plan de refactor

Ordenado por **coste/impacto**, no por severidad. Las tres primeras fases son horas, no días, y resuelven lo que está sangrando hoy.

### Fase 1 — Sangrado (1–2 h)

| # | Acción | Archivo |
|---|---|---|
| 1.1 | Añadir el `sector` faltante a `offer('clase-d', ...)` | `accessories.mjs:89` |
| 1.2 | `buildCatalogSchema` → usar `productPageUrl` como URL del `Product` | `catalog-utils.mjs:103` |
| 1.3 | Normalizar puntuación en `need`/`valueProposition`, o hacer que el template la inserte | `publication.mjs:35,56,79` |
| 1.4 | `capitalize()` en `seoTitle` | `profile.mjs:34`, `schema.mjs:116` |
| 1.5 | Canonical de `/catalogo` sin trailing slash | `catalogo.astro:34` |

**Tests que deben acompañar cada fix** (hoy no existen):
- Aridad: assert de que ninguna `proposal` tiene campos `undefined` tras `createProposalSeries`.
- ItemList: assert de que 276/276 URLs del schema coinciden con una ruta emitida y **ninguna** contiene `#`.
- Gramática: assert de que ningún `humanLead` contiene `[a-záéíóúñ] [a-záéíóúñ]` tras un punto ausente — o más simple: que todo `need`/`valueProposition` termina en `.`.

### Fase 2 — Decisión de arquitectura (decisión tuya, 1 h de ejecución)

**`/productos/*` debe morir.** 42 páginas huérfanas, 0 enlaces entrantes, 22 stubs vacíos, CSS muerto, 4 links rotos, 30 con la norma mal citada — duplicando un catálogo de 276 URLs vivas que funciona mejor en todo.

Reparar esas 42 páginas es trabajo que probablemente no vale hacerse. Las opciones:

| Opción | Acción | Consecuencia |
|---|---|---|
| **A — Eliminar (recomendada)** | Borrar `src/content/productos/`, `src/pages/productos/[...slug].astro` y la colección del config. Añadir 42 redirects 301 → ficha equivalente en `/catalogo/` | Sitemap limpio, canibalización resuelta, −42 URLs thin |
| **B — Rescatar 5** | Conservar solo los 5 MD con markdown real (666–1179 palabras, normas bien citadas) migrándolos como contenido enriquecido de su ficha de catálogo | Preserva el único contenido autoral valioso |
| **C — Mantener** | Arreglar slugs, CSS scope, 4 links, 30 miscitas NOM, 22 stubs, 42 imágenes | Semanas de trabajo para sostener un sistema duplicado |

**Recomendación: A + B.** Eliminar los 42, pero antes rescatar el cuerpo de los 5 markdown buenos (`producto-extintor-pqs-4-5kg`, `producto-extintor-pqs-6kg`, `producto-extintor-tipo-k-6L`, y los 2 restantes con >600 palabras) hacia el campo autoral de la ficha correspondiente. Ese contenido es exactamente lo que le falta al catálogo: prosa real, no plantilla.

### Fase 3 — Normativa (2–3 h, prioridad de negocio)

Corregir las 77 menciones de NOM-154-SCFI y las 16 de NOM-002-STPS presentadas como certificación del producto. La referencia correcta **ya existe en el repo** (`NOM-100-STPS-1994`, `NOM-104-STPS`, `NOM-045-SCFI-2000` en los 5 archivos buenos).

Si se ejecuta la Fase 2A, este trabajo se reduce a verificar que el catálogo (`compliance.text`, solo **3 variantes únicas en 276 fichas**) cite correctamente. Es un fix en 3 strings, no en 30 archivos. **Hacer Fase 2 antes que Fase 3.**

Resolver por separado: la contradicción Novec vs FM-200, el dato de "270 años del CO₂", y la disponibilidad real del Novec 1230 de 3M.

### Fase 4 — Rendimiento (2–4 h)

| # | Acción | Ganancia |
|---|---|---|
| 4.1 | Sacar el `<select>` de 276 opciones del HTML: poblarlo desde `catalog-system.js` con un JSON cacheado, o reducirlo al producto de la ficha + "otro" | **−6.8 MB (−32%)** |
| 4.2 | Normalizar las 25 URLs con trailing slash → `trailingSlash: 'never'` | −301s en cada clic |
| 4.3 | Resolver los 7 canonicals contradictorios: decidir por producto si canoniza la landing de servicio o la ficha | Consolida autoridad en las queries top |

### Fase 5 — Deuda estructural (1–2 días)

| # | Acción |
|---|---|
| 5.1 | **Unificar `catalog-editorial/profile.mjs` + `catalog-expansion/publication.mjs`** en un solo motor editorial. Son casi-clones; mantener dos plantillas sincronizadas a mano es la causa raíz de que los bugs se dupliquen |
| 5.2 | Borrar `buildMetaDescription` de `details.mjs:339`, sus 6 FAQs muertas y `getCatalogProductDetail:558` (~60 líneas) |
| 5.3 | Recuperar el disclaimer de imagen: `details:527` descarta la 4ª limitación → hoy no aparece en ninguna de las 276 fichas, justo donde 230 usan foto genérica |
| 5.4 | `src/config/business.mjs` con teléfono, formatos y URLs. Sustituir las 287 ocurrencias (empezar por `src/components` + `src/layouts` + `src/pages` = 27 archivos; el blog puede ir después) |
| 5.5 | Cerrar los agujeros de `schema.mjs`: validar contenido de arrays (no solo `.length`), `group` contra `catalogGroups`, `fireClasses` contra A/B/C/D/K, `availability` contra `availabilityLabels` |
| 5.6 | **Alinear tests con producción:** o `catalog-system.js` importa `filterCatalog`/`paginateCatalog`/`buildQuoteMessage` desde `catalog-utils.mjs`, o se testea `catalog-system.js`. Hoy se prueba una implementación fantasma |
| 5.7 | `Object.freeze` en los 46 autorales de `catalog-products.mjs` (o quitarlo de todos por consistencia) |

### Fase 6 — Contenido (el trabajo de fondo)

Lo demás es mecánico; esto no. **230 fichas comparten 9 imágenes, capacidad placeholder y una plantilla con 5 sustituciones.** Ninguna corrección de código arregla eso.

Ruta pragmática:

1. **Priorizar por intención de búsqueda.** De 276 fichas, probablemente 20–30 concentran el volumen real. Escribir copy autoral **de verdad** para esas — como los 2 que ya existen (`co2-portatil`, `hfc-236fa-portatil`), que son buenos.
2. **`noindex` en la cola larga** hasta que tenga contenido propio. 230 páginas thin indexadas dañan el dominio entero; 230 páginas thin con `noindex` no dañan nada y siguen sirviendo para navegación interna.
3. **Fotografía real.** 9 imágenes para 276 productos es el techo de calidad de todo el catálogo. Es un problema de operación, no de código, pero limita todo lo demás.
4. **Enriquecer semillas antes que plantillas.** Subir de 5 frases a 15–20 por producto multiplica la variedad sin reescribir el motor.

---

## 9. Métricas de referencia

| Métrica | Hoy | Objetivo Fase 1–4 |
|---|---|---|
| `undefined` en producción | 4 | 0 |
| URLs correctas en `ItemList` | 0/276 | 276/276 |
| Fichas con lead gramatical | 46/276 | 276/276 |
| URLs huérfanas en sitemap | 42 | 0 |
| Canonicals contradictorios | 7 | 0 |
| HTML de `/catalogo/` | 23 MB | ~16 MB |
| `<title>` en minúscula | 45/276 | 0 |
| URLs con 301 innecesario | 25 | 0 |
| Miscitas NOM como cert. de producto | 93 | 0 |
| Tests que cubren lo que corre | 0/3 módulos | 3/3 |

---

## 10. Conclusión

El código de MANEXT está **mejor construido de lo que su output sugiere**. Hay validación real, fail-fast, integridad referencial perfecta, accesibilidad cuidada y una decisión ética test-enforced (no fingir `brand` ni `offers` en producto de reventa) que habla bien del criterio con que se hizo.

Lo que falla es el eslabón entre el motor y la página: un argumento omitido que imprime `undefined` en vivo, un `ItemList` que ignora 269 fichas que sí existen, un template que concatena sin puntos en 230 páginas, y 42 páginas huérfanas que nadie enlaza pero Google sí indexa. Ninguno lo detecta la suite, porque la suite prueba una implementación paralela a la que corre.

**El orden importa:** Fase 1 (2 h) detiene el sangrado. Fase 2 (decidir matar `/productos/*`) elimina de un golpe el 40% de los hallazgos de este informe y hace que la Fase 3 cueste 3 strings en lugar de 30 archivos. Todo lo demás puede esperar.

Y la Fase 6 es la única que no se resuelve con código: **276 fichas construidas sobre 2 textos reales y 9 fotos es un problema de contenido, no de arquitectura.**

---

*Auditoría generada el 16 de julio de 2026. Todos los hallazgos verificados contra el `dist/` construido y la ejecución real de los módulos. Los números son medidos, no estimados.*
