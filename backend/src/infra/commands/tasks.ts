import Koa from 'koa'
import { jwtUserObject } from '../../domain/models';
import { check } from '../authentication/jwt';
import { db } from './db';
import { raiseError } from '../../core/util';

export const taskExists = async (ctx: Koa.Context, next: Koa.Next) => {
    const query = await db('tasks').where({ task_id: ctx.params.task_id }).select();
    if (query.length === 0) return raiseError('NOT_FOUND');

    await next();
}

export const checkPremissionsForTask = async (ctx: Koa.Context, next: Koa.Next) => {
    const user: jwtUserObject = check(ctx.cookies.get('token')!) as jwtUserObject;

    const task = await db('user_tasks').where({ task_id: ctx.params.task_id }).select().first();

    if (task.username === user.username) await next();
    else raiseError('FORBIDDEN');
}