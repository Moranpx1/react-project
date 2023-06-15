import { jwtUserObject, Task } from "../../domain/models"
import { db } from "../commands/db"

export const checkForExistingTask = async (task: Task, user: jwtUserObject) => {
    const existingTask = await db('tasks').where({ task: task.task, description_id: task.description_id, status_id: task.status_id, end_time: task.end_time }).select();
    if (existingTask.length === 0) return undefined;

    const user_task = await db('user_tasks').where({ task_id : existingTask[0].task_id, username: user.username }).select();
    if (user_task.length != 0) return existingTask[0];

    await db('user_tasks').insert({ username: user.username, task_id: existingTask[0].task_id });
    return existingTask[0];
}

export const checkForOtherUserTasks = async (task: Task) => {
    const otherUserTasks = await db('user_tasks').where({ task_id: task.task_id }).select();
    return otherUserTasks.length > 1;
}