import {
  catalogExpansionByParent,
  catalogExpansionProposals,
} from './index.mjs';

const proposalById = new Map(catalogExpansionProposals.map((proposal) => [proposal.id, proposal]));

const groupResourceLinks = {
  portatiles: { label: 'Comparar extintores y agentes', url: '/venta-de-extintores/' },
  industriales: { label: 'Soluciones para protección industrial', url: '/servicios/' },
  automaticos: { label: 'Evaluación de sistemas contra incendio', url: '/servicios/' },
  accesorios: { label: 'Señalización y equipamiento complementario', url: '/senalizacion/' },
  refacciones: { label: 'Servicio profesional para extintores', url: '/mantenimiento-preventivo/' },
};

function uniqueSourceRecords(proposal) {
  return [...new Set([...proposal.primarySources, ...proposal.normativeSources])].map((url) => {
    const hostname = new URL(url).hostname.replace(/^www\./, '');
    const normative = /(?:dof\.gob\.mx|stps\.gob\.mx)/.test(hostname);

    return Object.freeze({
      label: normative ? `Fuente normativa oficial: ${hostname}` : `Fuente técnica: ${hostname}`,
      url,
    });
  });
}

function createEditorialProfile(proposal) {
  const keyword = proposal.primaryKeyword.toLocaleLowerCase('es-MX');
  const variant = proposal.variants[0];
  const application = proposal.applications[0];
  const sector = proposal.sectors[0];
  const limitation = proposal.limitations[0];
  const agent = proposal.agentOrMaterial || 'la configuración indicada';

  return Object.freeze({
    primaryKeyword: proposal.primaryKeyword,
    h1: proposal.h1,
    seoTitle: proposal.seoTitle,
    metaDescription: proposal.metaDescription,
    secondaryKeywords: proposal.secondaryKeywords,
    searchIntent: proposal.searchIntent,
    buyerScenario: proposal.need,
    valuePromise: proposal.valueProposition,
    selectionFocus: proposal.selection,
    differentiator: `${proposal.valueProposition} La diferencia debe confirmarse contra la ficha y el modelo disponible antes de aceptar el suministro.`,
    notFor: `${limitation} Si el escenario cambia, MANEXT compara otra variante o tecnología antes de cotizar.`,
    humanLead: `${proposal.h1} responde a una necesidad concreta: ${proposal.need} ${proposal.valueProposition}`,
    humanDescription: `${proposal.need} ${proposal.valueProposition} Para preparar una propuesta responsable, MANEXT confirma ${proposal.selection.toLocaleLowerCase('es-MX')}, la compatibilidad del producto y las condiciones reales de ${application.toLocaleLowerCase('es-MX')}.`,
    benefitAngles: [
      {
        title: `Valor operativo de ${proposal.shortName}`,
        text: `${proposal.valueProposition} El beneficio se valida en la configuración cotizada y no se presenta como una promesa universal.`,
      },
      {
        title: `Selección basada en ${proposal.selection.split(',')[0].trim()}`,
        text: `${proposal.selection} Revisar estos datos evita pedir una capacidad, pieza o agente que no corresponda a la operación real.`,
      },
      {
        title: `Aplicación en ${application}`,
        text: `${proposal.name} puede considerarse para ${application.toLocaleLowerCase('es-MX')} cuando ${agent.toLocaleLowerCase('es-MX')} y la variante ${variant} coinciden con el requerimiento documentado.`,
      },
      {
        title: 'Límite técnico que conviene conocer',
        text: `${limitation} Explicarlo desde la cotización permite comparar alternativas con mayor claridad.`,
      },
    ],
    faqs: [
      {
        question: `¿Cuándo conviene cotizar ${keyword}?`,
        answer: `${proposal.need} En ese escenario, ${proposal.valueProposition.toLocaleLowerCase('es-MX')} La recomendación final requiere revisar el riesgo y el producto disponible.`,
      },
      {
        question: `¿Qué variante se considera para ${keyword}?`,
        answer: `La propuesta contempla ${variant}. Capacidad, dimensiones, materiales, rating y compatibilidad se confirman con la documentación de la opción cotizada.`,
      },
      {
        question: `¿Cuál es el uso recomendado de ${keyword}?`,
        answer: `Se estudia principalmente para ${application.toLocaleLowerCase('es-MX')} en sectores como ${sector.toLocaleLowerCase('es-MX')}. La aplicación final depende del riesgo, el entorno y la operación.`,
      },
      {
        question: `¿Qué criterio cambia la selección de ${keyword}?`,
        answer: `${proposal.selection} No basta con comparar el nombre o una fotografía; esos datos deben coincidir con el modelo y el escenario real.`,
      },
      {
        question: `¿Qué limitación tiene ${keyword}?`,
        answer: `${limitation} MANEXT contrasta este límite con el combustible, el ambiente y la respuesta prevista antes de recomendar una configuración.`,
      },
      {
        question: `¿Qué información necesita MANEXT para cotizar ${keyword}?`,
        answer: `Necesitamos aplicación, cantidad, ubicación, fecha requerida y cualquier dato disponible sobre ${proposal.selection.toLocaleLowerCase('es-MX')}. Así se prepara una propuesta comparable y técnicamente responsable.`,
      },
      {
        question: `¿La propuesta de ${keyword} puede incluir instalación y servicio?`,
        answer: 'Sí. Cuando corresponde, la cotización puede integrar suministro, instalación, señalización, mantenimiento, recarga, refacciones o capacitación. Cada alcance se confirma por escrito.',
      },
      {
        question: `¿Cómo se confirman disponibilidad y documentación de ${keyword}?`,
        answer: 'Antes de aceptar el suministro se identifica la variante disponible y se confirman marca, modelo, compatibilidad, documentación y fecha estimada. El catálogo no presume stock ni certificaciones.',
      },
    ],
    internalLinks: [
      groupResourceLinks[proposal.group],
      { label: 'Programa de mantenimiento y recarga', url: '/mantenimiento-preventivo/' },
    ],
  });
}

