// ═══════════════════════════════════════════════════════════════════════════════
// GENERADOR HTML - MANEXT BLOG v3.0 PROFESIONAL
// Sidebar completo, FAQ funcional, Articulos relacionados, Diseño profesional
// ═══════════════════════════════════════════════════════════════════════════════

let data = null;
try {
  data = $('Preparar para GitHub').first().json;
} catch (e) {
  data = $('Procesar Imagen').first().json;
}

const t = data.tema;
const c = data.contenido;
const e = data.empresa;
const articleUrl = `https://mantenimientodeextintores.mx/blog/${t.categoria}/${data.filename}`;
const imgHero = `../../img/img-blog/${data.imagenesFilenames?.hero || 'default.jpg'}`;
const heroAlt = c.imagenes?.hero?.altText || `${t.servicio} profesional - MANEXT`;

const whatsappMsg = encodeURIComponent(c.cta?.mensajeWhatsApp || `Hola! Me interesa ${t.servicio}`);
const fechaHoy = new Date();
const fechaISO = fechaHoy.toISOString().split('T')[0];
const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const fechaFormateada = `${fechaHoy.getDate()} de ${meses[fechaHoy.getMonth()]} de ${fechaHoy.getFullYear()}`;

// Mapeo de categorias con info completa
const categoriaInfo = {
  'seguridad-contra-incendios': { color: '#d32f2f', nombre: 'Seguridad Contra Incendios', icon: 'shield' },
  'tipos-de-extintores': { color: '#f57c00', nombre: 'Tipos de Extintores', icon: 'fire-extinguisher' },
  'mantenimiento-y-recarga': { color: '#1976d2', nombre: 'Mantenimiento y Recarga', icon: 'tools' },
  'equipos-contra-incendio': { color: '#7b1fa2', nombre: 'Equipos Contra Incendio', icon: 'fire' },
  'normativas-y-certificaciones': { color: '#00796b', nombre: 'Normativas', icon: 'certificate' },
  'prevencion-empresarial': { color: '#c62828', nombre: 'Prevencion Empresarial', icon: 'building' },
  'emergencias-y-protocolos': { color: '#e53935', nombre: 'Emergencias', icon: 'alert' },
  'guias-y-comparativas': { color: '#5e35b1', nombre: 'Guias', icon: 'chart' },
  'industria-y-comercio': { color: '#0288d1', nombre: 'Industria y Comercio', icon: 'factory' },
  'hogar-y-familia': { color: '#43a047', nombre: 'Hogar y Familia', icon: 'home' }
};
const catInfo = categoriaInfo[t.categoria] || { color: '#d32f2f', nombre: t.categoriaDisplay, icon: 'shield' };

// Productos relacionados por categoria
const productosRelacionados = {
  'seguridad-contra-incendios': [
    { nombre: 'Extintor PQS 6kg', url: '../../productos/polvo-quimico-seco/producto-extintor-pqs-6kg.html', precio: 'Cotizar' },
    { nombre: 'Extintor CO2 4.5kg', url: '../../productos/co2/producto-extintor-co2-4-54kg.html', precio: 'Cotizar' },
    { nombre: 'Extintor Tipo K 6L', url: '../../productos/tipo-k/producto-extintor-tipo-k-6L.html', precio: 'Cotizar' }
  ],
  'tipos-de-extintores': [
    { nombre: 'Extintor PQS 4.5kg', url: '../../productos/polvo-quimico-seco/producto-extintor-pqs-4-5kg.html', precio: 'Cotizar' },
    { nombre: 'Extintor CO2 6.8kg', url: '../../productos/co2/producto-extintor-co2-6-81kg.html', precio: 'Cotizar' },
    { nombre: 'Extintor Agua 9L', url: '../../productos/agua-presion/producto-extintor-agua-9L.html', precio: 'Cotizar' }
  ],
  'mantenimiento-y-recarga': [
    { nombre: 'Extintor PQS 9kg', url: '../../productos/polvo-quimico-seco/producto-extintor-pqs-9kg.html', precio: 'Cotizar' },
    { nombre: 'Extintor PQS 6kg', url: '../../productos/polvo-quimico-seco/producto-extintor-pqs-6kg.html', precio: 'Cotizar' },
    { nombre: 'Extintor CO2 4.5kg', url: '../../productos/co2/producto-extintor-co2-4-54kg.html', precio: 'Cotizar' }
  ]
};
const productos = productosRelacionados[t.categoria] || productosRelacionados['seguridad-contra-incendios'];

