const DEFAULT_BASE_URL = 'https://mantenimientodeextintores.mx';

export function normaliseSearch(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function filterCatalog(products, filters = {}) {
  const query = normaliseSearch(filters.query);
  const group = filters.group || 'all';
  const agent = filters.agent || 'all';
  const fireClass = filters.fireClass || 'all';
  const availability = filters.availability || 'all';

  return products.filter((product) => {
    if (group !== 'all' && product.group !== group) return false;
    if (agent !== 'all' && normaliseSearch(product.agent) !== normaliseSearch(agent)) return false;
    if (fireClass !== 'all' && !product.fireClasses.includes(fireClass)) return false;
    if (availability !== 'all' && product.availability !== availability) return false;
    if (!query) return true;

    const searchable = normaliseSearch([
      product.name,
      product.shortName,
      product.agent,
      product.description,
      ...product.variants,
      ...product.applications,
      ...product.sectors,
      ...product.fireClasses,
    ].join(' '));

    return searchable.includes(query);
  });
}

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
