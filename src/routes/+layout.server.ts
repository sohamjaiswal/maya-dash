export const load = async({locals}) => {
  const apiStatus = await (await fetch('https://api.mayabot.xyz/status')).json()
  const user = locals.user;
  return {user, apiStatus}
}