import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Pages are static; only /api/* routes run on the server (view and download counters).
export default defineConfig({ output: 'static', adapter: node({ mode: 'standalone' }) });
