import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

import { blogTopics, blogPillarSlugs, classifyPost, getTopicForPillar } from '../src/data/blog-topics.mjs';

/**
 * Cobertura de la taxonomía del blog (auditoría 2026-07-16).
 *
 * Los diez artículos pilar publicaban un mensaje de error de la migración y no
 * tenían un solo enlace entrante; las tarjetas de tema del índice eran `<div>`
 * sin enlace. Esto fija que ninguna de las dos cosas vuelva.
 */

const BLOG_DIR = new URL('../src/content/blog/', import.meta.url);

test('ningún artículo publica el marcador de error de la migración', async () => {
  const files = (await readdir(BLOG_DIR)).filter((file) => file.endsWith('.md'));
  const offenders = [];

  for (const file of files) {
    const source = await readFile(new URL(file, BLOG_DIR), 'utf8');
    if (/Contenido principal no detectado/i.test(source)) offenders.push(file);
  }

  assert.deepEqual(offenders, [], `artículos con el error de migración:\n${offenders.join('\n')}`);
});

test('cada pilar existe como artículo de la colección', async () => {
  const files = new Set((await readdir(BLOG_DIR)).filter((file) => file.endsWith('.md')));
  const missing = blogPillarSlugs.filter((slug) => !files.has(`${slug}.md`));

  assert.deepEqual(missing, [], `pilares sin artículo: ${missing.join(', ')}`);
});

test('todo artículo cae en un tema: la clasificación nunca deja fuera', () => {
  // El último tema es deliberadamente un catch-all (`/./`). Sin él, un artículo
  // que no case con ninguna regla quedaría sin pilar que lo enlace.
  //
  // El fixture no puede contener ninguna palabra de las reglas: en un slug los
  // guiones son límites de palabra, así que "no-casa-con-nada" contiene el
  // token `casa` y caería, con razón, en hogar-y-familia.
  assert.equal(classifyPost('lorem-ipsum-dolor-sit', 'Lorem ipsum dolor').slug, 'seguridad-contra-incendios');
  assert.ok(blogTopics[blogTopics.length - 1].match.test(''), 'el último tema debe recoger lo que no cae en otro');
});

test('las reglas no casan dentro de otra palabra', () => {
  // Sin `\b`, `auto` casaría en "automáticamente" y `casa` en "casado":
  // media taxonomía se iría a hogar-y-familia.
  assert.notEqual(classifyPost('proceso-automatizado-de-inspeccion', '').slug, 'hogar-y-familia');
  assert.notEqual(classifyPost('sistema-automatico-de-supresion', '').slug, 'hogar-y-familia');
});

test('las reglas van de específico a genérico', () => {
  // Un curso de brigadas para una empresa es, ante todo, capacitación: si
  // `industria-y-comercio` ganase a `prevencion-empresarial`, la clasificación
  // se distorsionaría hacia el tema más amplio.
  assert.equal(classifyPost('curso-brigada-incendios-empresa-cdmx', '').slug, 'prevencion-empresarial');
  assert.equal(classifyPost('recarga-extintores-restaurante', '').slug, 'mantenimiento-y-recarga');
  assert.equal(classifyPost('senalizacion-evacuacion-empresas-nom-026-stps', '').slug, 'equipos-contra-incendio');
});

test('un pilar no se clasifica dentro de sí mismo', () => {
  for (const slug of blogPillarSlugs) {
    assert.ok(getTopicForPillar(slug), `${slug} debe reconocerse como pilar`);
  }
  assert.equal(getTopicForPillar('un-articulo-normal'), null);
});

test('cada tema tiene intro propia y etiquetas completas', () => {
  const offenders = [];

  for (const topic of blogTopics) {
    if (!topic.intro || topic.intro.length < 80) offenders.push(`${topic.slug}: intro ausente o demasiado corta`);
    if (!topic.label || !topic.desc || !topic.icon) offenders.push(`${topic.slug}: falta label, desc o icon`);
  }

  const intros = blogTopics.map((topic) => topic.intro);
  assert.equal(new Set(intros).size, intros.length, 'cada tema necesita su propia intro, no una plantilla');
  assert.deepEqual(offenders, [], offenders.join('\n'));
});

test('el índice del blog enlaza a los pilares', async () => {
  const source = await readFile(new URL('../src/pages/blog/index.astro', import.meta.url), 'utf8');

  // Eran `<div class="bl-topic-card">`: tarjetas decorativas sin enlace.
  assert.match(source, /<a class="bl-topic-card" href=\{t\.href\}/, 'las tarjetas de tema deben ser enlaces');
  assert.doesNotMatch(source, /<div class="bl-topic-card"/, 'no deben volver a ser divs');
});

