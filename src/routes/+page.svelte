<script lang="ts">
	import { page } from "$app/stores";
	import type { AdvertisedServer } from "$lib/types/maya";
	import { Avatar } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";

	// import YeeYeeAssHaircut from "$lib/components/YeeYeeAssHaircut/YeeYeeAssHaircut.svelte";
	const firstSectionHeight = 90 + ($page.data.apiStatus.code !== 200 ? 40 : 0);

	const setHeight = (element: HTMLElement) => {
		element.style.height = `calc(100vh - ${firstSectionHeight}px)`
	}
	const setHeightAndMargin = (element: HTMLElement) => {
		element.style.height = `calc(100vh - ${firstSectionHeight}px)`
		element.style.marginTop = `${firstSectionHeight}px`
	}
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

<div class="w-full flex flex-col items-center snap snap-y snap-mandatory mx:auto overflow-scroll " use:setHeight>
	<div class="container">
		<section class="flex justify-center h-screen snap-start shrink-0" use:setHeightAndMargin>
			<div class="flex flex-col items-center justify-around h-[calc(100%-64px)] pt-8 gap-8">
				<div class="flex flex-col md:flex-row items-center gap-8 h-[41.66667%]">
					<div class="flex flex-col items-center h-full gap-4 justify-center">
						<h1 class="h1 text-center">
							No catchphrases, <br />let's get right into it.
						</h1>
						<div class="flex gap-8">
							<button class="btn variant-filled-tertiary">
								<a href="https://www.guilded.gg/b/bae67135-8e50-4b11-b7e9-d3e8da26f4ec" target="_blank" rel="noopener noreferrer" class="uppercase font-black">
									Invite Maya
								</a>
							</button>
							<button class="btn variant-filled-secondary">
								<a href="/about-us" target="_blank" rel="noopener noreferrer" class="uppercase font-black">
									About Us
								</a>
							</button>
						</div>
					</div>
					<img src="/images/image_template.png" alt="Template" class="hidden md:block max-h-full">
				</div>
				<div class="flex flex-col md:flex-row gap-8 h-[41.66667%]">
					<img src="/images/image_template.png" alt="Template" class="hidden md:block max-h-full">
					<div class="flex flex-col items-center gap-4 justify-center">
						<h2 class="h2 text-center capitalize">
							Find servers that you'll love!
						</h2>
						<div class="flex flex-wrap gap-4 justify-center items-center">
							{#each useServers as server, i}
							{#if i < 4}
								<a href={server.url} target="_blank" rel="noopener noreferrer" class="card card-hover">
								<Avatar rounded="rounded-md" src={server.avatar} width="w-32" />
								</a>
							{/if}
							{/each}
						</div>
						<button class="btn variant-filled-tertiary">
							<a href="/servers/browse/1" target="_blank" rel="noopener noreferrer" class="uppercase font-black">
								Explore
							</a>
						</button>
					</div>
				</div>
				<!-- <div class="md:h-2/3 w-full">
					<div class="flex flex-col md:flex-row gap-4">
						<img src="/images/image_template.png" alt="Template" class="hidden lg:block max-w-[41.666667%] aspect-auto">
						<div class="flex flex-col w-full gap-4">
							<h2 class="h2 capitalize font-bold w-full text-center">
								Find Servers that you'll love
							</h2>
							<div class="flex flex-col items-stretch">
								<div class="flex flex-wrap gap-4 justify-center items-center">
									{#each useServers as server, i}
									{#if i < 4}
										<a href={server.url} target="_blank" rel="noopener noreferrer" class="card card-hover">
										<Avatar rounded="rounded-md" src={server.avatar} width="w-40" />
										</a>
									{/if}
									{/each}
								</div>
								<button class="btn variant-filled-tertiary mt-auto">
									<a href="/servers/browse/1" target="_blank" rel="noopener noreferrer" class="uppercase font-black">
										Explore
									</a>
								</button>
							</div>
						</div>
					</div>
				</div> -->
			</div>
		</section>
		<section class="flex justify-center h-screen snap-start shrink-0" use:setHeightAndMargin>
			<div class="flex flex-col items-center justify-around">
				<div class="flex flex-col md:flex-row gap-8">
					<img src="/images/image_template.png" alt="Template" class="md:w-1/2">
					<div class="flex flex-col gap-4 justify-center">
						<h2 class="h2 font-bold">
							Moderation Made Easy
						</h2>
						<p>
							Our moderation tools aim to simplify community management for your moderators. With our advanced traffic and event logging, your mods can easily track user actions. The Auto-Mod feature filters chats, allowing your mods to focus on more important tasks. With just a few clicks, you can set up a pre-generated word filter or create your own custom filter. Simplify community management with Maya!
						</p>
					</div>
				</div>
			</div>
		</section>
		<section class="flex justify-center h-screen snap-start shrink-0" use:setHeightAndMargin>
			<div class="flex flex-col items-center justify-around">
				<div class="flex flex-col-reverse md:flex-row gap-8">
					<div class="flex flex-col gap-4 justify-center">
						<h2 class="h2 font-bold">
							Advanced Support Tools
						</h2>
						<p>
							Prioritise easier communication with your support team. A simple reaction to a support embed creates a dedicated channel for the user. You can set up different support categories for the user to choose from so the appropriate mod is assigned to their ticket. Our ticket tool is designed to streamline inquiries and improve response times. Our goal is to provide essential tools that improve the overall user experience of your community.
						</p>
					</div>
					<img src="/images/image_template.png" alt="Template" class="md:w-1/2">
				</div>
			</div>
		</section>
	</div>
</div>

