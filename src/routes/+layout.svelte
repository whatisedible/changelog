<script lang="ts">
  import '../app.css';
  import { FORUM_SUGGEST_URL, FORUM_URL, MAIN_SITE, SITE_NAME } from '$lib/config';
  let { children } = $props();
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title={SITE_NAME} href="/feed.xml" />
</svelte:head>

<header class="site-header">
  <a class="wordmark" href={MAIN_SITE}>Edible</a>
  <nav>
    <a href="/">What's new</a>
    <a href={FORUM_SUGGEST_URL}>Suggest a feature</a>
    <a href={FORUM_URL}>Forum</a>
  </nav>
</header>

<main>
  {@render children()}
</main>

<footer class="site-footer">
  <span>Edible — menus that speak allergies and diets.</span>
  <span>
    <a href="/feed.xml">RSS</a> · <a href="/latest.json">JSON</a> ·
    <a href="https://github.com/whatisedible/changelog">Source</a>
  </span>
</footer>
