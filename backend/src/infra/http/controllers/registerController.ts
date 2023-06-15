import Koa from 'koa'
import { loginRegisterRequest } from '../../../domain/models'
import { raiseError } from '../../../core/util'
import { addUser } from '../../db/users'

export const register = async (ctx: Koa.Context) => {
    const user = {
        username: (ctx.request.body as loginRegisterRequest).username,
        password: (ctx.request.body as loginRegisterRequest).password
    }

    if (user.username === '' || user.password === '') raiseError('INVALID_PARAMS');

    const query = await addUser(user);

    ctx.body = { user: user };
}