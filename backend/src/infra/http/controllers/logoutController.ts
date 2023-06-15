import Koa from 'koa'

export const logout = (ctx: Koa.Context) => {
    ctx.cookies.set('token', null);
}