<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import MagicalText from '$lib/components/MagicalText/MagicalText.svelte';
	import { mayaToken, userId } from '$lib/stores/stores.js';
	import type { GuildedUser } from '$lib/types/guilded-user';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

  export let data
  export const {code} = data

  let guildedUser: GuildedUser | null = null
  $: guildedUser = guildedUser

  onMount(async() => {
    const userData = await (await fetch(`https://www.guilded.gg/api/users/${$page.params.userId}/profilev3`)).json() as GuildedUser
    guildedUser = userData
  })

  const firstSectionHeight = 90 + ($page.data.apiStatus.code !== 200 ? 40 : 0);
  const setHeight = (element: HTMLElement) => {
		element.style.height = `calc(100vh - ${firstSectionHeight}px)`
	}
</script>

<div class="flex flex-col items-center justify-center gap-4" use:setHeight>
  <div class="container flex flex-col items-center gap-4">
    <h1 class="h1">
      Hi {guildedUser?.name} 👋
    </h1>
    <div class="card w-full flex flex-col items-center gap-10 p-4 py-10">
      <h2 class="h2">
        Let's get you setup with Maya.
      </h2>
      <div class="flex gap-4 items-center">
        <Avatar src={guildedUser?.profilePictureLg} width="w-32" /> 
        <h2 class="h1">
          🤝
        </h2>
        <Avatar src="/images/maya-logo.png" width="w-32" />
      </div>
      <MagicalText label={code} />
      <form action="?/login" method="post" use:enhance class="flex flex-col">
        <input type="hidden" name="password" value={code} />
        <span class="text-center">
          Use
          <code>
            &lt;prefix&gt;activate {code}
          </code>
          in a Guilded channel with Maya to login!
        </span>
        <button type="submit" class="btn variant-filled-secondary">
          Verify!
        </button>
      </form>
    </div>
  </div>

</div>
