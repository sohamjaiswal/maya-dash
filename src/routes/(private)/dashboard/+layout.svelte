<script lang="ts">

	import { page } from "$app/stores";
	import Icon from "@iconify/svelte";
	import { AppShell, Avatar, getDrawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";

  export let data

  $: classesActive = (href: string) => ($page.url.pathname.startsWith(href) ? '!bg-primary-500' : '');
  $: preciseClassesActive = (href: string) => ($page.url.pathname === href ? '!bg-primary-500' : '');
  $: tabsActive = (href: string) => ($page.url.pathname.startsWith(href) ? 'block' : 'hidden');
  const drawerStore = getDrawerStore()
  const drawerSettings: DrawerSettings = {
    position: 'left',
    width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-lg',
    meta: {
      servers: data.lazy.moderatingServers
    }
  }
</script>

<AppShell>
  <svelte:fragment slot="sidebarLeft">
    <button class="btn-icon md:hidden w-12 h-12 variant-filled-primary fixed bottom-4 left-4" on:click={() => drawerStore.open(drawerSettings)}>
      <Icon icon="bxs:server" class="w-8 h-8" />
    </button>
    <div class="p-2 h-full overflow-y-auto hidden md:block">
      <h2 class="h2">
        Your Servers
      </h2>
      {#await data.lazy.moderatingServers}
      <p class="text-center">
        Loading...
      </p>
      {:then servers}
      <div class="flex flex-col w-full justify-center gap-4 mt-10">
        {#each servers as server}
        <div class="flex flex-col gap-4">
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
          <div class={`flex flex-col gap-2 ml-10 ${tabsActive(`/dashboard/${server.id}`)}`}>
            <a href={`/dashboard/${server.id}`}>
              <div class={`w-full p-2 rounded-lg ${preciseClassesActive(`/dashboard/${server.id}/general`)} `}>
                🏠 General
              </div>
            </a>
            <a href={`/dashboard/${server.id}/members`}>
              <div class={`w-full p-2 rounded-lg ${preciseClassesActive(`/dashboard/${server.id}/members`)}`}>
                👥 Members
              </div>
            </a>
            <a href={`/dashboard/${server.id}/audit-log`}>
              <div class={`w-full p-2 rounded-lg ${preciseClassesActive(`/dashboard/${server.id}/audit-log`)}`}>
                📜 Audit Log
              </div>
            </a>
            <a href={`/dashboard/${server.id}/advertise`}>
              <div class={`w-full p-2 rounded-lg ${preciseClassesActive(`/dashboard/${server.id}/advertise`)}`}>
                📢 Advertise
              </div>
            </a>
          </div>
        </div>
        {/each}
      </div>
      {:catch error}
      <p class="text-center">
        {error.message}
      </p>
      {/await}
    </div>
  </svelte:fragment>
  <div class="flex flex-col  w-full items-center">
    <div class="container w-full">
      {#key $page.params.serverId}
        <slot />
      {/key}
    </div>
  </div>
</AppShell>