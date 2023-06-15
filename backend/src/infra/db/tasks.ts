import { Description, Task, UserTask } from "../../domain/models";
import { db } from "../commands/db";

export const getUserTaskByTaskID = async (task_id: string) => {
    return (await db('user_tasks').where({ task_id : task_id }).select())[0];
}

export const getTaskByTaskID = async (task_id: string) => {
    return (await await db('tasks').where({ task_id: task_id }))[0];
}

export const getStatusTypesByStatus = async (status: string) => {
    return await db('status_types').where({ status: status }).select();
}

export const getUserTasksByUsernameAndTaskID = async (username: string, task_id: string) => {
    return await db('user_tasks').where({username: username, task_id: task_id}).select()
}

export const addDescription = async (description: Description) => {
    return await db('descriptions').insert(description);
}

export const addTask = async (task: Task) => {
    await db('tasks').insert(task);
}

export const addUserTask = async (user_task: UserTask | { user: string, task_id: string }) => {
    return await db('user_tasks').insert(user_task);
}

export const updateTask = async (task: Task) => {
    return await db('tasks').where({ task_id: task.task_id }).update(task);
}

export const deleteUserTask = async (user_task: UserTask) => {
    return await db('user_tasks').where({username: user_task.username, task_id: user_task.task_id}).select().delete();
}

export const deleteTaskFromDb = async (task_id: string) => {
    return await db('tasks').where({ task_id: task_id }).select().delete();
}

export const getUserTasksByUsername = async (username: string) => {
    return await db('user_tasks').where({ username : username }).select();
}

export const getDescription = async (description_id: string) => {
    return (await db('descriptions').where({ description_id : description_id }).select())[0];
}

export const getStatusTypeByID = async (status_id: string) => {
    return (await db('status_types').where({ status_id : status_id }).select())[0];
}