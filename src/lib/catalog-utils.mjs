import { SITE_URL } from '../config/business.mjs';
import {
  CATALOG_PAGE_SIZE,
  matchesCatalogFilters,
  normaliseSearch,
  paginate,
  toFilterRecord,
} from './catalog-filter.mjs';

const DEFAULT_BASE_URL = SITE_URL;

export { normaliseSearch };

/**
 * Filtra productos con el mismo predicado que usa el cat\u00e1logo en cliente
 * (`src/scripts/catalog-system.js`). Antes cada capa ten\u00eda el suyo y s\u00f3lo \u00e9sta
 * estaba testeada; ver la nota de `catalog-filter.mjs`.
 */
export function filterCatalog(products, filters = {}) {
  return products.filter((product) => matchesCatalogFilters(toFilterRecord(product), filters));
}

/** Pagina un array con la misma aritm\u00e9tica que el cat\u00e1logo en cliente. */
export function paginateCatalog(items, requestedPage = 1, pageSize = CATALOG_PAGE_SIZE) {
  const list = Array.isArray(items) ? items : [];
  const page = paginate(list.length, requestedPage, pageSize);

  return {
    items: list.slice(page.startIndex, page.endIndex),
    page: page.page,
    pageSize: page.pageSize,
    pageCount: page.pageCount,
    total: page.total,
    start: page.start,
    end: page.end,
  };
}

/**
 * Opciones del selector de producto en la ficha de detalle.
 *
 * Antes se serializaban los 276 productos en cada una de las 276 fichas: 25.3 KB
 * de `<option>` por página, 6.8 MB en total — el 32% del HTML del catálogo — en
 * un desplegable que casi nadie abre, porque la ficha ya llega con su producto
 * preseleccionado.
 *
 * Se reduce a la familia: el producto de la ficha, su padre y sus hermanos. Es
 * el único salto que tiene sentido desde aquí (de un PQS de 6 kg al de 9 kg);
 * para cambiar de familia está el catálogo. Si el visitante llega con otro
 * producto en mente, `ensureProductOption()` de catalog-system.js lo añade en
 * cliente, así que no se pierde ninguna ruta.
 */
export function buildQuoteProductOptions(products, currentId) {
  const current = products.find((product) => product.id === currentId);
  if (!current) return products;

  const familyId = current.parentProductId || current.id;
  const family = products.filter(
    (product) => product.id === familyId || product.parentProductId === familyId,
  );

  return family.length ? family : [current];
}

const quoteLabels = [
  ['product', 'Producto o familia'],
  ['variant', 'Capacidad o variante'],
  ['quantity', 'Cantidad'],
  ['sector', 'Sector o inmueble'],
  ['location', 'Ubicación'],
  ['services', 'Servicios adicionales'],
  ['name', 'Nombre'],
  ['company', 'Empresa'],
  ['phone', 'Teléfono o WhatsApp'],
  ['email', 'Correo'],
  ['details', 'Detalle del riesgo'],
];

export function buildQuoteMessage(fields = {}) {
  const lines = ['Hola, solicito una cotización desde el catálogo MANEXT.', ''];

  for (const [key, label] of quoteLabels) {
    const value = Array.isArray(fields[key]) ? fields[key].filter(Boolean).join(', ') : fields[key];
    if (String(value || '').trim()) lines.push(`${label}: ${String(value).trim()}`);
  }

  lines.push('', 'Agradezco su asesoría técnica para confirmar la selección.');
  return lines.join('\n');
}

/**
 * URL canónica de un producto dentro del ItemList.
 *
 * Debe coincidir con el `canonical` que declara la propia página del producto
 * (catalog-product-details.mjs), o el ItemList vuelve a emitir una señal
 * contradictoria. De ahí el mismo orden de preferencia: la landing de servicio
 * cuando existe —los 7 productos con `detailUrl`— y la ficha en los demás.
 *
 * Antes esta función ignoraba `productPageUrl` y caía a `/catalogo/#id`: 269 de
 * 276 productos declaraban un fragmento de la página índice en vez de su propia
 * ficha, que existía. El ancla queda como último recurso defensivo; con
 * `productPageUrl` presente en los 276, hoy es inalcanzable.
 */
function resolveProductUrl(product, baseUrl) {
  const path = product.detailUrl || product.productPageUrl;
  return path ? `${baseUrl}${path}` : `${baseUrl}/catalogo#${product.id}`;
}

export function buildCatalogSchema(products, baseUrl = DEFAULT_BASE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Catálogo profesional de extintores MANEXT',
    description: 'Extintores portátiles, industriales, automáticos, accesorios y refacciones disponibles mediante cotización.',
    url: `${baseUrl}/catalogo`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: `${baseUrl}${product.image}`,
        category: product.group,
        url: resolveProductUrl(product, baseUrl),
      },
    })),
  };
}
