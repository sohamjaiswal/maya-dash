<script lang="ts">
	import { onMount } from 'svelte';

  export let data

  onMount(async() => {
    const serverData = await data.lazy.serverData
    console.log(serverData)
  })
</script>

{#await data.lazy.serverData}
  <p>
    Loading...
  </p>
{:then serverData} 
  <pre>
    {JSON.stringify(serverData, null, 2)}
  </pre>
{:catch error}
  <p>
    {error.message}
  </p>
{/await}