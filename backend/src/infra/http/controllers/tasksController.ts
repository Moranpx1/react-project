import Koa from 'koa'
import { jwtUserObject, Task, tasksEndpointObject, tasksPostRequest, UserTask } from '../../../domain/models'
import { raiseError } from '../../../core/util'
import { check } from '../../authentication/jwt'
import { v4 } from 'uuid'
import { checkForExistingTask, checkForOtherUserTasks } from '../../db/util'
import { addDescription, addTask, addUserTask, deleteTaskFromDb, deleteUserTask, getStatusTypesByStatus, getTaskByTaskID, getUserTaskByTaskID, getUserTasksByUsernameAndTaskID, updateTask } from '../../db/tasks'

export const getTask = async (ctx: Koa.Context) => {
    const user_tasks: UserTask[] = (await getUserTaskByTaskID(ctx.params.task_id))[0];
    if (user_tasks.length === 0) return raiseError('NOT_FOUND');

    const user: jwtUserObject = check(ctx.cookies.get('token')!) as jwtUserObject;

    if (user_tasks[0].username != user.username) return raiseError('UNAUTHORIZED');

    ctx.body = { task: user_tasks[0] };
}

export const postTask = async (ctx: Koa.Context) => {
    const user: jwtUserObject = check(ctx.cookies.get('token')!) as jwtUserObject;
    const request = {
        task: (ctx.request.body as tasksPostRequest).task,
        description: (ctx.request.body as tasksPostRequest).description,
        status: (ctx.request.body as tasksPostRequest).status,
        end_time: (ctx.request.body as tasksPostRequest).end_time
    }

    const status_id = (await getStatusTypesByStatus(request.status))[0].status_id;

    const description = {
        description_id: v4(),
        description: request.description
    }
    const description_id = await addDescription(description);

    const task = {
        task_id: v4(),
        task: request.task,
        status_id: status_id,
        end_time: request.end_time,
        description_id: description.description_id
    }

    const existingTask = await checkForExistingTask(task, user);
    if (existingTask) return ctx.body = { task: existingTask };

    const user_task = {
        task_id: task.task_id,
        username: user.username
    }

    await addTask(task);
    await addUserTask(user_task);

    ctx.body = { task: task };
}

export const putTask = async (ctx: Koa.Context) => {
    const user: jwtUserObject = check(ctx.cookies.get('token')!) as jwtUserObject;
    const request = {
        task: (ctx.request.body as tasksEndpointObject).task,
        description: (ctx.request.body as tasksPostRequest).description,
        status: (ctx.request.body as tasksEndpointObject).status,
        end_time: (ctx.request.body as tasksEndpointObject).end_time
    }

    const status_id = (await getStatusTypesByStatus(request.status))[0].status_id;

    const description = {
        description_id: v4(),
        description: request.description
    }

    const description_id = await addDescription(description);

    const task: Task = {
        task_id: ctx.params.task_id,
        task: request.task,
        description_id: description.description_id,
        status_id: status_id,
        end_time: request.end_time
    }

    const existingTask = await checkForExistingTask(task, user);
    if (existingTask) return ctx.body = { task: existingTask };
    
    const otherUserTasks = await checkForOtherUserTasks(task);
    if (otherUserTasks) {
        const newTask = {
            task_id: v4(),
            task: request.task,
            description_id: description.description_id,
            status_id: status_id,
            end_time: request.end_time
        }

        await addTask(newTask);
        await addUserTask({ user: user.username, task_id: newTask.task_id });
    } else {
        await updateTask(task);
    }

    return ctx.body = { task: task };
}

export const deleteTask = async (ctx: Koa.Context) => {
    const user: jwtUserObject = check(ctx.cookies.get('token')!) as jwtUserObject;
    const task = await getTaskByTaskID(ctx.params.task_id);
    const otherUserTasks = await checkForOtherUserTasks(task);

    await deleteUserTask({username: user.username, task_id: task.task_id});

    if (!otherUserTasks) {
        await deleteTaskFromDb(task.task_id);
    }
}