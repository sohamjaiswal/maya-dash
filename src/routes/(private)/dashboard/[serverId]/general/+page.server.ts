import type { ServerSettings } from "$lib/types/maya.js"
import { fail, redirect } from "@sveltejs/kit"

export const load = async ({params, locals}) => {
  if (!locals.user) {
    throw redirect(302, '/login')
  }
  const getServerSettings = async () => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
      const serverSettingsRes = (await (await fetch(`https://api.mayabot.xyz/server/${params.serverId}/settings`, {
        method: 'GET',
        headers: {
          UserID: locals.user.id,
          Token: locals.user.mayaToken
        }
      })).json()).data
      console.log(serverSettingsRes)
      return serverSettingsRes as ServerSettings
    // get server details using serverid and mayatoken and userid 
  }
  return {
    lazy: {
      serverSettings: getServerSettings(),
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
    const log_toggle = data.get('log_toggle')
    const welcome_message_toggle = data.get('welcome_message_toggle')
    const log_actions_channel = data.get('log_actions_channel')
    const log_events_channel = data.get('log_events_channel')
    const log_traffic_channel = data.get('log_traffic_channel')
    const welcome_channel = data.get('welcome_channel')
    const welcome_message = data.get('welcome_message')
    const welcome_banner_toggle = data.get('welcome_banner_toggle')
    const welcome_thumbnail_toggle = data.get('welcome_thumbnail_toggle')
    const updateServerSettingsRes = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/update/settings`, {
      method: 'POST',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prefix,
        logs_toggle: log_toggle === 'on',
        welcome_message_toggle: welcome_message_toggle === 'on',
        log_actions_channel,
        log_events_channel,
        log_traffic_channel,
        welcome_channel,
        welcome_message,
        welcome_banner_toggle: welcome_banner_toggle === 'on',
        welcome_thumbnail_toggle: welcome_thumbnail_toggle === 'on'
      })
    })
    console.log(updateServerSettingsRes)
    if (updateServerSettingsRes.ok) {
      const {message} = await updateServerSettingsRes.json()
      return {success: true, message}
    }
    const {code, message} = await updateServerSettingsRes.json() as {code: number, message: string}
    return fail(code, {
      prefix,
      log_toggle,
      welcome_message_toggle,
      log_actions_channel,
      log_events_channel,
      log_traffic_channel,
      welcome_channel,
      welcome_message,
      message:message,
      welcome_banner_toggle,
      welcome_thumbnail_toggle
    })
  }
}