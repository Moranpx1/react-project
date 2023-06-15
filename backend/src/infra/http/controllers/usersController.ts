import Koa from 'koa'
import { raiseError } from '../../../core/util';
import { jwtUserObject, Task, tasksEndpointObject, UserTask } from '../../../domain/models';
import { getDescription, getStatusTypeByID, getTaskByTaskID, getUserTasksByUsername } from '../../db/tasks';
import { check } from '../../authentication/jwt';

export const getUsersTasks = async (ctx: Koa.Context) => {
    const username = (check(ctx.cookies.get('token')!) as jwtUserObject).username;
    if (username != ctx.params.user_id) raiseError('UNAUTHORIZED');

    const user_tasks: UserTask[] = await getUserTasksByUsername(ctx.params.user_id);
    const tasks: Task[] = await Promise.all(user_tasks.map(async user_task => {
        return await getTaskByTaskID(user_task.task_id);
    }));

    const res: tasksEndpointObject[] = await Promise.all(tasks.map(async task => {
        return {
            task_id: task.task_id,
            task: task.task,
            description: (await getDescription(task.description_id)).description,
            status: (await getStatusTypeByID(task.status_id)).status,
            end_time: task.end_time
        }
    }));

    ctx.body = { tasks: res };
}