<script lang="ts">
	import type { PropahServa, ServersRecord } from "$lib/types/maya";
	import { Avatar } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
  let useServers: PropahServa[] = []
  onMount(async() => {
    const servers = (await (await fetch(`https://api.mayabot.xyz/servers`)).json()).data.servers_list as ServersRecord
    useServers = Object.keys(servers).map((id) => ({
      id,
      ...servers[id],
    }));
  })
</script>

<div class="flex flex-col items-center">
  <div class="container">
    <h1 class="h1">
      Servers that use Maya!
    </h1>
    <!-- server card container -->
    <div class="flex flex-wrap justify-center gap-4 mt-10">
      {#each useServers as server}
      <a href={`https://guilded.gg/i/${server.id}`}>
        <div class="card bg-initial w-72 h-80 overflow-hidden">
          <header class="card-header relative">
            <div style={`background-image: url(${server.banner})`} class="absolute left-0 right-0 h-60 top-0 bg-cover bg-center" />
            <!-- <img src={server.banner} alt={`${server.name}'s banner'`} class="bg-black/50 w-full h-300 "> -->
          </header>
            <div class="flex flex-col h-full items-center justify-end pb-10">
              <Avatar src={server.avatar} width="w-32" />
              <h6 class="h6">
                {server.name}
              </h6>
            </div>
        </div>
      </a>
      {/each}
    </div>
  </div>
</div>