<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import OwnerButton from '$lib/components/OwnerButton/OwnerButton.svelte';
	import { Avatar, getToastStore } from '@skeletonlabs/skeleton';
  export let data
  const {server} = data
  const user = $page.data.user
  const toastStore = getToastStore()
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
    <div class="flex flex-col gap-4 items-center justify-between">
      <div class="card text-center items-center w-full custom-height my-10 overflow-hidden rounded-2xl">
        <div class="relative h-[calc(100vh-10rem)] md:h-[calc(100vh-20rem)]">
          <header class="card-header relative">
            <div style={`background-image: url(${server.banner})`} class="absolute left-0 right-0 h-60 top-0 bg-no-repeat bg-cover" />
          </header>
          <div class="card-body flex flex-col items-center w-full h-full translate-y-16 relative">
            <div class="w-full translate-y-24 flex justify-center lg:block lg:px-8">
              <Avatar class="border-2 border-surface-300-600-token" width=" w-32" src={server.avatar} />
            </div>
            <main class="translate-y-24 w-full flex items-start py-4 px-8 flex-col gap-4">
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
              <div class="w-full flex justify-center lg:justify-start">
                <div class="flex gap-2 flex-wrap">
                  {#each server.tags as tag}
                  <span class="badge variant-ghost-surface px-2">{`# ${tag}`}</span>
                  {/each}
                </div>
              </div>
              {/if}
              <h2 class="text-2xl">📝 About:</h2>
              <p class=" text-start">{server.about}</p>
              <div class="flex flex-wrap">
                <div class="text-start w-1/2 p-2">
                  <h2 class="text-xl">⛓️ Link:</h2>
                  <a href={`${server.url}`} target="_blank" class="hover:underline">{`${server.url}`}</a>
                </div>
                <div class="text-start w-1/2 p-2">
                  <h2>📅 Created At:</h2>
                  <p>{(new Date(server.created)).toLocaleString()}</p>
                </div>
                <div class="text-start w-1/2 p-2">
                  <h2>👑 Owner</h2>
                  <OwnerButton text={`Contact ${server.owner_data.name}`} ownerId={server.owner_data.id} ownerAvatar={server.owner_data.avatar} />
                </div>
              </div>
            </main>
          </div>
          <footer class="absolute bottom-4 md:right-4 flex gap-4 w-full justify-center md:justify-end">
            <div class="flex flex-col items-center md:flex-row gap-4 flex-wrap">
            <a href={`${server.url}`} target="_blank" rel="noopener noreferrer">
              <button class="btn variant-filled-primary">
                Join {server.name}
              </button>
            </a>
            {#if user}
            <form method="post" action="?/upvoteServer" use:enhance={() => {
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
            }}>
              <button type="submit" class="btn variant-filled-secondary">
                Upvote
              </button>
            </form>
            <form method="post" action="?/bumpServer" use:enhance={() => {
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
            }}>
              <button type="submit" class="btn variant-filled-secondary">
                Bump
              </button>
            </form>
            {/if}
          </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</div>