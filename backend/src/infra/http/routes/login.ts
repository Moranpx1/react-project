import Router from "koa-router"
import { login } from "../controllers/loginController"
import { loginRegisterType } from '../../../core/typeValidation'

export const router = new Router({
    prefix: '/login'
});

router.post('/', loginRegisterType, login);