<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ServerSettings } from "$lib/types/maya";
	import Icon from "@iconify/svelte";
	import { SlideToggle, getToastStore } from "@skeletonlabs/skeleton";
  import { tooltip } from "@svelte-plugins/tooltips";
	import { onMount } from "svelte";
  const toastStore = getToastStore()
  export let data
  export let form
  let serverSettings: ServerSettings
  $: serverSettings
  $: log_toggle = form?.log_toggle ? form?.log_toggle == "on" : false
  $: welcome_toggle = form?.welcome_message_toggle ? form?.welcome_message_toggle == "on" : false
  $: welcome_banner_toggle = form?.welcome_banner_toggle ? form?.welcome_banner_toggle == "on" : false
  $: welcome_thumbnail_toggle = form?.welcome_thumbnail_toggle ? form?.welcome_thumbnail_toggle == "on" : false
  onMount(async() => {
    serverSettings = await data.lazy.serverSettings
    console.log(serverSettings)
    log_toggle = serverSettings.logs_toggle
    welcome_toggle = serverSettings.welcome_message_toggle
    welcome_banner_toggle = serverSettings.welcome_banner_toggle
    welcome_thumbnail_toggle = serverSettings.welcome_thumbnail_toggle
  })
</script>
<div class="h-full w-full flex flex-col p-2">
  {#await data.lazy.serverSettings}
  <p class="text-center">
    Loading...
  </p>
  {:then serverData}
  {#if form?.success}
  <p class="text-center text-primary-500">
    Updated successfully
  </p>
  {/if}
  {#if form?.message}
  <p class="text-center text-error-500">
    {form.message}
  </p>
  {/if}
    <form action="?/updateServerSettings" method="post" class="flex flex-col gap-4" use:enhance={() => {
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
      <h1 class="h1 mb-6">
        🏠 General Settings
      </h1>
      <label for="prefix">
        Prefix
        <input class="input" type="text" id="prefix" name="prefix" value={form?.prefix ?? serverData.prefix} placeholder="?" />
      </label>
      <label for="log_toggle" class="flex items-center gap-4">
        Enable Logs
        <!-- <SlideToggle name="log_toggle" id="log_toggle" checked={serverData.settings.log_toggle} on:load={() => log_toggle = serverData.settings.log_toggle} on:change={() => log_toggle = !log_toggle} /> -->
          <SlideToggle name="log_toggle" id="log_toggle" bind:checked={log_toggle} />
          <!-- <input type="checkbox" name="log_toggle" id="log_toggle" bind:checked={log_toggle}> -->
        </label>
      <div class={`card p-6 flex flex-col gap-4 ${log_toggle ? 'block' : 'hidden'}`}>
        <label for="log_actions_channel">
          Log Actions Channel
          <!-- <input class="input" type="text" id="log_actions_channel" name="log_actions_channel" value={form?.log_actions_channel ?? serverData.settings.log_actions_channel} placeholder="abcde" /> -->
          <select class="select" id="log_actions_channel" name="log_actions_channel" value={form?.log_actions_channel ?? serverData.log_actions_channel}>
            {#each Object.keys(serverData.channels) as channelId}
              <option value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
        <label for="log_events_channel">
          Log Events Channel
          <!-- <input class="input" type="text" id="log_events_channel" name="log_events_channel" value={form?.log_events_channel ?? serverData.settings.log_events_channel} placeholder="abcde" /> -->
          <select class="select" id="log_events_channel" name="log_events_channel" value={form?.log_events_channel ?? serverData.log_events_channel}>
            {#each Object.keys(serverData.channels) as channelId}
              <option value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
        <label for="log_traffic_channel">
          Log Traffic Channel
          <!-- <input class="input" type="text" id="log_traffic_channel" name="log_traffic_channel" value={form?.log_traffic_channel ?? serverData.settings.log_traffic_channel} placeholder="abcde" /> -->
          <select class="select" id="log_traffic_channel" name="log_traffic_channel" value={form?.log_traffic_channel ?? serverData.log_traffic_channel}>
            {#each Object.keys(serverData.channels) as channelId}
              <option value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
      </div>
      <label for="welcome_message_toggle" class="flex items-center gap-4">
        Enable Welcome Channel
        <SlideToggle id="welcome_message_toggle" name="welcome_message_toggle" bind:checked={welcome_toggle} />
        <!-- <input type="checkbox" id="welcome_message_toggle" name="welcome_message_toggle" bind:checked={welcome_toggle}> -->
      </label>
      <div class={`card p-6 flex flex-col gap-4 ${welcome_toggle ? 'block' : 'hidden'}`}>
        <label for="welcome_channel">
          Welcome Channel
          <!-- <input class="input" type="text" id="welcome_channel" name="welcome_channel" value={form?.welcome_channel ?? serverData.settings.welcome_channel} placeholder="abcde" /> -->
          <select class="select" id="welcome_channel" name="welcome_channel" value={form?.welcome_channel ?? serverData.welcome_channel}>
            {#each Object.keys(serverData.channels) as channelId}
              <option  value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
        <label class:hidden={!!form?.welcome_channel ?? !!serverData.welcome_channel} for="welcome_banner_toggle" class="flex gap-4 items-center">
          Enable Welcome Banner
          <SlideToggle id="welcome_banner_toggle" name="welcome_banner_toggle" bind:checked={welcome_banner_toggle} />
        </label>
        <label class:hidden={!!form?.welcome_channel ?? !!serverData.welcome_channel} for="welcome_thumbnail_toggle" class="flex gap-4 items-center">
          Enable Welcome Thumbnail
          <SlideToggle id="welcome_thumbnail_toggle" name="welcome_thumbnail_toggle" bind:checked={welcome_thumbnail_toggle} />
        </label>
        <label for="welcome_message">
          <div class="flex items-center gap-1">
            Welcome Message
            <div class="block" use:tooltip={{ content: '<b>Tip!</b><p>You can use {user}, {server}, {members} and markdown to add content and style your custom message!</p>', position: 'top', animation: 'slide', arrow: false }}>
              <Icon icon="material-symbols:info" />
            </div>
          </div>
          <textarea class="input" id="welcome_message" name="welcome_message" placeholder="Welcome to the server!">{form?.welcome_message ?? serverData.welcome_message}</textarea>
        </label>
      </div>
      <button type="submit" class="btn variant-filled-primary">
        Update Settings
      </button>
    </form>
  {:catch e}
  <div class="flex flex-col justify-center items-center">
    <!-- display error e  -->
    <h1 class="h1">
      Ooof 😓
    </h1>
    <h2 class="h2">
      An error ocurred!
    </h2>
    {e}
  </div>
  {/await}
</div>