import { env as privateEnv } from '$env/dynamic/private';
import { executeQuery } from '@datocms/cda-client';
import type { QuerySubscriptionOptions } from '@datocms/svelte';
import type { RequestEvent } from '@sveltejs/kit';
import type { TadaDocumentNode } from 'gql.tada';

/**
 * Returns options required to initialize real-time subscriptions to draft content using
 * the `querySubscription` store.
 *
 * Pages and layouts can use this function in their `load` server functions.
 *
 * Read more: https://github.com/datocms/datocms-svelte/tree/main/src/lib/stores/querySubscription
 */
export async function generateRealtimeSubscription<Result, Variables>(
  event: RequestEvent,
  query: TadaDocumentNode<Result, Variables>,
  variables?: Variables,
): Promise<QuerySubscriptionOptions<Result, Variables>> {

  const data = await executeQuery(query, {
    variables,
    excludeInvalid: true,
    token: privateEnv.PRIVATE_DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN,
  });

  return {
    enabled: false,
    initialData: data,
  };

}
