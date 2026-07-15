# Publicación de 230 productos derivados — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir las 230 propuestas aprobadas en cards y fichas públicas de `/catalogo/[slug]`, para obtener 276 productos indexables y desplegarlos en producción.

**Architecture:** Un adaptador puro transformará cada propuesta en un producto publicable y un perfil editorial, heredando imagen y contexto de su familia sin modificar los cinco módulos de investigación. `catalog-products.mjs` combinará las 46 familias y los 230 derivados; `catalog-product-details.mjs` seguirá usando el template compartido, añadirá fuentes primarias y enlaces padre-hijo. No se crearán páginas Astro individuales.

**Tech Stack:** Node.js ESM, Astro 6, `node:test`, CSS/JavaScript existentes del catálogo, GitHub Actions y Cloudflare Pages.

## Global Constraints

- Deben publicarse exactamente 230 derivados y mantenerse las 46 familias: 276 cards y 276 fichas.
- Cada familia conserva exactamente cinco hijos y cada hijo enlaza a su padre y hermanos.
- La ruta pública continúa siendo `/catalogo/[slug]`; no se crean archivos Astro individuales.
- Cotización personalizada; sin precios, ofertas, ratings, stock, marcas o certificaciones inventadas.
- Las imágenes heredadas se describen como ilustrativas y cargan de forma diferida.
- Cada ficha incluye al menos ocho FAQ, fuentes primarias, limitaciones y SEO único.
- FAQ y cotización continúan en un único módulo de dos columnas.
- No se añaden animaciones ni transiciones fuera de botones y CTA.
- Se usa TDD: cada modificación de runtime comienza con una prueba fallida observada.
- La autorización del usuario permite fusionar y desplegar `main` cuando todas las verificaciones pasen.

---

### Task 1: Definir el adaptador de publicación

**Files:**
- Create: `src/data/catalog-expansion/publication.mjs`
- Create: `tests/catalog-expansion-publication.test.mjs`

**Interfaces:**
- Consumes: `catalogExpansionProposals` y las 46 definiciones base.
- Produces: `buildPublishedExpansionProducts(parentProducts)`, `expansionEditorialProfiles`, `getExpansionRelationshipLinks(productId)`.

- [ ] **Step 1: Escribir una prueba fallida del contrato público**

La prueba importará las tres interfaces y exigirá 230 derivados, 276 registros combinados, `productPageUrl` canónica, `parentProductId`, imagen heredada, disponibilidad `validacion-tecnica`, fuentes HTTP(S), ausencia de `price` y 230 perfiles editoriales con ocho FAQ.

- [ ] **Step 2: Ejecutar la prueba y observar el fallo**

Run: `node --test tests/catalog-expansion-publication.test.mjs`
Expected: FAIL con `ERR_MODULE_NOT_FOUND` para `publication.mjs`.

- [ ] **Step 3: Implementar el adaptador mínimo**

Crear productos a partir de la propuesta y su padre; convertir fuentes en `{ label, url }`; construir perfiles mediante `buildEditorialProfiles` y conservar `h1`, title, meta, keyword e intención aprobados. La función de relaciones devolverá cinco hijos para un padre y padre más cuatro hermanos para un derivado.

- [ ] **Step 4: Ejecutar la prueba hasta obtener verde**

Run: `node --test tests/catalog-expansion-publication.test.mjs`
Expected: PASS con 230 productos, 230 perfiles y relaciones completas.

- [ ] **Step 5: Commit**

```bash
git add src/data/catalog-expansion/publication.mjs tests/catalog-expansion-publication.test.mjs
git commit -m "feat: prepara publicacion de 230 productos"
```

---

### Task 2: Publicar las 230 cards y perfiles editoriales

**Files:**
- Modify: `src/data/catalog-products.mjs`
- Modify: `src/data/catalog-product-editorial.mjs`
- Modify: `tests/catalog-expansion-publication.test.mjs`
- Modify: `tests/catalog.test.mjs`

**Interfaces:**
- Consumes: `buildPublishedExpansionProducts` y `expansionEditorialProfiles`.
- Produces: `catalogProducts` con 276 objetos y `catalogProductEditorial` con 276 perfiles.

- [ ] **Step 1: Escribir pruebas fallidas de integración**

Exigir `catalogProducts.length === 276`, exactamente 230 `parentProductId`, 276 URLs únicas, 276 perfiles y 23 páginas de resultados a 12 cards por página.

- [ ] **Step 2: Confirmar el fallo `46 !== 276`**

Run: `node --test tests/catalog.test.mjs tests/catalog-expansion-publication.test.mjs`

- [ ] **Step 3: Integrar el adaptador en los dos agregadores**

Combinar las definiciones base con los derivados después de construir los padres. Extender `catalogProductEditorial` con los perfiles derivados sin cambiar los perfiles humanos existentes.

- [ ] **Step 4: Confirmar 276 cards y filtros funcionales**

Run: `node --test tests/catalog.test.mjs tests/catalog-expansion-publication.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/catalog-products.mjs src/data/catalog-product-editorial.mjs tests/catalog.test.mjs tests/catalog-expansion-publication.test.mjs
git commit -m "feat: publica 230 cards en el catalogo"
```

---

### Task 3: Generar 230 fichas con fuentes y navegación familiar

**Files:**
- Modify: `src/data/catalog-product-details.mjs`
- Modify: `tests/catalog-product-detail.test.mjs`
- Modify: `tests/catalog-expansion-publication.test.mjs`

**Interfaces:**
- Consumes: productos publicados, perfiles y `getExpansionRelationshipLinks`.
- Produces: `catalogProductDetails` con 276 fichas completas para `getStaticPaths()`.

- [ ] **Step 1: Escribir pruebas fallidas del detalle final**

