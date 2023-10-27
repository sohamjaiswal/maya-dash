<script>
	import YeeYeeAssHaircut from "$lib/components/YeeYeeAssHaircut/YeeYeeAssHaircut.svelte";
	import { onMount } from "svelte";

	onMount(async() => {
		const servers = await fetch(`https://api.mayabot.xyz/servers`)
		if (servers.ok) {
			console.log(await servers.json())
		}
	})
</script>
<!-- <YeeYeeAssHaircut /> -->
<div class="container h-full mx-auto flex flex-col justify-center snap-y">
	<section class="h-screen w-full flex flex-col pt-44 gap-4 md:pt-0 items-center md:flex-row snap-center snap-mandatory">
		<div class="w-1/2 flex justify-center items-center">
			<img src="/images/maya-logo.png" alt="Maya Logo" class=" rounded-lg">
		</div>
		<div class="w-1/2 flex justify-center items-center">
			<h2 class="h2 text-center">
				Maya is your ultimate Guilded Helper.
			</h2>
		</div>
	</section>
	<section class="h-screen w-full flex flex-col justify-center items-center snap-center">
		<h2 class="h2">
			Invite Today!
		</h2>

	</section>
</div>
<!-- <YeeYeeAssHaircut /> -->

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
