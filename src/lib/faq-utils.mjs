export function normalizeFaqQuestion(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('es-MX');
}

export function assertFaqCollection(route, faqs, minimum = 8) {
  if (!Array.isArray(faqs) || faqs.length < minimum) {
    throw new Error(`${route} must contain at least ${minimum} FAQ entries`);
  }

  const normalized = new Set();
  for (const [index, faq] of faqs.entries()) {
    if (!faq || typeof faq.question !== 'string' || typeof faq.answer !== 'string') {
      throw new Error(`${route} FAQ ${index + 1} must contain string question and answer fields`);
    }
    if (!faq.question.trim() || !faq.answer.trim()) {
      throw new Error(`${route} FAQ ${index + 1} cannot be empty`);
    }
    const key = normalizeFaqQuestion(faq.question);
    if (normalized.has(key)) {
      throw new Error(`${route} contains duplicate FAQ question: ${faq.question}`);
    }
    normalized.add(key);
  }

  return faqs;
}

export function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}
