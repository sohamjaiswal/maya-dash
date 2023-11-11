<script>
	// import YeeYeeAssHaircut from "$lib/components/YeeYeeAssHaircut/YeeYeeAssHaircut.svelte";
	import { onMount } from "svelte";
</script>

<svelte:head>
  <title>
    Maya — The best Guilded bot for your server!
  </title>

  <meta property="og:title" content={`Maya`} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://mayabot.xyz" />
  <meta property="og:description" content={`Maya is the best bot on guilded, offering many features like dashboard, moderation, ads, fun among others.`} />
  <meta name="keywords" content={`Guilded, Maya, Server Discovery, Guilded Search, Moderation`}>
  <meta name="author" content={`TooMuchHam, SoSweetHam (scraping)`}>
</svelte:head>

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

