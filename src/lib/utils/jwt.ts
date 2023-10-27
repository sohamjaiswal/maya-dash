import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';

export const JWT_SESSION_COOKIE_NAME = 'MayaToken';

export function createSessionCookie(session: {user_id: string, token: string}) {
    return jwt.sign(
        {
            userId: session.user_id,
            token: session.token,
        },
        env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}