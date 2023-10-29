import { error, redirect } from "@sveltejs/kit"

export const load = async ({params, locals}) => {
  const getServerData = async () => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const serverData = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/data`, {
      method: 'GET',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken
      }
    })
    if (!serverData.ok) {
      throw error(500, 'Internal Server Error')
    }
    return (await serverData.json()).server_data
  }
  return {
    lazy: {
      serverData: getServerData()
    }
  }
}