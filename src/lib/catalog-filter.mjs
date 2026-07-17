/**
 * Lógica de filtrado y paginación del catálogo. Fuente única de verdad.
 *
 * Antes existía por duplicado y divergente:
 *
 *   - `src/lib/catalog-utils.mjs` filtraba **objetos de producto**. Sólo la
 *     ejecutaban los tests.
 *   - `public/js/catalog-system.js` filtraba **nodos del DOM** leyendo
 *     `data-*`. Es la que corría en producción, y no la cubría ningún test.
 *
 * No eran un duplicado exacto sino dos algoritmos sobre datos distintos, así
 * que ninguna divergencia entre ambas podía detectarse. Esa es la razón de
 * fondo por la que la suite pasaba en verde con cuatro defectos en vivo
 * (auditoría 2026-07-16).
 *
 * Ahora las dos capas normalizan su entrada a un `record` y comparten estas
 * funciones, que son puras y por tanto testeables sin DOM.
 */

/** Filtros neutros: todo pasa. */
export const NEUTRAL_FILTERS = Object.freeze({
  query: '',
  group: 'all',
  agent: 'all',
  fireClass: 'all',
  availability: 'all',
});

export const CATALOG_PAGE_SIZE = 12;

/** Minúsculas sin acentos, para comparar texto escrito por personas. */
export function normaliseSearch(value = '') {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * ¿El registro pasa los filtros? `record` es la forma común entre una tarjeta
 * del DOM y un producto de `catalog-products.mjs`:
 *
 *   { group, agent, fireClasses: string[], availability, search }
 */
export function matchesCatalogFilters(record, filters = {}) {
  const { group, agent, fireClass, availability } = { ...NEUTRAL_FILTERS, ...filters };
  const query = normaliseSearch(filters.query);

  if (group !== 'all' && record.group !== group) return false;
  if (agent !== 'all' && normaliseSearch(record.agent) !== normaliseSearch(agent)) return false;
  if (fireClass !== 'all' && !(record.fireClasses || []).includes(fireClass)) return false;
  if (availability !== 'all' && record.availability !== availability) return false;
  if (query && !normaliseSearch(record.search).includes(query)) return false;

  return true;
}

/** Texto indexable de un producto, en el mismo orden que emite CatalogCard. */
export function buildSearchIndex(product) {
  return [
    product.name,
    product.shortName,
    product.agent,
    product.description,
    ...(product.variants || []),
    ...(product.applications || []),
    ...(product.sectors || []),
    ...(product.fireClasses || []),
  ].filter(Boolean).join(' ');
}

/** Convierte un producto en el `record` que entiende `matchesCatalogFilters`. */
export function toFilterRecord(product) {
  return {
    group: product.group,
    agent: product.agent,
    fireClasses: product.fireClasses || [],
    availability: product.availability,
    search: buildSearchIndex(product),
  };
}

/**
 * Aritmética de paginación. Devuelve la página saneada y los índices de corte;
 * quien llama decide si corta un array o muestra nodos.
 */
export function paginate(total, requestedPage = 1, pageSize = CATALOG_PAGE_SIZE) {
  const safePageSize = Math.max(1, Number.parseInt(pageSize, 10) || CATALOG_PAGE_SIZE);
  const safeTotal = Math.max(0, Number(total) || 0);
  const pageCount = safeTotal ? Math.ceil(safeTotal / safePageSize) : 0;
  const parsedPage = Math.max(1, Number.parseInt(requestedPage, 10) || 1);
  const page = pageCount ? Math.min(parsedPage, pageCount) : 1;
  const startIndex = (page - 1) * safePageSize;
  const visible = safeTotal ? Math.min(safePageSize, safeTotal - startIndex) : 0;

  return {
    page,
    pageCount,
    pageSize: safePageSize,
    total: safeTotal,
    startIndex,
    endIndex: startIndex + visible,
    start: safeTotal ? startIndex + 1 : 0,
    end: safeTotal ? startIndex + visible : 0,
  };
}

/** Números y elipsis de la paginación: 1 … 4 5 6 … 23 */
export function buildPaginationItems(page, pageCount) {
  if (pageCount <= 7) {
    return Array.from({ length: Math.max(0, pageCount) }, (_, index) => index + 1);
  }

  const pages = [1, pageCount, page - 1, page, page + 1]
    .filter((value) => value >= 1 && value <= pageCount)
    .filter((value, index, values) => values.indexOf(value) === index)
    .sort((a, b) => a - b);

  const items = [];
  pages.forEach((value, index) => {
    if (index > 0 && value - pages[index - 1] > 1) items.push(`ellipsis-${index}`);
    items.push(value);
  });

  return items;
}
