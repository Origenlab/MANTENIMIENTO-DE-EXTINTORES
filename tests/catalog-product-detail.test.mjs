import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { catalogProducts } from '../src/data/catalog-products.mjs';
import { catalogProductDetails } from '../src/data/catalog-product-details.mjs';

async function readOrEmpty(path) {
  try {
    return await readFile(new URL(path, import.meta.url), 'utf8');
  } catch {
    return '';
  }
}

async function loadEditorialModule() {
  try {
    return await import('../src/data/catalog-product-editorial.mjs');
  } catch {
    return { catalogProductEditorial: {} };
  }
}

test('all 276 products have a complete, human and individual editorial profile', async () => {
  const { catalogProductEditorial } = await loadEditorialModule();
  const productIds = catalogProducts.map(({ id }) => id).sort();

  assert.deepEqual(Object.keys(catalogProductEditorial).sort(), productIds);

  const forbiddenQuestions = new Set([
    '¿Requiere validación técnica?',
    '¿La cotización puede incluir instalación y señalización?',
    '¿MANEXT ofrece mantenimiento y atención posterior?',
  ]);
  const keywords = new Set();
  const scenarios = new Set();
  const leads = new Set();
  const descriptions = new Set();
  const faqSignatures = new Set();
  const allQuestions = new Set();

  for (const product of catalogProducts) {
    const editorial = catalogProductEditorial[product.id];

    assert.ok(editorial, `missing editorial profile for ${product.id}`);
    assert.ok(editorial.primaryKeyword.length >= 8, `weak primary keyword for ${product.id}`);
    assert.equal(typeof editorial.seoTitle, 'string', `missing SEO title for ${product.id}`);
    assert.equal(typeof editorial.metaDescription, 'string', `missing meta description for ${product.id}`);
    assert.equal(typeof editorial.h1, 'string', `missing editorial H1 for ${product.id}`);
    assert.ok(editorial.h1.toLocaleLowerCase('es-MX').startsWith(editorial.primaryKeyword.toLocaleLowerCase('es-MX')), `H1 must lead with keyword for ${product.id}`);
    assert.ok(editorial.seoTitle.length <= 60, `SEO title too long for ${product.id}`);
    assert.ok(editorial.seoTitle.toLocaleLowerCase('es-MX').startsWith(editorial.primaryKeyword.toLocaleLowerCase('es-MX')), `SEO title must front-load keyword for ${product.id}`);
    assert.ok(editorial.metaDescription.length >= 120, `meta description too short for ${product.id}`);
    assert.ok(editorial.metaDescription.length <= 160, `meta description too long for ${product.id}`);
    assert.ok(editorial.secondaryKeywords.length >= 3, `missing secondary keywords for ${product.id}`);
    assert.ok(editorial.searchIntent.length >= 70, `thin search intent for ${product.id}`);
    assert.ok(editorial.buyerScenario.length >= 90, `thin buyer scenario for ${product.id}`);
    assert.ok(editorial.valuePromise.length >= 70, `thin value promise for ${product.id}`);
    assert.ok(editorial.selectionFocus.length >= 80, `thin selection criteria for ${product.id}`);
    assert.ok(editorial.differentiator.length >= 70, `thin differentiator for ${product.id}`);
    assert.ok(editorial.notFor.length >= 80, `thin limitation for ${product.id}`);
    assert.ok(editorial.humanLead.length >= 140, `thin lead for ${product.id}`);
    assert.ok(editorial.humanDescription.length >= 180, `thin description for ${product.id}`);
    assert.equal(editorial.benefitAngles.length, 4, `benefits must be authored for ${product.id}`);
    assert.ok(editorial.faqs.length >= 8, `FAQs must be authored for ${product.id}`);
    assert.ok(editorial.internalLinks.length >= 3, `internal links missing for ${product.id}`);

    const normalizedKeyword = editorial.primaryKeyword.toLocaleLowerCase('es-MX');
    const firstWords = normalizedKeyword.split(/\s+/).slice(0, 2).join(' ');
    assert.ok(editorial.humanLead.toLocaleLowerCase('es-MX').includes(firstWords), `lead misses keyword context for ${product.id}`);

    for (const benefit of editorial.benefitAngles) {
      assert.ok(benefit.title.length >= 12, `generic benefit title for ${product.id}`);
      assert.ok(benefit.text.length >= 90, `thin benefit explanation for ${product.id}`);
    }

    for (const faq of editorial.faqs) {
      assert.ok(!forbiddenQuestions.has(faq.question), `boilerplate FAQ in ${product.id}`);
      assert.ok(!allQuestions.has(faq.question), `repeated FAQ question: ${faq.question}`);
      assert.ok(faq.answer.length >= 100, `thin FAQ answer in ${product.id}`);
      allQuestions.add(faq.question);
    }

    for (const link of editorial.internalLinks) {
      assert.match(link.url, /^\//, `internal link must be local for ${product.id}`);
      assert.ok(link.label.length >= 12, `weak internal anchor for ${product.id}`);
    }

    keywords.add(editorial.primaryKeyword);
    scenarios.add(editorial.buyerScenario);
    leads.add(editorial.humanLead);
    descriptions.add(editorial.humanDescription);
    faqSignatures.add(editorial.faqs.map(({ question }) => question).join('|'));
  }

  assert.equal(keywords.size, catalogProducts.length, 'primary keywords must be unique');
  assert.equal(scenarios.size, catalogProducts.length, 'buyer scenarios must be unique');
  assert.equal(leads.size, catalogProducts.length, 'leads must be unique');
  assert.equal(descriptions.size, catalogProducts.length, 'descriptions must be unique');
  assert.equal(faqSignatures.size, catalogProducts.length, 'FAQ groups must be unique');
});

test('every built detail record consumes its individual editorial profile', async () => {
  const { catalogProductEditorial } = await loadEditorialModule();

  for (const product of catalogProducts) {
    const editorial = catalogProductEditorial[product.id];
    const detail = catalogProductDetails.find((item) => item.id === product.id);

    assert.equal(detail.primaryKeyword, editorial.primaryKeyword, `keyword not integrated for ${product.id}`);
    assert.equal(detail.h1, editorial.h1, `H1 not integrated for ${product.id}`);
    assert.equal(detail.lead, editorial.humanLead, `lead not integrated for ${product.id}`);
    assert.equal(detail.description, editorial.humanDescription, `description not integrated for ${product.id}`);
    assert.deepEqual(detail.benefits, editorial.benefitAngles, `benefits not integrated for ${product.id}`);
    assert.deepEqual(detail.faqs, editorial.faqs, `FAQs not integrated for ${product.id}`);
    for (const link of editorial.internalLinks) {
      assert.ok(
        detail.internalLinks.some(({ url }) => url === link.url),
        `editorial internal link ${link.url} not integrated for ${product.id}`,
      );
    }
    assert.equal(detail.seo.title, editorial.seoTitle, `SEO title not integrated for ${product.id}`);
    assert.equal(detail.seo.description, editorial.metaDescription, `meta description not integrated for ${product.id}`);
  }
});

test('every catalog product has one unique, complete and indexable detail page', () => {
  assert.equal(catalogProductDetails.length, catalogProducts.length);

  const slugs = new Set();
  const canonicals = new Set();
  const seoTitles = new Set();

  for (const product of catalogProducts) {
    const detail = catalogProductDetails.find((item) => item.id === product.id);

    assert.ok(detail, `missing detail record for ${product.id}`);
    assert.equal(product.productPageUrl, `/catalogo/${detail.slug}`);
    assert.equal(detail.name, product.name);
    // Los 7 productos con landing de servicio (`detailUrl`) canonizan a ella:
    // la landing y la ficha de familia atacan la misma búsqueda y antes cada
    // una se declaraba canónica. Ver catalog-product-details.mjs. El resto se
    // canoniza a su propia ficha.
    assert.equal(
      detail.seo.canonical,
      `https://mantenimientodeextintores.mx${product.detailUrl || product.productPageUrl}`,
    );
    assert.ok(detail.seo.title.length <= 60, `SEO title too long for ${product.id}`);
    assert.ok(detail.seo.description.length >= 120, `meta description too short for ${product.id}`);
    assert.ok(detail.seo.description.length <= 160, `meta description too long for ${product.id}`);
    assert.doesNotMatch(detail.seo.description, /\b(?:y|para|con|de|en)\.$/i, `meta description ends mid-sentence for ${product.id}`);
    assert.ok(detail.description.length >= 140, `product description too short for ${product.id}`);
    assert.ok(detail.technicalSpecs.length >= 6, `insufficient technical specs for ${product.id}`);
    assert.ok(detail.capacityGuide.length >= 1, `missing variant guide for ${product.id}`);
    assert.ok(detail.recommendedUses.length >= 3, `insufficient applications for ${product.id}`);
    assert.ok(detail.limitations.length >= 3, `insufficient safety guidance for ${product.id}`);
    assert.ok(detail.faqs.length >= 8, `insufficient FAQs for ${product.id}`);
    assert.ok(detail.sources.length >= 2, `insufficient technical sources for ${product.id}`);

    slugs.add(detail.slug);
    canonicals.add(detail.seo.canonical);
    seoTitles.add(detail.seo.title);
  }

  assert.equal(slugs.size, catalogProducts.length, 'product slugs must be unique');
  assert.equal(canonicals.size, catalogProducts.length, 'canonical URLs must be unique');
  assert.equal(seoTitles.size, catalogProducts.length, 'SEO titles must be unique');
});

test('CO2 catalog entry links to its own technical product page', async () => {
  const source = await readOrEmpty('../src/data/catalog-products.mjs');
  const card = await readOrEmpty('../src/components/catalog/CatalogCard.astro');

  assert.match(source, /id:\s*'co2-portatil'[\s\S]*productPageUrl:\s*'\/catalogo\/extintor-co2-portatil'/);
  assert.match(card, /productPageUrl\?:\s*string/);
  assert.match(card, /const detailLabel = product\.name;/);
  assert.match(card, /aria-label=\{`Ver información técnica: \$\{product\.name\}`\}/);
});

test('HFC-236fa catalog entry links to a dedicated technical product page', async () => {
  const source = await readOrEmpty('../src/data/catalog-products.mjs');
  const details = await readOrEmpty('../src/data/catalog-product-details.mjs');

  assert.match(
    source,
    /id:\s*'hfc-236fa-portatil'[\s\S]*productPageUrl:\s*'\/catalogo\/extintor-agente-limpio-hfc-236fa'/,
  );
  assert.match(details, /slug:\s*'extintor-agente-limpio-hfc-236fa'/);
  assert.match(details, /name:\s*'Extintor de agente limpio HFC-236fa'/);
  assert.match(details, /fireClasses:\s*\['A', 'B', 'C'\]/);
  assert.match(details, /title:\s*'Extintor HFC-236fa en CDMX \| Agente Limpio - MANEXT'/);
  assert.match(details, /description:\s*'Cotiza un extintor de agente limpio HFC-236fa de 2\.5, 4\.5 o 6 kg para electrónica y telecomunicaciones\. Asesoría, instalación y servicio MANEXT en CDMX\.'/);
});

test('detail template is reusable and includes the required commercial sections', async () => {
  const route = await readOrEmpty('../src/pages/catalogo/[slug].astro');
  const data = await readOrEmpty('../src/data/catalog-product-details.mjs');
  const template = await readOrEmpty('../src/components/catalog/ProductDetailTemplate.astro');
  const surface = `${route}\n${data}\n${template}`;

  assert.match(route, /getStaticPaths/);
  assert.match(route, /ProductDetailTemplate/);
  assert.match(data, /slug:\s*'extintor-co2-portatil'/);

  for (const contract of [
    'Cotización personalizada',
    'Ficha técnica',
    'Aplicaciones recomendadas',
    'Qué incluye tu cotización',
    'Preguntas frecuentes',
    'NOM-002-STPS-2010',
    'NOM-154-SCFI-2005',
  ]) {
    assert.ok(surface.includes(contract), `detail template missing ${contract}`);
  }
});

test('detail template renders product-specific copy instead of CO2 hardcoding', async () => {
  const template = await readOrEmpty('../src/components/catalog/ProductDetailTemplate.astro');

  for (const field of [
    'agentBadge',
    'quickUse',
    'variantLabel',
    'trustItems',
    'benefitsTitle',
    'benefitsIntro',
    'specsTitle',
    'capacityTitle',
    'applicationsTitle',
    'faqTitle',
    'guideUrl',
  ]) {
    assert.ok(template.includes(`product.detailCopy.${field}`), `template missing product.detailCopy.${field}`);
  }

  assert.ok(template.includes('product.h1'), 'template missing editorial H1');

  assert.doesNotMatch(template, /extintor CO₂|dióxido de carbono|sobre CO₂|Tableros eléctricos · Servidores/);
  assert.match(template, /product\.fireClasses\.length/);
  assert.match(template, /product\.detailCopy\.trustItems\.map/);
});

test('FAQ and WhatsApp quote form share one responsive two-column conversion module', async () => {
  const template = await readOrEmpty('../src/components/catalog/ProductDetailTemplate.astro');
  const css = await readOrEmpty('../public/css/catalog-product-detail.css');

  assert.match(
    template,
    /<section class="product-detail__conversion"[\s\S]*id="preguntas-frecuentes"[\s\S]*<QuoteForm[\s\S]*<\/section>/,
    'FAQ and quote form must render inside one conversion section',
  );
  assert.doesNotMatch(template, /product-detail__quote-section/);
  assert.match(
    css,
    /\.product-detail__conversion-grid\s*\{[^}]*grid-template-columns:\s*minmax\([^;]+\)\s+minmax\([^;]+\)/s,
    'desktop conversion module must expose two columns',
  );
  assert.match(
    css,
    /@media \(max-width:\s*820px\)[\s\S]*\.product-detail__conversion-grid[^{]*\{[^}]*grid-template-columns:\s*1fr/s,
    'conversion module must stack on tablet and mobile',
  );
});

test('product pages expose contextual internal links without adding card motion', async () => {
  const template = await readOrEmpty('../src/components/catalog/ProductDetailTemplate.astro');
  const css = await readOrEmpty('../public/css/catalog-product-detail.css');

  assert.match(template, /class="product-detail__related-links"/);
  assert.match(template, /product\.internalLinks\.map/);
  assert.match(template, /Recursos para tomar una mejor decisión/);
  assert.match(css, /\.product-detail__related-links\s*\{/);

  const relatedStyles = css.match(/\.product-detail__related-links\s*\{[^}]*\}/s)?.[0] || '';
  assert.doesNotMatch(relatedStyles, /animation|transform|transition/);
});

test('built CO2 detail page exposes SEO, schema and conversion contracts', async () => {
  const html = await readOrEmpty('../dist/catalogo/extintor-co2-portatil/index.html');

  // Canoniza a su landing de servicio, no a sí misma: /co2 y esta ficha
  // atacaban la misma búsqueda declarándose canónicas las dos.
  assert.match(html, /<link rel="canonical" href="https:\/\/mantenimientodeextintores\.mx\/co2"/);
  assert.match(html, /<h1[^>]*>[^<]*Extintor CO₂ portátil/);
  assert.match(html, /"@type":"Product"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.doesNotMatch(html, /"offers"\s*:/);
  assert.doesNotMatch(html, /"price"\s*:/);
  assert.match(html, /id="solicitar-cotizacion"/);
  assert.match(html, /value="Extintor CO₂ portátil" selected/);
});

test('built HFC-236fa page exposes unique SEO, schema and conversion contracts', async () => {
  const html = await readOrEmpty('../dist/catalogo/extintor-agente-limpio-hfc-236fa/index.html');

  // Canoniza a /agentes-limpios, su landing de servicio. Ver nota en el test de CO₂.
  assert.match(html, /<link rel="canonical" href="https:\/\/mantenimientodeextintores\.mx\/agentes-limpios"/);
  assert.match(html, /<h1[^>]*>[^<]*Extintor de agente limpio HFC-236fa/);
  assert.match(html, /Clase A/);
  assert.match(html, /Clase B/);
  assert.match(html, /Clase C/);
  assert.match(html, /"@type":"Product"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.doesNotMatch(html, /"offers"\s*:/);
  assert.doesNotMatch(html, /"price"\s*:/);
  assert.match(html, /value="Extintor de agente limpio HFC-236fa" selected/);
  assert.match(html, /Chemours/);
});

test('Astro build emits a complete page for every catalog product', async () => {
  for (const detail of catalogProductDetails) {
    const html = await readOrEmpty(`../dist/catalogo/${detail.slug}/index.html`);

    assert.ok(html.length > 1000, `missing built page for ${detail.slug}`);
    assert.ok(html.includes(`<title>${detail.seo.title}</title>`), `missing unique title for ${detail.slug}`);
    assert.ok(html.includes(`content="${detail.seo.description}"`), `missing unique meta description for ${detail.slug}`);
    assert.ok(html.includes(`<link rel="canonical" href="${detail.seo.canonical}"`), `missing canonical for ${detail.slug}`);
    assert.ok(html.includes(detail.name), `missing product name for ${detail.slug}`);
    assert.ok(html.includes(detail.h1), `missing editorial H1 for ${detail.slug}`);
    assert.ok(html.includes(detail.lead), `missing human lead for ${detail.slug}`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `page must contain one H1 for ${detail.slug}`);
    assert.match(html, /"@type":"Product"/, `missing Product schema for ${detail.slug}`);
    assert.match(html, /"@type":"FAQPage"/, `missing FAQ schema for ${detail.slug}`);
    assert.doesNotMatch(html, /"offers"\s*:/, `unverified offer schema in ${detail.slug}`);
    assert.doesNotMatch(html, /"price"\s*:/, `unverified price schema in ${detail.slug}`);
    assert.ok(html.includes(`value="${detail.name}" selected`), `quote form does not select ${detail.name}`);

    for (const faq of detail.faqs) {
      assert.ok(html.includes(faq.question), `visible FAQ missing in ${detail.slug}`);
    }
    for (const link of detail.internalLinks) {
      assert.ok(html.includes(`href="${link.url}"`), `contextual link missing in ${detail.slug}`);
      const targetPath = link.url.replace(/^\//, '').replace(/\/$/, '');
      const targetHtml = await readOrEmpty(`../dist/${targetPath}/index.html`);
      assert.ok(targetHtml.length > 1000, `broken contextual link ${link.url} in ${detail.slug}`);
    }
  }
});
