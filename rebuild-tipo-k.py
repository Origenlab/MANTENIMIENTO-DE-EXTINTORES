#!/usr/bin/env python3
"""Rebuild tipo-k.html — NeuronWriter SEO optimization v4.0
Most severe keyword stuffing case: cocina 48→≤2, extintor 63→≤7, k 49→≤4, tipo 44→≤4
"""
import re

INPUT  = '/Users/carsolio/Desktop/PAGINAS-HTML/MANTENIMIENTO-DE-EXTINTORES/tipo-k.html'
OUTPUT = INPUT  # overwrite

with open(INPUT, 'r', encoding='utf-8') as f:
    html = f.read()

# ─── 1. Title & Meta ───
html = re.sub(
    r'<title>[^<]+</title>',
    '<title>Extintores Tipo K | Venta para Cocinas Clase K CDMX</title>',
    html
)
html = re.sub(
    r'name="description"\s*\n?\s*content="[^"]*"',
    'name="description"\ncontent="Venta de extintores Tipo K obligatorios para cocinas comerciales. Agente húmedo con saponificación. 6 modelos certificados NOM. Envío CDMX. Cotiza ahora."',
    html
)

# ─── 2. OG & Twitter tags ───
html = re.sub(
    r'og:title"\s*content="[^"]*"',
    'og:title" content="Extintores Tipo K | Venta para Cocinas Clase K CDMX"',
    html
)
html = re.sub(
    r'og:description"\s*content="[^"]*"',
    'og:description" content="Venta de equipos de agente húmedo avalados NOM-154. 6 modelos para establecimientos gastronómicos. Envío CDMX."',
    html
)
html = re.sub(
    r'og:image:alt"\s*content="[^"]*"',
    'og:image:alt" content="MANEXT Equipos Clase K"',
    html
)
html = re.sub(
    r'twitter:title"\s*content="[^"]*"',
    'twitter:title" content="Extintores Tipo K | Venta para Cocinas Clase K CDMX"',
    html
)
html = re.sub(
    r'twitter:description"\s*content="[^"]*"',
    'twitter:description" content="Venta de equipos de agente húmedo avalados NOM-154. 6 modelos para establecimientos gastronómicos. Envío CDMX."',
    html
)

# ─── 3. Schema: CollectionPage → Product ───
html = re.sub(
    r'"@type":\s*"CollectionPage"[^}]*\}[^}]*\}',
    '"@type": "Product","name": "Extintores Tipo K","description": "Venta de extintores tipo K de agente húmedo certificados NOM-154-SCFI para cocinas comerciales","brand": {"@type": "Brand","name": "MANEXT"},"offers": {"@type": "AggregateOffer","priceCurrency": "MXN","availability": "https://schema.org/InStock"}',
    html
)

# ─── 4. Add section-redesign.css if missing ───
if 'section-redesign.css' not in html:
    html = html.replace(
        'css/mobile-enhancements.css?v=1">',
        'css/mobile-enhancements.css?v=1"><link rel="stylesheet" href="css/section-redesign.css?v=1">'
    )

# ─── 5. Extract immutable parts ───
# Header+nav: everything from </head><body> to just before the category-hero/breadcrumb content section
nav_end_marker = '</script><nav class="breadcrumbs"'
nav_end_idx = html.find(nav_end_marker)
header_nav = html[:nav_end_idx + len('</script>')]

# Footer
footer_marker = '<footer>'
footer_idx = html.find(footer_marker)
footer = html[footer_idx:]

# Contact form — extract the full contact-form-section
contact_start = '<section class="contact-form-section">'
contact_end_marker = '</section>'
cs = html.find(contact_start)
# Find the closing </section> for the contact form
ce = html.find(contact_end_marker, cs) + len(contact_end_marker)
contact_form = html[cs:ce]

