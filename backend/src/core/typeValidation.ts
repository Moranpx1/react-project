import Koa from 'koa'
import { loginSchema, tasksPostRequestSchema } from '../domain/schemas'
import { raiseError } from './util'

export const loginRegisterType = async (ctx: Koa.Context, next: Koa.Next) => {
    if (!loginSchema.safeParse(ctx.request.body).success) raiseError('INVALID_PARAMS');
    await next();
}

export const tasksEndpointType = async (ctx: Koa.Context, next: Koa.Next) => {
    if (!tasksPostRequestSchema.safeParse(ctx.request.body).success) raiseError('INVALID_PARAMS');
    await next();
}