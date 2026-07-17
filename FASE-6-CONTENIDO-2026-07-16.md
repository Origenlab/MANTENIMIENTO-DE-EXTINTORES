# Fase 6 — Contenido del catálogo

**Fecha:** 16 de julio de 2026
**Alcance:** las 276 fichas de `/catalogo/`
**Naturaleza:** esta fase no se resuelve con código. Lo que sigue es medición, prioridad y una decisión que necesita datos que sólo tú tienes.

---

## Lo que se midió

No opiniones: solape léxico real (índice de Jaccard sobre la prosa visible de cada ficha — lead, beneficios, aplicaciones, limitaciones, FAQs, guía de capacidad) contra sus hermanos de familia.

| Métrica | Valor |
|---|---|
| Solape medio de una ficha derivada con su hermano más parecido | **85%** |
| Solape máximo | **90%** |
| Fichas con >70% de solape | **230 de 276** |
| Fichas con >50% de solape | **260 de 276** |
| Fichas con fotografía propia | **0 de 276** |
| Fichas cuya foto comparten más de 50 productos | **132** |
| Solape medio de las 2 fichas autorales | **37–38%** ← la referencia de lo que es "diferenciado" |

Las dos fichas escritas a mano (`co2-portatil`, `hfc-236fa-portatil`) son, con diferencia, las más diferenciadas del catálogo. Eso no es casualidad: es la respuesta.

### Nueve fotografías para 276 productos

| Productos que la comparten | Imagen |
|---|---|
| **72** | `extintor.avif` (genérica) |
| **60** | `Recarga-de-extintores-6kg.avif` |
| 30 | `extintor-espuma-afff-9lt-venta.avif` |
| 24 | `extintor-agente-limpio-6kg-venta.avif` |
| 24 | `soportes-y-bases-para-extintores-certificados.avif` |
| 18 | `Extintor-de-CO2-5lbs.avif` |
| 18 | `extintor-para-cocinas-tipo-k-6lt.avif` |
| 18 | `gabinetes-para-extintores-metalicos-y-acrilicos.avif` |
| 12 | `extintor-de-agua-a-presion-9lt.avif` |

Una ficha de *manómetro para extintor* muestra la foto de un extintor completo. Una de *válvula* también. Setenta y dos productos comparten la misma imagen genérica.

---

## Lo que sí se arregló en código

**El relleno "Aplicación técnica N" desapareció de las 230 fichas derivadas.**

El generador rellenaba hasta tres aplicaciones con un encabezado vacío —"Aplicación técnica 3"— porque los 230 derivados tienen exactamente **dos** aplicaciones reales. Era una de las señales que hacen que una página se lea como autogenerada.

Existía porque **dos tests exigían `recommendedUses.length >= 3`**: el test obligaba al relleno. Es el mismo patrón que apareció en las fases 4 y 5 — un test blindando un defecto en vez de prevenirlo. Ahora exigen que las aplicaciones sean **reales**. Mejor dos ciertas que tres con una inventada.

**Efecto medido en el solape: ninguno.** Sigue en 85%, porque el relleno era idéntico entre hermanos y quitarlo no diferencia nada. Es una mejora de calidad percibida, no de duplicación. Lo digo para que no se confunda con progreso en el problema de fondo.

---

## El problema, dicho claro

El catálogo escala **contenido** más rápido de lo que escala **calidad**. 276 fichas nacen de 46 semillas de cinco frases y dos textos reales. El motor está bien construido —tras las fases 1 a 5 es correcto, validado y testeado— pero un motor no fabrica conocimiento sobre el producto.

Ninguna cantidad de refactor mueve el 85%. Ese número sólo baja escribiendo.

---

## Prioridad recomendada

### Nivel 1 — Las 7 con landing (ya resuelto en fase 4)

`/polvo-quimico-seco`, `/co2`, `/agua-presion`, `/espuma-afff`, `/tipo-k`, `/agentes-limpios`, `/senalizacion`.

Tienen ~3.800 palabras autorales y desde la fase 4 son la canónica de su familia. **No requieren trabajo de contenido.** Son la prueba de que el enfoque funciona.

### Nivel 2 — Las 39 familias sin landing (el trabajo que rinde)

