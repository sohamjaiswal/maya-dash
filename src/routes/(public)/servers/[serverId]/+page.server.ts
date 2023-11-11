import { error, redirect, fail } from '@sveltejs/kit'

export const load = async ({params}) => {
  const {serverId} = params
  const serverData = await fetch(`https://api.mayabot.xyz/serverdata/${serverId}`)
  if (serverData.ok) {
    const server = (await serverData.json()).data as {
      about: string
      avatar: string
      name: string
      banner: string
      created: string
      id: string
      emotes: number
      members: number
      owner_data: {
        id: string
        name: string
        avatar: string
      }
      tags: string[]
      upvotes: number
      url: string
    }
    return {
      server
    }
  }
  const {code, message} = await serverData.json()
  throw error(code, message)
}

export const actions = {
  upvoteServer: async ({params, locals}) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const {serverId} = params
    const upvote = await fetch(`https://api.mayabot.xyz/server/${serverId}/upvote`, {
      method: 'GET',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken
      }
    })
    if (upvote.ok) {
      const {message} = await upvote.json()
      return {message}
    }
    const {code, message} = await upvote.json()
    return fail(code, {message})
  },
  bumpServer: async ({params, locals}) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const {serverId} = params
    const bump = await fetch(`https://api.mayabot.xyz/server/${serverId}/bump`, {
      method: 'GET',
      headers: {
        UserID: locals.user.id,
        Token: locals.user.mayaToken
      }
    })
    if (bump.ok) {
      const {message} = await bump.json()
      return {message}
    }
    const {code, message} = await bump.json()
    return fail(code, {message})
  }
}