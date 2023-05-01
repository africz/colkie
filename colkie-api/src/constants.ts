/**
 * Constant definitions
 * @module constants
 * version 0.0.1
 * @copyright Attila Fricz.
 *
 */

/**
 * /users/createUser api calling path
 *
 * @type {"/users/createUser"}
 */
export const A_CREATE_USER = '/users/createUser';
/**
 * /users/authUser api calling path
 *
 * @type {"/users/authUser"}
 */
export const A_AUTH_USER = '/users/authUser';
/**
 * /room/sendMessage api calling path
 *
 * @type {"/room/sendMessage"}
 */
export const A_SEND_MESSAGE = '/room/sendMessage';
/**
 * /room/getMessages api calling path
 *
 * @type {"/room/getMessages"}
 */
export const A_GET_MESSAGES = '/room/getMessages';
/**
 * /room/addUser api calling path
 *
 * @type {"/room/addUser"}
 */
export const A_ADD_USER = '/room/addUser';
/**
 * Seperate log for char module
 *
 * @type {"chat"}
 */
export const MODULE_CHAT = 'chat';
/**
 * Seperate log for logins
 *
 * @type {"login"}
 */
export const MODULE_LOGIN = 'login';
/**
 * Log for slow functions 
 *
 * @type {"slow"}
 */
export const MODULE_SLOW = 'slow';
/**
 * Response has error
 *
 * @type {"Error"}
 */
export const RESULT_ERROR = 'Error';
/**
 * Response success 
 *
 * @type {"Success"}
 */
export const RESULT_SUCCESS = 'Success';