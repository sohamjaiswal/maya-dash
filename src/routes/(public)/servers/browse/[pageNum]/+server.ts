import type { ServersRecord } from "$lib/types/maya"

export const POST = async ({request, params}) => {
  const {filter_type} = await request.json() as {filter_type: 'time' | 'upvotes'}
  const servers = await fetch(`https://api.mayabot.xyz/bump/${params.pageNum}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filter_type: filter_type
      })
    })  
    console.log(servers)
    const data = (await servers.json()).data as ServersRecord
    return new Response(JSON.stringify(data))
}