export const expansionEditorialProfiles = Object.freeze(Object.fromEntries(
  catalogExpansionProposals.map((proposal) => [proposal.id, createEditorialProfile(proposal)]),
));

export function buildPublishedExpansionProducts(parentProducts) {
  const parentById = new Map(parentProducts.map((product) => [product.id, product]));

  return catalogExpansionProposals.map((proposal) => {
    const parent = parentById.get(proposal.parentId);
    if (!parent) {
      throw new Error(`Cannot publish ${proposal.id}: missing parent ${proposal.parentId}`);
    }

    return Object.freeze({
      id: proposal.id,
      parentProductId: proposal.parentId,
      isDerived: true,
      name: proposal.name,
      shortName: proposal.shortName,
      group: proposal.group,
      agent: proposal.agentOrMaterial || parent.agent,
      fireClasses: proposal.fireClasses.length ? proposal.fireClasses : parent.fireClasses,
      variants: proposal.variants,
      applications: proposal.applications,
      sectors: proposal.sectors,
      image: parent.image,
      imageAlt: `Imagen ilustrativa de ${proposal.name}; marca y configuración se confirman en la cotización`,
      availability: 'validacion-tecnica',
      priority: Math.max(4, Number(parent.priority || 1) + 3),
      description: proposal.valueProposition,
      technicalValidation: true,
      productPageUrl: `/catalogo/${proposal.slug}`,
      primaryKeyword: proposal.primaryKeyword,
      differentiationType: proposal.differentiationType,
      sourceReviewedAt: proposal.sourceReviewedAt,
      sources: uniqueSourceRecords(proposal),
    });
  });
}

export function getExpansionRelationshipLinks(productId, parentProducts) {
  const children = catalogExpansionByParent.get(productId);
  if (children) {
    return children.map((proposal) => ({
      label: proposal.cardAnchor,
      url: `/catalogo/${proposal.slug}`,
    }));
  }

  const proposal = proposalById.get(productId);
  if (!proposal) return [];

  const parent = parentProducts.find((product) => product.id === proposal.parentId);
  if (!parent) {
    throw new Error(`Cannot build relationships for ${productId}: missing parent ${proposal.parentId}`);
  }

  const siblings = catalogExpansionByParent.get(proposal.parentId) || [];
  return [
    { label: `Familia: ${parent.name}`, url: parent.productPageUrl },
    ...siblings
      .filter((sibling) => sibling.id !== productId)
      .map((sibling) => ({ label: sibling.cardAnchor, url: `/catalogo/${sibling.slug}` })),
  ];
}
