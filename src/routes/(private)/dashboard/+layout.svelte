<script lang="ts">

	import { page } from "$app/stores";
	import { AppShell, Avatar } from "@skeletonlabs/skeleton";

  export let data
  $: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

<AppShell>
  <svelte:fragment slot="sidebarLeft">
    <div class="p-2 h-full overflow-y-auto">
      <h2 class="h2">
        Your Servers
      </h2>
      {#await data.lazy.moderatingServers}
      <p class="text-center">
        Loading...
      </p>
      {:then servers}
      <div class="flex w-full justify-center gap-4 mt-10">
        {#each servers as server}
        <a href={`/dashboard/${server.id}`} class={`w-full p-2 rounded-lg ${classesActive(`/dashboard/${server.id}`)}`}>
          <div class="w-fit h-fit overflow-hidden">
              <div class="flex gap-2 h-full items-center justify-end">
                <Avatar src={server.avatar} width="w-16" rounded="rounded-lg" />
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
  </svelte:fragment>
  <div class="flex flex-col  w-full h-full items-center">
    <div class="container w-full h-full">
      <slot />
    </div>
  </div>
</AppShell>