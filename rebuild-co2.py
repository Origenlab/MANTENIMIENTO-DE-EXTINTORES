#!/usr/bin/env python3
"""Rebuild co2.html following Module 6 structure with term deflation."""

import re

INPUT  = "co2.html"
OUTPUT = "co2.html"

with open(INPUT, "r", encoding="utf-8") as f:
    content = f.read()

# ── 1. META TAG UPDATES ──────────────────────────────────────────────

# Title
content = content.replace(
    "<title>Extintores CO2 Dióxido de Carbono Certificados | CDMX</title>",
    "<title>Extintores CO2 Certificados | Venta y Envío CDMX</title>"
)

# Meta description
content = re.sub(
    r'<meta\s+name="description"\s+content="[^"]*"\s*/?>',
    '<meta\nname="description"\ncontent="Venta de extintores de CO2 certificados NOM-154. 6 modelos desde 5 hasta 30 lbs. Ideales para data centers y equipos electrónicos. Envío inmediato CDMX. Cotiza ahora."\n/>',
    content
)

# OG title
content = content.replace(
    'og:title" content="Extintores de CO2 - MANEXT"',
    'og:title" content="Extintores CO2 Certificados | Venta y Envío CDMX"'
)

# OG description
content = content.replace(
    'og:description" content="Extintores de CO2 certificados NOM. Ideales para equipos electrónicos sin residuos. 5 modelos desde 2.27kg hasta 13.62kg. Entrega CDMX."',
    'og:description" content="Venta de cilindros de gas carbónico avalados NOM-154. 6 modelos desde 5 hasta 30 lbs para data centers y equipos electrónicos. Envío CDMX."'
)

# Twitter title
content = content.replace(
    'twitter:title" content="Extintores de CO2 - MANEXT"',
    'twitter:title" content="Extintores CO2 Certificados | Venta y Envío CDMX"'
)

# Twitter description
content = content.replace(
    'twitter:description" content="Extintores de CO2 certificados NOM. Ideales para equipos electrónicos sin residuos. 5 modelos desde 2.27kg hasta 13.62kg. Entrega CDMX."',
    'twitter:description" content="Venta de cilindros de gas carbónico avalados NOM-154. 6 modelos desde 5 hasta 30 lbs. Envío CDMX."'
)

# ── 2. SCHEMA UPDATE ─────────────────────────────────────────────────
content = content.replace(
    '{"@context": "https://schema.org","@type": "CollectionPage","name": "Extintores de CO2","description": "Extintores de Dióxido de Carbono certificados NOM-154-SCFI","provider": {"@type": "Organization","name": "MANEXT","url": "https://mantenimientodeextintores.mx"}}',
    '{"@context": "https://schema.org","@type": "Product","name": "Extintores de Dióxido de Carbono (CO2)","description": "Venta de extintores de CO2 certificados NOM-154-SCFI en CDMX. 6 modelos desde 5 hasta 30 lbs para data centers y equipos electrónicos","brand": {"@type": "Brand","name": "MANEXT"},"offers": {"@type": "AggregateOffer","priceCurrency": "MXN","availability": "https://schema.org/InStock"}}'
)

# ── 3. ADD section-redesign.css ───────────────────────────────────────
if 'section-redesign.css' not in content:
    content = content.replace(
        '<link rel="stylesheet" href="css/mobile-enhancements.css?v=1">',
        '<link rel="stylesheet" href="css/mobile-enhancements.css?v=1"><link rel="stylesheet" href="css/section-redesign.css?v=1">'
    )

# ── 4. EXTRACT IMMUTABLE PARTS ────────────────────────────────────────
# Header = everything up to and including </nav> (breadcrumbs)
breadcrumb_end = content.find('</nav>', content.find('breadcrumbs'))
header = content[:breadcrumb_end + 6]

# Contact form section
form_start = content.find('<section class="contact-form-section">')
form_end = content.find('</section>', form_start) + len('</section>')
contact_form = content[form_start:form_end]

# Update contact form H2
contact_form = contact_form.replace(
    '<h2>Solicita una Cotización de Extintores CO2</h2>',
    '<h2>Solicita tu Cotización como Proveedor Avalado</h2>'
)

# Footer
footer_start = content.find('<footer>')
footer = content[footer_start:]

# ── 5. NEW BODY CONTENT ──────────────────────────────────────────────

