# Catálogo profesional de extintores MANEXT Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el catálogo roto por una portada Astro renderizada en HTML, con portafolio profesional, filtros progresivos y solicitud de cotización sin precios.

**Architecture:** Una fuente única de datos ESM alimenta tanto la plantilla Astro como funciones puras probadas con `node:test`. Astro genera todas las tarjetas y datos estructurados durante el build; un script pequeño añade filtros, búsqueda y preselección del formulario sin ser necesario para ver los productos.

**Tech Stack:** Astro 6, JavaScript ESM, Node `node:test`, CSS nativo, JSON-LD Schema.org.

## Global Constraints

- No mostrar precios públicos.
- Toda familia debe tener el CTA exacto `Solicitar cotización`.
- No afirmar que todos los productos están certificados por NOM-154-SCFI.
- No presentar clase D y baterías de ion-litio como equivalentes.
- No añadir dependencias nuevas.
- Preservar los cambios existentes de `src/layouts/Layout.astro`.
- Renderizar productos y enlaces en HTML antes de ejecutar JavaScript.
- Mantener la identidad visual negra, blanca y roja de MANEXT.

---

### Task 1: Fuente única de datos y funciones puras

**Files:**
- Create: `src/data/catalog-products.mjs`
- Create: `src/lib/catalog-utils.mjs`
- Create: `tests/catalog.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: `catalogGroups`, `catalogProducts`, `catalogPackages`, `fireClasses`, `availabilityLabels`.
- Produces: `filterCatalog(products, filters)`, `normaliseSearch(value)`, `buildQuoteMessage(fields)`, `buildCatalogSchema(products)`.

- [ ] **Step 1: Write failing data and behavior tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { catalogProducts } from '../src/data/catalog-products.mjs';
import { filterCatalog, buildQuoteMessage, buildCatalogSchema } from '../src/lib/catalog-utils.mjs';

test('catalog covers the approved commercial groups', () => {
  const groups = new Set(catalogProducts.map((product) => product.group));
  for (const group of ['portatiles', 'industriales', 'automaticos', 'accesorios', 'refacciones']) {
    assert.ok(groups.has(group), `missing ${group}`);
  }
});

test('catalog entries have quote-safe required fields and no public price', () => {
  for (const product of catalogProducts) {
    for (const key of ['id', 'name', 'group', 'agent', 'description', 'availability']) {
      assert.ok(product[key], `${product.id || 'unknown'} missing ${key}`);
    }
    assert.ok(Array.isArray(product.fireClasses));
    assert.ok(Array.isArray(product.variants));
    assert.equal('price' in product, false);
  }
});

test('filters combine group, fire class and text search', () => {
  const result = filterCatalog(catalogProducts, { group: 'portatiles', fireClass: 'K', query: 'cocina' });
  assert.ok(result.length > 0);
  assert.ok(result.every((product) => product.group === 'portatiles' && product.fireClasses.includes('K')));
});

test('quote message contains selected product and contact data', () => {
  const message = buildQuoteMessage({ product: 'Extintor tipo K', quantity: '2', name: 'Ana', phone: '5512345678' });
  assert.match(message, /Extintor tipo K/);
  assert.match(message, /Cantidad: 2/);
  assert.match(message, /Ana/);
});

test('catalog schema uses ItemList and does not create offers', () => {
  const schema = buildCatalogSchema(catalogProducts);
  assert.equal(schema['@type'], 'ItemList');
  assert.equal(JSON.stringify(schema).includes('ProductCatalog'), false);
  assert.equal(JSON.stringify(schema).includes('offers'), false);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/catalog.test.mjs`
Expected: FAIL with module-not-found for `catalog-products.mjs`.

- [ ] **Step 3: Implement the catalog data and pure utilities**

Create a minimum of 30 commercial families covering every approved group. Each object uses:

```js
{
  id: 'pqs-abc-portatil',
  name: 'Extintor PQS ABC portátil',
  shortName: 'PQS ABC',
  group: 'portatiles',
  agent: 'Polvo químico seco ABC',
  fireClasses: ['A', 'B', 'C'],
  variants: ['1 kg', '2.5 kg', '4.5 kg', '6 kg', '9 kg', '12 kg'],
  applications: ['Oficinas', 'Comercios', 'Bodegas'],
  sectors: ['Corporativos', 'Comercio', 'Industria'],
  image: '/img/productos/polvo-quimico-seco/Recarga-de-extintores-6kg.avif',
  imageAlt: 'Extintor portátil de polvo químico seco ABC',
  availability: 'entrega-rapida',
  priority: 1,
  description: 'Protección multipropósito para riesgos comunes de sólidos, líquidos inflamables y equipo eléctrico energizado.',
  technicalValidation: false
}
```

Implement filters as an AND operation across active fields and normalized accent-insensitive search. Build quote messages from non-empty values only. Build an `ItemList` whose items use `Product` without price or Offer.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `node --test tests/catalog.test.mjs`
Expected: 5 tests pass, 0 fail.

