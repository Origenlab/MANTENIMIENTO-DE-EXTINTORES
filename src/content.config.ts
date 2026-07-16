import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    heroImage: z.string().optional(),
    heroRight: z.array(z.string()).optional(),
  }),
});

// La colección `productos` se retiró en la fase 2 de la auditoría 2026-07-16.
// Emitía 42 URLs huérfanas (0 enlaces entrantes, 22 stubs vacíos) que
// duplicaban el catálogo de 276 fichas vivas de src/data/catalog-products.mjs.
// Los 301 viven en public/_redirects. El contenido queda en git (commit af6218f).

export const collections = {
  blog: blogCollection,
};
