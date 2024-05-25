import type { ServerSettings } from "$lib/types/maya"
import { error, fail, redirect } from "@sveltejs/kit"

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
    try {
      const serverSettingsRes = (await (await fetch(`https://api.mayabot.xyz/server/${params.serverId}/settings`, {
        method: 'GET',
        headers: {
          UserID: locals.user.id,
          Token: locals.user.mayaToken
        }
      })).json()).data
      return serverSettingsRes as ServerSettings
    } catch (e) {
      throw error(405, "You are not allowed to view this content.")
    }
    // get server details using serverid and mayatoken and userid 
  }
  return {
    lazy: {
      tagsList: getTagsList(),
      serverSettings: getCurrentSettings()
    }
  }
}

export const actions = {
  updateAdvertisementSettings: async ({params, locals, request}) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const data = await request.formData()
    const advertisement_toggle = data.get('advertisement_toggle') == "on"
    const tags = data.getAll('tags')
    const updateSettings = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/update/bump`, {
      method: 'POST',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        advertisement_toggle,
        tags
      })
    })
    if (updateSettings.ok) {
      const {message} = await updateSettings.json()
      return {success: true, tags: tags, advertisement_toggle: advertisement_toggle, message}
    }
    const {code, message} = await updateSettings.json() as {code: number, message: string}
    return fail(code, {message})
  }
}