#!/usr/bin/env python3
"""Rebuild agua-presion.html — NeuronWriter SEO optimization v4.0"""

import re

INPUT  = 'agua-presion.html'
OUTPUT = 'agua-presion.html'

with open(INPUT, 'r', encoding='utf-8') as f:
    html = f.read()

# ── 1. META UPDATES ──────────────────────────────────────────────────────────
# Title
html = html.replace(
    '<title>Extintores de Agua a Presión Certificados | Clase A CDMX</title>',
    '<title>Extintores de Agua a Presión | Venta Clase A CDMX</title>'
)

# Meta description
html = re.sub(
    r'name="description"\s*\n\s*content="[^"]*"',
    'name="description"\ncontent="Venta de extintores de agua a presión certificados NOM-154. 6 modelos portátiles para fuegos Clase A en bodegas y almacenes. Envío CDMX. Cotiza ahora."',
    html
)

# OG tags
html = html.replace(
    'og:title" content="Extintores de Agua a Presión - MANEXT"',
    'og:title" content="Extintores de Agua a Presión | Venta Clase A CDMX"'
)
html = html.replace(
    'og:description" content="Extintores de Agua a Presión certificados NOM. Especializados para fuegos Clase A. 5 modelos desde 2.5L hasta 50L. Entrega CDMX."',
    'og:description" content="Venta de cilindros de H2O presurizada avalados NOM-154. 6 modelos portátiles para fuegos Clase A en bodegas y almacenes. Envío CDMX."'
)

# Twitter tags
html = html.replace(
    'twitter:title" content="Extintores de Agua a Presión - MANEXT"',
    'twitter:title" content="Extintores de Agua a Presión | Venta Clase A CDMX"'
)
html = html.replace(
    'twitter:description" content="Extintores de Agua a Presión certificados NOM. Especializados para fuegos Clase A. 5 modelos desde 2.5L hasta 50L. Entrega CDMX."',
    'twitter:description" content="Venta de cilindros de H2O avalados NOM-154. 6 modelos portátiles para bodegas y almacenes. Envío CDMX."'
)

# ── 2. SCHEMA: CollectionPage → Product ──────────────────────────────────────
html = html.replace(
    '"@type": "CollectionPage","name": "Extintores de Agua a Presión","description": "Extintores de Agua a Presión certificados NOM-154-SCFI para fuegos Clase A","provider": {"@type": "Organization","name": "MANEXT","url": "https://mantenimientodeextintores.mx"}',
    '"@type": "Product","name": "Extintores de Agua a Presión","description": "Venta de extintores de agua a presión certificados NOM-154-SCFI para fuegos Clase A en bodegas y almacenes","brand": {"@type": "Brand","name": "MANEXT"},"offers": {"@type": "AggregateOffer","priceCurrency": "MXN","availability": "https://schema.org/InStock"}'
)

# ── 3. ADD section-redesign.css ──────────────────────────────────────────────
if 'section-redesign.css' not in html:
    html = html.replace(
        '<link rel="stylesheet" href="css/mobile-enhancements.css?v=1">',
        '<link rel="stylesheet" href="css/mobile-enhancements.css?v=1"><link rel="stylesheet" href="css/section-redesign.css?v=1">'
    )

# ── 4. EXTRACT IMMUTABLE PARTS ──────────────────────────────────────────────
# Header/Nav: everything up to </nav>
nav_end = html.find('</nav>') + len('</nav>')
header_part = html[:nav_end]

# Contact form section
form_start_marker = '<section class="contact-form-section">'
form_start = html.find(form_start_marker)
# Find end of contact form section
form_section_end = html.find('</section>', form_start) + len('</section>')
contact_form = html[form_start:form_section_end]

# Footer
footer_start = html.find('<footer>')
footer_part = html[footer_start:]

