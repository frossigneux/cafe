import { defineConfig } from 'astro/config';

// SITE_ORIGIN / SITE_BASE come from the GitHub Pages workflow (the site lives under /cafe/).
// On Cloudflare Pages, set SITE_ORIGIN to the custom domain; CF_PAGES_URL is the fallback.
export default defineConfig({
  site: process.env.SITE_ORIGIN || process.env.CF_PAGES_URL,
  base: process.env.SITE_BASE || '/',
});
