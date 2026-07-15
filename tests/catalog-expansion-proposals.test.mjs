import assert from 'node:assert/strict';
import test from 'node:test';
import { catalogProducts } from '../src/data/catalog-products.mjs';
import {
  catalogExpansionByParent,
  catalogExpansionProposals,
} from '../src/data/catalog-expansion/index.mjs';

const requiredStrings = [
  'id', 'parentId', 'group', 'name', 'shortName', 'slug',
  'differentiationType', 'need', 'valueProposition', 'primaryKeyword',
  'searchIntent', 'h1', 'seoTitle', 'metaDescription', 'cardAnchor',
  'quoteProduct', 'status', 'priority', 'sourceReviewedAt',
];

test('expansion blueprint contains 230 complete product proposals', () => {
  assert.equal(catalogExpansionProposals.length, 230);

  for (const proposal of catalogExpansionProposals) {
    for (const field of requiredStrings) {
      assert.equal(typeof proposal[field], 'string', `${field} missing in ${proposal.id}`);
      assert.ok(proposal[field].trim().length > 0, `${field} empty in ${proposal.id}`);
    }

    assert.ok(proposal.primarySources.length >= 1, `primary source missing in ${proposal.id}`);
    assert.ok(proposal.limitations.length >= 1, `limitation missing in ${proposal.id}`);
  }
});

test('proposal identifiers and SEO targets are globally unique', () => {
  const ids = catalogExpansionProposals.map(({ id }) => id);
  const slugs = catalogExpansionProposals.map(({ slug }) => slug);
  const keywords = catalogExpansionProposals.map(({ primaryKeyword }) => primaryKeyword);
  const seoTitles = catalogExpansionProposals.map(({ seoTitle }) => seoTitle);

  assert.equal(new Set(ids).size, 230, 'proposal ids must be unique');
  assert.equal(new Set(slugs).size, 230, 'proposal slugs must be unique');
  assert.equal(new Set(keywords).size, 230, 'primary keywords must be unique');
  assert.equal(new Set(seoTitles).size, 230, 'SEO titles must be unique');
});

test('every existing catalog family receives exactly five proposals', () => {
  for (const parent of catalogProducts) {
    assert.equal(
      catalogExpansionByParent.get(parent.id)?.length,
      5,
      `expected five children for ${parent.id}`,
    );
  }
});
