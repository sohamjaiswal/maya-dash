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
	import ThemeSelector from '../ThemeSelector/ThemeSelector.svelte';
	const drawerStore = getDrawerStore();
	const drawerSettings: DrawerSettings = {
		position: 'right',
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-lg'
	};
</script>

{#if $page.data.apiStatus.code !== 200}
<div class="bg-red-500 text-white p-2 text-center">
	{$page.data.apiStatus.message}
</div>
{/if}
<AppBar shadow="shadow-2xl" slotTrail="!space-x-2" class="w-full">
	<svelte:fragment slot="lead">
		<a href="/">
			<div class="flex items-center space-x-4">
				<img src="/images/maya-logo.png" alt="" class=" h-10 rounded-md" />
				<h1 class="h2 uppercase font-black">Maya</h1>
			</div>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<div class="hidden md:flex  gap-8 items-center">
			<a href="https://www.guilded.gg/b/bae67135-8e50-4b11-b7e9-d3e8da26f4ec" target="_blank" rel="noopener noreferrer" class="uppercase font-black">
				Invite Maya
			</a>
			<a href="/about-us" target="_blank" rel="noopener noreferrer" class="uppercase font-black">
				About Us
			</a>
			<a href="/servers" rel="noopener noreferrer" class="uppercase font-black">
				Servers
			</a>
			<ThemeSelector />
			{#if !($page.data.user)}
			<LoginWithMaya />
			{:else}
			<a class="btn variant-filled-surface" href="/dashboard">
				<img src="/images/maya-logo.png" alt="Maya Logo" class="w-10 rounded-lg">
				<span>Dashboard</span>
			</a>
			{/if}
			</div>
			<div class="block md:hidden">
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
