import { newError } from "../domain/models";
type errors = 'INVALID_PARAMS' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'INVALID_TOKEN';

export const raiseError = (code: errors) => {
    const err = new Error('Custom error mesage');
    (err as newError).code = code;

    throw err;
}