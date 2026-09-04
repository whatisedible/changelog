import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://changelog.whatisedible.com',
  trailingSlash: 'never',
  // One .html file per page, so /slug keeps working exactly as before.
  build: { format: 'file' }
});
