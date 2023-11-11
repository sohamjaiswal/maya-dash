<script lang="ts">
	import '../app.postcss';
	import {
		AppShell,
		Drawer,
		initializeStores,
		storePopup,
		getDrawerStore,
		Avatar,
		popup,
		LightSwitch,
		Toast,
		getToastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import GlobalBar from '$lib/components/GlobalBar/GlobalBar.svelte';
	import { page } from '$app/stores';
	import LoginWithMaya from '$lib/components/LoginWithMaya/LoginWithMaya.svelte';
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { storeTheme } from '$lib/stores/stores';
	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { webVitals } from '$lib/utils/vitals';
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
	const toastStore = getToastStore();
	onMount(async () => {
		// check for success query param, do success toast if exists
		const urlParams = new URLSearchParams(window.location.search);
		const success = urlParams.get('success');
		const warning = urlParams.get('warning');
		const error = urlParams.get('error');
		if (success) {
			const t: ToastSettings = {
				message: success,
				// Provide any utility or variant background style:
				background: 'variant-filled-success',
				timeout: 3000
			};
			toastStore.trigger(t);
		}
		if (warning) {
			const t: ToastSettings = {
				message: warning,
				// Provide any utility or variant background style:
				background: 'variant-filled-warning',
				timeout: 3000
			};
			toastStore.trigger(t);
		}
		if (error) {
			const t: ToastSettings = {
				message: error,
				// Provide any utility or variant background style:
				background: 'variant-filled-error',
				timeout: 3000
			};
			toastStore.trigger(t);
		}
	});
	$: classesActive = (href: string) => ($page.url.pathname.startsWith(href) ? '!bg-primary-500' : '');
  $: preciseClassesActive = (href: string) => ($page.url.pathname === href ? '!bg-primary-500' : '');
  $: tabsActive = (href: string) => ($page.url.pathname.startsWith(href) ? 'block' : 'hidden');
</script>

<Toast />
<Drawer>
	{#if $drawerStore.meta && $drawerStore.meta.servers}
	<div class="p-2 h-full overflow-y-auto">
		<h2 class="h2">
			Your Servers
		</h2>
		{#await $drawerStore.meta.servers}
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
	{:else}
	<div class="flex flex-col h-full p-4 justify-between">
		<div class="flex flex-col gap-4 mt-4 items-center w-full">
			<a href="/">
				<h2 class="h2">Maya</h2>
			</a>
			{#if $page.data.user}
				<hr class="w-2/3" />
				<a href="/profile" on:click={() => drawerStore.close()}>
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
					<button class="btn variant-filled-primary"> Dashboard </button>
				</a>
			{/if}
			<a href="/about-us">About Us</a>
			<a href="/servers">Servers</a>
			{#if $page.data.user}
				<hr class="w-2/3" />
				<form action="/logout" method="POST" class="flex flex-col gap-0 text-center">
					<button class="btn variant-ghost-error mb-4" type="submit"> Logout </button>
				</form>
			{:else}
				<hr class="w-2/3" />
				<LoginWithMaya />
			{/if}
		</div>
		<footer class="flex flex-col gap-4 mt- items-center w-full">
			<hr class="w-2/3" />
			<button
				class="btn hover:variant-soft-primary"
				use:popup={{ event: 'click', target: 'theme', closeQuery: 'a[href]' }}
			>
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
				<a href="https://www.guilded.gg/i/ENZ8RVWE" target="_blank"> Guilded Server! </a>
			</p>
		</footer>
	</div>
	{/if}
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
