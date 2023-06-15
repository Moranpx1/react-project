import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { cors } from '../core/cors'
import { router } from "../infra/http/routes/index"
require('dotenv').config();

const server = new Koa();
const port = process.env.BACKEND_PORT;

server
    .use(bodyParser())
    .use(cors)
    .use(router.routes())
    .use(router.allowedMethods());

server.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});