const capitalize = (value) => value.charAt(0).toLocaleUpperCase('es-MX') + value.slice(1);

function buildMetaDescription(seed) {
  const firstCriterion = seed.selection.split(',')[0].trim().toLocaleLowerCase('es-MX');
  let description = `Cotiza ${seed.keyword.toLocaleLowerCase('es-MX')} en CDMX. MANEXT confirma ${firstCriterion}, compatibilidad y configuración antes de preparar tu propuesta técnica.`;

  if (description.length > 160) {
    description = `Cotiza ${seed.keyword.toLocaleLowerCase('es-MX')} en CDMX. MANEXT confirma compatibilidad y configuración antes de preparar tu propuesta técnica.`;
  }
  if (description.length < 120) {
    description += ' Solicita asesoría especializada.';
  }

  return description;
}

const sharedLinks = {
  portatiles: { label: 'Comparar extintores disponibles', url: '/venta-de-extintores/' },
  industriales: { label: 'Soluciones para protección industrial', url: '/servicios/' },
  automaticos: { label: 'Evaluación de sistemas contra incendio', url: '/servicios/' },
  accesorios: { label: 'Señalización y equipamiento complementario', url: '/senalizacion/' },
  refacciones: { label: 'Servicio profesional para extintores', url: '/mantenimiento-preventivo/' },
};

export function buildEditorialProfiles(seeds) {
  return Object.fromEntries(seeds.map((seed) => {
    const keyword = seed.keyword.toLocaleLowerCase('es-MX');
    const lead = `${capitalize(keyword)} responde a una decisión concreta: ${seed.scenario} ${seed.outcome}`;
    const description = `${seed.context} ${seed.difference} En MANEXT la cotización parte de ${seed.selection.toLocaleLowerCase('es-MX')} para que el producto solicitado tenga sentido en la operación real y no sea únicamente una compra por nombre o capacidad.`;

    return [seed.id, Object.freeze({
      primaryKeyword: seed.keyword,
      h1: capitalize(seed.keyword),
      seoTitle: `${seed.keyword}${seed.keyword.length <= 51 ? ' | MANEXT' : ''}`,
      metaDescription: buildMetaDescription(seed),
      secondaryKeywords: seed.secondary,
      searchIntent: `La intención de búsqueda es ${seed.intent} La ficha debe permitir comparar la opción con riesgos y alternativas cercanas antes de solicitar una cotización.`,
      buyerScenario: `Quien busca ${keyword} suele estar en esta situación: ${seed.scenario}`,
      valuePromise: `La propuesta de valor es concreta: ${seed.outcome} La recomendación se documenta sin prometer desempeño que dependa del modelo o del riesgo real.`,
      selectionFocus: `La selección profesional debe confirmar ${seed.selection.toLocaleLowerCase('es-MX')} antes de definir cantidad, configuración y servicios complementarios.`,
      differentiator: `${seed.difference} Esa diferencia sólo aporta valor cuando coincide con el combustible, el entorno y la forma de respuesta prevista.`,
      notFor: `${seed.avoid} Si ese escenario está presente, MANEXT debe comparar otra tecnología o configuración antes de cotizar.`,
      humanLead: lead,
      humanDescription: description,
      benefitAngles: [
        { title: `El valor de ${seed.label}`, text: `${seed.outcome} El beneficio se expresa en una decisión operativa verificable, no en una promesa genérica de máxima protección.` },
        { title: `Qué revisar en ${seed.label}`, text: `${seed.selection} Confirmar estos datos evita sobredimensionar, comprar una pieza incompatible o dejar un riesgo sin cobertura suficiente.` },
        { title: `Diferencia técnica de ${seed.label}`, text: `${seed.difference} MANEXT contrasta esta ventaja con la documentación y las condiciones del producto disponible.` },
        { title: `Límite que conviene conocer`, text: `${seed.avoid} Explicar este límite desde la cotización permite elegir con más claridad y preparar una respuesta segura.` },
      ],
      faqs: [
        { question: `¿Cuándo conviene cotizar ${keyword}?`, answer: `${seed.scenario} En ese contexto, ${seed.outcome.toLocaleLowerCase('es-MX')} La recomendación final depende de verificar el riesgo y la documentación del producto.` },
        { question: `¿Qué dato cambia más la selección de ${keyword}?`, answer: `${seed.selection} No basta con comparar una fotografía o una capacidad nominal; esos datos deben revisarse contra la operación y el modelo disponible.` },
        { question: `¿Qué error debo evitar al comprar ${keyword}?`, answer: `${seed.avoid} Elegir sólo por precio o apariencia puede producir una configuración incompatible, difícil de operar o insuficiente para el escenario.` },
        { question: `¿Cuál es la diferencia relevante de ${keyword}?`, answer: `${seed.difference} La ventaja debe comprobarse en la ficha, rating, materiales o compatibilidad del producto que aparezca en la propuesta.` },
        { question: `¿Qué información necesita MANEXT para cotizar ${keyword}?`, answer: `Necesitamos conocer la aplicación, cantidad, ubicación y fecha requerida. También debemos confirmar ${seed.selection.toLocaleLowerCase('es-MX')} para preparar una propuesta comparable y responsable.` },
      ],
      internalLinks: [
        { label: seed.relatedLabel, url: seed.relatedUrl },
        sharedLinks[seed.group],
        { label: 'Programa de mantenimiento y recarga', url: '/mantenimiento-preventivo/' },
      ],
    })];
  }));
}
