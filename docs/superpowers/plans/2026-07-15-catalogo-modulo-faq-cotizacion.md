# Catalog FAQ + Quote Module Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the separate FAQ and quote sections on `/catalogo` with one professional reusable module that renders FAQ first and the WhatsApp quote form second.

**Architecture:** Add a focused Astro composition component that receives FAQ, product, and sector data while reusing the existing `QuoteForm.astro` and `catalog-system.js` behavior. Wire only the catalog landing page to the new component, then replace the obsolete page-specific CSS with a responsive `.92fr / 1.08fr` module matching the approved product-detail pattern.

**Tech Stack:** Astro 6, TypeScript interfaces in `.astro`, vanilla CSS, native `details/summary`, Node test runner.

## Global Constraints

- First implementation is limited to `/catalogo`; product detail and legacy product routes do not change.
- Desktop order is FAQ first, quote form second; mobile order remains the same in one column.
- The commercial model remains `Cotización personalizada`; do not add prices, offers, ratings, stock, or unverifiable certifications.
- Reuse `QuoteForm.astro`; do not duplicate form controls or WhatsApp message logic.
- Keep FAQ copy identical to the visible `FAQPage` schema data.
- No animations or transitions on containers, FAQ, icons, or accordions; only the submit button may transition color.
- Add no dependencies and no extra client-side JavaScript.
- Keep required-field validation, privacy consent, `role="alert"`, native input types, and the existing WhatsApp review step.
- Increment `/css/catalog-system.css?v=9` to `v=10` when the stylesheet changes.

---

## File Structure

- Create `src/components/catalog/FaqQuoteModule.astro`: owns the shared two-column composition and delegates the form to `QuoteForm.astro`.
- Modify `src/pages/catalogo.astro`: imports the module, replaces the two old sections, and bumps the CSS version.
- Modify `public/css/catalog-system.css`: removes obsolete separate-section styles and implements the approved responsive module.
- Modify `tests/catalog.test.mjs`: verifies component wiring, HTML order, built output, and responsive CSS contract.
- Modify `tests/motion-policy.test.mjs`: verifies the new module contains no motion declarations.

### Task 1: Add structural and motion regression tests

**Files:**
- Modify: `tests/catalog.test.mjs`
- Modify: `tests/motion-policy.test.mjs`

**Interfaces:**
- Consumes: current `src/pages/catalogo.astro`, `public/css/catalog-system.css`, and built `dist/catalogo/index.html`.
- Produces: executable contracts for `FaqQuoteModule.astro`, `.faq-quote__grid`, content order, responsive collapse, and no-motion policy.

- [ ] **Step 1: Add a failing source-structure test to `tests/catalog.test.mjs`**

```js
test('catalog uses one reusable FAQ and quote conversion module', async () => {
  const [page, component] = await Promise.all([
    readFile(new URL('../src/pages/catalogo.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/catalog/FaqQuoteModule.astro', import.meta.url), 'utf8'),
  ]);

  assert.match(page, /import FaqQuoteModule from ['"]\.\.\/components\/catalog\/FaqQuoteModule\.astro['"]/);
  assert.match(page, /<FaqQuoteModule[\s\S]*faqs=\{faqs\}[\s\S]*products=\{products\}[\s\S]*sectors=\{sectorOptions\}[\s\S]*\/>/);
  assert.doesNotMatch(page, /<section class="quote-section/);
  assert.doesNotMatch(page, /<section class="catalog-faq/);
  assert.ok(component.indexOf('faq-quote__faq') < component.indexOf('<QuoteForm'), 'FAQ must be rendered before the form');
  assert.match(component, /open=\{index === 0\}/);
  assert.match(component, /<QuoteForm products=\{products\} sectors=\{sectors\}/);
});
```

- [ ] **Step 2: Extend the built-catalog test in `tests/catalog.test.mjs`**

Add these contracts inside `built catalog exposes one keyword-specific CTA per product card` after the current sidebar assertions:

