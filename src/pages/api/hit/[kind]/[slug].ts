import type { APIRoute } from 'astro';
import { get, bump } from '../../../../lib/counts';

export const prerender = false;
const json = (count: number) => new Response(JSON.stringify({ count }), { headers: { 'content-type': 'application/json' } });
const valid = (kind?: string, slug?: string) => (kind === 'downloads' || kind === 'reads') && /^[a-z0-9-]+$/.test(slug ?? '');

export const GET: APIRoute = async ({ params }) =>
  valid(params.kind, params.slug) ? json(await get(`${params.kind}:${params.slug}`)) : new Response(null, { status: 400 });

// Only reads can be incremented from the browser; downloads are counted by /api/download/[slug].
export const POST: APIRoute = async ({ params }) =>
  params.kind === 'reads' && valid(params.kind, params.slug) ? json(await bump(`reads:${params.slug}`)) : new Response(null, { status: 400 });
