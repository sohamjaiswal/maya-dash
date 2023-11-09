import type { MembersRecord } from "$lib/types/maya"
import { error, fail, redirect } from "@sveltejs/kit"

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
      return redirect(302, '/login')
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
      return {success: true}
    }
    return fail(405, {message: "Could not ban user."})
  },
  kick: async ({params, locals, request}) => {
    if (!locals.user) {
      return redirect(302, '/login')
    }
    const data = await request.formData()
    const user_id = data.get('id')
    const sirKicksABitch = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/kick`, {
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
      return {success: true}
    }
    return fail(405, {message: "Could not kick user."})
  }
}