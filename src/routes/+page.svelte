<script lang="ts">
	import { page } from "$app/stores";
	import TrustedByBar from "$lib/components/TrustedByBar/TrustedByBar.svelte";
	import type { AdvertisedServer } from "$lib/types/maya";
	import { Avatar } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";

	let useServers: AdvertisedServer[] = [];
	let getServers: (filter_type: string, pageNumber: string) => Promise<void> = async () => {};
	onMount(() => {
		getServers = async (filter_type, pageNumber) => {
				const servers = await (
					await fetch(`/servers/browse/${pageNumber}`, {
						method: 'POST',
						body: JSON.stringify({
							filter_type
						})
					})
				).json();
				useServers = servers;
			};
			getServers('upvotes', '1');
	})
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

<section class="h-[calc(100vh-5.625rem)] w-full flex justify-center">
	<div class="flex flex-col items-center justify-center h-full gap-8 container">
		<div class="flex items-center gap-4">
			<Avatar src="/images/maya-logo.png" width="w-32" />
			<h2 class="h2 font-black">
				Let's get right into it.
			</h2>
		</div>
		<p>
			Maya is a guilded bot that is tailored to offer you <br /> tools that help you moderate, run economy <br /> and provide advertisement services. 
		</p>
		<div class="flex justify-evenly w-full">
			<button class=" variant-glass-tertiary px-4 py-2 rounded-sm">
				Add to Guilded
			</button>
			<button class=" variant-glass-secondary px-4 py-2 rounded-sm">
				Premium
			</button>
		</div>
	</div>
</section>

<section class="h-[calc(100vh-5.625rem)] w-full flex justify-center">
	<div class="flex flex-col items-center justify-center h-full gap-8 container">
		<div class="flex items-center gap-4">
			<div class="flex flex-col gap-4">
				<h2 class="h2 font-black text-center">
					Find Servers That You'll Love
				</h2>
				<p>
					Find servers that you'll love with our server discovery feature. <br /> You can filter servers by category, tags, and more!
				</p>
				<button class=" variant-glass-tertiary px-4 py-2 rounded-sm">
					Explore Servers
				</button>
			</div>
		</div>
	</div>
</section>

<TrustedByBar servers={useServers} />