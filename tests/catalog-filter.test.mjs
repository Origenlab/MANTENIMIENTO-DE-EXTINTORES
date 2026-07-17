import test from 'node:test';
import assert from 'node:assert/strict';

import {
  CATALOG_PAGE_SIZE,
  buildPaginationItems,
  buildSearchIndex,
  matchesCatalogFilters,
  normaliseSearch,
  paginate,
  toFilterRecord,
} from '../src/lib/catalog-filter.mjs';
import { catalogProducts } from '../src/data/catalog-products.mjs';
import { filterCatalog, paginateCatalog } from '../src/lib/catalog-utils.mjs';

/**
 * Cobertura de la lógica que **sí ejecuta producción**.
 *
 * Hasta la auditoría 2026-07-16 esto no existía: los tests cubrían
 * `catalog-utils.mjs`, que sólo ellos ejecutaban, mientras el catálogo real
 * corría una segunda implementación en `public/js/catalog-system.js` que nadie
 * probaba. Ahora ambas capas comparten `catalog-filter.mjs` y esto lo cubre.
 */

// ---------------------------------------------------------------------------
// normaliseSearch
// ---------------------------------------------------------------------------

test('normaliseSearch ignora acentos, caja y espacios sobrantes', () => {
  assert.equal(normaliseSearch('  Señalización  '), 'senalizacion');
  assert.equal(normaliseSearch('EXTINTOR ÁCIDO'), 'extintor acido');
  assert.equal(normaliseSearch(''), '');
  assert.equal(normaliseSearch(undefined), '');
  assert.equal(normaliseSearch(null), '');
});

test('normaliseSearch conserva los subíndices que distinguen productos', () => {
  // "CO₂" no debe colapsar a "co2": son cadenas distintas en el índice.
  assert.equal(normaliseSearch('CO₂'), 'co₂');
});

// ---------------------------------------------------------------------------
// matchesCatalogFilters — el predicado que corre en el navegador
// ---------------------------------------------------------------------------

const record = {
  group: 'portatiles',
  agent: 'Polvo químico seco ABC',
  fireClasses: ['A', 'B', 'C'],
  availability: 'entrega-rapida',
  search: 'extintor pqs abc 6 kg oficinas comercios',
};

test('sin filtros, todo pasa', () => {
  assert.equal(matchesCatalogFilters(record, {}), true);
  assert.equal(matchesCatalogFilters(record, { group: 'all', agent: 'all', fireClass: 'all', availability: 'all', query: '' }), true);
});

test('cada filtro descarta por separado', () => {
  assert.equal(matchesCatalogFilters(record, { group: 'refacciones' }), false);
  assert.equal(matchesCatalogFilters(record, { agent: 'Dióxido de carbono' }), false);
  assert.equal(matchesCatalogFilters(record, { fireClass: 'K' }), false);
  assert.equal(matchesCatalogFilters(record, { availability: 'bajo-pedido' }), false);
  assert.equal(matchesCatalogFilters(record, { query: 'cocina' }), false);
});

test('cada filtro acepta cuando corresponde', () => {
  assert.equal(matchesCatalogFilters(record, { group: 'portatiles' }), true);
  assert.equal(matchesCatalogFilters(record, { fireClass: 'B' }), true);
  assert.equal(matchesCatalogFilters(record, { availability: 'entrega-rapida' }), true);
  assert.equal(matchesCatalogFilters(record, { query: 'oficinas' }), true);
});

test('el agente se compara sin acentos ni caja', () => {
  assert.equal(matchesCatalogFilters(record, { agent: 'POLVO QUIMICO SECO ABC' }), true);
});

test('la búsqueda ignora acentos escritos por el usuario', () => {
  const withAccents = { ...record, search: 'extintor para señalización' };
  assert.equal(matchesCatalogFilters(withAccents, { query: 'senalizacion' }), true);
  assert.equal(matchesCatalogFilters(withAccents, { query: 'señalización' }), true);
});

test('los filtros se acumulan', () => {
  assert.equal(matchesCatalogFilters(record, { group: 'portatiles', fireClass: 'A', query: 'pqs' }), true);
  assert.equal(matchesCatalogFilters(record, { group: 'portatiles', fireClass: 'K', query: 'pqs' }), false);
});

