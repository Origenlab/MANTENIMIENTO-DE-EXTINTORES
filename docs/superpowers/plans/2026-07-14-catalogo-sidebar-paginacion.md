# Catálogo MANEXT Sidebar and Pagination Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Present the MANEXT catalog in a professional sidebar layout with four cards per desktop row and accessible pagination of 12 products per page.

**Architecture:** Keep every product server-rendered for SEO and progressively enhance the existing Astro markup. The browser script will filter the complete card collection, derive a valid current page, reveal only the 12 cards in that page, update the URL, and render accessible pagination controls. CSS will own the desktop sidebar, responsive grid, mobile filter panel, and pagination presentation.

**Tech Stack:** Astro 6, semantic HTML, CSS, ES5-compatible browser JavaScript, Node.js built-in test runner.

## Global Constraints

- Show exactly 12 matching products per page.
- Use four columns on wide desktop, two on tablet, and one on mobile.
- Keep every catalog product in the initial HTML for progressive enhancement and SEO.
- Do not add third-party dependencies.
- Preserve the quote-first commercial flow; do not add prices, cart, or checkout.
- Validate URL parameter values against real controls and never inject query-string content as HTML.
- Preserve visible keyboard focus, ARIA pagination state, and reduced-motion behavior.

---

### Task 1: Define the pagination behavior with failing tests

**Files:**
- Modify: `tests/catalog.test.mjs`
- Modify: `src/lib/catalog-utils.mjs`

**Interfaces:**
- Produces: `paginateCatalog(items, requestedPage, pageSize)` returning `{ items, page, pageSize, pageCount, total, start, end }`.
- Consumes: plain arrays and numeric page inputs; no DOM dependency.

- [ ] **Step 1: Write failing unit tests for pagination boundaries**

```js
import { paginateCatalog } from '../src/lib/catalog-utils.mjs';

test('pagination returns 12 products and clamps requested pages', () => {
  const first = paginateCatalog(catalogProducts, 1, 12);
  assert.equal(first.items.length, 12);
  assert.equal(first.start, 1);
  assert.equal(first.end, 12);

  const overflow = paginateCatalog(catalogProducts, 999, 12);
  assert.equal(overflow.page, overflow.pageCount);
  assert.equal(overflow.end, catalogProducts.length);
});

test('empty pagination has a safe page and zero range', () => {
  const result = paginateCatalog([], 4, 12);
  assert.deepEqual(result.items, []);
  assert.equal(result.page, 1);
  assert.equal(result.pageCount, 0);
  assert.equal(result.start, 0);
  assert.equal(result.end, 0);
});
```

- [ ] **Step 2: Run the tests and verify the missing export fails**

Run: `npm test`

Expected: FAIL because `paginateCatalog` is not exported.

- [ ] **Step 3: Add the minimal pure pagination helper**

```js
export function paginateCatalog(items, requestedPage = 1, pageSize = 12) {
  const total = Array.isArray(items) ? items.length : 0;
  const safePageSize = Math.max(1, Number.parseInt(pageSize, 10) || 12);
  const pageCount = total ? Math.ceil(total / safePageSize) : 0;
  const parsedPage = Math.max(1, Number.parseInt(requestedPage, 10) || 1);
  const page = pageCount ? Math.min(parsedPage, pageCount) : 1;
  const offset = (page - 1) * safePageSize;
  const pageItems = total ? items.slice(offset, offset + safePageSize) : [];

  return {
    items: pageItems,
    page,
    pageSize: safePageSize,
    pageCount,
    total,
    start: total ? offset + 1 : 0,
    end: total ? offset + pageItems.length : 0,
  };
}
```

- [ ] **Step 4: Run tests and verify the helper passes**

Run: `npm test`

Expected: all pagination and existing catalog tests pass.

### Task 2: Add sidebar and pagination markup contracts

**Files:**
- Modify: `src/components/catalog/CatalogFilters.astro`
- Modify: `src/pages/catalogo.astro`
- Modify: `tests/catalog.test.mjs`

**Interfaces:**
- Produces: `#catalog-filter-panel`, `#catalog-results`, `#catalog-pagination`, `#catalog-range`, and `.catalog-layout` DOM contracts.
- Consumes: existing groups, agents, result total, cards, and empty state.

- [ ] **Step 1: Add a failing built-HTML contract test**

```js
for (const contract of [
  'class="catalog-layout"',
  'id="catalog-filter-panel"',
  'id="catalog-results"',
  'id="catalog-pagination"',
  'id="catalog-range"',
  'aria-label="Paginación del catálogo"',
]) {
  assert.ok(html.includes(contract), `built catalog missing ${contract}`);
}
```

- [ ] **Step 2: Build and run tests to verify the new contract fails**

Run: `npm run build && npm test`

Expected: FAIL on the missing catalog layout and pagination contracts.

- [ ] **Step 3: Refactor filters into a semantic sidebar**

Use `<aside class="catalog-sidebar" aria-label="Filtros del catálogo">`, retain all current control IDs, place the mobile toggle in a results header, and add `<span id="catalog-active-filter-count">0</span>` for active-filter feedback.

- [ ] **Step 4: Compose the results and pagination containers**

