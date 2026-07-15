import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { catalogProducts } from '../src/data/catalog-products.mjs';
import {
  buildCatalogSchema,
  buildQuoteMessage,
  filterCatalog,
  paginateCatalog,
} from '../src/lib/catalog-utils.mjs';

test('catalog covers every approved commercial group', () => {
  const groups = new Set(catalogProducts.map((product) => product.group));

  for (const group of ['portatiles', 'industriales', 'automaticos', 'accesorios', 'refacciones']) {
    assert.ok(groups.has(group), `missing commercial group: ${group}`);
  }

  assert.ok(catalogProducts.length >= 30, 'catalog must launch with at least 30 product families');
});

test('catalog entries have quote-safe required fields and no public price', () => {
  const ids = new Set();

  for (const product of catalogProducts) {
    for (const key of ['id', 'name', 'group', 'agent', 'description', 'availability']) {
      assert.ok(product[key], `${product.id || 'unknown'} missing ${key}`);
    }

    assert.equal(ids.has(product.id), false, `duplicate id: ${product.id}`);
    ids.add(product.id);
    assert.ok(Array.isArray(product.fireClasses), `${product.id} fireClasses must be an array`);
    assert.ok(Array.isArray(product.variants), `${product.id} variants must be an array`);
    assert.ok(Array.isArray(product.applications), `${product.id} applications must be an array`);
    assert.equal('price' in product, false, `${product.id} must not expose a price`);
  }
});

test('core extinguisher families use product-specific source images', () => {
  const expectedPaths = {
    'pqs-abc-portatil': '/productos/polvo-quimico-seco/',
    'co2-portatil': '/productos/co2/',
    'agua-presion-portatil': '/productos/agua-presion/',
    'espuma-afff-portatil': '/productos/espuma-afff/',
    'tipo-k-portatil': '/productos/tipo-k/',
    'hfc-236fa-portatil': '/productos/agentes-limpios/',
  };

  for (const [id, expectedPath] of Object.entries(expectedPaths)) {
    const product = catalogProducts.find((entry) => entry.id === id);
    assert.ok(product.image.includes(expectedPath), `${id} must use an accurate product image`);
  }
});

test('filters combine group, fire class and accent-insensitive text search', () => {
  const result = filterCatalog(catalogProducts, {
    group: 'portatiles',
    fireClass: 'K',
    query: 'cocina',
  });

  assert.ok(result.length > 0);
  assert.ok(result.every((product) => product.group === 'portatiles'));
  assert.ok(result.every((product) => product.fireClasses.includes('K')));

  const co2 = filterCatalog(catalogProducts, { query: 'dioxido de carbono' });
  assert.ok(co2.some((product) => product.id === 'co2-portatil'));
});

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

test('quote message contains selected product and contact data', () => {
  const message = buildQuoteMessage({
    product: 'Extintor tipo K',
    variant: '6 L',
    quantity: '2',
    sector: 'Restaurante',
    name: 'Ana',
    phone: '5512345678',
  });

  assert.match(message, /Extintor tipo K/);
  assert.match(message, /Capacidad o variante: 6 L/);
  assert.match(message, /Cantidad: 2/);
  assert.match(message, /Ana/);
  assert.match(message, /5512345678/);
});

test('catalog schema uses ItemList and does not create offers', () => {
  const schema = buildCatalogSchema(catalogProducts);
  const serialised = JSON.stringify(schema);

  assert.equal(schema['@type'], 'ItemList');
  assert.equal(schema.numberOfItems, catalogProducts.length);
  assert.equal(serialised.includes('ProductCatalog'), false);
  assert.equal(serialised.includes('offers'), false);
  assert.equal(serialised.includes('price'), false);
  assert.equal(serialised.includes('"brand"'), false, 'resold products must not be branded as MANEXT');
});

test('shared header exposes the catalog as a direct primary navigation link', async () => {
  const layout = await readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');

  assert.match(layout, /<li role="none"><a href="\/catalogo" class="nav-link"[^>]*>Catálogo<\/a><\/li>/);
});

test('catalog cards use one keyword-specific product CTA and no quote button', async () => {
  const component = await readFile(new URL('../src/components/catalog/CatalogCard.astro', import.meta.url), 'utf8');

  assert.doesNotMatch(component, /catalog-card__quote/);
  assert.doesNotMatch(component, />\s*Solicitar cotización\s*</);
  assert.match(component, /const detailUrl = product\.productPageUrl \|\| product\.detailUrl \|\| '#guia-seleccion';/);
  assert.match(component, /const detailLabel = product\.name;/);
  assert.match(component, /aria-label=\{`Ver información técnica: \$\{product\.name\}`\}/);
});