test('un registro sin clases de fuego no revienta el filtro', () => {
  // Accesorios y refacciones: 102 de los 276 productos.
  const accessory = { group: 'accesorios', agent: 'Acero', fireClasses: [], availability: 'bajo-pedido', search: 'gabinete' };
  assert.equal(matchesCatalogFilters(accessory, {}), true);
  assert.equal(matchesCatalogFilters(accessory, { fireClass: 'A' }), false);
  assert.equal(matchesCatalogFilters({ ...accessory, fireClasses: undefined }, {}), true);
});

// ---------------------------------------------------------------------------
// paginate
// ---------------------------------------------------------------------------

test('paginate reparte el total en páginas', () => {
  const first = paginate(276, 1, 12);
  assert.equal(first.pageCount, 23);
  assert.equal(first.startIndex, 0);
  assert.equal(first.endIndex, 12);
  assert.equal(first.start, 1);
  assert.equal(first.end, 12);
});

test('paginate satura la página pedida dentro del rango', () => {
  assert.equal(paginate(276, 999, 12).page, 23);
  assert.equal(paginate(276, -5, 12).page, 1);
  assert.equal(paginate(276, 'abc', 12).page, 1);
});

test('la última página no desborda el total', () => {
  const last = paginate(25, 3, 12);
  assert.equal(last.startIndex, 24);
  assert.equal(last.endIndex, 25);
  assert.equal(last.end, 25);
});

test('sin resultados no hay páginas', () => {
  const empty = paginate(0, 1, 12);
  assert.equal(empty.pageCount, 0);
  assert.equal(empty.page, 1);
  assert.equal(empty.start, 0);
  assert.equal(empty.end, 0);
});

test('el tamaño de página tiene un valor por defecto compartido', () => {
  assert.equal(CATALOG_PAGE_SIZE, 12);
  assert.equal(paginate(30).pageSize, 12);
  assert.equal(paginate(30, 1, 0).pageSize, 12, 'un tamaño inválido cae al de por defecto');
});

// ---------------------------------------------------------------------------
// buildPaginationItems
// ---------------------------------------------------------------------------

test('con pocas páginas se listan todas', () => {
  assert.deepEqual(buildPaginationItems(1, 5), [1, 2, 3, 4, 5]);
  assert.deepEqual(buildPaginationItems(1, 0), []);
});

test('con muchas páginas aparecen elipsis alrededor de la actual', () => {
  const items = buildPaginationItems(12, 23);
  assert.equal(items[0], 1);
  assert.equal(items[items.length - 1], 23);
  assert.ok(items.includes(12), 'debe incluir la página actual');
  assert.ok(items.some((item) => typeof item === 'string' && item.startsWith('ellipsis')));
});

test('en los extremos no se inventan elipsis pegadas', () => {
  const first = buildPaginationItems(1, 23);
  assert.deepEqual(first.slice(0, 2), [1, 2], 'tras la 1 va la 2, sin elipsis');
});

// ---------------------------------------------------------------------------
// Coherencia entre las dos capas
// ---------------------------------------------------------------------------

test('toFilterRecord expone lo que el catálogo indexa en la tarjeta', () => {
  const product = catalogProducts.find((item) => item.id === 'pqs-abc-portatil');
  const mapped = toFilterRecord(product);

  assert.equal(mapped.group, product.group);
  assert.equal(mapped.agent, product.agent);
  assert.deepEqual(mapped.fireClasses, product.fireClasses);
  assert.equal(mapped.availability, product.availability);
  assert.ok(mapped.search.includes(product.name));
  assert.ok(buildSearchIndex(product).includes(product.description));
});

test('filterCatalog delega en el mismo predicado que el navegador', () => {
  const filters = { group: 'portatiles', fireClass: 'A' };
  const viaUtils = filterCatalog(catalogProducts, filters).map((product) => product.id);
  const viaPredicate = catalogProducts
    .filter((product) => matchesCatalogFilters(toFilterRecord(product), filters))
    .map((product) => product.id);

  assert.deepEqual(viaUtils, viaPredicate);
  assert.ok(viaUtils.length > 0, 'el caso de prueba debe encontrar algo');
});

test('paginateCatalog usa la misma aritmética que el navegador', () => {
  const result = paginateCatalog(catalogProducts, 2, 12);
  const maths = paginate(catalogProducts.length, 2, 12);

  assert.equal(result.page, maths.page);
  assert.equal(result.pageCount, maths.pageCount);
  assert.equal(result.start, maths.start);
  assert.equal(result.end, maths.end);
  assert.equal(result.items.length, maths.endIndex - maths.startIndex);
  assert.equal(result.items[0].id, catalogProducts[maths.startIndex].id);
});