# Update contact form H2
contact_form = contact_form.replace(
    'Solicita una Cotización de Extintores Tipo K',
    'Solicita Cotización como Distribuidor Avalado en CDMX'
)
# Update contact form intro
contact_form = re.sub(
    r'<p class="contact-intro">\s*[^<]+</p>',
    '<p class="contact-intro">\nCompleta el formulario y nos pondremos en contacto contigo inmediatamente vía WhatsApp para brindarte la mejor cotización en equipos de agente húmedo avalados NOM-154-SCFI para establecimientos gastronómicos y áreas de preparación de alimentos.\n</p>',
    contact_form
)

# ─── 6. Build new body ───
new_body = '''<nav class="breadcrumbs" aria-label="Navegación de migas de pan"><div class="container"><ol class="breadcrumb-list"><li class="breadcrumb-item"><a href="https://mantenimientodeextintores.mx/"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
Inicio
</a></li><li class="breadcrumb-item"><a href="catalogo.html">Catálogo</a></li><li class="breadcrumb-item"><span>Agente Húmedo (Tipo K)</span></li></ol></div></nav><section class="hero"><div class="hero-content"><div class="container"><div class="hero-grid"><div class="hero-left"><h1 class="hero-title">
Extintores Tipo K para Cocinas — Venta Clase K | CDMX
</h1><p class="hero-subtitle">
Equipos de agente húmedo avalados NOM-154 con envío inmediato
</p><p class="hero-description">
Distribuidor autorizado de dispositivos de agente húmedo obligatorios para establecimientos gastronómicos con freidoras. 5 modelos desde 2.5 hasta 18 litros. Producto avalado NOM-002-STPS y NOM-154-SCFI. Envío sin costo en CDMX y Estado de México.
</p><div class="hero-buttons"><a href="tel:5539689272" class="btn btn-primary"
>Llamar: 55 3968 9272</a
><a
href="https://wa.me/5215539689272?text=Hola%2C%20necesito%20cotización%20de%20extintores%20tipo%20K%20para%20mi%20empresa"
class="btn btn-whatsapp"
target="_blank"
rel="noopener"
>Cotizar por WhatsApp</a
></div></div><div class="hero-right"><div class="hero-text"><p class="hero-paragraph">
Con más de <strong>30 años de experiencia</strong> en protección contra incendios, somos <strong>distribuidor</strong> avalado de cilindros de <strong>acero inoxidable</strong> con <strong>agente húmedo</strong> a <strong>base</strong> de <strong>acetato de potasio</strong>. Cada unidad incluye boquilla de aspersión especial, manómetro, manguera de aplicación y aval NOM-154-SCFI. La <strong>venta</strong> incluye colocación profesional, <a href="senalizacion.html">señalización</a> de <strong>emergencia</strong> y documentación para auditorías de <strong>protección civil</strong>. <strong>Sistema</strong> de supresión diseñado exclusivamente para áreas de preparación de alimentos con <strong>aceites y grasas calientes</strong>.
</p></div></div></div></div></div></section>

<section class="rd-section"><div class="container">
<div class="rd-header">
<h2>¿Qué Son los Extintores Clase K y Por Qué Son Obligatorios?</h2>
</div>
<div class="rd-card">
<p>Un cilindro de seguridad que contiene compuesto alcalino en solución acuosa — al descargar sobre sustancias oleosas ardientes, genera una reacción química llamada saponificación que convierte los lípidos en jabón, sellando la superficie e impidiendo el contacto con oxígeno. Es el único <strong>producto</strong> avalado por la <strong>norma</strong> NOM-002-STPS para áreas donde se manipulan grasas vegetales a alta temperatura. La descarga enfría rápidamente por debajo del punto de ignición y previene reignición incluso en freidoras industriales.</p>
</div>
<div class="rd-grid-2">
<div class="rd-card">
<h3>Tecnología de Saponificación para Aceites y Grasas Calientes</h3>
<p>El compuesto de potasio reacciona con los lípidos ardientes creando una capa espumosa de jabón que sella la superficie del recipiente. Este proceso absorbe calor masivamente, reduciendo la temperatura del líquido oleoso por debajo de 350 °C en segundos. Ningún otro agente de supresión logra esta reacción — los dispositivos ABC esparcen las sustancias oleosas provocando salpicaduras explosivas.</p>
</div>
<div class="rd-card">
<h3>Obligatorio por NOM-002-STPS en Establecimientos Gastronómicos</h3>
<p>La regulación laboral exige al menos un equipo de agente húmedo a distancia máxima de 9 metros de cada freidora o área de preparación con lípidos. Protección civil verifica el cumplimiento en inspecciones y puede clausurar negocios sin la unidad reglamentaria. Aplica a restaurantes, hoteles, hospitales, comedores y servicios de catering con <strong>cocina tipo k</strong>.</p>
</div>
</div>
<div class="rd-card">
<h3>Cilindro de Acero Inoxidable Resistente al Calor</h3>
<p>Fabricado en <strong>acero inoxidable</strong> grado alimentario resistente a la corrosión por vapor y humedad de áreas de preparación. Válvula de latón cromado con manómetro indicador de carga. Boquilla de aspersión diseñada para aplicar el compuesto en forma de lluvia suave, evitando salpicaduras del líquido oleoso ardiente. Cada <strong>producto</strong> incluye soporte de pared y documentación de cumplimiento.</p>
</div>
</div></section>

<section class="rd-section rd-section--gray"><div class="container">
<div class="rd-header">
<h2>Modelos Disponibles — Venta de Equipo contra Incendios Clase K</h2>
</div>
<table class="rd-price-table">
<thead><tr>
<th>Modelo</th>
<th>Capacidad</th>
<th>Uso Recomendado</th>
<th>Alcance</th>
</tr></thead><tbody>
<tr><td>Compacto</td><td>2.5 litros</td><td>Establecimientos pequeños, 1-2 freidoras</td><td>2-3 m</td></tr>
<tr><td>Estándar</td><td><strong>capacidad de 6</strong> litros</td><td>Restaurantes medianos (más vendido)</td><td>3-5 m</td></tr>
<tr><td>Intermedio</td><td>9 l</td><td>Áreas de preparación industriales</td><td>5-7 m</td></tr>
<tr><td>Reforzado</td><td>12 litros</td><td>Hoteles y cadenas</td><td>7-10 m</td></tr>
<tr><td>Gran formato</td><td>18 litros</td><td>Comedores masivos, catering</td><td>10-12 m</td></tr>
</tbody></table>
<div class="rd-grid-2">
<div class="rd-card">
<h3>Modelos de 2.5 a 6 Litros para Restaurantes y Cafeterías</h3>
<p>Los cilindros de <strong>6 l</strong> son los más solicitados por establecimientos en CDMX. Cumplen los requerimientos de la autoridad competente para locales con hasta 5 equipos de preparación con lípidos. Cada dispositivo incluye soporte de pared, señalización y documentación de cumplimiento. El modelo de <strong>tipo k 6 litros</strong> ofrece la mejor relación costo-cobertura.</p>
</div>
<div class="rd-card">
<h3>Cilindros de 9 a 18 Litros para Hoteles e Industria</h3>
<p>Unidades de gran formato con manguera reforzada y aplicador de larga distancia. Ideales para hoteles, casinos, comedores hospitalarios y centros de catering con múltiples freidoras. Nuestro personal capacitado realiza análisis de riesgos y diseña la distribución óptima según la normativa vigente.</p>
</div>
</div>
</div></section>

<section class="rd-section"><div class="container">
<div class="rd-header">
<h2>Clasificación de Incendios y Compatibilidad del Agente Húmedo</h2>
</div>
<div class="rd-card">
<p>El agente húmedo solo es apto para conatos con sustancias oleosas vegetales a alta temperatura — la categoría designada para grasas de establecimientos gastronómicos. <strong>NUNCA</strong> debe usarse en combustibles sólidos (categoría A), líquidos industriales como gasolina o solventes (categoría B), ni aparatos eléctricos energizados (categoría C). Para el área de servicio fuera de la zona de freidoras, complementa con <a href="polvo-quimico-seco.html">dispositivos de agente seco multipropósito</a>. En áreas con aparatos electrónicos sensibles, considera <a href="co2.html">cilindros de gas carbónico</a>.</p>
</div>
</div></section>

<section class="rd-section rd-section--gray"><div class="container">
<div class="rd-header">
<h2>Venta, Envío e Instalación en CDMX y Zona Metropolitana</h2>
</div>
<div class="rd-grid-2">
<div class="rd-card">
<h3>¿Cómo Comprar tu Equipo de Agente Húmedo?</h3>
<p><strong>Comprar</strong> es sencillo: cotiza por WhatsApp o llamada, recibe propuesta con <strong>precio</strong> unitario y descuentos por volumen en minutos. El envío y colocación es sin costo adicional en toda la zona metropolitana. Aceptamos transferencia, tarjeta y crédito a 30 días para empresas. Como <strong>distribuidor</strong> avalado, cada <strong>venta</strong> incluye documentación oficial para auditorías.</p>
</div>
<div class="rd-card">
<h3>Servicio Técnico y Recarga Anual</h3>
<p>Todos los cilindros son recargables: el compuesto se renueva cada 12 meses o tras cualquier uso parcial — el agente húmedo puede separarse o degradarse con el tiempo. Ofrecemos <a href="recarga-de-extintores.html">servicio de recarga</a> a domicilio con préstamo de unidades. El <a href="mantenimiento-preventivo.html">mantenimiento preventivo</a> trimestral detecta cuándo renovar el compuesto antes de la fecha límite.</p>
</div>
</div>
</div></section>

<section class="rd-section"><div class="container">
<div class="rd-header">
<h2>Comparativa: Agente Húmedo vs Otros Dispositivos de Supresión</h2>
</div>
<table class="rd-price-table">
<thead><tr>
<th>Agente</th>
<th>Clases</th>
<th>Ventaja Principal</th>
<th>Ideal Para</th>
</tr></thead><tbody>
<tr><td><strong>Agente húmedo (K)</strong></td><td>K</td><td>Saponificación de lípidos</td><td>Freidoras, establecimientos gastronómicos</td></tr>
<tr><td><a href="polvo-quimico-seco.html">Polvo químico seco</a></td><td>A, B, C</td><td>Multipropósito</td><td>Áreas generales del negocio</td></tr>
<tr><td><a href="co2.html">Gas carbónico</a></td><td>B, C</td><td>Sin rastro</td><td>Aparatos electrónicos</td></tr>
<tr><td><a href="agua-presion.html">Agua presurizada</a></td><td>A</td><td>Máximo enfriamiento</td><td>Bodegas sin riesgo eléctrico</td></tr>
<tr><td>Espuma AFFF</td><td>A, B</td><td>Película sellante</td><td>Hidrocarburos industriales</td></tr>
</tbody></table>
<div class="rd-card">
<p>Para establecimientos donde conviven freidoras con áreas de servicio general, la combinación de un cilindro de agente húmedo junto con un dispositivo multipropósito ABC ofrece cobertura completa. Nuestro personal técnico diseña el esquema óptimo según el análisis de peligros por zona.</p>
</div>
</div></section>

<section class="faq"><div class="container"><div class="section-header"><h2>Preguntas Frecuentes — Equipos de Agente Húmedo</h2><p class="section-subtitle">
Dudas sobre modelos, normativa, recarga y compatibilidad
</p></div><div class="faq-grid"><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Qué es un extintor clase K y cómo funciona la saponificación?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Qué es un extintor clase K y cómo funciona la saponificación?</h3><p>
Es un dispositivo portátil que contiene solución alcalina de acetato de potasio. Al descargar sobre sustancias oleosas ardientes, el compuesto genera una reacción de saponificación: convierte los lípidos en jabón, creando una capa espumosa que sella la superficie, absorbe calor y previene reignición. Es el único equipo contra incendios avalado para áreas de preparación con grasas vegetales a alta temperatura. También conocido como <strong>extintores clase k</strong>, cada unidad incluye boquilla de aspersión especial diseñada para evitar salpicaduras.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Dónde es obligatorio instalar un equipo de cocina tipo K?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Dónde es obligatorio instalar un equipo de cocina tipo K?</h3><p>
En todo establecimiento con freidoras o áreas de preparación con sustancias oleosas a alta temperatura: restaurantes, hoteles, hospitales, comedores, servicios de catering, food courts y cualquier negocio gastronómico. La NOM-002-STPS exige al menos un cilindro a máximo 9 metros de recorrido desde cada freidora. Protección civil verifica el cumplimiento y puede clausurar negocios sin la unidad reglamentaria avalada.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Qué sustancias oleosas y grasas calientes apaga este dispositivo?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Qué sustancias oleosas y grasas calientes apaga este dispositivo?</h3><p>
Exclusivamente lípidos vegetales y animales a alta temperatura: aceite de canola, soya, girasol, palma, manteca y mantequilla fundida utilizados en freidoras, sartenes y planchas. No funciona en hidrocarburos industriales (gasolina, solventes) ni en grasas minerales. Para conatos con combustibles líquidos industriales, usa espuma AFFF o agente seco multipropósito.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Cuánto cuesta un equipo de agente húmedo de 6 litros?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Cuánto cuesta un equipo de agente húmedo de 6 litros?</h3><p>
El <strong>precio</strong> varía según modelo: desde $2,800 para unidades de 2.5 litros hasta $8,500+ para cilindros de 18 litros con base rodante. El modelo de seis litros es el más solicitado para establecimientos medianos. Cada unidad incluye soporte de pared, señalización, documentación NOM y colocación profesional. Cotiza al 55 3968 9272 para valores exactos. Descuentos por volumen disponibles.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Qué tamaño necesito según mi establecimiento?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Qué tamaño necesito según mi establecimiento?</h3><p>
Depende del número de freidoras y tamaño del área de preparación: 2.5 litros para 1-2 freidoras, 6 litros para restaurantes medianos (más vendido), 9 litros para áreas de preparación amplias, 12 litros para hoteles y cadenas, y 18 litros rodante para comedores masivos. La normativa exige 1 unidad cada 9 metros de recorrido desde cada equipo con sustancias oleosas. Realizamos análisis de riesgos gratuito en CDMX.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Puedo usar un dispositivo ABC en lugar del agente húmedo?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Puedo usar un dispositivo ABC en lugar del agente húmedo?</h3><p>
No. El polvo seco no genera saponificación y puede esparcir los lípidos ardientes provocando salpicaduras explosivas que agravan el incendio y causan quemaduras graves al operador. La normativa prohíbe usar dispositivos ABC como sustituto en áreas con freidoras. Los establecimientos necesitan ambos: agente húmedo cerca de freidoras y ABC en las áreas generales de servicio, salón y bodega. La combinación garantiza cobertura completa ante cualquier escenario de emergencia.
</p></div></div></div></div></section>


<section class="rd-section rd-section--gray"><div class="container">
<div class="rd-header">
<h2>Protección Obligatoria contra Incendios en Establecimientos Gastronómicos</h2>
</div>
<div class="rd-card">
<p>Con más de 30 años en el sector, instalamos soluciones de protección contra incendios específicas para áreas de preparación de alimentos en CDMX y zona metropolitana. Cada proyecto incluye análisis de riesgos, distribución óptima de unidades, <a href="senalizacion.html">señalización</a> de restricciones y <a href="capacitacion-brigadas.html">formación</a> del personal en el uso correcto del aparato y la técnica de descarga segura sobre sustancias oleosas. Nuestro compromiso: que tu establecimiento cumpla la normativa con la inversión más eficiente del mercado.</p>
</div>
</div></section>

'''

# ─── 7. Assemble final HTML ───
final_html = header_nav + new_body + contact_form + '\n' + footer

with open(OUTPUT, 'w', encoding='utf-8') as f:
    f.write(final_html)

print(f"✅ tipo-k.html rebuilt successfully")
print(f"   Output: {OUTPUT}")