test('catalog uses one reusable FAQ and quote conversion module', async () => {
  const [page, component] = await Promise.all([
    readFile(new URL('../src/pages/catalogo.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/catalog/FaqQuoteModule.astro', import.meta.url), 'utf8'),
  ]);

  assert.match(page, /import FaqQuoteModule from ['"]\.\.\/components\/catalog\/FaqQuoteModule\.astro['"]/);
  assert.match(page, /<FaqQuoteModule[\s\S]*faqs=\{faqs\}[\s\S]*products=\{products\}[\s\S]*sectors=\{sectorOptions\}[\s\S]*\/>/);
  assert.match(page, /const faqs = getSiteFaqs\(['"]\/catalogo['"]\)/);
  assert.match(page, /const faqSchema = JSON\.stringify\(buildFaqSchema\(faqs\)\)/);
  assert.doesNotMatch(page, /<section class="quote-section/);
  assert.doesNotMatch(page, /<section class="catalog-faq/);
  assert.ok(component.indexOf('faq-quote__faq') < component.indexOf('<QuoteForm'), 'FAQ must be rendered before the form');
  assert.match(component, /<FaqList\s+faqs=\{faqs\}/);
  assert.match(component, /<QuoteForm products=\{products\} sectors=\{sectors\}/);
});

test('built catalog exposes one keyword-specific CTA per product card', async () => {
  const html = await readFile(new URL('../dist/catalogo/index.html', import.meta.url), 'utf8');

  assert.match(html, /data-catalog-card/);
  assert.equal((html.match(/catalog-card__details-link/g) || []).length, catalogProducts.length);
  assert.equal((html.match(/catalog-card__quote/g) || []).length, 0);
  assert.match(html, />Extintor CO₂ portátil<\/span>/);
  assert.match(html, />Extintor PQS ABC portátil<\/span>/);
  assert.doesNotMatch(html, />Ver extintor /);
  for (const contract of [
    'class="catalog-layout"',
    'id="catalog-filter-panel"',
    'id="catalog-results"',
    'id="catalog-pagination"',
    'id="catalog-range"',
    'aria-label="Paginación del catálogo"',
    'catalog-sidebar__widget',
    'data-catalog-preset',
    'Guía rápida por riesgo',
    'Agentes más solicitados',
  ]) {
    assert.ok(html.includes(contract), `built catalog missing ${contract}`);
  }
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
  assert.doesNotMatch(html, /ProductCatalog/);
  assert.doesNotMatch(html, /Todos Certificados/);
  assert.doesNotMatch(html, /data\/products\.json/);
  assert.equal((html.match(/<main\b/g) || []).length, 1, 'page must expose one main landmark');
  assert.equal((html.match(/id="main-content"/g) || []).length, 1, 'main-content id must be unique');
});

test('catalog stylesheet implements the responsive accessibility contract', async () => {
  const css = await readFile(new URL('../public/css/catalog-system.css', import.meta.url), 'utf8');

  for (const selector of [
    '.catalog-layout',
    '.catalog-sidebar',
    '.catalog-pagination',
    '.catalog-card',
    '.quote-panel',
    '.intent-grid',
    '.package-grid',
    ':focus-visible',
    'prefers-reduced-motion',
    '@media',
  ]) {
    assert.ok(css.includes(selector), `stylesheet missing ${selector}`);
  }
  assert.match(
    css,
    /\.catalog-grid\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/s,
    'stylesheet must expose three desktop catalog columns',
  );
  assert.match(css, /grid-template-areas:\s*'results sidebar'/, 'desktop catalog must place the sidebar on the right');
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
  const sidebarRule = css.match(/\.catalog-sidebar\s*\{([^}]*)\}/)?.[1] || '';
  assert.doesNotMatch(sidebarRule, /overflow-y|max-height|position:\s*sticky/, 'sidebar must not use an internal scroll area');
});

test('catalog cards expose a professional commercial hierarchy', async () => {
  const component = await readFile(new URL('../src/components/catalog/CatalogCard.astro', import.meta.url), 'utf8');

  for (const contract of [
    'catalog-card__eyebrow',
    'catalog-card__availability-dot',
    'catalog-card__identity',
    'catalog-card__specs',
    'catalog-card__spec-icon',
    'catalog-card__service-note',
  ]) {
    assert.ok(component.includes(contract), `catalog card missing ${contract}`);
  }

  assert.match(component, /Cotización personalizada/);
  assert.match(component, /Asesoría técnica incluida/);
});

test('catalog client script progressively enhances server-rendered cards', async () => {
  const script = await readFile(new URL('../public/js/catalog-system.js', import.meta.url), 'utf8');

  assert.doesNotMatch(script, /fetch\s*\(/);
  assert.doesNotMatch(script, /data\/products\.json/);
  for (const contract of [
    'URLSearchParams',
    'PAGE_SIZE = 12',
    "params.get('pagina')",
    'aria-current',
    'data-catalog-card',
    'data-quote-product',
    'catalog-quote-form',
    'catalog-result-count',
    'catalog-pagination',
    'catalog-range',
    'data-catalog-preset',
    '.hidden',
  ]) {
    assert.ok(script.includes(contract), `client script missing ${contract}`);
  }
});
