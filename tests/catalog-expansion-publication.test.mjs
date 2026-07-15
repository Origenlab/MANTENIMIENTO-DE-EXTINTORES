import assert from 'node:assert/strict';
import test from 'node:test';

import { catalogProducts } from '../src/data/catalog-products.mjs';
import { catalogProductEditorial } from '../src/data/catalog-product-editorial.mjs';
import { catalogExpansionProposals } from '../src/data/catalog-expansion/index.mjs';
import { paginateCatalog } from '../src/lib/catalog-utils.mjs';
import {
  buildPublishedExpansionProducts,
  expansionEditorialProfiles,
  getExpansionRelationshipLinks,
} from '../src/data/catalog-expansion/publication.mjs';

test('publication adapter creates 230 quote-safe products from approved proposals', () => {
  const publishedProducts = buildPublishedExpansionProducts(catalogProducts);
  const parentById = new Map(catalogProducts.map((product) => [product.id, product]));

  assert.equal(publishedProducts.length, 230);
  assert.equal(new Set(publishedProducts.map(({ id }) => id)).size, 230);
  assert.equal(new Set(publishedProducts.map(({ productPageUrl }) => productPageUrl)).size, 230);

  for (const product of publishedProducts) {
    const proposal = catalogExpansionProposals.find(({ id }) => id === product.id);
    const parent = parentById.get(product.parentProductId);

    assert.ok(proposal, `missing proposal for ${product.id}`);
    assert.ok(parent, `missing parent for ${product.id}`);
    assert.equal(product.productPageUrl, `/catalogo/${proposal.slug}`);
    assert.equal(product.image, parent.image, `derived image must inherit parent for ${product.id}`);
    assert.match(product.imageAlt, /ilustrativa/i);
    assert.equal(product.availability, 'validacion-tecnica');
    assert.ok(product.priority > 1, `derived image must be lazy-loaded for ${product.id}`);
    assert.equal(product.technicalValidation, true);
    assert.equal('price' in product, false);
    assert.ok(product.sources.length >= 2, `sources missing for ${product.id}`);
    assert.ok(product.sources.every(({ url }) => /^https?:\/\//.test(url)), `invalid source in ${product.id}`);
  }
});

test('publication adapter creates complete editorial profiles for every derivative', () => {
  assert.equal(Object.keys(expansionEditorialProfiles).length, 230);

  for (const proposal of catalogExpansionProposals) {
    const editorial = expansionEditorialProfiles[proposal.id];

    assert.ok(editorial, `missing editorial profile for ${proposal.id}`);
    assert.equal(editorial.primaryKeyword, proposal.primaryKeyword);
    assert.equal(editorial.h1, proposal.h1);
    assert.equal(editorial.seoTitle, proposal.seoTitle);
    assert.equal(editorial.metaDescription, proposal.metaDescription);
    assert.equal(editorial.faqs.length, 8, `eight FAQs required for ${proposal.id}`);
    assert.ok(editorial.humanDescription.length >= 140, `description too short for ${proposal.id}`);
  }
});

test('publication relationships connect every matrix with five children and every child with its family', () => {
  for (const parent of catalogProducts) {
    const links = getExpansionRelationshipLinks(parent.id, catalogProducts);
    assert.equal(links.length, 5, `expected five child links for ${parent.id}`);
    assert.equal(new Set(links.map(({ url }) => url)).size, 5, `duplicate child links for ${parent.id}`);
  }

  for (const proposal of catalogExpansionProposals) {
    const links = getExpansionRelationshipLinks(proposal.id, catalogProducts);
    const parent = catalogProducts.find(({ id }) => id === proposal.parentId);

    assert.equal(links.length, 5, `expected parent plus four sibling links for ${proposal.id}`);
    assert.ok(links.some(({ url }) => url === parent.productPageUrl), `parent link missing for ${proposal.id}`);
    assert.equal(new Set(links.map(({ url }) => url)).size, 5, `duplicate family links for ${proposal.id}`);
  }
});

test('public catalog integrates 46 matrices and 230 derivatives', () => {
  const derivatives = catalogProducts.filter(({ parentProductId }) => parentProductId);
  const matrices = catalogProducts.filter(({ parentProductId }) => !parentProductId);
  const pagination = paginateCatalog(catalogProducts, 1, 12);

  assert.equal(catalogProducts.length, 276);
  assert.equal(matrices.length, 46);
  assert.equal(derivatives.length, 230);
  assert.equal(Object.keys(catalogProductEditorial).length, 276);
  assert.equal(new Set(catalogProducts.map(({ id }) => id)).size, 276);
  assert.equal(new Set(catalogProducts.map(({ productPageUrl }) => productPageUrl)).size, 276);
  assert.equal(pagination.pageCount, 23);
});
