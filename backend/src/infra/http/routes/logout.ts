import Router from "koa-router"
import { logout } from "../controllers/logoutController";

export const router = new Router({
    prefix: '/logout'
});

router.post('/', logout);