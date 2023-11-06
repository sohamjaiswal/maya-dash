import type { MembersRecord } from "$lib/types/maya"
import { error, redirect } from "@sveltejs/kit"

export const load = async ({params, locals}) => {
  const getMembersData = async () => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const membersData = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/members`, {
      method: 'GET',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken
      }
    })
    if (!membersData.ok) {
      throw error(500, 'Internal Server Error')
    }
    return (await membersData.json()).data.members as MembersRecord
  }
  return {
    lazy: {
      memberData: getMembersData()
    }
  }
}

export const actions = {
  ban: async ({params, locals, request}) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const data = await request.formData()
    const user_id = data.get('id')
    const sirBansABitch = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/ban`, {
      method: 'POST',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id
      })
    })
    if (sirBansABitch.ok) {
      await sirBansABitch.json()
      const toast = {
        success: "User banned successfully",
      }
      const urlsearchparams = new URLSearchParams(toast)
      throw redirect (302, `/dashboard/${params.serverId}/members?${urlsearchparams.toString()}`)
    }
    const toast = {
      error: "Failed to ban user",
    }
    const urlsearchparams = new URLSearchParams(toast)
    throw redirect (302, `/dashboard/${params.serverId}/members?${urlsearchparams.toString()}`)
  },
  kick: async ({params, locals, request}) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const data = await request.formData()
    const user_id = data.get('id')
    const sirKicksABitch = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/ban`, {
      method: 'POST',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id
      })
    })
    if (sirKicksABitch.ok) {
      await sirKicksABitch.json()
      const toast = {
        success: "User kicked successfully",
      }
      const urlsearchparams = new URLSearchParams(toast)
      throw redirect (302, `/dashboard/${params.serverId}/members?${urlsearchparams.toString()}`)
    }
    const toast = {
      error: "Failed to ban user",
    }
    const urlsearchparams = new URLSearchParams(toast)
    throw redirect (302, `/dashboard/${params.serverId}/members?${urlsearchparams.toString()}`)
  }
}