# Localization site (Astro + TypeScript)

    npm install && npm run dev

- **Add a game:** new `.md` file in `src/content/games/` (frontmatter fields are in `src/content.config.ts`). Put the PNG logo in `public/games/<slug>/` and set `logo:`.
- **Add a post:** new `.md` file in `src/content/blog/`. Reading time is computed from the text.
- **Counters:** `data/counts.json` stores downloads and reads. Needs a host with a persistent disk (`npm run build && npm start`). On Vercel, replace `src/lib/counts.ts` with Upstash Redis/KV.
- **Language:** Arabic RTL by default; set `PUBLIC_LANG=en` for English. Strings live in `src/i18n.ts`.
