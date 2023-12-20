<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Icon from "@iconify/svelte";
	import { AppShell, Avatar, getDrawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";

  export let data

  $: classesActive = (href: string) => ($page.url.pathname.startsWith(href) ? '!bg-primary-500' : '');
  $: preciseClassesActive = (href: string) => ($page.url.pathname === href ? '!bg-primary-500' : '');
  $: tabsActive = (href: string) => ($page.url.pathname.startsWith(href) ? 'block' : 'hidden');
  $: selectedServer = ''
  const changeSelectedServer = (e: Event) => {
    const target = e.target as HTMLSelectElement
    const serverId = target.value
    selectedServer = serverId
    goto(`/dashboard/${serverId}`)
  }
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
  onMount(() => {

  })
</script>

<AppShell>
  <svelte:fragment slot="sidebarLeft">
    <button class="btn-icon md:hidden w-12 h-12 variant-filled-primary fixed bottom-4 left-4" on:click={() => drawerStore.open(drawerSettings)}>
      <Icon icon="bxs:server" class="w-8 h-8" />
    </button>
    <div class="p-2 h-full overflow-y-auto hidden md:block">
      <h2 class="h2">
        Select Server
      </h2>
      {#await data.lazy.moderatingServers}
      <p class="text-center">
        Loading...
      </p>
      {:then servers}
      <div class="flex flex-col w-full justify-center gap-4 mt-10">
        <select class="select" name="server_selector" id="server_selector" on:change={changeSelectedServer} >
          {#each servers as server}
            <option value={server.id}>
              <div class="flex gap-4">
                {server.name}
              </div>
            </option>
          {/each}
        </select>
        <div class={`flex flex-col gap-2 ml-10 ${tabsActive(`/dashboard/${selectedServer}`)}`}>
          <a href={`/dashboard/${selectedServer}`}>
            <div class={`w-full p-2 rounded-lg ${preciseClassesActive(`/dashboard/${selectedServer}/general`)} `}>
              🏠 General
            </div>
          </a>
          <a href={`/dashboard/${selectedServer}/members`}>
            <div class={`w-full p-2 rounded-lg ${preciseClassesActive(`/dashboard/${selectedServer}/members`)}`}>
              👥 Members
            </div>
          </a>
          <a href={`/dashboard/${selectedServer}/audit-log`}>
            <div class={`w-full p-2 rounded-lg ${preciseClassesActive(`/dashboard/${selectedServer}/audit-log`)}`}>
              📜 Audit Log
            </div>
          </a>
          <a href={`/dashboard/${selectedServer}/advertise`}>
            <div class={`w-full p-2 rounded-lg ${preciseClassesActive(`/dashboard/${selectedServer}/advertise`)}`}>
              📢 Advertise
            </div>
          </a>
        </div>
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