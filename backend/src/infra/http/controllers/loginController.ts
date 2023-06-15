import Koa from 'koa'
import { loginRegisterRequest } from '../../../domain/models'
import { raiseError } from '../../../core/util'
import { verify } from '../../authentication/jwt'
import { getUser } from '../../db/users'

export const login = async (ctx: Koa.Context) => {
    const user = {
        username: (ctx.request.body as loginRegisterRequest).username,
        password: (ctx.request.body as loginRegisterRequest).password
    }
    
    if (user.username === '' || user.password === '') raiseError('INVALID_PARAMS');

    const query = await getUser(user);
    if (query.length === 0) raiseError('NOT_FOUND');

    ctx.cookies.set('token', verify(query[0].username), {httpOnly: true});
    ctx.body = {
        username: query[0].username
    }
}