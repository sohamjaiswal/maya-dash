<script lang="ts">
	import { enhance } from "$app/forms";
	import { storeTheme } from "$lib/stores/stores";
	import Icon from "@iconify/svelte";


	import { LightSwitch, popup } from "@skeletonlabs/skeleton";
	import type { SubmitFunction } from "@sveltejs/kit";
  
  const setTheme: SubmitFunction = ({ formData }) => {
		const theme = formData.get('theme')?.toString();
		if (theme) {
			document.body.setAttribute('data-theme', theme);
			$storeTheme = theme;
		}
	};
	const themes = [
		{type: 'maya', name: 'Maya', icon: '🔮'},
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