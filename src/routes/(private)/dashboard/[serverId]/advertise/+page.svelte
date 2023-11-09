<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ServerSettings } from '$lib/types/maya.js';
	import { SlideToggle, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { onMount } from 'svelte';
  
  const toastStore = getToastStore()
  
  export let data
  export let form
  let tagsList: string[] = [] 
  $: tagsList
  let serverSettings: ServerSettings | null = null
  $: serverSettings

  let thisServerTags: string[] = []
  $: adsEnabled = form?.bump_enabled ?? true
  $: thisServerTags
  onMount(async() => {
    serverSettings = await data.lazy.serverSettings
    tagsList = await data.lazy.tagsList
    adsEnabled = serverSettings.dashboard_data.bump_enabled
    thisServerTags = serverSettings.dashboard_data.bump_tags
  })
</script>

<h1 class="h1 mt-2 mb-8">📢 Advertise</h1>
{#await data.lazy.tagsList}
  Getting tags...
{:then tagsList} 
  {#await data.lazy.serverSettings}
    Getting server settings...
  {:then} 
    <form class="flex flex-col gap-4 p-2" action="?/updateBumpSettings" method="post" on:submit|preventDefault use:enhance={() => {
      return ({result}) => {
        if (result.status === 200) {
          // make settings updated toast
          const t = {
            message: "Updated successfully",
            background: "variant-filled-success",
          }
          toastStore.trigger(t)
        }
      }
    }}>
      <label for="tags" class="flex items-center gap-4">
        Enable Advertisements
        <SlideToggle name="bump_enabled" id="bump_enabled" bind:checked={adsEnabled} />
      </label>
      <div class={`card p-6 flex flex-col gap-4 ${adsEnabled ? 'block' : 'hidden'}`}>
        <!-- list all tags in badges -->
        <div class="flex flex-col flex-wrap gap-4">
          <h2>Tags</h2>
          <div class="flex gap-2 flex-wrap">
            {#each tagsList as tag}
                <label for={`bump_tags_${tag}`} class="flex items-center space-x-2">
                  <input class="checkbox" id={`bump_tags_${tag}`} name="bump_tags" type="checkbox" checked={form?.tags ? form?.tags.includes(tag) : thisServerTags.includes(tag)} value={tag} />
                  <p>{tag}</p>
                </label>
            {/each}
          </div>
        </div>
      </div>
      <button class="btn variant-filled-primary" type="submit">
        Save
      </button>
    </form>
  {/await}
{/await}
