import type { PropahServa, ServersRecord, UsersRecord } from '$lib/types/maya';
import { redirect } from '@sveltejs/kit';

export const load = async({locals}) => {
  if (!locals.user) {
    throw redirect(302, '/login')
  }
  const findStaffedServers = async (selfId: string) => {
    const serversRes = (await (await fetch(`https://api.mayabot.xyz/servers`)).json()).data.servers_list as ServersRecord
    const servers: PropahServa[] = Object.keys(serversRes).map((id) => ({
      id,
      ...serversRes[id],
    }));
    const selfStaffedServers: PropahServa[] = servers.filter(async(server) => {
      const staffList = (await (await fetch(`https://api.mayabot.xyz/server/${server.id}/staff`)).json()).data.staff_members as UsersRecord;
      const doesModServer = Object.keys(staffList).includes(selfId)
      return doesModServer;
    })
    return selfStaffedServers;
  }
  return {lazy: {moderatingServers: findStaffedServers(locals.user.id)}}
}