new_body = """<section class="hero"><div class="hero-content"><div class="container"><div class="hero-grid"><div class="hero-left"><h1 class="hero-title">
Extintores de Dióxido de Carbono (CO2) — Venta y Envío CDMX
</h1><p class="hero-subtitle">
Cilindros de gas carbónico tipo BC avalados NOM-154 con envío inmediato
</p><p class="hero-description">
Distribuidor autorizado de dispositivos de gas carbónico para extinción de incendios clase B y C. 6 modelos desde 5 hasta 30 libras. Producto ideal para data centers, servidores y componentes energizados. Envío sin costo en CDMX y Estado de México.
</p><div class="hero-buttons"><a href="tel:5539689272" class="btn btn-primary"
>Llamar: 55 3968 9272</a
><a
href="https://wa.me/5215539689272?text=Hola%2C%20necesito%20cotización%20de%20extintores%20CO2%20para%20mi%20empresa"
class="btn btn-whatsapp"
target="_blank"
rel="noopener"
>Cotizar por WhatsApp</a
></div></div><div class="hero-right"><div class="hero-text"><p class="hero-paragraph">
Con más de <strong>30 años de experiencia</strong> en prevención de incendios, somos <strong>proveedor</strong> avalado de cilindros de seguridad fabricados en <strong>aluminio</strong> de alta resistencia. Cada unidad incluye corneta de descarga, válvula de alta <strong>presión</strong> y aval NOM-154-SCFI. También conocidos como <strong>extinguidores</strong>, todos nuestros modelos son <strong>recargables</strong> por pesaje preciso y listos para manejar peligros en áreas con componentes sensibles.
</p></div></div></div></div></div></section>

<section class="rd-section"><div class="container">
<div class="rd-header">
<h2>¿Por Qué Elegir un Dispositivo de Gas Carbónico para Incendios?</h2>
</div>
<div class="rd-card">
<p>El agente gaseoso actúa por desplazamiento de oxígeno y enfriamiento simultáneo, logrando una <strong>extinción de incendios</strong> eficaz y limpia en segundos. Un solo cilindro cubre los dos riesgos más frecuentes en áreas tecnológicas: incendio debido a <strong>líquidos inflamables</strong> (clase B) y emergencias en aparatos con <strong>electricidad</strong> activa (clase C).</p>
</div>
<div class="rd-grid-2">
<div class="rd-card">
<h3>Cero Residuos: Protección para Equipos o Procesos Delicados</h3>
<p>A diferencia del polvo químico seco, el compuesto gaseoso se evapora por completo tras la descarga. No deja rastro, sedimento ni partícula que dañe servidores, instrumentación de laboratorio o hardware sensible. Es la única opción que permite <strong>reinicio inmediato</strong> de operaciones sin limpieza posterior — ideales para uso en áreas de misión crítica.</p>
</div>
<div class="rd-card">
<h3>Agente No Conductor Seguro para Componentes Energizados</h3>
<p>El gas carbónico no conduce corriente, lo que lo hace seguro para combatir conatos en tableros, UPS, transformadores y cableado energizado. Cada cilindro soporta hasta 850 PSI de carga interna, con válvula de latón y corneta antiestática que protege al operador durante la descarga.</p>
</div>
</div>
</div></section>

<section class="rd-section rd-section--gray"><div class="container">
<div class="rd-header">
<h2>Características Técnicas del Dióxido de Carbono como Agente de Extinción</h2>
</div>
<div class="rd-card">
<p>El <strong>agente gaseoso</strong> se almacena en estado líquido a alta presión dentro de cilindros de <strong>aluminio</strong> o acero sin costura. Al descargarse, se expande y enfría la zona del conato a −78 °C, desplazando el oxígeno y sofocando la combustión sin dejar contaminante. Es un <strong>extinguidor con un compuesto limpio</strong> aprobado para <strong>incendios de clase B</strong> (fluidos combustibles) y clase C (aparatos con voltaje). La corneta direccional permite aplicar el <strong>compuesto gaseoso para extinguidor</strong> con precisión sin dispersar materiales circundantes. La recarga se realiza por pesaje — no por presión — garantizando la cantidad exacta de agente en cada cilindro.</p>
</div>
</div></section>

<section class="rd-section"><div class="container">
<div class="rd-header">
<h2>Modelos Disponibles — Venta de Cilindros de Gas Carbónico Tipo BC</h2>
</div>
<table class="rd-price-table">
<thead><tr>
<th>Modelo</th>
<th>Capacidad</th>
<th>Uso Recomendado</th>
<th>Alcance</th>
</tr></thead><tbody>
<tr><td>Portátil compacto</td><td>2.27 kg (5 lbs)</td><td>Racks, servidores individuales</td><td>1-2 m</td></tr>
<tr><td>Portátil estándar</td><td><strong>4.54 kg (10 lbs)</strong></td><td>Cuartos eléctricos (más vendido)</td><td>2-3 m</td></tr>
<tr><td>Portátil intermedio</td><td>6.81 kg (15 lbs)</td><td>Data centers medianos</td><td>3-4 m</td></tr>
<tr><td>Portátil industrial</td><td>9.08 kg (20 lbs)</td><td>Salas de cómputo grandes</td><td>4-5 m</td></tr>
<tr><td>Industrial reforzado</td><td>11.3 kg (25 lbs)</td><td>Telecomunicaciones</td><td>4-6 m</td></tr>
<tr><td>Rodante con ruedas</td><td>13.62 kg (30 lbs)</td><td>Plantas industriales, generadores</td><td>5-6 m</td></tr>
</tbody></table>
<div class="rd-grid-2">
<div class="rd-card">
<h3>Unidades Portátiles de 5 a 15 Libras para Oficinas y Servidores</h3>
<p>Los modelos de <strong>capacidad de 15</strong> libras o menos son los más solicitados por empresas con salas de cómputo y cuartos eléctricos. El cilindro de <strong>aluminio</strong> reduce peso y facilita el manejo. Cada dispositivo incluye soporte de pared, <a href="senalizacion.html">señalización</a> de advertencia y documentación de cumplimiento.</p>
</div>
<div class="rd-card">
<h3>Cilindros de 20 a 30 Libras para Data Centers e Industria</h3>
<p>Modelos de gran capacidad con manguera reforzada de hasta 2 metros y base rodante incluida. Ideales para centros de telecomunicaciones, plantas de fabricación y generadores de respaldo. Nuestro <strong>personal capacitado</strong> realiza análisis de riesgos y diseña la distribución óptima según la norma vigente.</p>
</div>
</div>
</div></section>

<section class="rd-section rd-section--gray"><div class="container">
<div class="rd-header">
<h2>Venta, Envío e Instalación en CDMX y Zona Metropolitana</h2>
</div>
<div class="rd-grid-2">
<div class="rd-card">
<h3>¿Cómo Comprar tu Cilindro de Gas Carbónico?</h3>
<p><strong>Comprar</strong> es sencillo: cotiza por WhatsApp o llamada, recibe propuesta con <strong>precio</strong> unitario y descuentos por volumen en minutos. El <strong>envío</strong> y colocación es sin costo adicional en toda la zona metropolitana. Aceptamos transferencia, tarjeta y crédito a 30 días para organizaciones. Como <strong>distribuidor</strong> avalado, cada compra incluye documentación oficial para auditorías.</p>
</div>
<div class="rd-card">
<h3>Servicio Técnico y Recarga por Pesaje</h3>
<p>Todos los cilindros son <strong>recargables</strong>: el agente se renueva cada 12 meses o cuando el pesaje indica pérdida superior al 10 %. Ofrecemos <a href="recarga-de-extintores.html">servicio de recarga</a> a domicilio con préstamo de unidades. El <a href="mantenimiento-preventivo.html">mantenimiento preventivo</a> trimestral detecta cuándo <strong>cargar</strong> el cilindro antes de la fecha límite. La prueba hidrostática quinquenal verifica la integridad estructural.</p>
</div>
</div>
</div></section>

<section class="rd-section"><div class="container">
<div class="rd-header">
<h2>Comparativa: Gas Carbónico vs Otros Agentes de Supresión</h2>
</div>
<table class="rd-price-table">
<thead><tr>
<th>Agente</th>
<th>Clases</th>
<th>Deja Residuo</th>
<th>Ideal Para</th>
</tr></thead><tbody>
<tr><td><strong>Gas carbónico (BC)</strong></td><td>B, C</td><td>No</td><td>Electrónica, data centers</td></tr>
<tr><td><a href="polvo-quimico-seco.html">Polvo químico seco</a></td><td>A, B, C</td><td>Sí (polvo)</td><td>Comercios, oficinas generales</td></tr>
<tr><td><a href="agua-presion.html">Agua presurizada</a></td><td>A</td><td>Sí (agua)</td><td>Bodegas sin riesgo eléctrico</td></tr>
<tr><td><a href="tipo-k.html">Tipo K</a></td><td>K</td><td>Sí (espuma)</td><td>Cocinas comerciales</td></tr>
<tr><td>Agentes limpios</td><td>A, B, C</td><td>No</td><td>Museos, quirófanos, misión crítica</td></tr>
</tbody></table>
<div class="rd-card">
<p>El gas carbónico ofrece la mejor relación costo-beneficio para áreas con componentes energizados. Los agentes limpios son una alternativa premium más segura en espacios cerrados con personas, pero a mayor inversión. Para áreas generales de un negocio donde conviven papel y aparatos, la combinación con <a href="polvo-quimico-seco.html">dispositivos de agente seco</a> multipropósito es la solución más completa.</p>
</div>
</div></section>

<section class="faq"><div class="container"><div class="section-header"><h2>Preguntas Frecuentes — Venta de Cilindros de Gas Carbónico</h2><p class="section-subtitle">
Dudas sobre modelos, normativa, recarga y envío
</p></div><div class="faq-grid"><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Cuánto cuesta un cilindro de gas carbónico y qué incluye?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Cuánto cuesta un cilindro de gas carbónico y qué incluye?</h3><p>
El precio varía según capacidad: desde $2,500 para modelos de 5 libras hasta $8,000+ para unidades de 30 libras con base rodante. Cada producto incluye corneta de descarga, soporte de pared, señalización, documentación NOM y colocación profesional. Cotiza al 55 3968 9272 para recibir valores exactos según tu necesidad. Descuentos disponibles por volumen.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Para qué tipos de incendio sirve el agente gaseoso?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Para qué tipos de incendio sirve el agente gaseoso?</h3><p>
Es eficaz en incendios de clase B (fluidos combustibles como solventes, gasolina y aceites industriales) y clase C (aparatos con voltaje activo). No funciona en conatos clase A (papel, madera, textiles) porque el gas se disipa sin enfriar las brasas. Tampoco en clase K (aceites de cocina). Para comercios con riesgos mixtos, combina con un dispositivo multipropósito ABC.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿El compuesto gaseoso deja residuos al descargar?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿El compuesto gaseoso deja residuos al descargar?</h3><p>
No. El gas se evapora completamente sin dejar rastro, sedimento ni partícula. Es la principal ventaja frente al polvo químico seco, que deja un remanente corrosivo capaz de dañar circuitos y componentes electrónicos. Tras la descarga, las operaciones pueden reanudarse sin limpieza, lo que minimiza el tiempo de inactividad en data centers y salas de servidores.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Es seguro usar este agente en espacios cerrados?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Es seguro usar este agente en espacios cerrados?</h3><p>
Sí, con precaución. El gas desplaza el oxígeno para sofocar la combustión, por lo que en interiores muy reducidos puede causar mareo temporal. Protocolo: evacuar personas antes de descargar, ventilar inmediatamente después y no permanecer en el área sin ventilación. La corneta se enfría a −78 °C — nunca tocarla directamente. En espacios amplios o bien ventilados no hay riesgo significativo.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Qué capacidad necesito según mi negocio?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Qué capacidad necesito según mi negocio?</h3><p>
Depende del área y nivel de riesgo: 5 lbs para racks individuales, 10 lbs para cuartos eléctricos (más vendido), 15 lbs para centros de datos medianos, 20 lbs para salas de cómputo grandes y 25-30 lbs para plantas industriales o telecomunicaciones. Referencia: 1 unidad de 10 lbs protege aprox. 15-20 m² con componentes electrónicos. Realizamos análisis gratuito en CDMX.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Sirve un cilindro de gas carbónico para conatos clase A?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Sirve un cilindro de gas carbónico para conatos clase A?</h3><p>
No. El gas solo desplaza oxígeno temporalmente sin enfriar lo suficiente las brasas de materiales sólidos, que se reencienden al dispersarse el agente. Para oficinas con riesgos mixtos (papel + aparatos electrónicos), la normativa recomienda combinar un dispositivo de gas carbónico cerca de la electrónica con un aparato multipropósito ABC en el área general.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Por qué son más caros que los dispositivos de agente seco?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Por qué son más caros que los dispositivos de agente seco?</h3><p>
Tres factores: el cilindro de <strong>aluminio</strong> debe soportar 850 PSI (vs 195 PSI del PQS), el agente de grado industrial es más costoso que el polvo, y las válvulas de alta presión con corneta especial elevan el costo de fabricación. Sin embargo, la inversión se justifica: un solo uso de polvo químico en un data center puede causar daños a componentes que superan con creces el valor del aparato.
</p></div></div><div class="faq-item"><button class="faq-question" aria-expanded="false"><span class="faq-question-text">¿Cada cuánto se recarga un cilindro de gas carbónico?</span><span class="faq-icon">+</span></button><div class="faq-answer"><h3>¿Cada cuánto se recarga un cilindro de gas carbónico?</h3><p>
Cada 12 meses según la norma NOM-154-SCFI, o inmediatamente después de cualquier uso parcial. El pesaje trimestral verifica que no haya fugas — pérdida superior al 10 % indica renovación inmediata. Cada 5 años el cilindro requiere prueba hidrostática de integridad. Ofrecemos programa de revisión periódica con recordatorios automáticos para tu empresa.
</p></div></div></div></div></section>

"""

# ── 6. ASSEMBLE FINAL PAGE ────────────────────────────────────────────
result = header + new_body + contact_form + "\n" + footer

with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write(result)

print("✅ co2.html rebuilt successfully")
print(f"   Output: {OUTPUT}")
