import type { ServerSettings } from "$lib/types/maya.js"
import { fail, redirect } from "@sveltejs/kit"

export const load = async ({params, locals}) => {
  const getServerData = async () => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    // get server details using serverid and mayatoken and userid 
    const serverSettingsRes = (await (await fetch(`https://api.mayabot.xyz/server/${params.serverId}/settings`, {
      method: 'GET',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken
      }
    })).json()).data
    return serverSettingsRes as ServerSettings
  }
  return {
    lazy: {
      serverData: getServerData()
    }
  }
}

export const actions = {
  updateServerSettings: async ({params, locals, request}) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }

    const data = await request.formData()
    const prefix = data.get('prefix')
    const log_enabled = data.get('log_enabled')
    const welcome_channel_enabled = data.get('welcome_channel_enabled')
    const log_actions_channel = data.get('log_actions_channel')
    const log_events_channel = data.get('log_events_channel')
    const log_traffic_channel = data.get('log_traffic_channel')
    const welcome_channel = data.get('welcome_channel')
    const welcome_message = data.get('welcome_message')
    console.log(prefix, log_enabled, welcome_channel_enabled, log_actions_channel, log_events_channel, log_traffic_channel, welcome_channel, welcome_message)
    const updateServerSettingsRes = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/update/settings`, {
      method: 'POST',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        economy_type: 'global',
        prefix,
        log_enabled: log_enabled === 'on',
        welcome_channel_enabled: welcome_channel_enabled === 'on',
        log_actions_channel,
        log_events_channel,
        log_traffic_channel,
        welcome_channel,
        welcome_message
      })
    })
    if (updateServerSettingsRes.ok) {
      const rxD = await updateServerSettingsRes.json()
      console.log("updated!",rxD)
      return {success: true}
    }
    return fail(400, {
      prefix,
      log_enabled,
      welcome_channel_enabled,
      log_actions_channel,
      log_events_channel,
      log_traffic_channel,
      welcome_channel,
      welcome_message,
      message: "Settings failed to update!"
    })
  }
}