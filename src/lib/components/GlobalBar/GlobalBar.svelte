<script lang="ts">
	import {
		AppBar,
		getDrawerStore,
		type DrawerSettings,

		Avatar

	} from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import LoginWithMaya from '$lib/components/LoginWithMaya/LoginWithMaya.svelte';
	const drawerStore = getDrawerStore();
	const drawerSettings: DrawerSettings = {
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-lg'
	};
</script>

<AppBar shadow="shadow-2xl" slotTrail="!space-x-2" class="w-full">
	<svelte:fragment slot="lead">
		<a href="/">
			<div class="flex items-center space-x-4">
				<img src="/images/maya-logo.png" alt="" class=" h-10 rounded-md" />
				<h1 class="h2 font-black">Maya</h1>
			</div>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<div class="flex gap-4 items-center">
			{#if !($page.data.user)}
			<LoginWithMaya />
			{/if}
			<button
				class="btn btn-icon"
				on:click={() => {
					drawerStore.open(drawerSettings);
				}}
			>	
				{#if !($page.data.user)}
				<div class="flex gap-4 items-center">
					<Icon icon="mdi:hamburger-menu" />
				</div>
				{:else}
				<div class="flex gap-4 items-center">
					<Avatar src={$page.data.user.avatar} width="w-12" rounded="rounded-full" />
				</div>
				{/if}
			</button>
		</div>
	</svelte:fragment>
</AppBar>
