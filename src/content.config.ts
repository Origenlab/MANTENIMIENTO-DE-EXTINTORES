import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const productosCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/productos" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.string().optional(),
    category: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  productos: productosCollection,
};