test('los artículos relacionados salen del tema, no de una lista fija', async () => {
  const source = await readFile(new URL('../src/pages/blog/[...slug].astro', import.meta.url), 'utf8');

  // Los 119 artículos mostraban los mismos 4 relacionados.
  assert.match(source, /const siblings = \(byTopic\.get\(topic\.slug\)/, 'los relacionados deben venir del tema');
  assert.match(source, /fallbackArticles/, 'la lista fija sólo debe completar');
});

// ---------------------------------------------------------------------------
// Canibalización: varios artículos atacando la misma búsqueda
// ---------------------------------------------------------------------------

/** Lee el frontmatter mínimo que necesitan estos tests. */
async function readFrontmatter(file) {
  const source = await readFile(new URL(file, BLOG_DIR), 'utf8');
  const block = source.split('---')[1] ?? '';
  return {
    title: (block.match(/title:\s*"([^"]*)"/) ?? [])[1] ?? '',
    canonicalTo: (block.match(/canonicalTo:\s*"([^"]*)"/) ?? [])[1] ?? null,
  };
}

test('todo canonicalTo apunta a un artículo que existe y no a sí mismo', async () => {
  const files = (await readdir(BLOG_DIR)).filter((file) => file.endsWith('.md'));
  const slugs = new Set(files.map((file) => file.replace(/\.md$/, '')));
  const offenders = [];

  for (const file of files) {
    const { canonicalTo } = await readFrontmatter(file);
    if (!canonicalTo) continue;

    const slug = file.replace(/\.md$/, '');
    const target = canonicalTo.replace(/^\/blog\//, '');

    if (!canonicalTo.startsWith('/blog/')) offenders.push(`${slug}: "${canonicalTo}" no es una ruta de /blog/`);
    if (!slugs.has(target)) offenders.push(`${slug}: canoniza a "${target}", que no existe`);
    if (target === slug) offenders.push(`${slug}: se canoniza a sí mismo`);
  }

  assert.deepEqual(offenders, [], `canónicos rotos:\n${offenders.join('\n')}`);
});

test('un canónico no canoniza a su vez a otro: nada de cadenas', async () => {
  // Una cadena A→B→C hace que Google descarte la señal. El destino de un
  // canonicalTo debe ser siempre un artículo que se indexa a sí mismo.
  const files = (await readdir(BLOG_DIR)).filter((file) => file.endsWith('.md'));
  const offenders = [];

  for (const file of files) {
    const { canonicalTo } = await readFrontmatter(file);
    if (!canonicalTo) continue;

    const target = `${canonicalTo.replace(/^\/blog\//, '')}.md`;
    const targetData = await readFrontmatter(target).catch(() => null);
    if (targetData?.canonicalTo) {
      offenders.push(`${file}: canoniza a ${target}, que a su vez canoniza a ${targetData.canonicalTo}`);
    }
  }

  assert.deepEqual(offenders, [], `cadenas de canónicos:\n${offenders.join('\n')}`);
});

test('ningún título se repite entre artículos que se indexan', async () => {
  // Dos artículos publicaban el mismo <title> palabra por palabra. Los que
  // canonizan a otro pueden repetirlo: ya no compiten.
  const files = (await readdir(BLOG_DIR)).filter((file) => file.endsWith('.md'));
  const seen = new Map();
  const offenders = [];

  for (const file of files) {
    const { title, canonicalTo } = await readFrontmatter(file);
    if (canonicalTo || !title) continue;

    if (seen.has(title)) offenders.push(`"${title}": ${seen.get(title)} y ${file}`);
    seen.set(title, file);
  }

  assert.deepEqual(offenders, [], `títulos duplicados entre artículos indexables:\n${offenders.join('\n')}`);
});

test('la plantilla no usa comentarios HTML para notas internas', async () => {
  // Astro emite los `<!-- -->` al output: un comentario explicativo acabó
  // publicado en las diez páginas pilar, con el mismo texto de error que
  // estaba retirando.
  const source = await readFile(new URL('../src/pages/blog/[...slug].astro', import.meta.url), 'utf8');
  const htmlComments = source.match(/<!--[\s\S]*?-->/g) ?? [];

  const leaky = htmlComments.filter((comment) => /auditor|Contenido principal|TODO|FIXME/i.test(comment));
  assert.deepEqual(leaky, [], `notas internas que se publicarían al HTML:\n${leaky.join('\n')}`);
});
