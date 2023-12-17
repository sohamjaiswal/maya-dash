<script lang="ts">
	import type { AdvertisedServer } from "$lib/types/maya";
	import { Avatar } from "@skeletonlabs/skeleton";

  export let servers: AdvertisedServer[] = [];
</script>

<section class="w-full flex justify-between bg-black">
  <div class="container flex flex-wrap justify-between">
    Trusted by more that #Guilded Servers
    {#each servers as server}
      <a href={server.url} target="_blank">
        <Avatar rounded="rounded-none" width="w-32" src={server.avatar} />
      </a>
    {/each}
  </div>
</section>