<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { Avatar, RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
  $: filter_type = 'time'
  $: pageNumber = $page.params.pageNum
  let useServers: {
    avatar: string;
    banner: string;
    id: string;
    name: string;
    members: number;
    time: number;
    upvotes: number;
    url: string;
  }[] = []
  $: useServers
  let getServers: (filter_type: string, pageNumber: string) => Promise<void> = async () => {}
  $: getServers(filter_type, pageNumber)
  onMount(() => {
    getServers = async (filter_type, pageNumber) => {
    const servers = (await (await fetch(`/servers/browse/${pageNumber}`, {
      method: 'POST',
      body: JSON.stringify({
        filter_type
      })
    })).json())
    useServers = servers
  }
  })
</script>
<div class="flex flex-col items-center">
  <div class="container">
    <div class="flex gap-4 items-center justify-between">
      <div class="flex gap-4">
        <h1 class="h1">
          Top Bumped Servers!
        </h1>
        <RadioGroup>
          <RadioItem bind:group={filter_type} name="justify" value={'time'}>⏰</RadioItem>
          <RadioItem bind:group={filter_type} name="justify" value={'upvotes'}>⬆️</RadioItem>
        </RadioGroup>
      </div>
      <div class="flex gap-4">
        <!-- next page and prev page buttons -->
        <button class="btn variant-filled-primary" disabled={parseInt(pageNumber) <= 1} on:click={() => goto(`/servers/bumped/${parseInt(pageNumber) - 1}`)}>
          👈 Prev Page 
        </button>
        <a href={`/servers/bumped/${parseInt(pageNumber) + 1}`}>
          <button class="btn variant-filled-primary">
            Next Page 👉
          </button>
        </a>
      </div>
    </div>
    <h2 class="h2 mt-4">
      Page: {$page.params.pageNum}
    </h2>
    <div class="flex flex-wrap justify-center gap-4 mt-10">
      {#each useServers as server}
      <a href={`/servers/${server.id}`}>
        <div class="card bg-initial w-72 h-96 overflow-hidden">
          <header class="card-header relative">
            <div style={`background-image: url(${server.banner})`} class="absolute left-0 right-0 h-60 top-0 bg-cover bg-center" />
          </header>
            <div class="flex flex-col h-full items-center justify-end pb-10">
              <Avatar src={server.avatar} width="w-32" />
              <h6 class="h6">
                {server.name}
              </h6>
              <div class="flex gap-4 p-2">
                <div class="flex gap-4">
                  <p class="p">
                    {server.members} members
                  </p>
                  <p class="p">
                    {server.upvotes} upvotes
                  </p>
                </div>
                <p class="p">
                  {server.time} minutes ago
                </p>
              </div>
            </div>
        </div>
      </a>
      {/each}
    </div>
  </div>
</div>