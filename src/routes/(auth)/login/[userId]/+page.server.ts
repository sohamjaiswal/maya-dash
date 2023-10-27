import { JWT_SESSION_COOKIE_NAME, createSessionCookie } from "$lib/utils/jwt.js";
import { fail, redirect } from "@sveltejs/kit";

export const load = async({params}) => {
  const user = params.userId;
  const getCode = await fetch(`https://api.mayabot.xyz/token/${user}/generate/password`, {
    method: 'GET'
  })
  const code = (await getCode.json()).data.password;
  return {code}
}

export const actions = {
  login: async ({request, params, cookies}) => {
    const data = await request.formData()
    const password = data.get('password')
    console.log(password)
    if (
      !password || typeof password !== 'string'
    ) {
      return fail(400, { invalid: true })
    } 
    const body = JSON.stringify({password})
    console.log(body)
    const validate = await fetch(`https://api.mayabot.xyz/token/${params.userId}/generate/token`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (validate.ok) {
      const {data} = await validate.json();
      const cookie = createSessionCookie(data)
      cookies.set(JWT_SESSION_COOKIE_NAME, cookie, {
        httpOnly: true,
        path: '/',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      })
      throw redirect(302, '/')
    } else {
      return fail(400, { invalid: true })
    }
  }
}