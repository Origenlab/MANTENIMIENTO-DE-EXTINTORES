// ============================================
// VALIDAR RESPUESTA v3.0 - CON REPARACION JSON
// Repara automaticamente JSON truncado o mal formado
//
// INSTRUCCIONES: Copiar este código al nodo "Validar Respuesta" en N8N
// ============================================

const response = $input.first().json;
const data = $('Constructor Prompt').first().json;
const p = data.product;
const t = data.articleType;
const heroImage = data.heroImage;
const articleId = data.articleId;
const colonias = data.colonias;

// ========================================
// FUNCION DE REPARACION DE JSON v1.0
// ========================================
function repairJSON(rawText) {
  let text = rawText
    .replace(/```json\n?/gi, '')
    .replace(/```\n?/gi, '')
    .trim();

  // Intento 1: Parsear directamente
  try {
    return JSON.parse(text);
  } catch (e1) {
    console.log('Intento 1 fallido:', e1.message);
  }

  // Intento 2: Buscar JSON valido dentro del texto
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e2) {
    console.log('Intento 2 fallido:', e2.message);
  }

  // Intento 3: Reparar string truncado en contenidoHTML
  try {
    const htmlMatch = text.match(/"contenidoHTML"\s*:\s*"/);
    if (htmlMatch) {
      const htmlStart = text.indexOf('"contenidoHTML"');
      const valueStart = text.indexOf('"', htmlStart + 15) + 1;

      let valueEnd = -1;
      let inEscape = false;
      for (let i = valueStart; i < text.length; i++) {
        if (inEscape) {
          inEscape = false;
          continue;
        }
        if (text[i] === '\\') {
          inEscape = true;
          continue;
        }
        if (text[i] === '"') {
          const nextChar = text[i + 1];
          if (nextChar === ',' || nextChar === '}' || nextChar === '\n' || nextChar === '\r') {
            valueEnd = i;
            break;
          }
        }
      }

      if (valueEnd === -1) {
        console.log('Detectado contenidoHTML truncado, reparando...');
        let htmlContent = text.substring(valueStart);

        if (!htmlContent.includes('</section>') || (htmlContent.match(/<section/g) || []).length > (htmlContent.match(/<\/section>/g) || []).length) {
          htmlContent += '</section>';
        }

        htmlContent = htmlContent.replace(/(?<!\\)"/g, '\\"');

        const beforeHTML = text.substring(0, valueStart);
        const repairedJSON = beforeHTML + htmlContent + '",\n  "faqSchema": [],\n  "tags": [],\n  "enlacesInternos": []\n}';

        return JSON.parse(repairedJSON);
      }
    }
  } catch (e3) {
    console.log('Intento 3 fallido:', e3.message);
  }

  // Intento 4: Extraer campos individuales con regex
  try {
    console.log('Intentando extraccion por campos individuales...');

    const extractField = (field, isArray = false) => {
      const regex = isArray
        ? new RegExp(`"${field}"\\s*:\\s*\\[([^\\]]*?)\\]`, 's')
        : new RegExp(`"${field}"\\s*:\\s*"([^"]*(?:\\\\.[^"]*)*)"`, 's');
      const match = text.match(regex);
      if (match) {
        if (isArray) {
          try {
            return JSON.parse('[' + match[1] + ']');
          } catch {
            return [];
          }
        }
        return match[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');
      }
      return isArray ? [] : '';
    };

    let contenidoHTML = '';
    const htmlStartMatch = text.match(/"contenidoHTML"\s*:\s*"/);
    if (htmlStartMatch) {
      const startIdx = text.indexOf(htmlStartMatch[0]) + htmlStartMatch[0].length;
      const endPatterns = ['"faqSchema"', '"tags"', '"enlacesInternos"', '"cta"'];
      let endIdx = text.length;
      for (const pattern of endPatterns) {
        const idx = text.indexOf(pattern);
        if (idx > startIdx && idx < endIdx) {
          endIdx = idx;
        }
      }
      let searchEnd = endIdx - 1;
      while (searchEnd > startIdx && text[searchEnd] !== '"') {
        searchEnd--;
      }
      if (searchEnd > startIdx) {
        contenidoHTML = text.substring(startIdx, searchEnd).replace(/\\"/g, '"').replace(/\\n/g, '\n');
      }
    }

    const extracted = {
      titulo: extractField('titulo') || 'Articulo sobre ' + p.name,
      slug: extractField('slug') || '',
      metaDescripcion: extractField('metaDescripcion') || extractField('metaDescription') || '',
      metaKeywords: extractField('metaKeywords') || '',
      breadcrumbText: extractField('breadcrumbText') || '',
      categoria: extractField('categoria') || p.categoryName,
      categoriaSlug: extractField('categoriaSlug') || p.category,
      tiempoLectura: extractField('tiempoLectura') || '15 min',
      contenidoHTML: contenidoHTML,
      faqSchema: extractField('faqSchema', true),
      tags: extractField('tags', true),
      enlacesInternos: extractField('enlacesInternos', true)
    };

    if (extracted.titulo && extracted.contenidoHTML && extracted.contenidoHTML.length > 100) {
      console.log('Extraccion exitosa por campos individuales');
      return extracted;
    }
  } catch (e4) {
    console.log('Intento 4 fallido:', e4.message);
  }

  throw new Error('No se pudo reparar el JSON. Longitud del texto: ' + text.length + '. Primeros 500 chars: ' + text.substring(0, 500));
}

// ========================================
// PARSEAR RESPUESTA DE CLAUDE
// ========================================
let content;
try {
  const rawText = response.content[0].text;
  console.log('Longitud respuesta Claude:', rawText.length);
  content = repairJSON(rawText);
  console.log('JSON parseado exitosamente');
} catch(e) {
  throw new Error('Error parseando JSON: ' + e.message);
}

// Validar campos requeridos
if (!content.titulo || content.titulo.length < 10) {
  throw new Error('Titulo invalido o muy corto: ' + (content.titulo || 'VACIO'));
}
if (!content.contenidoHTML || content.contenidoHTML.length < 500) {
  throw new Error('Contenido HTML invalido o muy corto: ' + (content.contenidoHTML ? content.contenidoHTML.length + ' chars' : 'VACIO'));
}

let html = content.contenidoHTML;

// ========================================
// CORRECCION AUTOMATICA DE TABLAS v2.0
// ========================================
console.log('=== INICIANDO VALIDACION HTML ===');

html = html.replace(/<table>/gi, '<table class="comparison-table">');
html = html.replace(/<table\s+(?!class)/gi, '<table class="comparison-table" ');

if (html.includes('<table class="comparison-table">') && !html.includes('class="table-responsive"')) {
  html = html.replace(
    /<table class="comparison-table">/g,
    '<div class="table-responsive"><table class="comparison-table">'
  );
  html = html.replace(/<\/table>/g, '</table></div>');
  console.log('CORREGIDO: Tablas envueltas en div.table-responsive');
}

// ========================================
// CORRECCION AUTOMATICA DE FAQs v2.0
// ========================================

html = html.replace(/<details>/gi, '<details class="faq-item">');
html = html.replace(/<details\s+(?!class)/gi, '<details class="faq-item" ');

html = html.replace(/<summary>/gi, '<summary class="faq-question">');
html = html.replace(/<summary\s+(?!class)/gi, '<summary class="faq-question" ');

if (html.includes('class="faq-question"') && !html.includes('class="faq-answer"')) {
  html = html.replace(
    /(<\/summary>)([\s\S]*?)(<\/details>)/gi,
    '$1<div class="faq-answer">$2</div>$3'
  );
  console.log('CORREGIDO: Respuestas envueltas en div.faq-answer');
}

if (html.includes('class="faq-item"') && !html.includes('class="faq-accordion"')) {
  const firstFaqMatch = html.match(/<details class="faq-item"/);
  if (firstFaqMatch) {
    const firstFaqIndex = html.indexOf('<details class="faq-item"');
    let lastFaqEndIndex = firstFaqIndex;

    const faqSection = html.substring(firstFaqIndex);
    const matches = faqSection.match(/<details class="faq-item">/g);
    if (matches) {
      const detailsCount = matches.length;
      let closingFound = 0;
      let pos = firstFaqIndex;
      while (closingFound < detailsCount) {
        pos = html.indexOf('</details>', pos + 1);
        if (pos > -1) {
          closingFound++;
          lastFaqEndIndex = pos + 10;
        } else {
          break;
        }
      }
    }

    html = html.slice(0, firstFaqIndex) +
           '<div class="faq-accordion">' +
           html.slice(firstFaqIndex, lastFaqEndIndex) +
           '</div>' +
           html.slice(lastFaqEndIndex);
    console.log('CORREGIDO: FAQs envueltos en div.faq-accordion');
  }
}

content.contenidoHTML = html;

// ========================================
// VERIFICACION FINAL
// ========================================
console.log('=== VALIDACION COMPLETADA ===');
console.log('Tiene table-responsive:', html.includes('table-responsive'));
console.log('Tiene comparison-table:', html.includes('comparison-table'));
console.log('Tiene faq-accordion:', html.includes('faq-accordion'));
console.log('Tiene faq-item:', html.includes('faq-item'));
console.log('Tiene faq-question:', html.includes('faq-question'));
console.log('Tiene faq-answer:', html.includes('faq-answer'));

// Aplicar valores por defecto
content.metaDescripcion = content.metaDescripcion || content.metaDescription || `Guia profesional de ${p.name} con MANEXT en CDMX. 80 anos de experiencia. Cotizacion gratis.`;
content.metaKeywords = content.metaKeywords || p.keywords.join(', ') + ', MANEXT, CDMX';
content.breadcrumbText = content.breadcrumbText || content.titulo.substring(0, 25);
content.tiempoLectura = content.tiempoLectura || '10 min';
content.faqSchema = content.faqSchema || [];
content.tags = content.tags || p.keywords.slice(0, 5);
content.enlacesInternos = content.enlacesInternos || p.relatedServices.map(s => s.url);
content.cta = content.cta || { texto: 'Solicita cotizacion', enlace: '/contacto.html' };

// Generar slug SEO optimizado
function generateSlug(text) {
  if (!text || typeof text !== 'string') return null;
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 55);
}

let slug = content.slug ? generateSlug(content.slug) : generateSlug(content.titulo);

const relevantKeywords = ['extintor', 'extintores', 'mantenimiento', 'recarga', 'prueba', 'capacitacion', 'nom'];
const hasRelevantKeyword = relevantKeywords.some(kw => slug.includes(kw));
if (!hasRelevantKeyword) {
  const keyword = p.keywords[0].split(' ')[0].toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  slug = keyword + '-' + slug;
}

slug = slug.substring(0, 60);

console.log('=== ARTICULO LISTO ===');
console.log('TITULO:', content.titulo);
console.log('SLUG:', slug);
console.log('CONTENIDO:', content.contenidoHTML.length, 'chars');

// Construir FAQ Schema JSON-LD
const faqSchemaJSON = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': content.faqSchema.map(f => ({
    '@type': 'Question',
    'name': f.pregunta,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': f.respuesta
    }
  }))
});

return [{
  json: {
    ...data,
    content,
    slug,
    articleId,
    heroImage,
    faqSchemaJSON
  }
}];
