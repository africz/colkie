import config from '../config.json';
import { validateString } from '../interfaces';
import { getFunc } from './getfunc';
import { log } from './logger';
import { validate } from 'deep-email-validator'
import * as errors from '../errors';

export async function validateString(data: string, options: validateString): Promise<void> {
    const func = await getFunc('validateString', 'validate.ts');
    log.trace(func, 'data:', data, '\noptions:', options);
    log.trace(func, 'options.length:', options.length, ',data.length:', data.length);
    if (options.length < data.length) {
        log.error(func, 'error:', errors.STRING_LENGTH_LONG);
        throw new Error(errors.STRING_LENGTH_LONG)
    }
    if (options.empty !== true && data==="") {
        
        log.error(func, 'error:', errors.STRING_EMPTY_NOT_ALLOWED);
        throw new Error(errors.STRING_EMPTY_NOT_ALLOWED)
    }
    if (options.null !== true && data===null) {
        
        log.error(func, 'error:', errors.STRING_NULL_NOT_ALLOWED);
        throw new Error(errors.STRING_NULL_NOT_ALLOWED)
    }
    //check symbols TODO
    //check number TODO

}

export async function validateEmail(email: string): Promise<void> {
    const func = await getFunc('validateEmail', 'validate.ts');
    log.trace(func, 'email', email);
    const result = await validate(email);
    if (!result.validators.regex?.valid)
    {
        log.error(func, 'error:', errors.EMAIL_IS_INVALID);
        throw new Error(errors.EMAIL_IS_INVALID);
    }
    log.warn(func, 'result', result);
}