// Generar secciones HTML
let seccionesHTML = '';
let tocItems = [];

if (c.secciones && c.secciones.length > 0) {
  c.secciones.forEach((sec, idx) => {
    const secId = 'seccion-' + (idx + 1);
    const tituloLimpio = sec.h2.replace(/<[^>]*>/g, '').substring(0, 60);
    tocItems.push({id: secId, titulo: tituloLimpio});

    seccionesHTML += `
            <section id="${secId}" class="blog-content-section">
              <h2>${sec.h2}</h2>`;

    if (sec.introParrafo) {
      seccionesHTML += `
              <p class="section-intro">${sec.introParrafo}</p>`;
    }

    if (sec.subsecciones) {
      sec.subsecciones.forEach((sub) => {
        seccionesHTML += `
              <div class="subsection">
                <h3>${sub.h3}</h3>
                ${sub.contenido}
              </div>`;
      });
    }

    if (sec.highlightBox) {
      seccionesHTML += `
              <div class="highlight-box">
                <div class="highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div class="highlight-content">
                  <strong>${sec.highlightBox.titulo}</strong>
                  <p>${sec.highlightBox.contenido}</p>
                </div>
              </div>`;
    }

    seccionesHTML += `
            </section>`;
  });
}

tocItems.push({id: 'preguntas-frecuentes', titulo: 'Preguntas Frecuentes'});

// Generar TOC HTML
const tocHTML = tocItems.map((item, idx) =>
  `<li><a href="#${item.id}" class="toc-link" data-index="${idx + 1}"><span class="toc-number">${idx + 1}</span>${item.titulo}</a></li>`
).join('\n                  ');

// Generar FAQ HTML y Schema
let faqHTML = '';
let faqSchemaItems = [];

if (c.faq && c.faq.length > 0) {
  faqHTML = c.faq.map((faq, idx) => {
    const respuestaLimpia = faq.respuesta.replace(/<[^>]*>/g, '');
    faqSchemaItems.push({
      "@type": "Question",
      "name": faq.pregunta,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": respuestaLimpia
      }
    });
    return `
                  <div class="faq-item" data-faq="${idx}">
                    <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${idx}">
                      <span class="faq-icon">
                        <svg class="icon-plus" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <svg class="icon-minus" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </span>
                      <span class="faq-question-text">${faq.pregunta}</span>
                    </button>
                    <div class="faq-answer" id="faq-answer-${idx}" aria-hidden="true">
                      <div class="faq-answer-content">
                        <p>${respuestaLimpia}</p>
                      </div>
                    </div>
                  </div>`;
  }).join('');
}

// Generar Tags HTML
let tagsHTML = '';
if (c.seo?.metaKeywords) {
  const tags = c.seo.metaKeywords.split(',').map(k => k.trim()).slice(0, 6);
  tagsHTML = tags.map(tag => `<a href="../../blog.html?tag=${encodeURIComponent(tag)}" class="article-tag">${tag}</a>`).join('\n                ');
}

// Generar productos HTML para sidebar
const productosHTML = productos.map(prod => `
                  <a href="${prod.url}" class="sidebar-product">
                    <div class="product-info">
                      <span class="product-name">${prod.nombre}</span>
                      <span class="product-action">Ver producto</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </a>`).join('');

