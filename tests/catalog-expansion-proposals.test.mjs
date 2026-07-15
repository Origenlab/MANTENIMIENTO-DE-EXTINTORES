import assert from 'node:assert/strict';
import test from 'node:test';
import { catalogProducts } from '../src/data/catalog-products.mjs';
import {
  catalogExpansionByParent,
  catalogExpansionProposals,
} from '../src/data/catalog-expansion/index.mjs';
import { portableExpansionProposals } from '../src/data/catalog-expansion/portables.mjs';
import { industrialExpansionProposals } from '../src/data/catalog-expansion/industrial.mjs';

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

test('portable expansion covers five products for every portable family', () => {
  const portableParents = [
    'pqs-abc-portatil', 'pqs-bc-portatil', 'purple-k-portatil', 'co2-portatil',
    'agua-presion-portatil', 'agua-nebulizada', 'espuma-afff-portatil', 'espuma-ar-afff',
    'espuma-f3', 'tipo-k-portatil', 'hfc-236fa-portatil', 'halotron-portatil',
    'clase-d-cloruro-sodio', 'clase-d-grafito-cobre', 'ion-litio-avd',
  ];

  assert.equal(portableExpansionProposals.length, 75);
  for (const parentId of portableParents) {
    assert.equal(
      portableExpansionProposals.filter((proposal) => proposal.parentId === parentId).length,
      5,
      `expected five portable proposals for ${parentId}`,
    );
  }
});

test('industrial expansion covers five products for every industrial family', () => {
  const industrialParents = [
    'pqs-abc-rodante', 'pqs-bc-rodante', 'purple-k-rodante', 'co2-rodante',
    'espuma-rodante', 'clase-d-rodante', 'pqs-alto-flujo', 'operado-cartucho',
  ];

  assert.equal(industrialExpansionProposals.length, 40);
  for (const parentId of industrialParents) {
    assert.equal(
      industrialExpansionProposals.filter((proposal) => proposal.parentId === parentId).length,
      5,
      `expected five industrial proposals for ${parentId}`,
    );
  }
});
