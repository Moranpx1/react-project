import Router from "koa-router"
import { checkPremissionsForTask, taskExists } from "../../commands/tasks";
import { tasksEndpointType } from '../../../core/typeValidation'
import { deleteTask, getTask, postTask, putTask } from "../controllers/tasksController"

export const router = new Router({
    prefix: '/tasks'
});

router.get('/:task_id', getTask);
router.post('/', tasksEndpointType, postTask);
router.put('/:task_id', taskExists, checkPremissionsForTask, putTask);
router.delete('/:task_id', taskExists, checkPremissionsForTask, deleteTask);