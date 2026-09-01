<script lang="ts">
  import '../app.css';
  import { FORUM_SUGGEST_URL, FORUM_URL, MAIN_SITE, SITE_NAME, SITE_URL } from '$lib/config';
  let { children } = $props();
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title={SITE_NAME} href="/feed.xml" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:image" content="{SITE_URL}/favicon.png" />
</svelte:head>

<header class="site-header">
  <a class="logo" href={MAIN_SITE} aria-label="Edible home">
    <picture>
      <source srcset="/logo-cream.svg" media="(prefers-color-scheme: dark)" />
      <img src="/logo.svg" alt="Edible" width="100" height="31" />
    </picture>
  </a>
  <nav>
    <a href={FORUM_SUGGEST_URL}>Suggest a feature</a>
    <a href={FORUM_URL}>Forum</a>
  </nav>
</header>

<main>
  {@render children()}
</main>

<footer class="site-footer">
  <span>Menus that speak allergies and diets.</span>
  <span>
    <a href="/feed.xml">RSS</a> · <a href="/latest.json">JSON</a> ·
    <a href="https://github.com/whatisedible/changelog">Source</a>
  </span>
</footer>
