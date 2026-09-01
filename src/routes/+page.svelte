<script lang="ts">
  import { onMount } from 'svelte';
  import { APPS, SITE_DESCRIPTION, SITE_NAME, TOPICS, type App, type Topic } from '$lib/config';
  import { formatDate } from '$lib/entries';

  let { data } = $props();

  let topic = $state<'all' | Topic>('all');
  let app = $state<'all' | App>('all');

  const shown = $derived(
    data.entries.filter(
      (e) => (topic === 'all' || e.topic === topic) && (app === 'all' || e.apps.includes(app))
    )
  );

  onMount(() => {
    const p = new URLSearchParams(location.search);
    const t = p.get('topic');
    const a = p.get('app');
    if (t && t in TOPICS) topic = t as Topic;
    if (a && a in APPS) app = a as App;
  });

  function sync() {
    const p = new URLSearchParams();
    if (topic !== 'all') p.set('topic', topic);
    if (app !== 'all') p.set('app', app);
    const q = p.toString();
    history.replaceState(null, '', q ? `?${q}` : location.pathname);
  }
  function pickTopic(t: 'all' | Topic) {
    topic = topic === t ? 'all' : t;
    sync();
  }
  function pickApp(a: 'all' | App) {
    app = app === a ? 'all' : a;
    sync();
  }
  const emptyLabel = $derived(
    [topic !== 'all' ? TOPICS[topic] : null, app !== 'all' ? APPS[app].label : null]
      .filter(Boolean)
      .join(' · ')
  );
</script>

<svelte:head>
  <title>{SITE_NAME}</title>
  <meta name="description" content={SITE_DESCRIPTION} />
</svelte:head>

<h1>What's new</h1>
<p class="lede">{SITE_DESCRIPTION}</p>

<div class="filters" aria-label="Filter entries">
  <div class="chips" role="group" aria-label="Topic">
    <button class:active={topic === 'all'} onclick={() => pickTopic('all')}>All</button>
    {#each Object.entries(TOPICS) as [key, label]}
      <button class:active={topic === key} onclick={() => pickTopic(key as Topic)}>{label}</button>
    {/each}
  </div>
  <div class="chips secondary" role="group" aria-label="App">
    {#each Object.entries(APPS) as [key, meta]}
      <button class:active={app === key} onclick={() => pickApp(key as App)}>{meta.label}</button>
    {/each}
  </div>
</div>

{#if shown.length === 0}
  <p class="empty">{emptyLabel ? `No entries tagged ${emptyLabel} yet.` : 'Nothing here yet. The first entries are on their way.'}</p>
{:else}
  <ol class="entries">
    {#each shown as e (e.slug)}
      <li class="card">
        <div class="meta">
          <time datetime={e.date}>{formatDate(e.date)}</time>
          <span class="chip topic">{TOPICS[e.topic]}</span>
          {#each e.apps as a}<span class="chip app">{APPS[a].label}</span>{/each}
        </div>
        <h2><a href="/{e.slug}">{e.title}</a></h2>
        <p>{e.summary}</p>
        {#if e.image}<img src={e.image} alt="" loading="lazy" />{/if}
      </li>
    {/each}
  </ol>
{/if}
