import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { buildFaqSchema, normalizeFaqQuestion, assertFaqCollection } from '../src/lib/faq-utils.mjs';
import { siteFaqRoutes, siteFaqs, getSiteFaqs } from '../src/data/site-faqs.mjs';

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
