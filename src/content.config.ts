import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    project: z.string().optional(),
    tag: z.string().optional(),
    tagClass: z.enum(['ai', 'cre', 'notes']).optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    blurb: z.string(),
    order: z.number().default(99),
    draft: z.boolean().default(false),
    /* Optional spec-sheet fields (project detail page). */
    status: z.string().optional(),
    statusClass: z.enum(['live', 'beta', 'idle']).optional(),
    role: z.string().optional(),
    for: z.string().optional(),
    built: z.string().optional(),
    since: z.union([z.string(), z.number()]).optional(),
    stack: z.array(z.string()).optional(),
    sources: z.array(z.string()).optional(),
    users: z.string().optional(),
    category: z.string().optional(),
    /* Optional rich sections (hidden when absent). */
    stats: z
      .array(
        z.object({
          num: z.string(),
          unit: z.string().optional(),
          label: z.string(),
        }),
      )
      .optional(),
    timeline: z
      .array(
        z.object({
          when: z.string(),
          what: z.string(),
        }),
      )
      .optional(),
    changelog: z
      .array(
        z.object({
          version: z.string(),
          date: z.string(),
          note: z.string(),
        }),
      )
      .optional(),
  }),
});

export const collections = { posts, projects };
