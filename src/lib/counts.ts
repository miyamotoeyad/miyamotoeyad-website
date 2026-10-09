import { promises as fs } from 'node:fs';

// Simple JSON-file counters. Needs a host with a persistent disk (VPS, Railway, Fly volume).
// On serverless hosts (Vercel), swap get/bump for Upstash Redis or Vercel KV.
const FILE = process.env.COUNTS_FILE ?? './data/counts.json';
let queue: Promise<unknown> = Promise.resolve();

async function load(): Promise<Record<string, number>> {
  try { return JSON.parse(await fs.readFile(FILE, 'utf8')); } catch { return {}; }
}
export async function get(key: string): Promise<number> { return (await load())[key] ?? 0; }
export function bump(key: string): Promise<number> {
  const run = queue.then(async () => {
    const data = await load();
    data[key] = (data[key] ?? 0) + 1;
    await fs.writeFile(FILE, JSON.stringify(data));
    return data[key];
  });
  queue = run.catch(() => {});
  return run;
}
