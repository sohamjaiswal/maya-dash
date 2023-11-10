import type { PropahServa, ServersRecord } from '$lib/types/maya';
import { redirect } from '@sveltejs/kit';

export const load = async({locals}) => {
  if (!locals.user) {
    throw redirect(302, '/login')
  }
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