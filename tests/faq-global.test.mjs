import assert from 'node:assert/strict';
import test from 'node:test';
import { buildFaqSchema, normalizeFaqQuestion, assertFaqCollection } from '../src/lib/faq-utils.mjs';

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
