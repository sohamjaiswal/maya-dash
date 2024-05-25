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
  $: prefix = ''
  $: welcome_message_toggle = false
  $: welcome_channel = ''
  $: welcome_message = ''
  $: welcome_banner_toggle = false
  $: logs_toggle = false
  $: log_actions_channel = ''
  $: log_events_channel = ''
  $: log_traffic_channel = ''
  // $: welcome_thumbnail_toggle = false
  $: serverSettings
  onMount(async() => {
    serverSettings = await data.lazy.serverSettings
    prefix = form?.prefix?.toString() ?? serverSettings.prefix
    welcome_message_toggle = form?.welcome_message_toggle?.toString() == 'on' ?? serverSettings.welcome_channel_enabled
    welcome_channel = form?.welcome_channel?.toString() ?? serverSettings.welcome_channel
    welcome_message = form?.welcome_message?.toString() ?? serverSettings.welcome_message
    welcome_banner_toggle = form?.welcome_banner_toggle?.toString() == 'on' ?? serverSettings.welcome_banner_enabled
    logs_toggle = form?.logs_toggle?.toString() == 'on' ?? serverSettings.log_enabled
    log_actions_channel = form?.log_actions_channel?.toString() ?? serverSettings.log_actions_channel
    log_events_channel = form?.log_events_channel?.toString() ?? serverSettings.log_events_channel
    log_traffic_channel = form?.log_traffic_channel?.toString() ?? serverSettings.log_traffic_channel
    // welcome_thumbnail_toggle = form?.welcome_thumbnail_toggle == 'on' ?? serverSettings.welcome_thumbnail_enabled
    console.log(serverSettings)
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
  <form action="?/updatePrefix" method="post" class="flex w-full flex-col gap-4" use:enhance={() => {
    return ({result}) => {
      if (result.type === "success") {
        // make settings updated toast
        const t = {
          message: result.data?.message,
          background: "variant-filled-success",
        }
        prefix = form?.prefix?.toString() ?? serverSettings.prefix
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
    <div class="flex">

    </div>
    <div class="flex justify-between items-center">
      <h1 class="h3">
          Prefix Settings
        </h1>
        <button type="submit" class="btn variant-filled-primary p-3">
          Update Prefix
        </button>
    </div>  
      <label class="w-full" for="prefix">
        Prefix
        <input class="input w-full" type="text" id="prefix" name="prefix" bind:value={prefix} placeholder="?" />
      </label>
    </form>
    <form action="?/updateWelcomeSettings" method="post" class="flex mt-4 flex-col gap-4" use:enhance={() => {
      return ({result}) => {
        if (result.type === "success") {
          // make settings updated toast
          const t = {
            message: result.data?.message,
            background: "variant-filled-success",
          }
          welcome_message_toggle = form?.welcome_message_toggle == 'on' ?? serverSettings.welcome_channel_enabled
          welcome_channel = form?.welcome_channel?.toString() ?? serverSettings.welcome_channel
          welcome_message = form?.welcome_message?.toString() ?? serverSettings.welcome_message
          welcome_banner_toggle = form?.welcome_banner_toggle == 'on' ?? serverSettings.welcome_banner_enabled
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
      <div class="flex justify-between items-center">
        <h3 class="h3">
          Welcome Settings
        </h3>
        <button type="submit" class="btn variant-filled-primary p-3">
          Update Welcome Settings
        </button>
      </div>
      <label for="welcome_channel_enabled" class="flex items-center gap-4">
        Enable Welcome Channel
        <SlideToggle id="welcome_channel_enabled" name="welcome_channel_enabled" bind:checked={welcome_message_toggle} />
      </label>
      {#if welcome_message_toggle}
      <div class="card p-6 flex flex-col gap-4">
        <label for="welcome_channel">
          Welcome Channel
          <select class="select" id="welcome_channel" name="welcome_channel" bind:value={welcome_channel}>
            {#each Object.keys(serverData.channels) as channelId}
            <option value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
        <label class:hidden={!!form?.welcome_channel ?? !!serverData.welcome_channel} for="welcome_banner_enabled" class="flex gap-4 items-center">
          Enable Welcome Banner
          <SlideToggle id="welcome_banner_enabled" name="welcome_banner_enabled" bind:checked={welcome_banner_toggle} />
        </label>
        <label for="welcome_message">
          <div class="flex items
          -center gap-1">
            Welcome Message
            <div class="block" use:tooltip={{ content: '<b>Tip!</b><p>You can use {user}, {server}, {members} and markdown to add content and style your custom message!</p>', position: 'top', animation: 'slide', arrow: false }}>
              <Icon icon="material-symbols:info" />
            </div>
          </div>
          <textarea class="input" id="welcome_message" name="welcome_message" bind:value={welcome_message} placeholder="Welcome to the server!"></textarea>
        </label>
      </div>
      {/if}
    </form>
    <form action="?/updateLogsSettings" method="post" class="flex mt-4 flex-col gap-4" use:enhance={() => {
      return ({result}) => {
        if (result.type === "success") {
          // make settings updated toast
          const t = {
            message: result.data?.message,
            background: "variant-filled-success",
          }
          console.log(form)
          welcome_message_toggle = form?.welcome_message_toggle == 'on' ?? serverSettings.welcome_channel_enabled
          welcome_channel = form?.welcome_channel?.toString() ?? serverSettings.welcome_channel
          welcome_message = form?.welcome_message?.toString() ?? serverSettings.welcome_message
          welcome_banner_toggle = form?.welcome_banner_toggle == 'on' ?? serverSettings.welcome_banner_enabled
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
      <div class="flex justify-between items-center">
        <h3 class="h3">
          Logs Settings
        </h3>
        <button type="submit" class="btn variant-filled-primary p-3">
          Update Logs Settings
        </button>
      </div>
      <label for="log_enabled" class="flex items-center gap-4">
        Enable Logs
        <SlideToggle name="log_enabled" id="log_enabled" bind:checked={logs_toggle} />
      </label>
      {#if logs_toggle}
      <div class="card p-6 flex flex-col gap-4">
        <label for="log_actions_channel">
          Log Actions Channel
          <select class="select" id="log_actions_channel" name="log_actions_channel" bind:value={log_actions_channel}>
            {#each Object.keys(serverData.channels) as channelId}
            <option value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
        <label for="log_events_channel">
          Log Events Channel
          <select class="select" id="log_events_channel" name="log_events_channel" bind:value={log_events_channel}>
            {#each Object.keys(serverData.channels) as channelId}
            <option value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
        <label for="log_traffic_channel">
          Log Traffic Channel
          <select class="select" id="log_traffic_channel" name="log_traffic_channel" bind:value={log_traffic_channel}>
            {#each Object.keys(serverData.channels) as channelId}
            <option value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
      </div>
      {/if}
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

<!-- 

  <h1 class="h1 mb-6">
        🏠 General Settings
      </h1>
      <label for="prefix">
        Prefix
        <input class="input" type="text" id="prefix" name="prefix" value={form?.prefix ?? serverData.prefix} placeholder="?" />
      </label>
      <label for="log_enabled" class="flex items-center gap-4">
        Enable Logs
          <SlideToggle name="log_enabled" id="log_enabled" bind:checked={log_enabled} />
        </label>
      <div class={`card p-6 flex flex-col gap-4 ${log_enabled ? 'block' : 'hidden'}`}>
        <label for="log_actions_channel">
          Log Actions Channel
          <select class="select" id="log_actions_channel" name="log_actions_channel" value={form?.log_actions_channel ?? serverData.log_actions_channel}>
            {#each Object.keys(serverData.channels) as channelId}
              <option value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
        <label for="log_events_channel">
          Log Events Channel
          <select class="select" id="log_events_channel" name="log_events_channel" value={form?.log_events_channel ?? serverData.log_events_channel}>
            {#each Object.keys(serverData.channels) as channelId}
              <option value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
        <label for="log_traffic_channel">
          Log Traffic Channel
          <select class="select" id="log_traffic_channel" name="log_traffic_channel" value={form?.log_traffic_channel ?? serverData.log_traffic_channel}>
            {#each Object.keys(serverData.channels) as channelId}
              <option value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
      </div>
      <label for="welcome_channel_enabled" class="flex items-center gap-4">
        Enable Welcome Channel
        <SlideToggle id="welcome_channel_enabled" name="welcome_channel_enabled" bind:checked={welcome_enabled} />
      </label>
      <div class={`card p-6 flex flex-col gap-4 ${welcome_enabled ? 'block' : 'hidden'}`}>
        <label for="welcome_channel">
          Welcome Channel
          <select class="select" id="welcome_channel" name="welcome_channel" value={form?.welcome_channel ?? serverData.welcome_channel}>
            {#each Object.keys(serverData.channels) as channelId}
              <option  value={channelId}>{serverData.channels[`${channelId}`].name}</option>
            {/each}
          </select>
        </label>
        <label class:hidden={!!form?.welcome_channel ?? !!serverData.welcome_channel} for="welcome_banner_enabled" class="flex gap-4 items-center">
          Enable Welcome Banner
          <SlideToggle id="welcome_banner_enabled" name="welcome_banner_enabled" bind:checked={welcome_banner_enabled} />
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
 -->