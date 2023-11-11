<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import OwnerButton from '$lib/components/OwnerButton/OwnerButton.svelte';
	import { Avatar, getToastStore } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
  export let data
  const {server} = data
  const user = $page.data.user
  const toastStore = getToastStore()
  const handleSubmit: SubmitFunction = () => {
    return ({result}) => {
      if (result.type === "success") {
        // make settings updated toast
        const t = {
          message: result.data?.message,
          background: "variant-filled-success",
        }
        toastStore.trigger(t)
      } else if (result.type === "failure") {
        // make settings updated toast
        const t = {
          message: result.data?.message,
          background: "variant-filled-error",
        }
        toastStore.trigger(t)
      }
    }
  }
</script>
<svelte:head>
  <title>
    View {server.name} on Maya
  </title>
  <meta property="og:title" content={`${server.name} — Maya`} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://mayabot.xyz" />
  <meta property="og:image" content={server.avatar} />
  <meta property="og:description" content={`See ${server.name} on Maya!\n${server.about?server.about:''}`} />
  <meta name="keywords" content={`Guilded, Maya, Server Discovery, Guilded Search, ${server.name}, tags: ${server.tags.join(', ')}`}>
  <meta name="author" content={`TooMuchHam, SoSweetHam (scraping), gen data from ${server.owner_data.name} @ Guilded`}>
</svelte:head>
<div class="flex flex-col items-center">
  <div class="container">
    <div class="card w-full mt-5 overflow-hidden">
      <div class="relative">
        <div style={`background-image: url(${server.banner})`} class="absolute left-0 right-0 h-60 top-0 bg-no-repeat bg-cover" />
      </div>
      <main class="card-body flex flex-col mt-40">
        <div class="w-full flex flex-col items-center gap-6 justify-center lg:block lg:px-8">
          <Avatar class="border-2 border-surface-300-600-token" width=" w-32" src={server.avatar} />
          <div class="flex flex-col lg:flex-row justify-between items-center w-full ">
            <div class="flex items-center gap-2">
              <h1 class=" text-4xl">{server.name}</h1>
            </div>
            <div class="flex items-center gap-2">
              <h1>
                ID: {server.id}
              </h1>
            </div>
          </div>
          {#if server.tags.length > 0}
          <div class="w-full flex justify-center lg:justify-start mt-2">
            <div class="flex gap-2 flex-wrap">
              {#each server.tags as tag}
              <span class="badge variant-ghost-surface px-2">{`# ${tag}`}</span>
              {/each}
            </div>
          </div>
          {/if}
        </div>
        <div class="flex flex-wrap mt-5 px-8 gap-4">
          <div class="flex flex-col gap-2 w-[calc(50%-1rem)]">
            <h2 class="text-2xl">📝 About:</h2>
            <p class=" text-start">{server.about}</p>
          </div>
          <div class="flex flex-col gap-2 w-[calc(50%-1rem)]">
            <h2 class="text-2xl">⛓️ Link:</h2>
            <a href={`${server.url}`} target="_blank" class="hover:underline">{`${server.url}`}</a>
          </div>
          <div class="flex flex-col gap-2 w-[calc(50%-1rem)]">
            <h2 class="text-2xl">📅 Created At:</h2>
            <p>{(new Date(server.created)).toLocaleString()}</p>
          </div>
          <div class="flex flex-col gap-2 w-[calc(50%-1rem)]">
            <h2 class="text-2xl">👑 Owner:</h2>
            <OwnerButton text={`Contact ${server.owner_data.name}`} ownerId={server.owner_data.id} ownerAvatar={server.owner_data.avatar}  />
          </div>
        </div>
      </main>
      <footer class="my-4 px-6">
        <div class="flex flex-col items-center md:flex-row md:ml-[50%] gap-4 flex-wrap">
          <a href={`${server.url}`} target="_blank" rel="noopener noreferrer">
            <button class="btn variant-filled-primary">
              Join {server.name}
            </button>
          </a>
          <div class="flex gap-2 flex-col items-center md:flex-row">
            {#if user}
            <form method="post" action="?/upvoteServer" use:enhance={handleSubmit}>
              <button type="submit" class="btn variant-filled-secondary">
                Upvote
              </button>
            </form>
            <form method="post" action="?/bumpServer" use:enhance={handleSubmit}>
              <button type="submit" class="btn variant-filled-secondary">
                Bump
              </button>
            </form>
            {/if}
          </div>
        </div>
      </footer>
    </div>
  </div>
</div>