import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const areas = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/areas' }),
  schema: z.object({
    cityName: z.string(),
    title: z.string(),
    description: z.string(),
    localContext: z.string(),
    nearbyAreas: z.array(z.string()),
    whatsappMessage: z.string(),
    localLandmark: z.string().optional(),
    businessTrends: z.string().optional(),
    clientCountLocal: z.number().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
});

const portfolios = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx,json}', base: './src/content/portfolios' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    category: z.enum(['Website Kustom', 'IoT Development', 'SEO Lokal']),
    description: z.string(),
    images: z.array(image()).optional(), // Menggunakan helper image() untuk optimasi
    tech: z.array(z.string()),
    publishDate: z.date().optional(),
  }),
});

export const collections = { areas, portfolios };
