import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { buildFaqSchema, normalizeFaqQuestion, assertFaqCollection } from '../src/lib/faq-utils.mjs';
import { siteFaqRoutes, siteFaqs, getSiteFaqs } from '../src/data/site-faqs.mjs';
import { catalogProductDetails } from '../src/data/catalog-product-details.mjs';

const validFaqs = Array.from({ length: 8 }, (_, index) => ({
  question: `¿Pregunta contextual número ${index + 1}?`,
  answer: `Respuesta verificable número ${index + 1} con información suficiente para orientar una cotización responsable.`,
}));

test('normalizeFaqQuestion removes accents, case and duplicate whitespace', () => {
  assert.equal(normalizeFaqQuestion('  ¿QUÉ   capacidad necesito?  '), '¿que capacidad necesito?');
});

test('assertFaqCollection accepts eight complete unique questions', () => {
  assert.doesNotThrow(() => assertFaqCollection('/prueba', validFaqs));
});

test('assertFaqCollection rejects fewer than eight questions', () => {
  assert.throws(() => assertFaqCollection('/prueba', validFaqs.slice(0, 7)), /at least 8/i);
});

test('assertFaqCollection rejects normalized duplicates', () => {
  const duplicated = [
    ...validFaqs.slice(0, 7),
    { question: '¿PREGUNTA CONTEXTUAL NÚMERO 1?', answer: 'Respuesta distinta pero duplicada por pregunta.' },
  ];
  assert.throws(() => assertFaqCollection('/prueba', duplicated), /duplicate/i);
});

test('buildFaqSchema maps the visible collection without adding commercial data', () => {
  const schema = buildFaqSchema(validFaqs);
  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@type'], 'FAQPage');
  assert.equal(schema.mainEntity.length, 8);
  assert.deepEqual(schema.mainEntity[0], {
    '@type': 'Question',
    name: validFaqs[0].question,
    acceptedAnswer: { '@type': 'Answer', text: validFaqs[0].answer },
  });
  assert.doesNotMatch(JSON.stringify(schema), /offers|price|aggregateRating|stock/i);
});

test('FaqList uses semantic details and escaped Astro interpolation', async () => {
  const source = await readFile(new URL('../src/components/FaqList.astro', import.meta.url), 'utf8');
  assert.match(source, /<details/);
  assert.match(source, /<summary/);
  assert.match(source, /\{faq\.question\}/);
  assert.match(source, /\{faq\.answer\}/);
  assert.doesNotMatch(source, /set:html|innerHTML|transition|animation/);
});

test('shared FAQ components accept the immutable registry contract', async () => {
  const faqList = await readFile(new URL('../src/components/FaqList.astro', import.meta.url), 'utf8');
  const quoteModule = await readFile(new URL('../src/components/catalog/FaqQuoteModule.astro', import.meta.url), 'utf8');

  assert.match(faqList, /faqs:\s*readonly FAQ\[\]/);
  assert.match(quoteModule, /faqs:\s*readonly FAQ\[\]/);
});

