<script lang="ts">
	import {
		AppBar,
		getDrawerStore,
		type DrawerSettings
	} from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	const drawerStore = getDrawerStore();
	const drawerSettings: DrawerSettings = {
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-lg'
	};
</script>

<AppBar shadow="shadow-2xl" slotTrail="!space-x-2" class="fixed w-full">
	<svelte:fragment slot="lead">
		<a href="/">
			<div class="flex items-center space-x-4">
				<img src="/images/maya-logo.png" alt="" class=" h-10 rounded-md" />
				<h1 class="h2 font-black">Maya</h1>
			</div>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<div>
			<!-- trigger -->
			<button
				class="btn btn-icon"
				on:click={() => {
					drawerStore.open(drawerSettings);
				}}
			>
				<Icon icon="mdi:hamburger-menu" />
			</button>
		</div>
	</svelte:fragment>
</AppBar>
