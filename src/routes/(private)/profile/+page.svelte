<script lang="ts">
	import { page } from "$app/stores";
	import { Avatar } from "@skeletonlabs/skeleton";

  export let data
</script>
<div class="flex flex-col items-center">
  <div class="container">
    <h1 class="h1">
      Your Profile!
    </h1>
    <!-- server card container -->
    <div class="flex w-full justify-center gap-4 mt-10">
      <a href={`https://guilded.gg/u/${$page.data.user.id}`} class="w-full">
        <div class="card bg-initial w-full h-80 overflow-hidden">
          <header class="card-header relative">
            <div style={`background-image: url(${$page.data.user.banner})`} class="absolute left-0 right-0 h-60 top-0 bg-cover bg-center" />
            <!-- <img src={server.banner} alt={`${server.name}'s banner'`} class="bg-black/50 w-full h-300 "> -->
          </header>
            <div class="flex flex-col h-full items-center justify-end pb-10">
              <Avatar src={$page.data.user.avatar} width="w-32" />
              <h6 class="h6">
                {$page.data.user.name}
              </h6>
            </div>
        </div>
      </a>
    </div>
    <h2 class="h2">
      Moderating Servers 🌟
    </h2>
    {#await data.lazy.moderatingServers}
    <p class="text-center">
      Loading...
    </p>
    {:then servers}
    <div class="flex flex-wrap w-full justify-center gap-4 mt-10">
      {#each servers as server}
      <a href={`/dashboard/${server.id}`}>
        <div class="card bg-initial w-72 h-80 overflow-hidden">
          <header class="card-header relative">
            <div style={`background-image: url(${server.banner})`} class="absolute left-0 right-0 h-60 top-0 bg-cover bg-center" />
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
    {:catch error}
    <p class="text-center">
      {error.message}
    </p>
    {/await}
  </div>
</div>