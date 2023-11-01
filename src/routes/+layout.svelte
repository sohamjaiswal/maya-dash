<script lang="ts">
	import '../app.postcss';
	import { AppShell, Drawer, initializeStores, storePopup, getDrawerStore, type DrawerSettings, Avatar, popup, LightSwitch } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import GlobalBar from '$lib/components/GlobalBar/GlobalBar.svelte';
	import { page } from '$app/stores';
	import LoginWithMaya from '$lib/components/LoginWithMaya/LoginWithMaya.svelte';
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { storeTheme } from '$lib/stores/stores';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();
	const drawerStore = getDrawerStore();
	const setTheme: SubmitFunction = ({ formData }) => {
		const theme = formData.get('theme')?.toString();

		if (theme) {
			document.body.setAttribute('data-theme', theme);
			$storeTheme = theme;
		}
	};
	const themes = [
        { type: 'skeleton', name: 'Skeleton', icon: '💀' },
        { type: 'wintry', name: 'Wintry', icon: '🌨️' },
        { type: 'modern', name: 'Modern', icon: '🤖' },
        { type: 'rocket', name: 'Rocket', icon: '🚀' },
        { type: 'seafoam', name: 'Seafoam', icon: '🧜‍♀️' },
        { type: 'vintage', name: 'Vintage', icon: '📺' },
        { type: 'sahara', name: 'Sahara', icon: '🏜️' },
        { type: 'hamlindigo', name: 'Hamlindigo', icon: '👔' },
        { type: 'gold-nouveau', name: 'Gold Nouveau', icon: '💫' },
        { type: 'crimson', name: 'Crimson', icon: '⭕' }
        // { type: 'seasonal', name: 'Seasonal', icon: '🎆' }
        // { type: 'test', name: 'Test', icon: '🚧' },
	];
</script>

<Drawer position="right">
	<div class="flex flex-col h-full p-4 justify-between">
		<div class="flex flex-col gap-4 mt-4 items-center w-full">
			<a href="/">
				<h2 class="h2">
					Maya
				</h2>
			</a>
			{#if $page.data.user}
			<hr class="w-2/3" />
			<a href="/profile" on:click={() => drawerStore.close()} >
			<div class="flex flex-col items-center w-full">
					<Avatar src={$page.data.user.avatar} width="w-16" />
					<div class="flex gap-2 items-center mt-2">
						{$page.data.user.name}
					</div>
				</div>
			</a>
			{/if}
			<hr class="w-2/3" />
			{#if $page.data.user}
			<a href="/dashboard">
				<button class="btn variant-filled-primary">
					Dashboard
				</button>
			</a>
			{/if}
			<a href="/about-us">About Us</a>
			<a href="/servers">Servers</a>
			{#if $page.data.user}
			<hr class="w-2/3" />
			<form action="/logout" method="POST" class="flex flex-col gap-0 text-center">
				<button class="btn variant-ghost-error mb-4" type="submit">
					Logout
				</button>
			</form>
			{:else}
			<hr class="w-2/3" />
				<LoginWithMaya />
			{/if}
		</div>
		<footer class="flex flex-col gap-4 mt- items-center w-full">
			<hr class="w-2/3" />
			<button class="btn hover:variant-soft-primary" use:popup={{ event: 'click', target: 'theme', closeQuery: 'a[href]' }}>
				<Icon icon="fa6-solid:palette" class="text-lg" />
				<span class="hidden md:inline-block">Theme</span>
				<Icon icon="fa-solid:caret-down" class="opacity-50" />
			</button>
			<!-- popup -->
			<div class="card p-4 w-60 shadow-xl" data-popup="theme">
				<div class="space-y-4">
					<section class="flex justify-between items-center">
						<h6 class="h6">Mode</h6>
						<LightSwitch />
					</section>
					<hr />
					<nav class="list-nav p-4 -m-4 max-h-64 lg:max-h-[500px] overflow-y-auto">
						<form method="post" action="/?/setTheme" use:enhance={setTheme}>
							<ul>
								<!-- , badge -->
								{#each themes as { icon, name, type }}
									<li>
										<button
											class="option w-full h-full"
											type="submit"
											name="theme"
											value={type}
											class:bg-primary-active-token={$storeTheme === type}
										>
											<span>{icon}</span>
											<span class="flex-auto text-left">{name}</span>
											<!-- {#if badge}<span class="badge variant-filled-secondary">{badge}</span>{/if} -->
										</button>
									</li>
								{/each}
							</ul>
						</form>
					</nav>
				</div>
			</div>
			<p>
				Join our
				<a href="https://www.guilded.gg/i/ENZ8RVWE" target="_blank">
					Guilded Server!
				</a>
			</p>
		</footer>
	</div>
</Drawer>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<GlobalBar />
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="pt-1">
		<slot />
	</div>
</AppShell>