```astro
<div class="catalog-layout">
  <CatalogFilters groups={catalogGroups} agents={agents} total={products.length} />
  <div class="catalog-results" id="catalog-results">
    <div class="catalog-results__header">
      <p id="catalog-range" role="status" aria-live="polite">Mostrando 1–12 de {products.length} productos</p>
      <button class="catalog-filter-toggle" type="button" aria-expanded="false" aria-controls="catalog-filter-panel">Filtros</button>
    </div>
    <div class="catalog-grid" id="catalog-grid">...</div>
    <nav class="catalog-pagination" id="catalog-pagination" aria-label="Paginación del catálogo"></nav>
  </div>
</div>
```

- [ ] **Step 5: Build and run tests until the markup contract passes**

Run: `npm run build && npm test`

Expected: all tests pass.

### Task 3: Implement client-side pagination and URL state

**Files:**
- Modify: `public/js/catalog-system.js`
- Modify: `tests/catalog.test.mjs`

**Interfaces:**
- Consumes: cards, filters, `#catalog-pagination`, `#catalog-range`, and `pagina` URL parameter.
- Produces: 12 visible matching cards, accessible page buttons, clamped page state, URL synchronization, and filter reset to page 1.

- [ ] **Step 1: Add failing script-contract assertions**

```js
for (const contract of [
  'PAGE_SIZE = 12',
  "params.get('pagina')",
  "aria-current",
  'catalog-pagination',
  'catalog-range',
]) {
  assert.ok(script.includes(contract), `client script missing ${contract}`);
}
```

- [ ] **Step 2: Run tests and verify script contracts fail**

Run: `npm test`

Expected: FAIL on missing pagination behavior.

- [ ] **Step 3: Implement filtered pagination**

Maintain `currentPage`, derive `matchingCards`, clamp it to `pageCount`, set `card.hidden` according to both filter match and current page, update the range text with `textContent`, and render page buttons using `document.createElement` only.

- [ ] **Step 4: Implement compact page navigation**

Render Previous and Next plus a compact numeric range. Use disabled controls at boundaries, `aria-current="page"` on the current numeric button, and event listeners that update `currentPage`, reapply state, and scroll `#catalog-results` into view.

- [ ] **Step 5: Synchronize and validate URL state**

Read `pagina` as a positive integer, include it only when greater than 1, reset it to 1 when filters change, and continue validating select parameters through their existing option lists.

- [ ] **Step 6: Run all tests**

Run: `npm test`

Expected: all tests pass.

### Task 4: Build the professional responsive layout

**Files:**
- Modify: `public/css/catalog-system.css`
- Modify: `tests/catalog.test.mjs`

**Interfaces:**
- Consumes: `.catalog-layout`, `.catalog-sidebar`, `.catalog-results`, `.catalog-pagination`, and existing card classes.
- Produces: 280px sticky sidebar, four/two/one-column grid, polished pagination, and mobile filter panel.

- [ ] **Step 1: Add failing stylesheet contracts**

```js
for (const contract of [
  '.catalog-layout',
  '.catalog-sidebar',
  '.catalog-pagination',
  'repeat(4, minmax(0, 1fr))',
  'position: sticky',
]) {
  assert.ok(css.includes(contract), `stylesheet missing ${contract}`);
}
```

- [ ] **Step 2: Run tests and verify CSS contracts fail**

Run: `npm test`

Expected: FAIL on missing sidebar, pagination, or four-column grid contracts.

- [ ] **Step 3: Implement wide desktop layout**

Use `.catalog-layout { display:grid; grid-template-columns: 280px minmax(0,1fr); }`, a sticky sidebar below the site header, and `.catalog-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }`. Reduce card media and type scale slightly so four cards remain readable.

- [ ] **Step 4: Implement responsive layout**

At widths below 1180px, collapse the sidebar above results and use two columns. Below 680px use one column, hide the filter panel until the mobile toggle opens it, and keep pagination controls wrapping without horizontal overflow.

- [ ] **Step 5: Add interaction and accessibility states**

Add hover, active, disabled, `:focus-visible`, and `aria-current` styles. Include pagination and filter-panel transitions in the existing reduced-motion override.

- [ ] **Step 6: Run tests and build**

Run: `npm test && npm run build`

Expected: tests pass and Astro build exits with code 0.

### Task 5: Verify in the integrated browser

**Files:**
- Verify: `http://127.0.0.1:4310/catalogo`

**Interfaces:**
- Consumes: running Astro development server.
- Produces: visual evidence that the delivered page matches the approved design.

- [ ] **Step 1: Reload the open catalog tab**

Expected: the catalog section displays a sidebar, four cards per row, and pagination below 12 visible cards.

- [ ] **Step 2: Verify filter and pagination behavior**

Apply a category filter, confirm the result count and page count update, navigate to another page when available, and clear filters.

- [ ] **Step 3: Verify responsive behavior**

Inspect desktop, tablet, and mobile widths. Confirm the sidebar becomes a mobile panel and the grid becomes two and one columns at the intended breakpoints.

- [ ] **Step 4: Inspect console errors**

Expected: no catalog-related errors.

- [ ] **Step 5: Final verification**

Run: `npm test && npm run build`

Expected: zero failing tests and build exit code 0.