# ── 5. NEW BODY CONTENT ─────────────────────────────────────────────────────
new_body = '''<section class="hero"><div class="hero-content"><div class="container"><div class="hero-grid"><div class="hero-left"><h1 class="hero-title">
Extintores de Agua a Presión — Venta Clase A | CDMX
</h1><p class="hero-subtitle">
Cilindros de H2O presurizada avalados NOM-154 con envío inmediato
</p><p class="hero-description">
Distribuidor autorizado de dispositivos de H2O presurizada para fuegos de materiales sólidos combustibles. 6 modelos portátiles desde 2.5 hasta 50 litros. Producto ideal para bodegas, almacenes y centros logísticos sin riesgo eléctrico. Envío sin costo en CDMX y Estado de México.
</p><div class="hero-buttons"><a href="tel:5539689272" class="btn btn-primary"
>Llamar: 55 3968 9272</a
><a
href="https://wa.me/5215539689272?text=Hola%2C%20necesito%20cotización%20de%20extintores%20de%20agua%20para%20mi%20empresa"
class="btn btn-whatsapp"
target="_blank"
rel="noopener"
>Cotizar por WhatsApp</a
></div></div><div class="hero-right"><div class="hero-text"><p class="hero-paragraph">
Con más de <strong>30 años de experiencia</strong> en protección contra incendios, somos <strong>proveedor</strong> avalado de cilindros fabricados en lámina de acero <strong>rolada en frío</strong> con <strong>recubrimiento químico</strong> anticorrosivo y <strong>pintura</strong> horneada. Cada unidad <strong>portátil</strong> incluye manómetro, manguera de descarga y aval NOM-154-SCFI. También conocidos como <strong>extinguidores</strong> o <strong>extin-agua</strong>, todos nuestros modelos son <strong>recargables</strong> y aptos para <strong>extinguir</strong> conatos en materiales sólidos sin dejar contaminantes — el agente es <strong>biodegradable</strong> y libre de impurezas.
</p></div></div></div></div></div></section>

<section class="rd-section"><div class="container">
<div class="rd-header">
<h2>¿Qué Es un Dispositivo de H2O Presurizada y Por Qué Elegirlo?</h2>
</div>
<div class="rd-card">
<p>Un cilindro de seguridad cargado a base de líquido presurizado con nitrógeno seco. Al descargar, el fluido penetra en materiales sólidos ardientes — papel, madera, textiles, cartón — absorbiendo calor y eliminando brasas internas que otros agentes no alcanzan. Es la opción más económica y especializada para áreas con riesgo exclusivo de combustión de sólidos (categoría A).</p>
</div>
<div class="rd-grid-2">
<div class="rd-card">
<h3>Alto Poder de Enfriamiento para Fuegos Clase A</h3>
<p>El agente hídrico absorbe más calor por gramo que cualquier otro compuesto de supresión. Penetra en materiales porosos como madera y cartón, enfriando desde el interior y previniendo reignición. Un solo cilindro de 9 l cubre hasta 100 m² de bodega con materiales combustibles sólidos.</p>
</div>
<div class="rd-card">
<h3>Opción Económica con Certificación NOM-154</h3>
<p>El <strong>precio</strong> de adquisición y <strong>recarga</strong> es el más bajo del mercado frente a PQS, CO2 o agentes limpios. Cada unidad incluye <strong>ficha</strong> técnica, <a href="senalizacion.html">señalización</a> de advertencia y documentación avalada para auditorías de <strong>protección civil</strong>.</p>
</div>
</div>
<div class="rd-card">
<h3>Cilindro Portátil Resistente a la Acción Corrosiva del Agua</h3>
<p>Fabricado en lámina de acero al carbón con tratamiento interno resistente a la acción corrosiva del líquido y libres de óxido. Exterior con pintura electrostática horneada. Modelos portátiles de importación de acero con válvula de bronce y manómetro indicador de carga. El cilindro puede contener <strong>aditivo</strong> anticongelante para instalaciones con temperaturas bajo cero.</p>
</div>
</div></section>

<section class="rd-section rd-section--gray"><div class="container">
<div class="rd-header">
<h2>Modelos Disponibles — Venta de Cilindros de H2O Presurizada</h2>
</div>
<table class="rd-price-table">
<thead><tr>
<th>Modelo</th>
<th>Capacidad</th>
<th>Uso Recomendado</th>
<th>Alcance</th>
</tr></thead><tbody>
<tr><td>Compacto</td><td>2.5 litros</td><td>Oficinas, despachos</td><td>3-5 m</td></tr>
<tr><td>Estándar</td><td><strong>6 litros</strong></td><td>Áreas de empaque (más vendido)</td><td>5-7 m</td></tr>
<tr><td>Intermedio</td><td>9 l</td><td>Bodegas medianas</td><td>7-10 m</td></tr>
<tr><td>Reforzado</td><td>12 litros</td><td>Almacenes amplios</td><td>10-12 m</td></tr>
<tr><td>Gran capacidad</td><td>18 litros</td><td>Centros logísticos</td><td>12-15 m</td></tr>
<tr><td>Carretilla industrial</td><td>50 litros</td><td>Naves y fábricas</td><td>15-20 m</td></tr>
</tbody></table>
<div class="rd-grid-2">
<div class="rd-card">
<h3>Modelos de 2.5 a 9 Litros para Oficinas y Comercios</h3>
<p>Los cilindros de 6 litros son los más solicitados por establecimientos en CDMX. Cumplen los requerimientos de la autoridad competente para locales de riesgo ordinario con materiales sólidos. Cada dispositivo incluye soporte de pared, señalización y documentación de cumplimiento. El <strong>extintor portátil</strong> de 9 l ofrece mayor autonomía para bodegas medianas.</p>
</div>
<div class="rd-card">
<h3>Cilindros de 12 a 50 Litros para Bodegas e Industria</h3>
<p>Unidades de gran capacidad con manguera reforzada y base rodante incluida. Ideales para naves <strong>industrial</strong>es, almacenes de papel, carpinterías y centros de distribución. Nuestro personal capacitado realiza análisis de riesgos y diseña la distribución óptima según la <strong>nom</strong>ativa vigente.</p>
</div>
</div>
</div></section>

<section class="rd-section"><div class="container">
<div class="rd-header">
<h2>Clasificación de Fuegos y Compatibilidad del Agente Hídrico</h2>
</div>
<div class="rd-card">
<p>El líquido presurizado solo es apto para conatos de <strong>categoría A</strong> — materiales sólidos como madera, papel, textiles y cartón. <strong>NUNCA</strong> debe usarse en emergencias con líquidos inflamables (categoría B), aparatos eléctricos energizados (categoría C) ni aceites de cocina (categoría K). El fluido conduce electricidad y puede causar electrocución mortal; en contacto con aceites calientes provoca salpicaduras explosivas. Para áreas con riesgo mixto, complementa con <a href="co2.html">cilindros de gas carbónico</a> o <a href="polvo-quimico-seco.html">dispositivos de agente seco multipropósito</a>.</p>
</div>
</div></section>

<section class="rd-section rd-section--gray"><div class="container">
<div class="rd-header">
<h2>Venta, Envío e Instalación en CDMX y Zona Metropolitana</h2>
</div>
<div class="rd-grid-2">
<div class="rd-card">
<h3>¿Cómo Comprar tu Cilindro de H2O?</h3>
<p><strong>Comprar</strong> es sencillo: cotiza por WhatsApp o llamada, recibe propuesta con precio unitario y descuentos por volumen en minutos. El envío y colocación es sin costo adicional en toda la zona metropolitana. Aceptamos transferencia, tarjeta y crédito a 30 días para <strong>empresa</strong>s. Como <strong>distribuidor</strong> avalado, cada <strong>venta</strong> incluye documentación oficial para auditorías.</p>
</div>
<div class="rd-card">
<h3>Servicio Técnico y Recarga Anual</h3>
<p>Todos los cilindros son recargables: el agente se renueva cada 12 meses o tras cualquier uso parcial. Ofrecemos <a href="recarga-de-extintores.html">servicio de recarga</a> a domicilio con préstamo de unidades. El <a href="mantenimiento-preventivo.html">mantenimiento preventivo</a> trimestral detecta cuándo <strong>cargar</strong> el cilindro antes de la fecha límite. La prueba hidrostática quinquenal verifica la integridad estructural del recipiente.</p>
</div>
</div>
</div></section>

<section class="rd-section"><div class="container">
<div class="rd-header">
<h2>Comparativa: Agente Hídrico vs Otros Dispositivos de Supresión</h2>
</div>
<table class="rd-price-table">
<thead><tr>
<th>Agente</th>
<th>Clases</th>
<th>Ventaja Principal</th>
<th>Ideal Para</th>
</tr></thead><tbody>
<tr><td><strong>H2O presurizada</strong></td><td>A</td><td>Máximo enfriamiento, económico</td><td>Bodegas, almacenes, papeleras</td></tr>
<tr><td><a href="polvo-quimico-seco.html">Polvo químico seco</a></td><td>A, B, C</td><td>Multipropósito</td><td>Comercios, oficinas generales</td></tr>
<tr><td><a href="co2.html">Gas carbónico</a></td><td>B, C</td><td>Sin rastro</td><td>Data centers, electrónica</td></tr>
<tr><td><a href="tipo-k.html">Tipo K</a></td><td>K</td><td>Saponificación de aceites</td><td>Cocinas comerciales</td></tr>
<tr><td>Espuma AFFF</td><td>A, B</td><td>Película sellante</td><td>Gasolineras, petroquímicas</td></tr>
</tbody></table>
<div class="rd-card">
<p>Para instalaciones donde conviven materiales sólidos con aparatos eléctricos, la combinación de un cilindro hídrico junto con un dispositivo de gas carbónico ofrece cobertura completa sin riesgo. Nuestro personal técnico diseña el esquema óptimo según el análisis de peligros por zona.</p>
</div>
</div></section>

<section class="faq"><div class="container"><div class="section-header"><h2>Preguntas Frecuentes — Cilindros de H2O Presurizada</h2><p class="section-subtitle">
Dudas sobre modelos, normativa, recarga y compatibilidad
</p></div><div class="faq-grid"><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Qué es un cilindro de H2O presurizada y cómo funciona?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Qué es un cilindro de H2O presurizada y cómo funciona?</h3><p>
Es un dispositivo portátil que almacena líquido impulsado con nitrógeno seco. Al activar la válvula, el fluido sale a carga constante por la manguera, enfriando el material en combustión y penetrando en las brasas internas. También conocido como extin-agua presion, es el aparato más económico y eficaz para conatos de materiales sólidos — papel, madera, textiles, cartón — en bodegas y almacenes sin riesgo eléctrico.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Qué tipo de incendio apaga un dispositivo de líquido presurizado?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Qué tipo de incendio apaga un dispositivo de líquido presurizado?</h3><p>
Exclusivamente fuegos de categoría A — materiales sólidos combustibles. No funciona en conatos de líquidos inflamables (categoría B) porque el fluido se hunde y esparce las llamas. Es peligroso en aparatos eléctricos energizados (categoría C) porque conduce corriente. Para cocinas con aceite (categoría K) causa salpicaduras explosivas. Si tu instalación tiene riesgos mixtos, complementa con un dispositivo multipropósito ABC.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Cuáles son los dispositivos a base de H2O disponibles?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Cuáles son los dispositivos a base de H2O disponibles?</h3><p>
Ofrecemos 6 modelos: compacto de 2.5 litros para despachos, estándar de 6 litros (más vendido) para áreas de empaque, intermedio de 9 l para bodegas medianas, reforzado de 12 litros para almacenes, gran capacidad de 18 litros para centros logísticos y carretilla industrial de 50 litros para naves y fábricas. Todos con aval NOM-154-SCFI y envío sin costo en CDMX.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Cuánto cuesta un cilindro de H2O presurizada?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Cuánto cuesta un cilindro de H2O presurizada?</h3><p>
El precio varía según capacidad: desde $450 para modelos de 2.5 litros hasta $3,500+ para unidades de 50 litros con base rodante. Cada producto incluye soporte de pared, señalización, documentación NOM y colocación profesional. Cotiza al 55 3968 9272 para valores exactos. Descuentos disponibles por volumen.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Se puede usar el agente hídrico en conatos eléctricos?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Se puede usar el agente hídrico en conatos eléctricos?</h3><p>
No. El líquido conduce electricidad y puede causar electrocución mortal al operador. Nunca descargar sobre tableros, cableado energizado, servidores ni aparatos conectados a corriente. Para áreas con riesgo eléctrico usa gas carbónico o agente seco multipropósito. La señalización de restricciones es obligatoria junto a cada unidad instalada.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Qué revisión periódica necesita un cilindro hídrico?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Qué revisión periódica necesita un cilindro hídrico?</h3><p>
Recarga anual obligatoria según NOM-154-SCFI: el fluido se renueva cada 12 meses porque acumula contaminantes internos y la carga pierde impulso por micro fugas. Tras cualquier uso parcial, la renovación es inmediata. Cada 5 años el recipiente requiere prueba hidrostática de integridad. Ofrecemos programa de revisión con recordatorios automáticos para tu organización.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Cómo se fabrica el cilindro de un aparato portátil hídrico?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Cómo se fabrica el cilindro de un aparato portátil hídrico?</h3><p>
Lámina de acero rolada en frío con soldadura TIG, tratamiento químico fosfatizado para resistir la acción corrosiva del fluido interno, y recubrimiento de pintura electrostática horneada a 180 °C. El interior recibe capa anticorrosiva que mantiene el cilindro libre de óxido durante más de 20 años de servicio activo. Los modelos portátiles de importación de acero inoxidable están disponibles para ambientes altamente corrosivos como zonas costeras.
</p></div></div></div></div></section>

'''