- [ ] **Step 5: Add reusable test script**

Set `"test": "node --test tests/*.test.mjs"` in `package.json` and run `npm test`.

---

### Task 2: Portada Astro renderizada en servidor

**Files:**
- Create: `src/components/catalog/CatalogCard.astro`
- Create: `src/components/catalog/CatalogFilters.astro`
- Create: `src/components/catalog/QuoteForm.astro`
- Modify: `src/pages/catalogo.astro`

**Interfaces:**
- Consumes: exports from `src/data/catalog-products.mjs` and `buildCatalogSchema`.
- Produces: HTML containing one `[data-catalog-card]` per product and one contextual quote form.

- [ ] **Step 1: Add a failing static-output test**

Extend `tests/catalog.test.mjs` to read the built page after build and assert:

```js
test('built catalog exposes products and quote CTAs in HTML', async () => {
  const html = await readFile(new URL('../dist/catalogo/index.html', import.meta.url), 'utf8');
  assert.match(html, /data-catalog-card/);
  assert.match(html, /Solicitar cotización/);
  assert.doesNotMatch(html, /ProductCatalog/);
  assert.doesNotMatch(html, /Todos Certificados/);
});
```

- [ ] **Step 2: Run build and test to verify RED**

Run: `npm run build && npm test`
Expected: static-output test fails because the existing page has no server-rendered product cards.

- [ ] **Step 3: Implement components and page**

Render hero, intent navigator, filter bar, cards, packages, fire-class guide, trust section, quote form and visible FAQ. Use `ItemList` JSON-LD from the utility. Each card links to `#solicitar-cotizacion` and stores product metadata in `data-*` attributes. Existing valid detail URLs may be linked only when present.

- [ ] **Step 4: Run build and tests**

Run: `npm run build && npm test`
Expected: static-output test passes.

---

### Task 3: Sistema visual responsive

**Files:**
- Replace: `public/css/catalog-system.css`

**Interfaces:**
- Consumes: class names from the Astro catalog components.
- Produces: responsive layout at 360, 768, 1024 and 1440 px.

- [ ] **Step 1: Add a failing CSS contract test**

Assert the stylesheet includes `.catalog-toolbar`, `.catalog-card`, `.quote-panel`, `:focus-visible`, `prefers-reduced-motion`, and at least one `@media` rule.

- [ ] **Step 2: Run test and verify RED**

Run: `npm test`
Expected: FAIL for missing new component selectors.

- [ ] **Step 3: Implement the approved visual system**

Use the design tokens from the approved design, three-column desktop grid, two-column tablet and one-column mobile. Keep controls at least 44 px high. Use SVG/icon text, not emojis. Keep motion limited to transform/opacity and disable it for reduced motion.

- [ ] **Step 4: Run tests and build**

Run: `npm test && npm run build`
Expected: PASS and build exit 0.

---

### Task 4: Progressive enhancement for filtering and quoting

**Files:**
- Replace: `public/js/catalog-system.js`
- Extend: `tests/catalog.test.mjs`

**Interfaces:**
- Consumes: `[data-catalog-card]`, filter controls, result region and quote form.
- Produces: combined client filters, result count, URL parameters, product preselection and encoded WhatsApp handoff.

- [ ] **Step 1: Add a failing browser-script contract test**

Assert the script contains no fetch of `data/products.json`, registers filter change/input handlers, updates `hidden`, handles quote links and uses `URLSearchParams`.

- [ ] **Step 2: Run test and verify RED**

Run: `npm test`
Expected: FAIL because the old script still fetches `data/products.json`.

- [ ] **Step 3: Implement client enhancement**

On DOMContentLoaded, index all card datasets. Combine normalized query, group, agent, fire class and availability filters. Toggle `hidden`, update the live count and empty state, and reset filters. Quote buttons fill the product field and scroll/focus the form. Form submission validates required fields, creates a structured message and opens `https://wa.me/5215614612594?text=...` with `noopener,noreferrer`.

- [ ] **Step 4: Run tests and build**

Run: `npm test && npm run build`
Expected: PASS and build exit 0.

---

### Task 5: Verification and self-review

**Files:**
- Modify only if verification uncovers issues.

- [ ] **Step 1: Validate content contracts**

Run:

```bash
rg -n "ProductCatalog|Todos Certificados|certificados NOM-154|Novec 1230|150 m²|financiamiento sin intereses|stock permanente" src/pages/catalogo.astro src/components/catalog src/data/catalog-products.mjs
```

Expected: no unsupported catalog claims.

- [ ] **Step 2: Validate links and output**

Run a Node script that loads `dist/catalogo/index.html`, collects internal `href` values, and confirms referenced built files or hash targets exist.

- [ ] **Step 3: Run complete verification**

Run: `npm test && npm run build && git diff --check`
Expected: tests 0 failures, build exit 0 and no whitespace errors.

- [ ] **Step 4: Inspect the final diff**

Confirm `src/layouts/Layout.astro` contains only the user's pre-existing change and was not modified as part of this feature.
