<script>
	// import YeeYeeAssHaircut from "$lib/components/YeeYeeAssHaircut/YeeYeeAssHaircut.svelte";
	import { onMount } from "svelte";
</script>
<div class="flex justify-center h-[calc(100vh-0.5rem)]">
	<div class="flex flex-col items-center justify-around">
		<div class="container text-center">
			<h1 class="h1">
				No catchphrases, <br /> let's get right into it.
			</h1>
		</div>
		<div class="flex flex-col items-center gap-4 pb-40">
			<div class="flex w-full gap-2 flex-wrap justify-around">
				<a href="/dashboard">
					<button class="btn variant-filled-secondary">
							Dashboard
					</button>
				</a>
				<a href="/servers/browse/1">
					<button class="btn variant-filled-tertiary">
							Servers
					</button>
				</a>
			</div>
			<a href="https://www.guilded.gg/b/bae67135-8e50-4b11-b7e9-d3e8da26f4ec" target="_blank" rel="noopener noreferrer">
				<button class="btn variant-filled-primary">
					Invite Maya!
				</button>
			</a>
		</div>
	</div>
</div>

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
