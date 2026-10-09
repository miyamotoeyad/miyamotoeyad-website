import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { bump } from '../../../lib/counts';

export const prerender = false;

export const GET: APIRoute = async ({ params, redirect }) => {
  const game = await getEntry('games', params.slug!);
  if (!game) return new Response('Not found', { status: 404 });
  await bump(`downloads:${game.id}`);
  return redirect(game.data.downloadUrl, 302);
};
