import jwt from 'jsonwebtoken'
import { raiseError } from '../../core/util'

const secret = process.env.TOKEN_SECRET ?? 'token doesnt exist'

export const verify = (username: string) => {
    const user = {
        username: username
    }

    return jwt.sign(user, secret, { expiresIn : '1d' });
}

export const check = (token: string) => {
    try {
        return jwt.verify(token, secret);
    } catch {
        raiseError('INVALID_TOKEN');
    }
}