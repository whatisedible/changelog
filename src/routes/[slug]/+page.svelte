<script lang="ts">
  import { APPS, FORUM_DISCUSS_URL, SITE_NAME, TOPICS } from '$lib/config';
  import { formatDate } from '$lib/entries';
  let { data } = $props();
  const e = $derived(data.entry);
</script>

<svelte:head>
  <title>{e.title} — {SITE_NAME}</title>
  <meta name="description" content={e.summary} />
  <meta property="og:title" content={e.title} />
  <meta property="og:description" content={e.summary} />
  {#if e.image}<meta property="og:image" content={e.image} />{/if}
</svelte:head>

<article class="entry">
  <p class="back"><a href="/">← All updates</a></p>
  <div class="meta">
    <time datetime={e.date}>{formatDate(e.date)}</time>
    <span class="chip topic">{TOPICS[e.topic]}</span>
    {#each e.apps as a}<span class="chip app">{APPS[a].label}</span>{/each}
  </div>
  <h1>{e.title}</h1>
  {#if e.image}<img src={e.image} alt="" />{/if}
  <div class="body">{@html e.html}</div>
  {#if e.note}
    <aside class="note"><strong>A note from the team</strong><p>{e.note}</p></aside>
  {/if}
  <p class="discuss"><a href={FORUM_DISCUSS_URL}>Discuss this on the forum →</a></p>
</article>
