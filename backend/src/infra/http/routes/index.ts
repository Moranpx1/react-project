import Router from 'koa-router'
import { router as usersRouter } from './users'
import { router as loginRouter } from './login'
import { router as logoutRouter } from './logout'
import { router as registerRouter } from './register'
import { router as tasksRouter } from './tasks'
import { errorHandling } from '../../../core/errorHandling'
import { auth } from '../../../core/auth'
import { okStatus } from '../../../core/okStatus'

export const router = new Router({
    prefix: '/api'
});

router
    .use(errorHandling)
    .use(okStatus)
    .use(loginRouter.routes())
    .use(registerRouter.routes())
    .use(auth)
    .use(logoutRouter.routes())
    .use(usersRouter.routes())
    .use(tasksRouter.routes())