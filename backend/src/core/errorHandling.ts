import Koa from 'koa'
import { newError } from '../domain/models'

export const errorHandling = async (ctx: Koa.Context, next: Koa.Next) => {
    try {
        await next();
    } catch (err) {
        const code = (err as newError).code;

        switch (code) {
            case 'INVALID_PARAMS':
                ctx.status = 400;
                break;

            case 'UNAUTHORIZED':
                ctx.status = 401
                break;

            case 'FORBIDDEN':
                ctx.status = 403;
                break;

            case 'NOT_FOUND':
                ctx.status = 404;
                break;

            case 'INVALID_TOKEN':
                ctx.cookies.set('token', null);
                ctx.status = 498;
                break;

            // INSERT INVALID DATA TYPE
            case '22007':
                ctx.status = 400;
                break;

            // INSERT EXISTING DATA INTO TABLE
            case '23505':
                ctx.status = 409;
                break;

            // DATA TOO LONG FOR DB
            case '22001':
                ctx.status = 413;
                break;

            // DATE OUT OF RANGE
            case '22008':
                ctx.status = 400;
                break;

            default:
                console.log(`ERROR CODE: ${code}`);
                console.error(err);
                ctx.status = 500;
                break;
        }
    }
}