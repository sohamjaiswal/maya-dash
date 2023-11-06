import { JWT_SESSION_COOKIE_NAME } from '$lib/utils/jwt.js'
import { error, redirect } from '@sveltejs/kit'

export const actions = {
  default: async ({cookies, locals}) => {
    if (!locals.user) throw redirect(302, '/login')
    const session = cookies.get(JWT_SESSION_COOKIE_NAME)
    const logout = await fetch(`https://api.mayabot.xyz/logout`, {
      method: 'GET',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken
      }
    })
    if (logout.ok) {
      if (session) {
        cookies.delete(JWT_SESSION_COOKIE_NAME, {path: '/'})
      }
      throw redirect(302, '/')
    }
    throw error(500, 'Something went wrong')
  }
}