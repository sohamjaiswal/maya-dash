import { env } from '$env/dynamic/private';
import { JWT_SESSION_COOKIE_NAME } from '$lib/utils/jwt';
import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	let theme = '';

	const cookieTheme = event.cookies.get('theme');
	const mayaToken = event.cookies.get(JWT_SESSION_COOKIE_NAME);

	if (cookieTheme) {
		theme = cookieTheme;
	} else {
		event.cookies.set('theme', 'skeleton', {path: '/'});
		theme = 'skeleton';
	}

	if (!mayaToken) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
		});
	}

	try {
		const decodedMayaToken = jwt.verify(mayaToken, env.JWT_SECRET) as unknown as { userId: string; token: string };
		const userData = (await (await fetch(`https://api.mayabot.xyz/userdata`, {
        headers: {
          UserID: decodedMayaToken.userId,
          Token: decodedMayaToken.token
        }, method: 'GET'
      })).json()).data as { name: string; avatar: string; banner: string; }
      if (userData) {
				event.locals.user = {id: decodedMayaToken.userId, mayaToken: decodedMayaToken.token,...userData};
			}
	}
	catch (e) {
		event.cookies.delete(JWT_SESSION_COOKIE_NAME, { path: '/' });
	}
	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
	});
};