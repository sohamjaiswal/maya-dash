import type { MembersRecord } from "$lib/types/maya"
import { error, redirect, fail } from "@sveltejs/kit"

export const load = async ({params, locals}) => {
  const getMembersData = async () => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const membersData = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/data`, {
      method: 'GET',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken
      }
    })
    if (!membersData.ok) {
      throw error(500, 'Internal Server Error')
    }
    return (await membersData.json()).server_data.members as MembersRecord
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
    const baneeId = data.get('id')
    const sirBansABitch = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/ban`, {
      method: 'POST',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken
      },
      body: JSON.stringify({
        user_id: baneeId
      })
    })
    if (sirBansABitch.ok) {
      const data = await sirBansABitch.json()
      console.log(data)
      return {success: true}
    }
    return fail(400, {
      id: baneeId
    })
  },
  kick: async ({params, locals, request}) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const data = await request.formData()
    const kickeeId = data.get('id')
    const sirKicksABitch = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/ban`, {
      method: 'POST',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken
      },
      body: JSON.stringify({
        user_id: kickeeId
      })
    })
    console.log(sirKicksABitch)
    if (sirKicksABitch.ok) {
      const data = await sirKicksABitch.json()
      console.log(data)
      return {success: true}
    }
    return fail(400, {
      id: kickeeId
    })
  }
}