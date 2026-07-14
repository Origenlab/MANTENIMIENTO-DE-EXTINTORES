import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('the shared layout disables site motion and only restores button transitions', async () => {
  const layout = await readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');

  assert.match(layout, /data-motion-policy/);
  assert.match(layout, /animation:\s*none\s*!important/);
  assert.match(layout, /transition:\s*none\s*!important/);
  assert.match(layout, /scroll-behavior:\s*auto\s*!important/);
  assert.match(layout, /:where\(button,[^)]+\)\s*\{[^}]*transition:/s);
  assert.doesNotMatch(layout, /@keyframes\s+wa-|animation:\s*wa-/);
});

test('catalog cards never move or zoom on hover', async () => {
  const css = await readFile(new URL('../public/css/catalog-system.css', import.meta.url), 'utf8');
  const cardRule = css.match(/\.catalog-card\s*\{([^}]*)\}/)?.[1] || '';
  const cardHoverRule = css.match(/\.catalog-card:hover\s*\{([^}]*)\}/)?.[1] || '';
  const imageRule = css.match(/\.catalog-card__media img\s*\{([^}]*)\}/)?.[1] || '';
  const imageHoverRule = css.match(/\.catalog-card:hover \.catalog-card__media img\s*\{([^}]*)\}/)?.[1] || '';

  assert.doesNotMatch(cardRule, /transition|animation/);
  assert.doesNotMatch(cardHoverRule, /transform/);
  assert.doesNotMatch(imageRule, /transition|animation/);
  assert.doesNotMatch(imageHoverRule, /transform/);
});

test('catalog and blog navigation use immediate scrolling', async () => {
  const scripts = await Promise.all([
    readFile(new URL('../public/js/catalog-system.js', import.meta.url), 'utf8'),
    readFile(new URL('../public/js/blog-system.js', import.meta.url), 'utf8'),
  ]);

  for (const script of scripts) {
    assert.doesNotMatch(script, /behavior:\s*['"]smooth['"]/);
  }
});

test('shared stylesheets are deduplicated before rendering page CSS', async () => {
  const layout = await readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');

  assert.match(layout, /pageCss\s*=\s*extraCss\.filter/);
  assert.match(layout, /section-redesign\.css/);
  assert.match(layout, /pageCss\.map/);
});

test('legacy emergency sections contain valid media-query syntax', async () => {
  const pages = await Promise.all([
    readFile(new URL('../src/pages/venta-de-extintores.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/senalizacion.astro', import.meta.url), 'utf8'),
  ]);

  for (const page of pages) {
    assert.doesNotMatch(page, /@media[^<]*\}\)/s);
  }
});
