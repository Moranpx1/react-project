import Koa from 'koa'
import { check } from '../infra/authentication/jwt';
import { raiseError } from './util';

export const auth = async (ctx: Koa.Context, next: Koa.Next) => {
    if (!ctx.cookies.get('token')) return raiseError('FORBIDDEN');
    check(ctx.cookies.get('token')!);
    await next();
}