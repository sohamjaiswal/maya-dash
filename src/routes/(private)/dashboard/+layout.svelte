<script>

	import { page } from "$app/stores";
	import { AppShell } from "@skeletonlabs/skeleton";

</script>

<AppShell>
  <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment>
  <div class="flex flex-col items-center">
    <div class="container">
      <h1 class="h1">
        Hi {$page.data.user.name} 👋
      </h1>
      <h2 class="h2">
        Welcome to your Maya Dashboard! ✨
      </h2>
      <slot />
    </div>
  </div>
</AppShell>