```js
  for (const contract of [
    'class="faq-quote section-pad"',
    'class="faq-quote__grid"',
    'class="faq-quote__faq"',
    'class="faq-quote__form"',
    'Preguntas frecuentes del catálogo',
    'Cuéntanos qué necesitas proteger',
    'Solicitar cotización por WhatsApp',
  ]) {
    assert.ok(html.includes(contract), `built catalog missing unified conversion contract: ${contract}`);
  }
  assert.equal((html.match(/class="faq-quote section-pad"/g) || []).length, 1);
  assert.ok(html.indexOf('class="faq-quote__faq"') < html.indexOf('class="faq-quote__form"'));
  assert.doesNotMatch(html, /class="quote-section section-pad"/);
  assert.doesNotMatch(html, /class="catalog-faq section-pad"/);
```

- [ ] **Step 3: Extend the CSS contract in `tests/catalog.test.mjs`**

Add the following assertions to `catalog stylesheet implements the responsive accessibility contract`:

```js
  assert.match(
    css,
    /\.faq-quote__grid\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*\.92fr\)\s+minmax\(0,\s*1\.08fr\)/s,
    'unified conversion module must use the approved desktop ratio',
  );
  assert.match(
    css,
    /@media\s*\(max-width:\s*900px\)[\s\S]*\.faq-quote__grid[\s\S]*grid-template-columns:\s*1fr/s,
    'unified conversion module must stack on tablet and mobile',
  );
```

- [ ] **Step 4: Add a no-motion test to `tests/motion-policy.test.mjs`**

```js
test('unified catalog conversion module remains static', async () => {
  const css = await readFile(new URL('../public/css/catalog-system.css', import.meta.url), 'utf8');
  const selectors = [
    '.faq-quote',
    '.faq-quote__grid',
    '.faq-quote__faq',
    '.faq-quote__form',
    '.faq-quote__list details',
    '.faq-quote__list summary',
    '.faq-quote__list summary span',
  ];

  for (const selector of selectors) {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rule = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`))?.[1] || '';
    assert.doesNotMatch(rule, /animation|transition/, `${selector} must remain static`);
  }
});
```

- [ ] **Step 5: Run the targeted tests and verify RED**

Run:

```bash
node --test tests/catalog.test.mjs tests/motion-policy.test.mjs
```

Expected: FAIL because `FaqQuoteModule.astro` does not exist and `.faq-quote__grid` is not implemented.

- [ ] **Step 6: Commit the failing tests**

```bash
git add tests/catalog.test.mjs tests/motion-policy.test.mjs
git commit -m "test: define unified catalog conversion module"
```

### Task 2: Create the reusable Astro composition and wire `/catalogo`

**Files:**
- Create: `src/components/catalog/FaqQuoteModule.astro`
- Modify: `src/pages/catalogo.astro`

**Interfaces:**
- Consumes: `QuoteForm.astro`, FAQ objects shaped as `{ question: string; answer: string }`, product objects shaped as `{ id: string; name: string; variants: string[] }`, and `string[]` sectors.
- Produces: `FaqQuoteModule` props `faqs`, `products`, `sectors`, optional `selectedProduct`, `id`, `titleId`, `eyebrow`, `title`, `intro`, and `formLabel`.

- [ ] **Step 1: Create `src/components/catalog/FaqQuoteModule.astro`**

```astro
---
import QuoteForm from './QuoteForm.astro';

interface FAQ {
  question: string;
  answer: string;
}

interface Product {
  id: string;
  name: string;
  variants: string[];
}

interface Props {
  faqs: FAQ[];
  products: Product[];
  sectors: string[];
  selectedProduct?: string;
  id?: string;
  titleId?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  formLabel?: string;
}

const {
  faqs,
  products,
  sectors,
  selectedProduct = '',
  id = 'preguntas-frecuentes',
  titleId = 'catalog-faq-title',
  eyebrow = 'Antes de cotizar',
  title = 'Preguntas frecuentes del catálogo',
  intro = 'Respuestas claras sobre selección, disponibilidad y servicios.',
  formLabel = 'Formulario de cotización técnica por WhatsApp',
} = Astro.props;
---

