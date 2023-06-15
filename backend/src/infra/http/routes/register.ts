import Router from "koa-router"
import { loginRegisterType } from '../../../core/typeValidation'
import { register } from "../controllers/registerController";

export const router = new Router({
    prefix: '/register'
});

router.post('/', loginRegisterType, register);