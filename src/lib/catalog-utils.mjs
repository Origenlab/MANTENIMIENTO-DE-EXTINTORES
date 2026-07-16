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
 * `productPageUrl` apunta a la ficha propia (/catalogo/<slug>), que existe para
 * los 276 productos. `detailUrl` apunta a la landing de servicio, que sólo
 * cubre 7 productos y cuyo canonical no coincide con el de la ficha: usarlo
 * aquí emitía una señal contradictoria. El ancla queda como último recurso
 * defensivo; en el catálogo actual es inalcanzable.
 */
function resolveProductUrl(product, baseUrl) {
  const path = product.productPageUrl || product.detailUrl;
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
