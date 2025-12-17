// ═══════════════════════════════════════════════════════════════════════════════
// GENERADOR HTML - MANEXT BLOG v2.0
// Compatible con clases blog-post-* de style.css
// Basado en DOCUMENTO-ARTICULOS.md
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

// Mapeo de colores por categoria (para schema, el CSS maneja los colores)
const coloresCategorias = {
  'seguridad-contra-incendios': '#d32f2f',
  'tipos-de-extintores': '#f57c00',
  'mantenimiento-y-recarga': '#1976d2',
  'equipos-contra-incendio': '#7b1fa2',
  'normativas-y-certificaciones': '#00796b',
  'prevencion-empresarial': '#c62828',
  'emergencias-y-protocolos': '#e53935',
  'guias-y-comparativas': '#5e35b1',
  'industria-y-comercio': '#0288d1',
  'hogar-y-familia': '#43a047'
};
const colorCategoria = coloresCategorias[t.categoria] || '#d32f2f';

// Generar secciones HTML
let seccionesHTML = '';
let tocItems = [];

if (c.secciones && c.secciones.length > 0) {
  c.secciones.forEach((sec, idx) => {
    const secId = 'seccion-' + (idx + 1);
    tocItems.push({id: secId, titulo: sec.h2.replace(/<[^>]*>/g, '').substring(0, 50)});

    seccionesHTML += `
            <section id="${secId}" class="content-section">
              <h2>${sec.h2}</h2>`;

    if (sec.introParrafo) {
      seccionesHTML += `
              <p>${sec.introParrafo}</p>`;
    }

    if (sec.subsecciones) {
      sec.subsecciones.forEach((sub) => {
        seccionesHTML += `
              <h3>${sub.h3}</h3>
              ${sub.contenido}`;
      });
    }

    if (sec.highlightBox) {
      seccionesHTML += `
              <div class="info-box">
                <div class="info-box-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <div class="info-box-content">
                  <h4>${sec.highlightBox.titulo}</h4>
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
const tocHTML = tocItems.map(item => `<li><a href="#${item.id}">${item.titulo}</a></li>`).join('\n                ');

// Generar FAQ HTML y Schema
let faqHTML = '';
let faqSchemaItems = [];

if (c.faq && c.faq.length > 0) {
  faqHTML = c.faq.map(faq => {
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
                <details class="faq-item">
                  <summary>${faq.pregunta}</summary>
                  <div class="faq-answer">
                    <p>${respuestaLimpia}</p>
                  </div>
                </details>`;
  }).join('');
}

// Generar Tags HTML
let tagsHTML = '';
if (c.seo?.metaKeywords) {
  const tags = c.seo.metaKeywords.split(',').map(k => k.trim()).slice(0, 5);
  tagsHTML = tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('\n              ');
}

// HTML COMPLETO - Usando estructura de DOCUMENTO-ARTICULOS.md
const html = `<!DOCTYPE html>
<html lang="es-MX">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Preload -->
  <link rel="preload" href="../../css/style.css?v=15" as="style">
  <link rel="preload" href="../../img/img-blog/${data.imagenesFilenames?.hero || 'default.jpg'}" as="image">

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
  <meta property="article:modified_time" content="${fechaISO}T10:00:00-06:00">
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
</head>

<!-- Schema Article -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${articleUrl}"
  },
  "headline": "${c.hero.h1}",
  "description": "${c.seo.metaDescription}",
  "image": {
    "@type": "ImageObject",
    "url": "https://mantenimientodeextintores.mx/img/img-blog/${data.imagenesFilenames?.hero || 'default.jpg'}",
    "width": 1200,
    "height": 630
  },
  "author": {
    "@type": "Organization",
    "name": "MANEXT",
    "url": "https://mantenimientodeextintores.mx"
  },
  "publisher": {
    "@type": "Organization",
    "name": "MANEXT - Mantenimiento de Extintores",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mantenimientodeextintores.mx/img/logo-manext.webp",
      "width": 200,
      "height": 60
    }
  },
  "datePublished": "${fechaISO}T10:00:00-06:00",
  "dateModified": "${fechaISO}T10:00:00-06:00",
  "articleSection": "${t.categoriaDisplay}",
  "keywords": "${c.seo.metaKeywords}",
  "inLanguage": "es-MX"
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Inicio
          </a>
        </li>
        <li class="breadcrumb-item"><a href="../../blog.html">Blog</a></li>
        <li class="breadcrumb-item"><a href="../${t.categoria}.html">${t.categoriaDisplay}</a></li>
        <li class="breadcrumb-item active">${c.hero.h1.substring(0, 40)}...</li>
      </ol>
    </div>
  </nav>

  <!-- ARTICULO -->
  <main id="main-content">
    <article class="blog-post-article" itemscope itemtype="https://schema.org/Article">
      <div class="container">
        <div class="blog-post-layout">
          <div class="blog-post-main">
            <!-- Header del Articulo -->
            <header class="blog-post-header">
              <span class="blog-post-category">${t.categoriaDisplay}</span>
              <h1 class="blog-post-title" itemprop="headline">${c.hero.h1}</h1>
              <div class="blog-post-meta">
                <span class="blog-post-author" itemprop="author" itemscope itemtype="https://schema.org/Organization">
                  Por <span itemprop="name">MANEXT</span> - Expertos en Proteccion Contra Incendios
                </span>
                <span class="blog-post-reading-time">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  ${c.hero.tiempoLectura || '10'} min de lectura
                </span>
              </div>
            </header>

            <!-- Imagen Destacada -->
            <figure class="blog-post-featured-image">
              <img src="${imgHero}" alt="${heroAlt}" width="1200" height="630" loading="eager" fetchpriority="high" itemprop="image">
            </figure>

            <!-- Introduccion -->
            <div class="blog-post-content" itemprop="articleBody">
              <p class="article-lead">${c.introduccion.parrafo1}</p>
              <p>${c.introduccion.parrafo2}</p>

              <!-- Tabla de Contenidos -->
              <nav class="table-of-contents" aria-label="Tabla de contenidos del articulo">
                <h2>Contenido del Articulo</h2>
                <ol>
                ${tocHTML}
                </ol>
              </nav>

${seccionesHTML}

              <!-- Seccion FAQ -->
              <section id="preguntas-frecuentes" class="content-section">
                <h2>Preguntas Frecuentes</h2>
                <div class="faq-container">${faqHTML}
                </div>
              </section>

              <!-- CTA Final -->
              <div class="recommendation-box">
                <div class="recommendation-box-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div class="recommendation-box-content">
                  <h4>${c.cta.titulo}</h4>
                  <p>${c.cta.parrafo1}</p>
                  <p>${c.cta.parrafo2 || ''}</p>
                  <div class="cta-buttons">
                    <a href="tel:5539689272" class="btn btn-primary">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      Llamar Ahora
                    </a>
                    <a href="https://wa.me/5215539689272?text=${whatsappMsg}" class="btn btn-whatsapp" target="_blank" rel="noopener">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <!-- Tags -->
              <div class="blog-tags">
              ${tagsHTML}
              </div>
            </div>

            <!-- Articulos Relacionados -->
            <section class="related-articles">
              <h3>Articulos Relacionados</h3>
              <div id="related-articles" class="related-grid">
                <!-- Se cargan dinamicamente -->
              </div>
            </section>
          </div>

          <!-- SIDEBAR -->
          <aside class="blog-post-sidebar" aria-label="Informacion complementaria">
            <!-- Tabla de Contenidos Sidebar -->
            <div class="sidebar-widget toc-widget">
              <h3 class="widget-title">En Este Articulo</h3>
              <nav class="sidebar-toc">
                <ul>
${tocItems.map(item => `                  <li><a href="#${item.id}">${item.titulo}</a></li>`).join('\n')}
                </ul>
              </nav>
            </div>

            <!-- CTA Sidebar -->
            <div class="sidebar-widget cta-widget">
              <h3 class="widget-title">Cotizacion Gratis</h3>
              <p>Solicita una cotizacion sin compromiso para tus necesidades de proteccion contra incendios.</p>
              <a href="../../contacto.html" class="sidebar-cta-btn">Solicitar Cotizacion</a>
            </div>

            <!-- Servicios -->
            <div class="sidebar-widget">
              <h3 class="widget-title">Nuestros Servicios</h3>
              <ul class="sidebar-links">
                <li><a href="../../mantenimiento.html">Mantenimiento de Extintores</a></li>
                <li><a href="../../recarga.html">Recarga de Extintores</a></li>
                <li><a href="../../venta.html">Venta de Extintores</a></li>
                <li><a href="../../extintores.html">Tipos de Extintores</a></li>
              </ul>
            </div>

            <!-- Contacto Rapido -->
            <div class="sidebar-widget contact-widget">
              <h3 class="widget-title">Contacto Rapido</h3>
              <a href="tel:5539689272" class="sidebar-contact-btn phone">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                55 3968 9272
              </a>
              <a href="https://wa.me/5215539689272" class="sidebar-contact-btn whatsapp" target="_blank" rel="noopener">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </div>
    </article>
  </main>

  <!-- FOOTER -->
  <div id="footer-container"></div>

  <!-- Scripts -->
  <script>
    const basePath = '../../';

    // Cargar menu
    fetch(basePath + 'menu.html')
      .then(response => response.text())
      .then(data => {
        let adjustedData = data
          .replace(/src="(?!http|https|\\/\\/)([^"]+)"/g, 'src="' + basePath + '$1"')
          .replace(/href="(?!http|https|tel:|mailto:|#|\\/\\/)([^"]+)"/g, 'href="' + basePath + '$1"');
        document.getElementById('menu-container').innerHTML = adjustedData;
        const scripts = document.getElementById('menu-container').querySelectorAll('script');
        scripts.forEach(oldScript => {
          const newScript = document.createElement('script');
          newScript.textContent = oldScript.textContent;
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
      });

    // Cargar footer
    fetch(basePath + 'footer.html')
      .then(response => response.text())
      .then(data => {
        let adjustedData = data
          .replace(/src="(?!http|https|\\/\\/)([^"]+)"/g, 'src="' + basePath + '$1"')
          .replace(/href="(?!http|https|tel:|mailto:|#|\\/\\/)([^"]+)"/g, 'href="' + basePath + '$1"');
        document.getElementById('footer-container').innerHTML = adjustedData;
      });

    // Smooth scroll para tabla de contenidos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  </script>
  <script src="../../js/blog-system.js?v=1"></script>
  <script src="../../js/app.js"></script>
</body>
</html>`;

const jsonEntry = {
  id: t.slug,
  title: c.hero.h1,
  slug: t.slug,
  category: t.categoria,
  date: fechaISO,
  image: `img/img-blog/${data.imagenesFilenames?.hero || 'default.jpg'}`,
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
