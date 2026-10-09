import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const games = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
  schema: z.object({
    title: z.string(),
    logo: z.string().optional(),   // translated PNG logo, e.g. /games/my-game/logo.png (in /public)
    cover: z.string().optional(),  // card image; a pattern is used when missing
    youtube: z.string(),           // video ID only, e.g. dQw4w9WgXcQ
    downloadUrl: z.string().url(),
    publish: z.date(),
    update: z.date(),
    version: z.string(),
    platform: z.string().default('PC'),
    translated: z.array(z.string()),
    baseDownloads: z.number().default(0), // start from an existing count
    date: z.coerce.date(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({ title: z.string(), description: z.string(), date: z.coerce.date() }),
});

// The game being worked on right now (shown first on the landing page). Newest date wins.
const current = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/current' }),
  schema: z.object({
    title: z.string(),
    cover: z.string().optional(),
    progress: z.number().min(0).max(100), // percent translated
    date: z.coerce.date(),
  }),
});

export const collections = { games, blog, current };