Cada familia es un padre + 5 derivadas. Escribir **una** ficha de familia bien beneficia a seis páginas.

| Grupo | Familias sin landing | Fichas que cubren |
|---|---|---|
| Extintores portátiles | 9 | 54 |
| Móviles e industriales | 8 | 48 |
| Automáticos y aplicación local | 5 | 30 |
| Accesorios y protección | 9 | 54 |
| Refacciones y consumibles | 8 | 48 |

**Empezar por portátiles.** Concentra la intención de compra y ahí están las familias con demanda propia: PQS BC, Purple-K, agua nebulizada, AR-AFFF, espuma F3, Halotron, clase D (×2), ion-litio.

**Ion-litio merece atención aparte:** es la categoría con más crecimiento y menos oferta informada en México. Una ficha buena ahí no compite con nadie.

### Nivel 3 — Fotografía (el techo de todo lo demás)

Nueve imágenes para 276 productos es el límite superior de calidad del catálogo entero. Ninguna redacción compensa que la ficha del manómetro muestre un extintor.

No hace falta fotografiar 276 productos. Con **una foto por familia (46)** el catálogo cambia de categoría. Prioridad: las 9 familias de portátiles sin landing, y las de refacciones —donde el desajuste foto/producto es más evidente.

### Nivel 4 — Enriquecer semillas antes que plantillas

Las semillas tienen 5 frases (`need`, `valueProposition`, `selection`, `limitation`, `application`). Subirlas a 15–20 multiplica la variedad **sin tocar el motor**, porque toda la prosa se deriva de ellas. Es el mejor retorno por hora de escritura.

---

## Decisión abierta: ¿noindex en la cola larga?

**El informe original recomendaba `noindex` en las 230 derivadas hasta que tengan contenido propio.** Los datos lo respaldan: 230 páginas con 85% de solape, sin foto propia, es el perfil que *Helpful Content* penaliza — y la penalización no es sólo de esas páginas, arrastra al dominio.

**No lo he ejecutado, y no creo que deba hacerlo sin ti.** Me falta el dato que decide:

- **¿Esas fichas traen tráfico o leads hoy?** Si `/catalogo/extintor-pqs-abc-6-kg-negocio` está posicionando para "extintor pqs 6 kg", quitarla del índice destruye algo que funciona. Si no, sólo pesa.
- Eso está en **Search Console**, que yo no tengo.

### Cómo decidirlo con evidencia

1. Search Console → Rendimiento → filtrar por páginas que contengan `/catalogo/`.
2. Excluir las 7 landings.
3. Mirar 3 meses: impresiones, clics y posición media de las 230.

| Lo que veas | Qué significa |
|---|---|
| Impresiones cerca de 0 | Google ya las está ignorando. `noindex` no pierde nada y limpia la señal del dominio. |
| Impresiones altas, clics ~0, posición >20 | Se muestran y nadie las abre: el peor caso. Confirman thin content y arrastran al dominio. `noindex` recomendado. |
| Clics reales en varias | Están funcionando. **No tocar.** Escribir contenido para reforzarlas. |

**Alternativa intermedia, si hay duda:** aplicar `noindex` sólo a los grupos sin intención de búsqueda propia —refacciones (48) y accesorios (54)— y conservar portátiles e industriales. Nadie busca "manómetro para extintor de agua" como página de destino; sí buscan "extintor PQS 6 kg".

El mecanismo es una línea en `ProductDetailTemplate.astro` y es reversible. La decisión no es técnica: es tuya, y necesita ese dato.

---

## Resumen

| | |
|---|---|
| Lo que arreglé | Relleno "Aplicación técnica N" fuera de 230 fichas; 2 tests que lo obligaban, corregidos |
| Lo que no se puede arreglar con código | El 85% de solape, las 9 fotos |
| Lo que rinde más por hora | Escribir 39 fichas de familia (cubren 234 páginas) |
| Lo que pone techo a todo | La fotografía |
| Lo que necesita tu decisión | `noindex` en la cola larga — requiere Search Console |

Las fases 1 a 5 dejaron el motor correcto. Esta fase es la única que pide algo que el código no da: saber del producto.
