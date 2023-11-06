<script lang="ts">

	import { page } from "$app/stores";
	import { AppShell, Avatar } from "@skeletonlabs/skeleton";

  export let data

  $: classesActive = (href: string) => ($page.url.pathname.startsWith(href) ? '!bg-primary-500' : '');
  $: preciseClassesActive = (href: string) => ($page.url.pathname === href ? '!bg-primary-500' : '');
  $: tabsActive = (href: string) => ($page.url.pathname.startsWith(href) ? 'block' : 'hidden');
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
              <div class={`w-full p-2 rounded-lg ${preciseClassesActive(`/dashboard/${server.id}`)} `}>
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
      <slot />
    </div>
  </div>
</AppShell>