import config from '../config.json';
import { validateString, validateTokenParams } from '../interfaces';
import { getFunc } from './getfunc';
import { log } from './logger';
import { validate } from 'deep-email-validator'
import * as errors from '../errors';
import jwt from "jsonwebtoken";

/**
 * Validate a string width different options
 * such as length, empty, null allowed
 *
 * @export
 * @async
 * @param {string} data
 * @param {validateString} options
 * @returns {Promise<void>}
 */
export async function validateString(data: string, options: validateString): Promise<void> {
    const func = await getFunc('validateString', 'validate.ts');
    log.trace(func, 'data:', data, '\noptions:', options);
    log.trace(func, 'options.length:', options.length, ',data.length:', data.length);
    if (options.length < data.length) {
        log.error(func, 'error:', errors.STRING_LENGTH_LONG);
        throw new Error(errors.STRING_LENGTH_LONG)
    }
    if (options.empty !== true && data === "") {

        log.error(func, 'error:', errors.STRING_EMPTY_NOT_ALLOWED);
        throw new Error(errors.STRING_EMPTY_NOT_ALLOWED)
    }
    if (options.null !== true && data === null) {

        log.error(func, 'error:', errors.STRING_NULL_NOT_ALLOWED);
        throw new Error(errors.STRING_NULL_NOT_ALLOWED)
    }
    //check symbols TODO
    //check number TODO

}//validateString

/**
 * Validate email widh deep-email-validator library 
 * currently only regexp option used
 *
 * @export
 * @async
 * @param {string} email
 * @returns {Promise<void>}
 * @link https://github.com/mfbx9da4/deep-email-validator#readme
 */
export async function validateEmail(email: string): Promise<void> {
    const func = await getFunc('validateEmail', 'validate.ts');
    log.trace(func, 'email', email);
    const result = await validate(email);
    if (!result.validators.regex?.valid) {
        log.error(func, 'error:', errors.EMAIL_IS_INVALID);
        throw new Error(errors.EMAIL_IS_INVALID);
    }
    log.warn(func, 'result', result);
}//validateEmail

/**
 * Validate JWT token 
 * @param  {validateToken} data
 * @returns {Promise<void> }
 * @link https://github.com/auth0/node-jsonwebtoken#readme
 */
export async function validateToken(data: validateTokenParams): Promise<void> {
    const func = await getFunc('validateToken', 'validate.ts');
    const { username, token } = data;
    log.trace(func, 'data:', data);
    const payload: any = jwt.verify(token, config.tokenSalt);
    log.trace(func, 'payload:', payload);
    if (payload.username !== username) {
        throw new Error(errors.USER_NOT_EXISTS);
    }
    if (payload.expireTime < Date.now()) {
        log.trace(func, 'payload.expireTime:', new Date(payload.expireTime).toLocaleTimeString());
        log.trace(func, 'now:', new Date(Date.now()).toLocaleTimeString());
        throw new Error(errors.TOKEN_EXPIRED);
    }
}//validateToken

/**
 * Validate room id is valid or not from config.json
 *
 * @export
 * @async
 * @param {number} room
 * @returns {Promise<void>}
 */
export async function validateRoom(room: number): Promise<void> {
    const func = await getFunc('validateRoom', 'validate.ts');
    log.trace(func, 'room', room);
    const availableRooms = config.room.id;
    let found = false;
    availableRooms.forEach(item => {
        if (room===item)
        {
            found=true;
        }
    });
    if (!found)
    {
        throw new Error(errors.ROOM_IS_INVALID);
    }
}//validateRoom


