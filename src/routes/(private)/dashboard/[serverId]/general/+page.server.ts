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
  updateWelcomeSettings: async ({params, locals, request}) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const data = await request.formData()
    console.log(data)
    const welcome_channel = data.get('welcome_channel')
    const welcome_message_toggle = data.get('welcome_message_toggle') === 'on'
    const welcome_message = data.get('welcome_message')
    const welcome_banner_toggle = data.get('welcome_banner_toggle') === 'on'
    const welcome_thumbnail_toggle = data.get('welcome_thumbnail_toggle') === 'on'
    const updateServerSettingsRes = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/update/welcome`, {
      method: 'POST',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        welcome_message_toggle,
        welcome_channel,
        welcome_message,
        welcome_banner_toggle,
        welcome_thumbnail_toggle
      })
    })
    if (updateServerSettingsRes.ok) {
      const {message} = await updateServerSettingsRes.json()
      return {success: true, message, welcome_channel, welcome_message_toggle, welcome_message, welcome_banner_toggle, welcome_thumbnail_toggle}
    }
    const {code, message} = await updateServerSettingsRes.json() as {code: number, message: string}
    return fail(code, {
      welcome_channel,
      welcome_message_toggle,
      welcome_message,
      welcome_banner_toggle,
      welcome_thumbnail_toggle,
      message
    })
  },

  updatePrefix: async ({params, locals, request}) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const data = await request.formData()
    const prefix = data.get('prefix')
    console.log(prefix)
    const updateServerSettingsRes = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/update/prefix`, {
      method: 'POST',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prefix
      })
    })
    if (updateServerSettingsRes.ok) {
      const {message} = await updateServerSettingsRes.json()
      return {success: true, message, prefix}
    }
    const {code, message} = await updateServerSettingsRes.json() as {code: number, message: string}
    return fail(code, {
      prefix,
      message
    })
  },

  updateLogsSettings: async ({params, locals, request}) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const data = await request.formData()
    const logs_toggle = data.get('logs_toggle')
    const log_actions_channel = data.get('log_actions_channel')
    const log_events_channel = data.get('log_events_channel')
    const log_traffic_channel = data.get('log_traffic_channel')
    const updateServerSettingsRes = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/update/logs`, {
      method: 'POST',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        logs_toggle: logs_toggle === 'on',
        log_actions_channel,
        log_events_channel,
        log_traffic_channel,
      })
    })
    if (updateServerSettingsRes.ok) {
      const {message} = await updateServerSettingsRes.json()
      return {success: true, message, logs_toggle, log_actions_channel, log_events_channel, log_traffic_channel}
    }
    const {code, message} = await updateServerSettingsRes.json() as {code: number, message: string}
    return fail(code, {
      logs_toggle,
      log_actions_channel,
      log_events_channel,
      log_traffic_channel,
      message
    })
  }
}