/**
 * Interface Definitions
 * @module Interfaces
 * version 0.0.1
 * @copyright Attila Fricz.
 */


export interface createUser {
  /**
   * Username that used for authentication
   *
   * @type {string}
   */
  authname: string;
  /**
   * Username for create a new user
   *
   * @type {string}
   */
  username: string;
  /**
   * Password of the new user
   *
   * @type {string}
   */
  password: string;
  /**
   * Email of the new user
   *
   * @type {string}
   */
  email: string;
  /**
   * First name of the new user
   *
   * @type {string}
   */
  firstname: string;
  /**
   * Last name of the new user
   *
   * @type {string}
   */
  lastname: string;
  /**
   * Token to authenticate the new call
   *
   * @type {string}
   */
  token: string;
}
/**
 * authUser data
 *
 * @export
 * @interface authUser
 * @typedef {authUser}
 */
export interface authUser {
  /**
   * Username for authentication
   *
   * @type {string}
   */
  username: string;
  /**
   * Password for authentication
   *
   * @type {string}
   */
  password: string;
}

/**
 * Webtoken for authenticate each api calls
 *
 * @export
 * @interface token
 * @typedef {token}
 */
export interface token {
  /**
   * Athenticated user
   *
   * @type {string}
   */
  username: string;
  /**
   * Email of the user
   *
   * @type {string}
   */
  email: string;
  /**
   * Token expire time
   *
   * @type {number}
   */
  expireTime: number;
}
/**
 * Parameters of the ValidateTokenParams function
 *
 * @export
 * @interface validateTokenParams
 * @typedef {validateTokenParams}
 */
export interface validateTokenParams {
  /**
   * Username
   *
   * @type {string}
   */
  username: string;
  /**
   * token
   *
   * @type {string}
   */
  token: string;
}

/**
 * ValidateString function parameters
 *
 * @export
 * @interface validateString
 * @typedef {validateString}
 */
export interface validateString {
  /**
   * Maximum length of the validated string
   *
   * @type {number}
   */
  length: number;
  /**
   * Is empty string allowed
   *
   * @type {?boolean}
   */
  empty?: boolean;
  /**
   * Is null allowed
   *
   * @type {?boolean}
   */
  null?: boolean;
  /**
   * Is symbol mandantory
   *
   * @type {?boolean}
   */
  symbol?: boolean;
  /**
   * Is number mandantory
   *
   * @type {?boolean}
   */
  number?: boolean;
}

/**
 * Get the next test value
 * for unique fields like username or email in createUser function
 * each of the test calls require an new not existent username and email
 * parameter to execute the calls successfully. This function provide this 
 * functionality.
 * 
 * @export
 * @interface getNextTestValue
 * @typedef {getNextTestValue}
 */
export interface getNextTestValue {
  /**
   * Username
   *
   * @type {string}
   */
  username: string;
  /**
   * Email
   *
   * @type {string}
   */
  email: string;
}

/**
 * Parameters for /rooms/sendMessage api call
 *
 * @export
 * @interface sendMessage
 * @typedef {sendMessage}
 */
export interface sendMessage {
  /**
   * Room id
   *
   * @type {number}
   */
  room: number;
  /**
   * Username
   *
   * @type {string}
   */
  username: string;
  /**
   * Message to the chat room
   *
   * @type {string}
   */
  message: string;
  /**
   * Token for api call authentication
   *
   * @type {string}
   */
  token: string;
}
/**
 * Retrieve messages from chat room
 *
 * @export
 * @interface getMessages
 * @typedef {getMessages}
 */
export interface getMessages {
  /**
   * Authenticated user name for retrieve messages
   *
   * @type {string}
   */
  authname:string;
  /**
   * Filter messages by username
   *
   * @type {?string}
   */
  username?: string;
  /**
   * Filter messages by room
   *
   * @type {?number}
   */
  room?: number;
  /**
   * Start id of the the message block
   * this is an essential value for proper paging 
   * on the frontend side
   *
   * @type {number}
   */
  start:number;
  /**
   * Limit the messages maximum value is set in config.json
   * Need to restrict the amount of message by call to not overload
   * the communication channel
   *
   * @type {number}
   */
  limit: number;
  /**
   * Webtoken for authenticate the call
   *
   * @type {string}
   */
  token: string;
}

/**
 * Parameter structure for /room/addUser api call
 *
 * @export
 * @interface addUser
 * @typedef {addUser}
 */
export interface addUser {
  /**
   * Username
   *
   * @type {string}
   */
  username: string;
  /**
   * Room id
   *
   * @type {number}
   */
  room: number;
  /**
   * Webtoken for authenticate the call
   *
   * @type {string}
   */
  token: string;
}
