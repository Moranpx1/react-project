import Router from "koa-router"
import { getUsersTasks } from "../controllers/usersController";

export const router = new Router({
    prefix: '/users'
});

router.get('/:user_id/tasks', getUsersTasks);