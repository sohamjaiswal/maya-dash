<script lang="ts">
	import { page } from "$app/stores";

	// import YeeYeeAssHaircut from "$lib/components/YeeYeeAssHaircut/YeeYeeAssHaircut.svelte";
	const firstSectionHeight = 90 + ($page.data.apiStatus.code !== 200 ? 40 : 0);

	const setHeight = (element: HTMLElement) => {
		element.style.height = `calc(100vh - ${firstSectionHeight}px)`
	}
	const setHeightAndMargin = (element: HTMLElement) => {
		element.style.height = `calc(100vh - ${firstSectionHeight}px)`
		element.style.marginTop = `${firstSectionHeight}px`
	}
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
		<section class={`flex justify-center snap-start shrink-0`} use:setHeightAndMargin>
			<div class="flex flex-col items-center justify-around">
				<div class="container text-center">
					<h1 class="h1 font-black">
						No catchphrases, <br /> let's get right into it.
					</h1>
				</div>
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

