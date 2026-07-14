import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function readOrEmpty(path) {
  try {
    return await readFile(new URL(path, import.meta.url), 'utf8');
  } catch {
    return '';
  }
}

test('CO2 catalog entry links to its own technical product page', async () => {
  const source = await readOrEmpty('../src/data/catalog-products.mjs');
  const card = await readOrEmpty('../src/components/catalog/CatalogCard.astro');

  assert.match(source, /id:\s*'co2-portatil'[\s\S]*productPageUrl:\s*'\/catalogo\/extintor-co2-portatil'/);
  assert.match(card, /productPageUrl\?:\s*string/);
  assert.match(card, /Ver ficha técnica/);
});

test('detail template is reusable and includes the required commercial sections', async () => {
  const route = await readOrEmpty('../src/pages/catalogo/[slug].astro');
  const data = await readOrEmpty('../src/data/catalog-product-details.mjs');
  const template = await readOrEmpty('../src/components/catalog/ProductDetailTemplate.astro');
  const surface = `${route}\n${data}\n${template}`;

  assert.match(route, /getStaticPaths/);
  assert.match(route, /ProductDetailTemplate/);
  assert.match(data, /slug:\s*'extintor-co2-portatil'/);

  for (const contract of [
    'Cotización personalizada',
    'Ficha técnica',
    'Aplicaciones recomendadas',
    'Qué incluye tu cotización',
    'Preguntas frecuentes',
    'NOM-002-STPS-2010',
    'NOM-154-SCFI-2005',
  ]) {
    assert.ok(surface.includes(contract), `detail template missing ${contract}`);
  }
});

test('FAQ and WhatsApp quote form share one responsive two-column conversion module', async () => {
  const template = await readOrEmpty('../src/components/catalog/ProductDetailTemplate.astro');
  const css = await readOrEmpty('../public/css/catalog-product-detail.css');

  assert.match(
    template,
    /<section class="product-detail__conversion"[\s\S]*id="preguntas-frecuentes"[\s\S]*<QuoteForm[\s\S]*<\/section>/,
    'FAQ and quote form must render inside one conversion section',
  );
  assert.doesNotMatch(template, /product-detail__quote-section/);
  assert.match(
    css,
    /\.product-detail__conversion-grid\s*\{[^}]*grid-template-columns:\s*minmax\([^;]+\)\s+minmax\([^;]+\)/s,
    'desktop conversion module must expose two columns',
  );
  assert.match(
    css,
    /@media \(max-width:\s*820px\)[\s\S]*\.product-detail__conversion-grid[^{]*\{[^}]*grid-template-columns:\s*1fr/s,
    'conversion module must stack on tablet and mobile',
  );
});

test('built CO2 detail page exposes SEO, schema and conversion contracts', async () => {
  const html = await readOrEmpty('../dist/catalogo/extintor-co2-portatil/index.html');

  assert.match(html, /<link rel="canonical" href="https:\/\/mantenimientodeextintores\.mx\/catalogo\/extintor-co2-portatil"/);
  assert.match(html, /<h1[^>]*>[^<]*Extintor CO₂ portátil/);
  assert.match(html, /"@type":"Product"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.doesNotMatch(html, /"offers"\s*:/);
  assert.doesNotMatch(html, /"price"\s*:/);
  assert.match(html, /id="solicitar-cotizacion"/);
  assert.match(html, /value="Extintor CO₂ portátil" selected/);
});
