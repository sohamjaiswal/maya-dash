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
  $: log_enabled = form?.log_enabled ? form?.log_enabled == "on" : false
  $: welcome_enabled = form?.welcome_channel_enabled ? form?.welcome_channel_enabled == "on" : false
  onMount(async() => {
    serverSettings = await data.lazy.serverSettings
    log_enabled = serverSettings.settings.log_enabled
    welcome_enabled = serverSettings.settings.welcome_channel_enabled
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
        <input class="input" type="text" id="prefix" name="prefix" value={form?.prefix ?? serverData.settings.prefix} placeholder="?" />
      </label>
      <label for="log_enabled" class="flex items-center gap-4">
        Enable Logs
        <!-- <SlideToggle name="log_enabled" id="log_enabled" checked={serverData.settings.log_enabled} on:load={() => log_enabled = serverData.settings.log_enabled} on:change={() => log_enabled = !log_enabled} /> -->
          <SlideToggle name="log_enabled" id="log_enabled" bind:checked={log_enabled} />
          <!-- <input type="checkbox" name="log_enabled" id="log_enabled" bind:checked={log_enabled}> -->
        </label>
      <div class={`card p-6 flex flex-col gap-4 ${log_enabled ? 'block' : 'hidden'}`}>
        <label for="log_actions_channel">
          Log Actions Channel
          <!-- <input class="input" type="text" id="log_actions_channel" name="log_actions_channel" value={form?.log_actions_channel ?? serverData.settings.log_actions_channel} placeholder="abcde" /> -->
          <select class="select" id="log_actions_channel" name="log_actions_channel" value={form?.log_actions_channel ?? serverData.settings.log_actions_channel}>
            {#each Object.keys(serverData.channels) as channelId}
              <option value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
        <label for="log_events_channel">
          Log Events Channel
          <!-- <input class="input" type="text" id="log_events_channel" name="log_events_channel" value={form?.log_events_channel ?? serverData.settings.log_events_channel} placeholder="abcde" /> -->
          <select class="select" id="log_events_channel" name="log_events_channel" value={form?.log_events_channel ?? serverData.settings.log_events_channel}>
            {#each Object.keys(serverData.channels) as channelId}
              <option value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
        <label for="log_traffic_channel">
          Log Traffic Channel
          <!-- <input class="input" type="text" id="log_traffic_channel" name="log_traffic_channel" value={form?.log_traffic_channel ?? serverData.settings.log_traffic_channel} placeholder="abcde" /> -->
          <select class="select" id="log_traffic_channel" name="log_traffic_channel" value={form?.log_traffic_channel ?? serverData.settings.log_traffic_channel}>
            {#each Object.keys(serverData.channels) as channelId}
              <option value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
      </div>
      <label for="welcome_channel_enabled" class="flex items-center gap-4">
        Enable Welcome Channel
        <SlideToggle id="welcome_channel_enabled" name="welcome_channel_enabled" bind:checked={welcome_enabled} />
        <!-- <input type="checkbox" id="welcome_channel_enabled" name="welcome_channel_enabled" bind:checked={welcome_enabled}> -->
      </label>
      <div class={`card p-6 flex flex-col gap-4 ${welcome_enabled ? 'block' : 'hidden'}`}>
        <label for="welcome_channel">
          Welcome Channel
          <!-- <input class="input" type="text" id="welcome_channel" name="welcome_channel" value={form?.welcome_channel ?? serverData.settings.welcome_channel} placeholder="abcde" /> -->
          <select class="select" id="welcome_channel" name="welcome_channel" value={form?.welcome_channel ?? serverData.settings.welcome_channel}>
            {#each Object.keys(serverData.channels) as channelId}
              <option  value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
        <label for="welcome_message">
          <div class="flex items-center gap-1">
            Welcome Message
            <div class="block" use:tooltip={{ content: '<b>Tip!</b><p>You can use {user}, {server}, {members} and markdown to add content and style your custom message!</p>', position: 'top', animation: 'slide', arrow: false }}>
              <Icon icon="material-symbols:info" />
            </div>
          </div>
          <textarea class="input" id="welcome_message" name="welcome_message" placeholder="Welcome to the server!">{form?.welcome_message ?? serverData.settings.welcome_message}</textarea>
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