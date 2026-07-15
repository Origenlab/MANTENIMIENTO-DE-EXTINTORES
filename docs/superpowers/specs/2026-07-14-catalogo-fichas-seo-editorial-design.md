# Diseño editorial SEO para las fichas del catálogo MANEXT

**Fecha:** 14 de julio de 2026  
**Alcance:** 46 fichas publicadas bajo `/catalogo/`  
**Objetivo:** convertir cada ficha en una página comercial técnicamente responsable, original, humana y útil para búsquedas transaccionales o de investigación comercial.

## Decisión de diseño

Se conservarán las URLs, el layout aprobado, la navegación, la cotización por WhatsApp y la fuente única de productos. El contenido dejará de depender principalmente de frases generadas por grupo. Cada producto tendrá un perfil editorial explícito con su propia intención de búsqueda, escenario del comprador, propuesta de valor, criterios de selección, advertencia técnica y preguntas frecuentes.

Este enfoque ofrece más control editorial que ampliar el generador genérico y evita mantener 46 páginas Astro independientes. El template seguirá siendo reutilizable; la singularidad vivirá en datos estructurados revisables.

## Arquitectura de contenido

Cada perfil editorial contendrá como mínimo:

- `primaryKeyword`: consulta transaccional principal sin competir con otra ficha.
- `secondaryKeywords`: variantes semánticas y aplicaciones relacionadas.
- `searchIntent`: necesidad concreta que la página debe resolver.
- `buyerScenario`: situación humana y operativa que abre la conversación.
- `valuePromise`: resultado comercial prudente, sin promesas absolutas.
- `selectionFocus`: variables que MANEXT debe confirmar antes de cotizar.
- `differentiator`: razón específica para considerar ese producto.
- `notFor`: límite o escenario donde debe evaluarse otra solución.
- `humanLead` y `humanDescription`: respuesta clara a la consulta durante las primeras 100 palabras.
- `benefitAngles`: cuatro beneficios FAB propios del producto.
- `faqTopics`: preguntas basadas en dudas reales de compra, compatibilidad, uso y servicio.
- `internalLinks`: enlaces contextuales hacia guías, agentes o servicios relacionados.

Las fichas de CO₂ y HFC-236fa conservarán su investigación específica, pero también se normalizarán al contrato editorial para que las 46 puedan auditarse con las mismas reglas.

## Segmentación por intención

### Extintores portátiles

La intención se centrará en comprar el agente correcto para un riesgo reconocible. El contenido explicará qué protege, qué residuo deja, cuándo aporta valor y qué debe confirmarse en rating, capacidad y maniobrabilidad.

### Equipos móviles e industriales

La intención será dimensionar una respuesta de mayor capacidad. Se priorizarán caudal, alcance, movilidad, superficie del riesgo, personal disponible y condiciones de operación.

### Sistemas automáticos y aplicación local

La intención será proteger un riesgo desatendido o confinado. Se explicará que la selección exige ingeniería, compatibilidad de agente, detección o activación, cobertura, ventilación y mantenimiento.

### Accesorios

La intención será instalar, identificar, proteger o transportar correctamente un extintor. Las páginas no se presentarán como si el accesorio extinguiera un incendio ni heredarán clases de fuego que no le corresponden.

### Refacciones y consumibles

La intención será localizar un componente compatible para servicio profesional. Se enfatizarán marca, modelo, válvula, agente, dimensiones, trazabilidad y trabajo por personal capacitado.

## Reglas SEO y editoriales

- Un keyword principal, title, meta description, H1 y canonical únicos por URL.
- Keyword principal al inicio del title cuando la redacción resulte natural.
- Meta descriptions completas, persuasivas y sin cortes automáticos; máximo 160 caracteres.
- Respuesta a la intención en las primeras 100 palabras.
- Párrafos breves, voz directa y vocabulario comprensible para responsables de compras, mantenimiento y seguridad.
- Variaciones semánticas naturales; no se establecerá una densidad artificial.
- Al menos tres enlaces internos relevantes por ficha cuando existan destinos coherentes.
- Referencias oficiales visibles para afirmaciones normativas o técnicas.
- Schema `Product` y `FAQPage` coherente con el contenido visible.
- No se publicarán precios, ratings, inventario, certificaciones de producto, tiempos de entrega ni reseñas que no estén comprobados para el modelo cotizado.
- Las afirmaciones de cumplimiento distinguirán entre la norma aplicable al centro de trabajo, el servicio de mantenimiento y la documentación del equipo concreto.

## Voz de MANEXT

La voz será experta sin resultar burocrática. Hablará de decisiones reales: qué se desea proteger, qué puede dañarse durante la descarga, quién operará el equipo y qué documentación necesitará el cliente. Se evitarán expresiones genéricas como “solución ideal”, “máxima protección”, “la mejor opción” y “calidad garantizada” cuando no estén acompañadas por un criterio verificable.

La conversión se planteará como asesoría: “Cuéntanos qué proteges y confirmamos la configuración”, en lugar de presionar con urgencia artificial.

## Datos, template y seguridad

Se añadirá una fuente editorial independiente de los datos comerciales básicos. El generador combinará ambos objetos por `id` y fallará en pruebas si falta un perfil. Astro continuará escapando el texto de salida; no se usará `set:html` para contenido editorial ni se incorporará entrada del usuario en el schema.

El formulario seguirá generando el mensaje de WhatsApp en el cliente. Esta mejora no cambia el tratamiento de datos ni añade llamadas de red.

## Validación

Las pruebas automatizadas deberán comprobar:

1. Exactamente 46 perfiles editoriales asociados a 46 productos.
2. Keywords, escenarios, descripciones, titles, metas y grupos de FAQs únicos.
3. Ausencia de las preguntas y párrafos genéricos detectados en la auditoría.
4. Longitud válida de title y meta description, un solo H1 y canonical correcto.
5. Contenido visible equivalente al FAQ schema.
6. Ausencia de `Offer`, precio, rating o disponibilidad comercial no verificable en schema.
7. Construcción estática de todas las rutas y conservación del comportamiento sin animaciones fuera de botones.

## Criterio de terminado

La mejora estará terminada cuando las 46 fichas hayan sido reescritas, ninguna dependa de FAQs genéricas compartidas, todas construyan correctamente y las pruebas de contenido, SEO, schema, formulario y política de movimiento pasen sin errores.