// HTML COMPLETO PROFESIONAL
const html = `<!DOCTYPE html>
<html lang="es-MX">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Preload critico -->
  <link rel="preload" href="../../css/style.css?v=15" as="style">
  <link rel="preload" href="../../img/img-blog/${data.imagenesFilenames?.hero || 'default.jpg'}" as="image" type="image/jpeg">
  <link rel="preconnect" href="https://wa.me" crossorigin>

  <!-- Meta SEO -->
  <title>${c.seo.titulo} | MANEXT - Expertos en Extintores CDMX</title>
  <meta name="description" content="${c.seo.metaDescription}">
  <meta name="keywords" content="${c.seo.metaKeywords}">
  <meta name="author" content="MANEXT - Mantenimiento de Extintores">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">

  <!-- Geolocalizacion -->
  <meta name="geo.region" content="MX-CMX">
  <meta name="geo.placename" content="Ciudad de Mexico">

  <!-- CSS -->
  <link rel="stylesheet" href="../../css/style.css?v=15">

  <!-- Open Graph -->
  <meta property="og:title" content="${c.seo.titulo} | MANEXT">
  <meta property="og:description" content="${c.seo.metaDescription}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${articleUrl}">
  <meta property="og:image" content="https://mantenimientodeextintores.mx/img/img-blog/${data.imagenesFilenames?.hero || 'default.jpg'}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="es_MX">
  <meta property="og:site_name" content="MANEXT - Mantenimiento de Extintores">
  <meta property="article:published_time" content="${fechaISO}T10:00:00-06:00">
  <meta property="article:author" content="MANEXT">
  <meta property="article:section" content="${t.categoriaDisplay}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${c.seo.titulo} | MANEXT">
  <meta name="twitter:description" content="${c.seo.metaDescription}">
  <meta name="twitter:image" content="https://mantenimientodeextintores.mx/img/img-blog/${data.imagenesFilenames?.hero || 'default.jpg'}">

  <!-- Canonical -->
  <link rel="canonical" href="${articleUrl}">

  <!-- Favicon -->
  <link rel="icon" href="../../favicon.ico" sizes="any">
  <link rel="icon" href="../../icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="../../icon.png">
  <link rel="manifest" href="../../site.webmanifest">
  <meta name="theme-color" content="#d32f2f">

  <!-- Estilos del Articulo -->
  <style>
    /* ═══ LAYOUT DEL ARTICULO ═══ */
    .article-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem 1.5rem 4rem;
    }
    .article-layout {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 3rem;
      align-items: start;
    }
    .article-main {
      min-width: 0;
    }

    /* ═══ HEADER DEL ARTICULO ═══ */
    .article-header {
      margin-bottom: 2rem;
    }
    .article-category {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: ${catInfo.color};
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 25px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 1rem;
    }
    .article-title {
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      font-weight: 800;
      line-height: 1.2;
      color: #1a1a1a;
      margin-bottom: 1.25rem;
    }
    .article-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1.5rem;
      color: #666;
      font-size: 0.9rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #e0e0e0;
    }
    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .meta-item svg {
      color: ${catInfo.color};
    }
    .author-name {
      color: ${catInfo.color};
      font-weight: 600;
    }

    /* ═══ IMAGEN DESTACADA ═══ */
    .article-hero {
      margin-bottom: 2.5rem;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    }
    .article-hero img {
      width: 100%;
      height: auto;
      display: block;
      aspect-ratio: 16/9;
      object-fit: cover;
    }

    /* ═══ CONTENIDO DEL ARTICULO ═══ */
    .article-content {
      font-size: 1.05rem;
      line-height: 1.8;
      color: #333;
    }
    .article-content p {
      margin-bottom: 1.5rem;
    }
    .article-content strong {
      color: #1a1a1a;
    }
    .article-lead {
      font-size: 1.2rem;
      color: #444;
      line-height: 1.7;
      border-left: 4px solid ${catInfo.color};
      padding-left: 1.25rem;
      margin-bottom: 2rem;
    }

    /* ═══ TABLA DE CONTENIDOS INLINE ═══ */
    .toc-inline {
      background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 1.5rem 2rem;
      margin: 2rem 0;
    }
    .toc-inline h2 {
      font-size: 1.1rem;
      color: #1a1a1a;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .toc-inline ol {
      list-style: none;
      padding: 0;
      margin: 0;
      columns: 2;
      column-gap: 2rem;
    }
    .toc-inline li {
      break-inside: avoid;
      margin-bottom: 0.6rem;
    }
    .toc-link {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      color: #555;
      text-decoration: none;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      padding: 0.3rem 0;
    }
    .toc-link:hover {
      color: ${catInfo.color};
      padding-left: 0.5rem;
    }
    .toc-number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background: ${catInfo.color};
      color: white;
      border-radius: 50%;
      font-size: 0.75rem;
      font-weight: 600;
      flex-shrink: 0;
    }

    /* ═══ SECCIONES DE CONTENIDO ═══ */
    .blog-content-section {
      margin-bottom: 3rem;
      scroll-margin-top: 100px;
    }
    .blog-content-section h2 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 1.25rem;
      padding-bottom: 0.75rem;
      border-bottom: 3px solid ${catInfo.color};
    }
    .section-intro {
      font-size: 1.05rem;
      color: #555;
      margin-bottom: 1.5rem;
    }
    .subsection {
      margin-bottom: 2rem;
    }
    .subsection h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .subsection h3::before {
      content: '';
      width: 4px;
      height: 20px;
      background: ${catInfo.color};
      border-radius: 2px;
    }

    /* ═══ HIGHLIGHT BOX ═══ */
    .highlight-box {
      display: flex;
      gap: 1rem;
      background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
      border-left: 4px solid #f57c00;
      border-radius: 0 12px 12px 0;
      padding: 1.25rem 1.5rem;
      margin: 1.5rem 0;
    }
    .highlight-icon {
      flex-shrink: 0;
      width: 44px;
      height: 44px;
      background: #f57c00;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .highlight-content {
      flex: 1;
    }
    .highlight-content strong {
      display: block;
      color: #e65100;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }
    .highlight-content p {
      color: #5d4037;
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.6;
    }

    /* ═══ SECCION FAQ ═══ */
    .faq-section {
      margin: 3rem 0;
      scroll-margin-top: 100px;
    }
    .faq-section > h2 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 3px solid ${catInfo.color};
    }
    .faq-container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .faq-item {
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    .faq-item:hover {
      border-color: ${catInfo.color};
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    .faq-item.active {
      border-color: ${catInfo.color};
      box-shadow: 0 4px 20px rgba(211,47,47,0.15);
    }
    .faq-question {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      font-size: 1rem;
      font-weight: 600;
      color: #1a1a1a;
      transition: all 0.2s ease;
    }
    .faq-question:hover {
      background: #f5f5f5;
    }
    .faq-icon {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      background: ${catInfo.color};
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      transition: transform 0.3s ease;
    }
    .faq-icon .icon-minus {
      display: none;
    }
    .faq-item.active .faq-icon {
      transform: rotate(180deg);
      background: #1a1a1a;
    }
    .faq-item.active .icon-plus {
      display: none;
    }
    .faq-item.active .icon-minus {
      display: block;
    }
    .faq-question-text {
      flex: 1;
    }
    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s ease, padding 0.3s ease;
    }
    .faq-item.active .faq-answer {
      max-height: 500px;
    }
    .faq-answer-content {
      padding: 0 1.5rem 1.5rem 4.5rem;
      color: #555;
      line-height: 1.7;
    }
    .faq-answer-content p {
      margin: 0;
    }

    /* ═══ CTA BOX ═══ */
    .cta-box {
      background: linear-gradient(135deg, ${catInfo.color} 0%, #b71c1c 100%);
      border-radius: 16px;
      padding: 2rem;
      margin: 3rem 0;
      color: white;
      text-align: center;
    }
    .cta-box h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    .cta-box p {
      opacity: 0.95;
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
    }
    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.9rem 1.75rem;
      border-radius: 50px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    .cta-btn-primary {
      background: white;
      color: ${catInfo.color};
    }
    .cta-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }
    .cta-btn-whatsapp {
      background: #25D366;
      color: white;
    }
    .cta-btn-whatsapp:hover {
      background: #128C7E;
      transform: translateY(-2px);
    }

    /* ═══ TAGS ═══ */
    .article-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      padding: 2rem 0;
      border-top: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
      margin: 2rem 0;
    }
    .article-tag {
      background: #f5f5f5;
      color: #555;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .article-tag:hover {
      background: ${catInfo.color};
      color: white;
    }

    /* ═══ ARTICULOS RELACIONADOS ═══ */
    .related-section {
      margin-top: 3rem;
    }
    .related-section h3 {
      font-size: 1.4rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 1.5rem;
    }
    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .related-card {
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      transition: all 0.3s ease;
      text-decoration: none;
    }
    .related-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    }
    .related-card-image {
      aspect-ratio: 16/10;
      overflow: hidden;
    }
    .related-card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .related-card:hover img {
      transform: scale(1.05);
    }
    .related-card-content {
      padding: 1.25rem;
    }
    .related-card-title {
      font-size: 1rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }
    .related-card-excerpt {
      font-size: 0.85rem;
      color: #666;
      line-height: 1.5;
    }

    /* ═══ SIDEBAR ═══ */
    .article-sidebar {
      position: sticky;
      top: 100px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .sidebar-widget {
      background: #f8f9fa;
      border-radius: 16px;
      padding: 1.5rem;
      border: 1px solid #e8e8e8;
    }
    .widget-title {
      font-size: 1rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #e0e0e0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .widget-title svg {
      color: ${catInfo.color};
    }

    /* Sidebar TOC */
    .sidebar-toc ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .sidebar-toc li {
      margin-bottom: 0.5rem;
    }
    .sidebar-toc a {
      display: block;
      padding: 0.6rem 0.75rem;
      color: #555;
      text-decoration: none;
      font-size: 0.9rem;
      border-radius: 8px;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
    }
    .sidebar-toc a:hover,
    .sidebar-toc a.active {
      background: #fff;
      color: ${catInfo.color};
      border-left-color: ${catInfo.color};
    }

    /* Sidebar CTA */
    .sidebar-cta {
      background: linear-gradient(135deg, ${catInfo.color} 0%, #b71c1c 100%);
      color: white;
      border: none;
    }
    .sidebar-cta .widget-title {
      color: white;
      border-bottom-color: rgba(255,255,255,0.3);
    }
    .sidebar-cta p {
      font-size: 0.9rem;
      margin-bottom: 1rem;
      opacity: 0.95;
    }
    .sidebar-cta-btn {
      display: block;
      text-align: center;
      background: white;
      color: ${catInfo.color};
      padding: 0.85rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    .sidebar-cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    /* Sidebar Products */
    .sidebar-product {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.85rem;
      background: #fff;
      border-radius: 10px;
      margin-bottom: 0.6rem;
      text-decoration: none;
      transition: all 0.2s ease;
      border: 1px solid #e8e8e8;
    }
    .sidebar-product:hover {
      border-color: ${catInfo.color};
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .sidebar-product:last-child {
      margin-bottom: 0;
    }
    .product-name {
      font-size: 0.9rem;
      font-weight: 500;
      color: #333;
      display: block;
    }
    .product-action {
      font-size: 0.8rem;
      color: ${catInfo.color};
    }
    .sidebar-product svg {
      color: #999;
      transition: transform 0.2s ease;
    }
    .sidebar-product:hover svg {
      color: ${catInfo.color};
      transform: translateX(3px);
    }

    /* Sidebar Contact */
    .sidebar-contact {
      background: #1a1a1a;
      color: white;
      border: none;
    }
    .sidebar-contact .widget-title {
      color: white;
      border-bottom-color: rgba(255,255,255,0.2);
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.85rem 1rem;
      background: rgba(255,255,255,0.1);
      border-radius: 10px;
      margin-bottom: 0.6rem;
      text-decoration: none;
      color: white;
      transition: all 0.2s ease;
    }
    .contact-item:hover {
      background: rgba(255,255,255,0.15);
    }
    .contact-item.whatsapp {
      background: #25D366;
    }
    .contact-item.whatsapp:hover {
      background: #128C7E;
    }
    .contact-icon {
      width: 36px;
      height: 36px;
      background: rgba(255,255,255,0.2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .contact-item.whatsapp .contact-icon {
      background: rgba(255,255,255,0.3);
    }
    .contact-text {
      flex: 1;
    }
    .contact-label {
      font-size: 0.75rem;
      opacity: 0.8;
      display: block;
    }
    .contact-value {
      font-weight: 600;
      font-size: 0.95rem;
    }

    /* Sidebar Info */
    .company-info {
      font-size: 0.9rem;
      color: #555;
      line-height: 1.7;
    }
    .company-info strong {
      color: ${catInfo.color};
    }
    .company-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
      margin-top: 1rem;
    }
    .stat-item {
      background: #fff;
      padding: 0.85rem;
      border-radius: 10px;
      text-align: center;
    }
    .stat-number {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: ${catInfo.color};
    }
    .stat-label {
      font-size: 0.75rem;
      color: #666;
    }

    /* ═══ RESPONSIVE ═══ */
    @media (max-width: 1024px) {
      .article-layout {
        grid-template-columns: 1fr;
      }
      .article-sidebar {
        position: relative;
        top: 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
      .sidebar-widget:first-child {
        display: none;
      }
      .toc-inline ol {
        columns: 1;
      }
    }
    @media (max-width: 768px) {
      .article-container {
        padding: 1rem;
      }
      .article-sidebar {
        grid-template-columns: 1fr;
      }
      .article-title {
        font-size: 1.6rem;
      }
      .article-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }
      .cta-buttons {
        flex-direction: column;
      }
      .related-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>

<!-- Schema Article -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "mainEntityOfPage": {"@type": "WebPage", "@id": "${articleUrl}"},
  "headline": "${c.hero.h1}",
  "description": "${c.seo.metaDescription}",
  "image": {"@type": "ImageObject", "url": "https://mantenimientodeextintores.mx/img/img-blog/${data.imagenesFilenames?.hero || 'default.jpg'}", "width": 1200, "height": 630},
  "author": {"@type": "Organization", "name": "MANEXT", "url": "https://mantenimientodeextintores.mx"},
  "publisher": {"@type": "Organization", "name": "MANEXT - Mantenimiento de Extintores", "logo": {"@type": "ImageObject", "url": "https://mantenimientodeextintores.mx/img/logo-manext.webp", "width": 200, "height": 60}},
  "datePublished": "${fechaISO}T10:00:00-06:00",
  "dateModified": "${fechaISO}T10:00:00-06:00",
  "articleSection": "${t.categoriaDisplay}",
  "keywords": "${c.seo.metaKeywords}"
}
</script>

<!-- Schema BreadcrumbList -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://mantenimientodeextintores.mx/"},
    {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://mantenimientodeextintores.mx/blog.html"},
    {"@type": "ListItem", "position": 3, "name": "${t.categoriaDisplay}", "item": "https://mantenimientodeextintores.mx/blog/${t.categoria}.html"},
    {"@type": "ListItem", "position": 4, "name": "${c.hero.h1.substring(0, 50)}", "item": "${articleUrl}"}
  ]
}
</script>

<!-- Schema FAQPage -->
<script type="application/ld+json">
{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": ${JSON.stringify(faqSchemaItems)}}
</script>

<body>
  <!-- MENU -->
  <div id="menu-container"></div>

  <!-- BREADCRUMBS -->
  <nav class="breadcrumbs" aria-label="Ruta de navegacion">
    <div class="container">
      <ol class="breadcrumb-list">
        <li class="breadcrumb-item">
          <a href="../../index.html">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            Inicio
          </a>
        </li>
        <li class="breadcrumb-item"><a href="../../blog.html">Blog</a></li>
        <li class="breadcrumb-item"><a href="../${t.categoria}.html">${t.categoriaDisplay}</a></li>
        <li class="breadcrumb-item active">${c.hero.h1.substring(0, 35)}...</li>
      </ol>
    </div>
  </nav>

  <!-- ARTICULO -->
  <main id="main-content">
    <article class="article-container" itemscope itemtype="https://schema.org/Article">
      <div class="article-layout">
        <!-- CONTENIDO PRINCIPAL -->
        <div class="article-main">
          <header class="article-header">
            <span class="article-category">${t.categoriaDisplay}</span>
            <h1 class="article-title" itemprop="headline">${c.hero.h1}</h1>
            <div class="article-meta">
              <span class="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                ${c.hero.tiempoLectura || '10'} min de lectura
              </span>
              <span class="meta-item" itemprop="author" itemscope itemtype="https://schema.org/Organization">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Por <span class="author-name" itemprop="name">MANEXT</span>
              </span>
            </div>
          </header>

          <figure class="article-hero">
            <img src="${imgHero}" alt="${heroAlt}" width="1200" height="630" loading="eager" fetchpriority="high" itemprop="image">
          </figure>

          <div class="article-content" itemprop="articleBody">
            <p class="article-lead">${c.introduccion.parrafo1}</p>
            <p>${c.introduccion.parrafo2}</p>

            <nav class="toc-inline" aria-label="Tabla de contenidos">
              <h2>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                Contenido del Articulo
              </h2>
              <ol>
                  ${tocHTML}
              </ol>
            </nav>

${seccionesHTML}

            <section id="preguntas-frecuentes" class="faq-section">
              <h2>Preguntas Frecuentes</h2>
              <div class="faq-container">${faqHTML}
              </div>
            </section>

            <div class="cta-box">
              <h3>${c.cta.titulo}</h3>
              <p>${c.cta.parrafo1}</p>
              <div class="cta-buttons">
                <a href="tel:5539689272" class="cta-btn cta-btn-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Llamar Ahora
                </a>
                <a href="https://wa.me/5215539689272?text=${whatsappMsg}" class="cta-btn cta-btn-whatsapp" target="_blank" rel="noopener">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                  WhatsApp
                </a>
              </div>
            </div>

            <div class="article-tags">
                ${tagsHTML}
            </div>
          </div>

          <section class="related-section">
            <h3>Articulos Relacionados</h3>
            <div id="related-articles" class="related-grid" data-category="${t.categoria}" data-current="${t.slug}">
              <!-- Cargados dinamicamente -->
            </div>
          </section>
        </div>

        <!-- SIDEBAR -->
        <aside class="article-sidebar" aria-label="Informacion complementaria">
          <!-- TOC Sidebar -->
          <div class="sidebar-widget">
            <h3 class="widget-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              En Este Articulo
            </h3>
            <nav class="sidebar-toc">
              <ul>
${tocItems.map(item => `                <li><a href="#${item.id}">${item.titulo}</a></li>`).join('\n')}
              </ul>
            </nav>
          </div>

          <!-- CTA Widget -->
          <div class="sidebar-widget sidebar-cta">
            <h3 class="widget-title">Cotizacion Gratis</h3>
            <p>Recibe una cotizacion personalizada sin compromiso para ${t.servicio.toLowerCase()}.</p>
            <a href="../../contacto.html" class="sidebar-cta-btn">Solicitar Cotizacion</a>
          </div>

          <!-- Productos Relacionados -->
          <div class="sidebar-widget">
            <h3 class="widget-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Productos Recomendados
            </h3>
            <div class="sidebar-products">
${productosHTML}
            </div>
          </div>

          <!-- Contacto Rapido -->
          <div class="sidebar-widget sidebar-contact">
            <h3 class="widget-title">Contacto Rapido</h3>
            <a href="tel:5539689272" class="contact-item">
              <span class="contact-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <span class="contact-text">
                <span class="contact-label">Llamanos</span>
                <span class="contact-value">55 3968 9272</span>
              </span>
            </a>
            <a href="https://wa.me/5215539689272?text=${whatsappMsg}" class="contact-item whatsapp" target="_blank" rel="noopener">
              <span class="contact-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              </span>
              <span class="contact-text">
                <span class="contact-label">WhatsApp</span>
                <span class="contact-value">Enviar Mensaje</span>
              </span>
            </a>
            <a href="mailto:contacto@mantenimientodeextintores.mx" class="contact-item">
              <span class="contact-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </span>
              <span class="contact-text">
                <span class="contact-label">Email</span>
                <span class="contact-value">Escribenos</span>
              </span>
            </a>
          </div>

          <!-- Info Empresa -->
          <div class="sidebar-widget">
            <h3 class="widget-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Sobre MANEXT
            </h3>
            <p class="company-info">
              <strong>MANEXT</strong> es lider en proteccion contra incendios en CDMX con mas de <strong>80 anos de experiencia</strong>. Ofrecemos venta, mantenimiento y recarga de extintores certificados NOM.
            </p>
            <div class="company-stats">
              <div class="stat-item">
                <span class="stat-number">80+</span>
                <span class="stat-label">Anos</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">15K+</span>
                <span class="stat-label">Clientes</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </article>
  </main>

  <!-- FOOTER -->
  <div id="footer-container"></div>

  <!-- Scripts -->
  <script>
    const basePath = '../../';

    // Cargar menu y footer
    fetch(basePath + 'menu.html')
      .then(r => r.text())
      .then(data => {
        document.getElementById('menu-container').innerHTML = data
          .replace(/src="(?!http|https|\\/\\/)([^"]+)"/g, 'src="' + basePath + '$1"')
          .replace(/href="(?!http|https|tel:|mailto:|#|\\/\\/)([^"]+)"/g, 'href="' + basePath + '$1"');
        document.getElementById('menu-container').querySelectorAll('script').forEach(s => {
          const ns = document.createElement('script');
          ns.textContent = s.textContent;
          s.parentNode.replaceChild(ns, s);
        });
      });

    fetch(basePath + 'footer.html')
      .then(r => r.text())
      .then(data => {
        document.getElementById('footer-container').innerHTML = data
          .replace(/src="(?!http|https|\\/\\/)([^"]+)"/g, 'src="' + basePath + '$1"')
          .replace(/href="(?!http|https|tel:|mailto:|#|\\/\\/)([^"]+)"/g, 'href="' + basePath + '$1"');
      });

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', function() {
        const item = this.closest('.faq-item');
        const isActive = item.classList.contains('active');

        // Cerrar todos
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

        // Abrir actual si no estaba activo
        if (!isActive) {
          item.classList.add('active');
          this.setAttribute('aria-expanded', 'true');
        } else {
          this.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Active TOC on scroll
    const tocLinks = document.querySelectorAll('.sidebar-toc a');
    const sections = document.querySelectorAll('.blog-content-section, .faq-section');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });

    // Cargar articulos relacionados
    fetch(basePath + 'data/articles.json')
      .then(r => r.json())
      .then(data => {
        const container = document.getElementById('related-articles');
        const currentCategory = container.dataset.category;
        const currentSlug = container.dataset.current;

        const related = data.articles
          .filter(a => a.category === currentCategory && a.slug !== currentSlug)
          .slice(0, 3);

        if (related.length === 0) {
          // Si no hay de la misma categoria, mostrar recientes
          const recent = data.articles
            .filter(a => a.slug !== currentSlug)
            .slice(0, 3);
          related.push(...recent);
        }

        const category = data.categories.find(c => c.id === currentCategory) || { name: 'Blog', color: '#d32f2f' };

        container.innerHTML = related.map(article => {
          const cat = data.categories.find(c => c.id === article.category) || category;
          return \`
            <a href="\${basePath}blog/\${article.category}/\${article.slug}.html" class="related-card">
              <div class="related-card-image">
                <img src="\${basePath}\${article.image}" alt="\${article.title}" loading="lazy">
              </div>
              <div class="related-card-content">
                <h4 class="related-card-title">\${article.title}</h4>
                <p class="related-card-excerpt">\${article.excerpt.substring(0, 100)}...</p>
              </div>
            </a>
          \`;
        }).join('');
      })
      .catch(err => {
        console.log('No se pudieron cargar articulos relacionados');
      });
  </script>
</body>
</html>`;

const jsonEntry = {
  id: t.slug,
  title: c.hero.h1,
  slug: t.slug,
  category: t.categoria,
  date: fechaISO,
  image: 'img/img-blog/' + (data.imagenesFilenames?.hero || 'default.jpg'),
  excerpt: c.seo.metaDescription,
  readTime: (c.hero.tiempoLectura || '10') + ' min',
  featured: false,
  tags: c.seo.metaKeywords.split(',').map(k => k.trim()).slice(0, 5)
};

return [{
  json: {
    ...data,
    htmlArticulo: html,
    jsonEntry: jsonEntry,
    fechaISO: fechaISO
  }
}];
