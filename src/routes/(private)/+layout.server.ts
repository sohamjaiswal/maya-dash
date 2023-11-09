import type { PropahServa, ServersRecord, UsersRecord } from '$lib/types/maya';
import { error, redirect } from '@sveltejs/kit';

export const load = async({locals}) => {
  if (!locals.user) {
    throw redirect(302, '/login')
  }
  // const findStaffedServers = async (selfId: string) => {
  //   const serversRes = (await (await fetch(`https://api.mayabot.xyz/servers`)).json()).data.servers_list as ServersRecord
    // const servers: PropahServa[] = Object.keys(serversRes).map((id) => ({
    //   id,
    //   ...serversRes[id],
    // }));
    // try {
    //   const selfStaffedServers: PropahServa[] = servers.filter(async(server) => {
    //     const staffListData = await (await fetch(`https://api.mayabot.xyz/server/${server.id}/staff`)).json()
    //     const staffList = staffListData.data.staff_members as UsersRecord;
    //     const doesModServer = Object.keys(staffList).includes(selfId)
    //     return doesModServer;
    //   })
    //   return selfStaffedServers;
    // } catch {
    //   throw error(500, 'Internal Server Error')
    // }
  // }
  const getStaffedServers = async (selfId: string) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const staffedRes = (await (await fetch(`https://api.mayabot.xyz/serverlist`, {
      method: 'GET',
      headers: {
        UserID: selfId,
        Token: locals.user.mayaToken
      }
    })).json()).data as ServersRecord
    const servers: PropahServa[] = Object.keys(staffedRes).map((id) => ({
      id,
      ...staffedRes[id],
    }));
    return servers
  }
  return {lazy: {moderatingServers: getStaffedServers(locals.user.id)}}
}