test('legacy catalog styles never target every summary span in shared FAQs', async () => {
  for (const file of ['catalog-system.css', 'catalog-product-detail.css']) {
    const css = await readFile(new URL(`../public/css/${file}`, import.meta.url), 'utf8');
    assert.doesNotMatch(css, /(?:faq-quote__list|product-detail__faqs)\s+summary\s+span\s*\{/);
    assert.doesNotMatch(css, /(?:faq-quote__list|product-detail__faqs)\s+details\[open\]\s+summary\s+span\s*\{/);
  }
});

test('shared layout loads the FAQ stylesheet once', async () => {
  const source = await readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
  assert.equal((source.match(/\/css\/faq-system\.css\?v=1/g) || []).length, 1);
});

const expectedSiteFaqRoutes = [
  '/',
  '/agentes-limpios',
  '/agua-presion',
  '/capacitacion-brigadas',
  '/catalogo',
  '/co2',
  '/contacto',
  '/espuma-afff',
  '/extintores',
  '/mantenimiento-preventivo',
  '/nosotros',
  '/polvo-quimico-seco',
  '/prueba-hidrostatica',
  '/recarga-de-extintores',
  '/sectores/data-centers',
  '/sectores/hospitales',
  '/sectores/restaurantes',
  '/senalizacion',
  '/servicios',
  '/tipo-k',
  '/venta-de-extintores',
];

test('site FAQ registry covers every existing static FAQ route', () => {
  assert.deepEqual([...siteFaqRoutes].sort(), expectedSiteFaqRoutes.sort());
});

test('every static FAQ route has at least eight complete unique questions', () => {
  for (const route of siteFaqRoutes) {
    assert.equal(getSiteFaqs(route), siteFaqs[route]);
    assert.doesNotThrow(() => assertFaqCollection(route, siteFaqs[route]));
  }
});

test('unknown site FAQ routes fail loudly', () => {
  assert.throws(() => getSiteFaqs('/ruta-inexistente'), /Missing FAQ collection/);
});

test('catalog page consumes the central FAQ collection and schema helper', async () => {
  const source = await readFile(new URL('../src/pages/catalogo.astro', import.meta.url), 'utf8');
  assert.match(source, /getSiteFaqs\(['"]\/catalogo['"]\)/);
  assert.match(source, /JSON\.stringify\(buildFaqSchema\(faqs\)\)/);
  assert.doesNotMatch(source, /const faqs\s*=\s*\[/);
});

test('all 276 catalog product details expose at least eight unique FAQs', () => {
  assert.equal(catalogProductDetails.length, 276);
  for (const product of catalogProductDetails) {
    assert.doesNotThrow(() => assertFaqCollection(`/catalogo/${product.slug}`, product.faqs));
  }
});

test('product detail template uses the shared FAQ renderer and schema helper', async () => {
  const source = await readFile(new URL('../src/components/catalog/ProductDetailTemplate.astro', import.meta.url), 'utf8');
  assert.match(source, /<FaqList\s+faqs=\{product\.faqs\}/);
  assert.match(source, /buildFaqSchema\(product\.faqs\)/);
  assert.doesNotMatch(source, /product\.faqs\.map/);
});

const commercialFaqPages = {
  'agentes-limpios.astro': '/agentes-limpios',
  'agua-presion.astro': '/agua-presion',
  'capacitacion-brigadas.astro': '/capacitacion-brigadas',
  'co2.astro': '/co2',
  'espuma-afff.astro': '/espuma-afff',
  'extintores.astro': '/extintores',
  'mantenimiento-preventivo.astro': '/mantenimiento-preventivo',
  'polvo-quimico-seco.astro': '/polvo-quimico-seco',
  'prueba-hidrostatica.astro': '/prueba-hidrostatica',
  'recarga-de-extintores.astro': '/recarga-de-extintores',
  'senalizacion.astro': '/senalizacion',
  'servicios.astro': '/servicios',
  'tipo-k.astro': '/tipo-k',
  'venta-de-extintores.astro': '/venta-de-extintores',
};

test('commercial and service pages consume central FAQ data and component', async () => {
  for (const [file, route] of Object.entries(commercialFaqPages)) {
    const source = await readFile(new URL(`../src/pages/${file}`, import.meta.url), 'utf8');
    assert.match(source, new RegExp(`getSiteFaqs\\(['"]${route.replaceAll('/', '\\/')}['"]\\)`));
    assert.match(source, /JSON\.stringify\(buildFaqSchema\(faqs\)\)/);
    assert.match(source, /<FaqList\s+faqs=\{faqs\}/);
    assert.doesNotMatch(source, /const faqs\s*=\s*\[/);
    assert.doesNotMatch(source, /document\.querySelectorAll\(['"]\.faq-question/);
  }
});

const institutionalFaqPages = {
  'index.astro': '/',
  'contacto.astro': '/contacto',
  'nosotros.astro': '/nosotros',
  'sectores/data-centers.astro': '/sectores/data-centers',
  'sectores/hospitales.astro': '/sectores/hospitales',
  'sectores/restaurantes.astro': '/sectores/restaurantes',
};

test('institutional and sector pages consume central FAQ data and component', async () => {
  for (const [file, route] of Object.entries(institutionalFaqPages)) {
    const source = await readFile(new URL(`../src/pages/${file}`, import.meta.url), 'utf8');
    assert.match(source, new RegExp(`getSiteFaqs\\(['"]${route.replaceAll('/', '\\/')}['"]\\)`));
    assert.match(source, /JSON\.stringify\(buildFaqSchema\(faqs\)\)/);
    assert.match(source, /<FaqList\s+faqs=\{faqs\}/);
    assert.doesNotMatch(source, /const faqs\s*=\s*\[/);
    assert.doesNotMatch(source, /document\.querySelectorAll\(['"]\.faq-question/);
  }
});

function htmlPathForRoute(route) {
  return route === '/'
    ? new URL('../dist/index.html', import.meta.url)
    : new URL(`../dist${route}/index.html`, import.meta.url);
}

function faqSchemasFromHtml(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]))
    .filter((schema) => schema['@type'] === 'FAQPage');
}

test('all 21 static FAQ pages render eight visible items and one matching schema', async () => {
  for (const route of siteFaqRoutes) {
    const html = await readFile(htmlPathForRoute(route), 'utf8');
    const visibleCount = (html.match(/class="site-faq-list__item"/g) || []).length;
    const schemas = faqSchemasFromHtml(html);
    assert.ok(visibleCount >= 8, `${route} renders ${visibleCount} visible FAQs`);
    assert.equal(schemas.length, 1, `${route} must render one FAQPage schema`);
    assert.equal(schemas[0].mainEntity.length, visibleCount, `${route} schema and visible FAQ counts differ`);
  }
});

test('all 276 catalog detail pages render eight visible items and matching schema', async () => {
  for (const product of catalogProductDetails) {
    const route = `/catalogo/${product.slug}`;
    const html = await readFile(htmlPathForRoute(route), 'utf8');
    const visibleCount = (html.match(/class="site-faq-list__item"/g) || []).length;
    const schemas = faqSchemasFromHtml(html);
    assert.ok(visibleCount >= 8, `${route} renders ${visibleCount} visible FAQs`);
    assert.equal(schemas.length, 1, `${route} must render one FAQPage schema`);
    assert.equal(schemas[0].mainEntity.length, visibleCount, `${route} schema and visible FAQ counts differ`);
  }
});
