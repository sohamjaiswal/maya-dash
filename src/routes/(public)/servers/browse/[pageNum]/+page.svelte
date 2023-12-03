<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { AdvertisedServer } from '$lib/types/maya';
	import { Avatar, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	const toastStore = getToastStore();
	$: filter_type = 'time';
	$: pageNumber = $page.params.pageNum;
	let useServers: AdvertisedServer[] = [];
	let nextServers: AdvertisedServer[] = [];
	$: useServers;
	$: nextServers;
	let getServers: (filter_type: string, pageNumber: string) => Promise<void> = async () => {};
	let getNextServers: (filter_type: string, pageNumber: string) => Promise<void> = async () => {};
	$: getServers(filter_type, pageNumber);
	$: getNextServers(filter_type, pageNumber);
	onMount(() => {
		getServers = async (filter_type, pageNumber) => {
			const servers = await (
				await fetch(`/servers/browse/${pageNumber}`, {
					method: 'POST',
					body: JSON.stringify({
						filter_type
					})
				})
			).json();
			useServers = servers;
		};
		getNextServers = async (filter_type, pageNumber) => {
			const pNum = parseInt(pageNumber);
			if (isNaN(pNum)) {
				nextServers = [];
				const t = {
					message: "Bad page number (It's not even number!)",
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
				return;
			}
			const servers = await (
				await fetch(`/servers/browse/${pNum + 1}`, {
					method: 'POST',
					body: JSON.stringify({
						filter_type
					})
				})
			).json();
			nextServers = servers;
		};
	});
</script>

<div class="flex flex-col items-center">
	<div class="container">
		<div class="w-full grid grid-cols-3 mt-5">
      <div class="dummy" />
      <div class="text-center">
        <h1 class="h1">Top Bumped Servers!</h1>
      </div>
      <div class="flex justify-end items-center h-full">
        <select class="select w-min h-min" name="filter_type" id="filter_type" bind:value={filter_type}>
          <option value="time">⏰ Time</option>
          <option value="upvotes">⬆️ Upvotes</option>
        </select>
      </div>
		</div>
    <div class="flex flex-col items-center gap-4">
      <div class="flex flex-wrap justify-center gap-4 mt-10">
        {#each useServers as server}
          <a href={`/servers/${server.id}`}>
            <div class="card bg-initial w-[22rem] h-96 overflow-hidden">
              <header class="card-header relative">
                <div
                  style={`background-image: url(${server.banner})`}
                  class="absolute left-0 right-0 h-60 top-0 bg-cover bg-center"
                />
              </header>
              <div class="flex flex-col h-full items-center justify-end pb-10">
                <Avatar src={server.avatar} width="w-32" />
                <h6 class="h6">
                  {server.name}
                </h6>
                <div class="flex gap-4 p-2">
                  <div class="flex gap-4">
                    <div class="flex flex-col gap-1">
                      <h6 class="h6">👥 Members</h6>
                      <p class="p">
                        {server.members}
                      </p>
                    </div>
                    <div class="flex flex-col gap-1">
                      <h6 class="h6">⬆️ Upvotes</h6>
                      <p class="p">
                        {server.upvotes}
                      </p>
                    </div>
                    <div class="flex flex-col gap-1">
                      <h6 class="h6">⏰ Bumped</h6>
                      <p class="p">
                        {server.time_display}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        {/each}
      </div>
        <div class="flex gap-4 items-center">
          <!-- next page and prev page buttons -->
          <button
          class="btn variant-filled-primary"
          disabled={parseInt(pageNumber) <= 1}
          on:click={() => goto(`/servers/browse/${parseInt(pageNumber) - 1}`)}
          >
          👈 Prev Page
        </button>
        <strong>
          Current Page: {$page.params.pageNum}
        </strong>
          <a href={`/servers/browse/${parseInt(pageNumber) + 1}`}>
            <button class="btn variant-filled-primary" disabled={nextServers.length === 0}>
              Next Page 👉
            </button>
          </a>
        </div>
    </div>
	</div>
</div>