<section class="faq-quote section-pad" id={id} aria-labelledby={titleId}>
  <div class="container">
    <div class="faq-quote__grid">
      <div class="faq-quote__faq">
        <header class="faq-quote__heading">
          <p>{eyebrow}</p>
          <h2 id={titleId}>{title}</h2>
          <span>{intro}</span>
        </header>

        <div class="faq-quote__list">
          {faqs.map((faq, index) => (
            <details open={index === 0}>
              <summary>{faq.question}<span aria-hidden="true">+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <div class="faq-quote__form" aria-label={formLabel}>
        <QuoteForm products={products} sectors={sectors} selectedProduct={selectedProduct} />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Replace the separate sections in `src/pages/catalogo.astro`**

Replace the `QuoteForm` import with:

```astro
import FaqQuoteModule from '../components/catalog/FaqQuoteModule.astro';
```

Replace both the `.quote-section` and `.catalog-faq` sections with:

```astro
    <FaqQuoteModule faqs={faqs} products={products} sectors={sectorOptions} />
```

Change the stylesheet URL to:

```astro
extraCss={['/css/catalog-system.css?v=10']}
```

- [ ] **Step 3: Run the source-structure test**

Run:

```bash
node --test --test-name-pattern="catalog uses one reusable FAQ" tests/catalog.test.mjs
```

Expected: PASS.

- [ ] **Step 4: Commit the component integration**

```bash
git add src/components/catalog/FaqQuoteModule.astro src/pages/catalogo.astro
git commit -m "feat: unify catalog FAQ and quote composition"
```

### Task 3: Implement the professional responsive design

**Files:**
- Modify: `public/css/catalog-system.css`

**Interfaces:**
- Consumes: `.faq-quote`, `.faq-quote__grid`, `.faq-quote__faq`, `.faq-quote__heading`, `.faq-quote__list`, and `.faq-quote__form` from Task 2.
- Produces: approved two-column desktop layout, single-column mobile layout, scoped QuoteForm overrides, visible focus, and static FAQ behavior.

- [ ] **Step 1: Replace obsolete `.quote-section` and `.catalog-faq` blocks**

Keep the generic `.quote-panel`, `.quote-panel__intro`, and `.quote-form` rules, but replace the page-level section and FAQ rules with:

```css
/* Unified FAQ + quote conversion */
.faq-quote {
  background: #f2f3f5;
  border-top: 1px solid var(--catalog-border);
  scroll-margin-top: 190px;
}

.faq-quote__grid {
  display: grid;
  grid-template-columns: minmax(0, .92fr) minmax(0, 1.08fr);
  overflow: hidden;
  background: var(--catalog-white);
  border: 1px solid #dedfe3;
  border-radius: 22px;
  box-shadow: 0 28px 70px rgba(20, 22, 26, .11);
}

.faq-quote__faq {
  min-width: 0;
  padding: clamp(2rem, 4vw, 3.2rem);
  border-right: 1px solid var(--catalog-border);
}

.faq-quote__heading {
  margin-bottom: 2rem;
}

.faq-quote__heading > p {
  margin: 0 0 .65rem;
  color: var(--catalog-red);
  font-size: .72rem;
  font-weight: 900;
  letter-spacing: .1em;
  text-transform: uppercase;
}

.faq-quote__heading h2 {
  max-width: 540px;
  margin: 0 0 .75rem;
  color: var(--catalog-ink);
  font-size: clamp(1.8rem, 3vw, 2.55rem);
  line-height: 1.08;
  letter-spacing: -.035em;
}

.faq-quote__heading > span {
  display: block;
  max-width: 580px;
  color: var(--catalog-muted);
  font-size: .92rem;
  line-height: 1.65;
}

.faq-quote__list {
  border-top: 1px solid var(--catalog-border);
}

.faq-quote__list details {
  border-bottom: 1px solid var(--catalog-border);
}

.faq-quote__list summary {
  display: flex;
  min-height: 68px;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  color: var(--catalog-ink);
  font-size: .95rem;
  font-weight: 800;
  cursor: pointer;
  list-style: none;
}

.faq-quote__list summary::-webkit-details-marker {
  display: none;
}

.faq-quote__list summary span {
  flex: 0 0 auto;
  color: var(--catalog-red);
  font-size: 1.2rem;
}

.faq-quote__list details[open] summary span {
  transform: rotate(45deg);
}

.faq-quote__list details p {
  max-width: 720px;
  margin: -.25rem 0 1.35rem;
  color: var(--catalog-muted);
  font-size: .86rem;
  line-height: 1.75;
}

.faq-quote__form {
  min-width: 0;
}

.faq-quote__form .quote-panel {
  grid-template-columns: 1fr;
  min-height: 100%;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.faq-quote__form .quote-panel__intro {
  padding: clamp(2rem, 3.5vw, 2.75rem);
  background: var(--catalog-carbon);
}

.faq-quote__form .quote-panel__intro .catalog-kicker {
  color: #ff8a8e;
}

.faq-quote__form .quote-panel__intro > p:not(.catalog-kicker) {
  color: #c9cbd0;
}

.faq-quote__form .quote-form {
  padding: clamp(2rem, 3.5vw, 2.75rem);
}
```

- [ ] **Step 2: Update focus selectors**

Replace `.catalog-faq summary:focus-visible` with:

```css
.faq-quote__list summary:focus-visible
```

- [ ] **Step 3: Add responsive collapse to the existing `@media (max-width: 900px)` block**

```css
  .faq-quote__grid {
    grid-template-columns: 1fr;
  }

  .faq-quote__faq {
    border-right: 0;
    border-bottom: 1px solid var(--catalog-border);
  }
```

- [ ] **Step 4: Replace the mobile `.quote-panel` edge override in `@media (max-width: 680px)`**

```css
  .faq-quote__grid {
    margin-inline: -2.8%;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
  }
```

Do not apply negative margins or border removal to `.faq-quote__form .quote-panel`.

- [ ] **Step 5: Update the reduced-motion selector list**

Replace `.catalog-faq summary span` with `.faq-quote__list summary span`. Do not add a `transition` to the icon; the open state changes immediately.

- [ ] **Step 6: Run targeted tests and verify GREEN**

Run:

```bash
node --test tests/catalog.test.mjs tests/motion-policy.test.mjs
```

Expected: all targeted tests PASS.

- [ ] **Step 7: Commit the CSS implementation**

```bash
git add public/css/catalog-system.css
git commit -m "style: refine unified catalog conversion module"
```

### Task 4: Build, inspect, and verify the catalog page

**Files:**
- Verify: `dist/catalogo/index.html`
- Verify: `src/components/catalog/FaqQuoteModule.astro`
- Verify: `public/css/catalog-system.css`

**Interfaces:**
- Consumes: all implementation output from Tasks 1–3.
- Produces: evidence that the module renders, remains accessible and static, and preserves the form behavior.

- [ ] **Step 1: Run the full project tests**

Run:

```bash
npm test
```

Expected: 0 failures.

- [ ] **Step 2: Build all static pages**

Run:

```bash
npm run build
```

Expected: exit code 0 and `/dist/catalogo/index.html` generated.

- [ ] **Step 3: Run Astro diagnostics**

Run:

```bash
npx astro check
```

Expected: 0 errors.

- [ ] **Step 4: Verify the built conversion contract**

Run:

```bash
rg -n "faq-quote__grid|Preguntas frecuentes del catálogo|Cuéntanos qué necesitas proteger|Solicitar cotización por WhatsApp|FAQPage" dist/catalogo/index.html
```

Expected: every contract is present once in the unified module; FAQ content precedes the form.

- [ ] **Step 5: Verify the local HTTP response**

Run:

```bash
curl -sS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:4310/catalogo
```

Expected: `200`.

- [ ] **Step 6: Review desktop and 390 × 844 px**

Confirm:

- Desktop shows `.92fr / 1.08fr` columns with FAQ left and quote right.
- 390 × 844 px stacks FAQ before quote with no horizontal overflow.
- First FAQ is open; all other FAQ remain operable by keyboard.
- Required validation and privacy consent remain visible.
- Only the WhatsApp submit button has a transition.
- Browser console has no new errors from the module.

- [ ] **Step 7: Commit any verification-only correction, if required**

Stage only files changed to correct a verified issue, then commit with:

```bash
git add src/components/catalog/FaqQuoteModule.astro src/pages/catalogo.astro public/css/catalog-system.css tests/catalog.test.mjs tests/motion-policy.test.mjs
git commit -m "fix: finalize catalog conversion layout"
```

If no correction is required, do not create an empty commit.