# ── 6. UPDATE CONTACT FORM H2 ───────────────────────────────────────────────
contact_form = contact_form.replace(
    'Solicita una Cotización de Extintores de Agua',
    'Solicita Cotización como Proveedor Avalado en CDMX'
)
contact_form = contact_form.replace(
    'la mejor cotización en extintores de agua a presión certificados NOM-154-SCFI.',
    'la mejor cotización en cilindros de H2O presurizada avalados NOM-154-SCFI para protección de bodegas y almacenes.'
)

# ── 7. CLOSING SECTION ──────────────────────────────────────────────────────
closing_section = '''
<section class="rd-section rd-section--gray"><div class="container">
<div class="rd-header">
<h2>Protección contra Incendios Categoría A para Bodegas y Almacenes</h2>
</div>
<div class="rd-card">
<p>Con más de 30 años en el sector, instalamos soluciones de <strong>protección contra incendios</strong> específicas para instalaciones con materiales sólidos combustibles en CDMX y zona metropolitana. Cada proyecto incluye análisis de riesgos, distribución óptima de unidades, <a href="senalizacion.html">señalización</a> de restricciones y <a href="capacitacion-brigadas.html">formación</a> del personal en el uso correcto del aparato y sus limitaciones. Nuestro compromiso: que tu bodega o almacén cumpla la normativa con la inversión más eficiente del mercado.</p>
</div>
</div></section>

'''

# ── 8. ASSEMBLE ──────────────────────────────────────────────────────────────
final_html = header_part + new_body + closing_section + contact_form + '\n' + footer_part

with open(OUTPUT, 'w', encoding='utf-8') as f:
    f.write(final_html)

print(f"✅ {OUTPUT} rebuilt successfully")
print(f"   Output: {OUTPUT}")
