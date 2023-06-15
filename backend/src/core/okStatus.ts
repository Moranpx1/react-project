import Koa from 'koa'

export const okStatus = async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.status = 200;
    await next();
}