Exigir 276 detalles; 230 derivados con `parentProductId`, fuentes primarias visibles, ocho FAQ, cuatro beneficios, tres usos, tres limitaciones, canonical única y enlaces a padre/hermanos. Exigir cinco enlaces de hijos en cada una de las 46 matrices.

- [ ] **Step 2: Confirmar el fallo por detalles o relaciones ausentes**

Run: `node --test tests/catalog-product-detail.test.mjs tests/catalog-expansion-publication.test.mjs`

- [ ] **Step 3: Integrar fuentes y relaciones**

Hacer que el detalle generado use `product.sources` cuando existan, preserve `parentProductId` y fusione enlaces editoriales con relaciones familiares deduplicadas por URL.

- [ ] **Step 4: Confirmar el contrato completo**

Run: `node --test tests/catalog-product-detail.test.mjs tests/catalog-expansion-publication.test.mjs`
Expected: PASS con 276 detalles.

- [ ] **Step 5: Commit**

```bash
git add src/data/catalog-product-details.mjs tests/catalog-product-detail.test.mjs tests/catalog-expansion-publication.test.mjs
git commit -m "feat: genera 230 fichas tecnicas publicas"
```

---

### Task 4: Validar HTML, paginación, SEO y rendimiento

**Files:**
- Modify: `tests/catalog.test.mjs`
- Modify: `tests/catalog-product-detail.test.mjs`
- Modify: `src/components/catalog/CatalogCard.astro` only if a failing test reveals eager loading or semantic regressions.

**Interfaces:**
- Consumes: build Astro completo.
- Produces: 276 rutas de producto y catálogo con 276 cards paginables.

- [ ] **Step 1: Escribir contratos de HTML construido**

Comprobar 276 enlaces de card, 276 directorios bajo `dist/catalogo` excluyendo el índice, una ficha derivada representativa de cada grupo, canonical/H1/Product/FAQPage correctos, ausencia de Offer/price y formulario con el producto seleccionado.

- [ ] **Step 2: Ejecutar build y observar las pruebas fallidas antes del ajuste final**

Run: `npm run build && node --test tests/catalog.test.mjs tests/catalog-product-detail.test.mjs`

- [ ] **Step 3: Corregir únicamente los contratos que fallen**

Mantener todas las imágenes derivadas con prioridad mayor a 1 para que `loading="lazy"` evite descargar cientos de recursos al cargar el catálogo.

- [ ] **Step 4: Repetir build y pruebas**

Expected: 462 páginas estáticas totales y 276 fichas de catálogo, sin fallos.

- [ ] **Step 5: Commit**

```bash
git add src/components/catalog/CatalogCard.astro tests/catalog.test.mjs tests/catalog-product-detail.test.mjs
git commit -m "test: valida catalogo publico de 276 fichas"
```

---

### Task 5: Actualizar documentación de estado

**Files:**
- Modify: `MEMORY.md`
- Modify: `docs/catalogo/EXPANSION-230-PRODUCTOS.md`
- Modify: `docs/research/2026-07-15-expansion-230-productos-manext.md`
- Modify: `graphify-out/CATALOG-EXPANSION-230.md`
- Modify: `MANEXT/Productos — Expansión 230.md`
- Modify: `docs/obsidian/INDEX.md`

**Interfaces:**
- Consumes: conteos y SHA verificados.
- Produces: documentación que identifica 230 derivados como publicados y explica el adaptador.

- [ ] **Step 1: Cambiar el estado de blueprint a publicado**

Registrar 276 fichas, cinco relaciones por matriz, archivos runtime, fecha y reglas de actualización. Eliminar instrucciones que afirmen que el dataset está aislado.

- [ ] **Step 2: Verificar contradicciones y placeholders**

Run: `rg -n "no publicado|todavía no|aún no|T[B]D|T[O]DO" MEMORY.md docs/catalogo/EXPANSION-230-PRODUCTOS.md docs/research/2026-07-15-expansion-230-productos-manext.md graphify-out/CATALOG-EXPANSION-230.md 'MANEXT/Productos — Expansión 230.md'`
Expected: sin afirmaciones de estado obsoletas ni placeholders.

- [ ] **Step 3: Commit**

```bash
git add MEMORY.md docs/catalogo/EXPANSION-230-PRODUCTOS.md docs/research/2026-07-15-expansion-230-productos-manext.md graphify-out/CATALOG-EXPANSION-230.md 'MANEXT/Productos — Expansión 230.md' docs/obsidian/INDEX.md
git commit -m "docs: registra catalogo expandido publicado"
```

---

### Task 6: QA integral y despliegue live

**Files:**
- Verify only.

**Interfaces:**
- Produces: evidencia local, GitHub Actions exitoso y SHA live coincidente.

- [ ] **Step 1: Ejecutar verificaciones locales en orden**

Run: `npm run build`
Expected: 462 páginas y 276 fichas de catálogo.

Run: `npm test`
Expected: 0 fallos.

Run: `npx astro check`
Expected: 0 errores.

Run: `git diff --check origin/main...HEAD`
Expected: limpio.

- [ ] **Step 2: Revisar visualmente catálogo y cinco fichas representativas**

Comprobar escritorio y 390 × 844 px: tres cards por fila, paginación, filtros, imagen sin deformación, ficha completa, enlaces familiares, FAQ y cotización. No aceptar animaciones fuera de botones.

- [ ] **Step 3: Fusionar y publicar**

Integrar la rama validada en `main`, ejecutar build y pruebas sobre el resultado, hacer `git push origin main` y esperar `Deploy to Cloudflare Pages`.

- [ ] **Step 4: Verificar producción**

Confirmar `https://mantenimientodeextintores.mx/build-id.txt`, HTTP 200 del catálogo, 276 enlaces de card y una URL representativa de cada grupo.
