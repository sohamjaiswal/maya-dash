<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ServerSettings } from '$lib/types/maya.js';
	import { InputChip, SlideToggle } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
  export let data
  let tagsList: string[] = [] 
  $: tagsList
  let serverSettings: ServerSettings | null = null
  $: serverSettings

  let thisServerTags: string[] = []
  $: adsEnabled = true
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
  {:then serverSettings} 
    <form class="flex flex-col gap-4 p-2" action="?/updateBumpSettings" method="post" use:enhance>
      <label for="tags" class="flex items-center gap-4">
        Enable Advertisements
        <SlideToggle name="bump_enabled" id="bump_enabled" bind:checked={adsEnabled} />
      </label>
      <div class={`card p-6 flex flex-col gap-4 ${adsEnabled ? 'block' : 'hidden'}`}>
        <!-- list all tags in badges -->
        <div class="flex flex-wrap gap-4">
          <h2>Available Tags</h2>
          <div class="flex flex-wrap gap-2">
            {#each tagsList as tag}
              <div class="badge variant-filled">
                {tag}
              </div>
            {/each}
          </div>
          <h2>Your Tags</h2>
          <InputChip name="bump_tags" bind:value={thisServerTags} whitelist={tagsList} allowUpperCase />
          <!-- submit button -->
        </div>
      </div>
      <button class="btn variant-filled-primary" type="submit">
        Save
      </button>
    </form>
  {/await}
{/await}
