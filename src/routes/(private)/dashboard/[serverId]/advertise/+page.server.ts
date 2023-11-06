import type { ServerSettings } from "$lib/types/maya"
import { redirect } from "@sveltejs/kit"

export const load = async ({params, locals}) => {
  if (!locals.user) {
    throw redirect(302, '/login')
  }
  const getTagsList = async () => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const tagsData = await fetch(`https://api.mayabot.xyz/tagslist`, {
      method: 'GET',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken
      }
    })
    return (await tagsData.json()).data as string[]
  }
  const getCurrentSettings = async () => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
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
      tagsList: getTagsList(),
      serverSettings: getCurrentSettings()
    }
  }
}

export const actions = {
  updateBumpSettings: async ({params, locals, request}) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const data = await request.formData()
    const bump_enabled = data.get('bump_enabled') == "on"
    const bump_tags = data.getAll('bump_tags')
    const updateSettings = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/update/bump`, {
      method: 'POST',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bump_enabled,
        bump_tags
      })
    })
    if (updateSettings.ok) {
      const toast = {
        success: "Advertisment Settings updated successfully",
      }
      const urlsearchparams = new URLSearchParams(toast)
      throw redirect (302, `/dashboard/${params.serverId}/advertise?${urlsearchparams.toString()}`)
    }
    const toast = {
      error: "Failed to update Advertisment Settings",
    }
    const urlsearchparams = new URLSearchParams(toast)
    throw redirect (302, `/dashboard/${params.serverId}/advertise?${urlsearchparams.toString()}`)
  }
}