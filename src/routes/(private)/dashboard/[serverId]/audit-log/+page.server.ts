import type { AuditRecords } from "$lib/types/maya.js"
import { error, redirect } from "@sveltejs/kit"

export const load = async ({params, locals}) => {
  const auditLogData = async () => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const auditData = await fetch(`https://api.mayabot.xyz/server/${params.serverId}/audit`, {
      method: 'GET',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken
      }
    })
    if (!auditData.ok) {
      throw error(500, 'Internal Server Error')
    }
    const retData = await auditData.json()
    return (retData).data as AuditRecords
  }
  return {
    lazy: {
      auditLogData: auditLogData()
    }
  }
}