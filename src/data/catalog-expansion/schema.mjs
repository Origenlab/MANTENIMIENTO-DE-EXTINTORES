import { capitalize, endSentence, inline } from '../../lib/text-utils.mjs';
import { CATALOG_GROUP_IDS, FIRE_CLASS_IDS } from '../catalog-taxonomy.mjs';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const allowedStatuses = new Set(['research', 'validated', 'approved', 'rejected']);
const allowedPriorities = new Set(['alta', 'media', 'especialidad']);

const requiredStrings = [
  'id', 'parentId', 'group', 'name', 'shortName', 'slug',
  'differentiationType', 'need', 'valueProposition', 'primaryKeyword',
  'searchIntent', 'h1', 'seoTitle', 'metaDescription', 'cardAnchor',
  'quoteProduct', 'status', 'priority', 'sourceReviewedAt',
];

const requiredArrays = [
  'fireClasses', 'variants', 'applications', 'sectors', 'limitations',
  'primarySources', 'normativeSources',
];

function assertHttpUrl(value, field, id) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new TypeError(`${field} contains an invalid URL in ${id}`);
  }

  if (!['https:', 'http:'].includes(parsed.protocol)) {
    throw new TypeError(`${field} must use HTTP(S) in ${id}`);
  }
}

export function validateExpansionProposal(proposal) {
  if (!proposal || typeof proposal !== 'object' || Array.isArray(proposal)) {
    throw new TypeError('catalog expansion proposal must be an object');
  }

  for (const field of requiredStrings) {
    if (typeof proposal[field] !== 'string' || proposal[field].trim().length === 0) {
      throw new TypeError(`${field} must be a non-empty string in ${proposal.id || 'unknown proposal'}`);
    }
  }

  for (const field of requiredArrays) {
    if (!Array.isArray(proposal[field])) {
      throw new TypeError(`${field} must be an array in ${proposal.id}`);
    }
    // Validar sólo la longitud dejaba pasar `[undefined]`, que llegó a
    // imprimirse como la cadena "undefined" en el HTML y el JSON-LD de
    // /catalogo/carro-para-extintor-clase-d (auditoría 2026-07-16).
    const hollow = proposal[field].findIndex((item) => item === undefined || item === null || String(item).trim().length === 0);
    if (hollow !== -1) {
      throw new TypeError(`${field}[${hollow}] is empty in ${proposal.id}`);
    }
  }

  if (!slugPattern.test(proposal.id) || !slugPattern.test(proposal.slug)) {
    throw new TypeError(`id and slug must use lowercase ASCII kebab-case in ${proposal.id}`);
  }
  // `group` y `fireClasses` se exigían presentes pero nunca se cotejaban contra
  // la taxonomía: `group: 'inventado'` o `fireClasses: ['Z']` pasaban y sólo se
  // notaban en el catálogo ya publicado (auditoría 2026-07-16).
  if (!CATALOG_GROUP_IDS.has(proposal.group)) {
    throw new TypeError(`unknown group "${proposal.group}" in ${proposal.id}`);
  }
  const strayClass = proposal.fireClasses.find((fireClass) => !FIRE_CLASS_IDS.has(fireClass));
  if (strayClass) {
    throw new TypeError(`unknown fire class "${strayClass}" in ${proposal.id}`);
  }
  if (proposal.seoTitle.length > 60) {
    throw new RangeError(`seoTitle exceeds 60 characters in ${proposal.id}`);
  }
  if (proposal.metaDescription.length < 120 || proposal.metaDescription.length > 160) {
    throw new RangeError(`metaDescription must contain 120–160 characters in ${proposal.id}`);
  }
  if (!allowedStatuses.has(proposal.status)) {
    throw new TypeError(`unsupported status in ${proposal.id}`);
  }
  if (!allowedPriorities.has(proposal.priority)) {
    throw new TypeError(`unsupported priority in ${proposal.id}`);
  }
  if (proposal.primarySources.length === 0) {
    throw new TypeError(`primarySources cannot be empty in ${proposal.id}`);
  }
  if (proposal.limitations.length === 0) {
    throw new TypeError(`limitations cannot be empty in ${proposal.id}`);
  }

  for (const url of [...proposal.primarySources, ...proposal.normativeSources]) {
    assertHttpUrl(url, 'source URL', proposal.id);
  }

  return proposal;
}

const defaultNormativeSources = [
  'https://dof.gob.mx/normasOficiales/4228/stps/stps.htm',
  'https://www.dof.gob.mx/normasOficiales/791/NOM-154-SCFI-2005/NOM-154-SCFI-2005.htm',
];

function buildMetaDescription(shortName, selection) {
  const compactName = inline(shortName.replace(/^Extintor(?: de)?\s+/i, ''));
  const compactSelection = selection.length <= 48 ? selection : 'capacidad, compatibilidad y aplicación';
  let description = `Cotiza ${compactName} con MANEXT. Validamos ${inline(compactSelection)} para preparar una propuesta técnica empresarial en CDMX.`;

  if (description.length > 160) {
    description = `Cotiza ${compactName} con MANEXT. Confirmamos capacidad y aplicación para integrar una propuesta técnica con suministro y servicio en CDMX.`;
  }
  if (description.length > 160) {
    description = `Cotiza ${compactName} con MANEXT. Confirmamos capacidad y aplicación para integrar una propuesta técnica con servicio en CDMX.`;
  }
  if (description.length < 120) {
    description += ' Atención especializada.';
  }

  return description;
}

export function createProposalSeries({
  parentId,
  group,
  agentOrMaterial = '',
  fireClasses = [],
  source,
  priority = 'media',
  items,
}) {
  if (!Array.isArray(items) || items.length !== 5) {
    throw new RangeError(`exactly five proposal items are required for ${parentId}`);
  }

  return items.map((item) => {
    const shortName = item.shortName || item.name;
    const primaryKeyword = item.keyword || item.name;
    const selection = item.selection || 'capacidad, compatibilidad y aplicación';
    const seoTitle = item.seoTitle || `${capitalize(primaryKeyword)} | MANEXT`;

    return Object.freeze({
      id: `${parentId}-${item.key}`,
      parentId,
      group,
      name: item.name,
      shortName,
      slug: item.slug,
      canonical: `https://mantenimientodeextintores.mx/catalogo/${item.slug}`,
      differentiationType: item.type,
      agentOrMaterial: item.agentOrMaterial || agentOrMaterial,
      fireClasses: item.fireClasses || fireClasses,
      variants: [item.variant],
      applications: [item.application],
      sectors: [item.sector],
      need: item.need,
      valueProposition: item.value,
      selection,
      limitations: [item.limitation],
      primaryKeyword,
      secondaryKeywords: item.secondaryKeywords || [],
      searchIntent: item.intent || `El comprador busca ${inline(primaryKeyword)} porque ${endSentence(inline(item.need))} Necesita comparar ${inline(selection)} antes de solicitar una cotización.`,
      h1: item.h1 || item.name,
      seoTitle,
      metaDescription: item.metaDescription || buildMetaDescription(shortName, selection),
      cardAnchor: item.cardAnchor || item.name,
      quoteProduct: item.name,
      quoteVariant: item.quoteVariant || item.variant,
      primarySources: item.primarySources || [source],
      normativeSources: item.normativeSources || defaultNormativeSources,
      sourceReviewedAt: '2026-07-15',
      status: item.status || 'validated',
      priority: item.priority || priority,
      technicalValidation: item.technicalValidation ?? true,
      editorialValidation: false,
      notes: item.notes || 'Propuesta validada como concepto comercial; disponibilidad, marca y modelo se confirman antes de publicar.',
    });
  });
}
