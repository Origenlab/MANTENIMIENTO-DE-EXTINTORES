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
  }

  if (!slugPattern.test(proposal.id) || !slugPattern.test(proposal.slug)) {
    throw new TypeError(`id and slug must use lowercase ASCII kebab-case in ${proposal.id}`);
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

