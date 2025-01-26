<script lang="ts">
  import { Head, querySubscription } from '@datocms/svelte';
  import type { LayoutData } from './$types';
  import type { Snippet } from 'svelte';

  interface Props {
    data: LayoutData;
    children: Snippet;
  }

  let { data, children }: Props = $props();
  let subscription = $derived(querySubscription(data.subscription));
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/datocms/nextjs-starter-kit/src/app/global.css"
  />
</svelte:head>

<!--
  The <Head> component provided by @datocms/svelte automates the creation of
  meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
-->
<Head data={$subscription.data?._site.faviconMetaTags} />

<header>
  <h1>Bytes Of</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>

<main>
  {@render children()}
</main>
