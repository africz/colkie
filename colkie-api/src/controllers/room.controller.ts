/**
 * Room controller
 * version 0.0.1
 * @copyright Attila Fricz.
 *
 */

import { repository } from '@loopback/repository';
import { post, requestBody, response } from '@loopback/rest';
import * as constants from '../constants';
import * as errors from '../errors';
import { log } from '../helpers/logger';
import {
  addUser,
  getMessages,
  sendMessage,
} from '../interfaces';
import { ColkieController, ResponseError, ResponseSuccess } from './colkie.controller';
import { Room, RoomUser, User } from '../models';
import { RoomRepository } from '../repositories/room.repository';
import { UserRepository } from '../repositories/user.repository';
import { RoomUserRepository } from '../repositories/roomuser.repository';
import { Response, RestBindings } from '@loopback/rest';
import { inject } from '@loopback/core';
import { validateToken, validateRoom } from '../helpers/validate';
import config from '../config.json';

/**
 * This controller handle all room related functions such as
 * add a user to a room, send a message  etc.
 */
export class RoomController extends ColkieController {
  /**
   * Room controller handle all room related requests
   */
  constructor(
    @repository(RoomUserRepository)
    public roomUserRepository: RoomUserRepository,
    @repository(RoomRepository)
    public roomRepository: RoomRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(RestBindings.Http.RESPONSE) private response: Response
  ) {
    super();
    this.fileName = 'room.controller.ts';
  }

  /**
   * Send a message to the room
   * @apicall URL - /rooms/sendMessage
   * @param  {requestBody} requestBody
   * @param  {sendMessage} data
   * @returns {Promise<Response>}
   * @example
   *
   * Request Data
   * ------------
   * {
   *    "room":"testroom",
   *    "username":"testname",
   *    "message":"test message",
   *    "token":"auth token",
   * }
   *
   * Response Success
   * ----------------
   * {
   *    "status":200,
   *    "message": "Success"
   * }
   *
   * Response Error
   * --------------
   * {
   *    "status": 400,
   *    "message": <Error reason>
   * }
   */

  @post(constants.A_SEND_MESSAGE)
  @response(200, ResponseSuccess)
  @response(400, ResponseError)
  async sendMessage(@requestBody({
    description: 'sendMessage',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'sendMessage',
          properties: {
            room: { type: 'number' },
            username: { type: 'string' },
            message: { type: 'string' },
            token: { type: 'string' }
          },
        },
      },
    },
  }) data: sendMessage): Promise<Response> {
    const func = await this.getFunc('sendMessage');
    log.info(func, 'data:', data);
    try {
      const { room, username, message, token } = data;
      await validateToken({ username: username, token: token });
      await this.validateSendMessage(data);

      const payload: any = new Room();
      payload.room = room;
      payload.username = username;
      payload.message = message;
      log.trace(func, 'payload:', payload);
      await this.roomRepository
        .create(payload)
        .catch(error => {
          log.trace(func, 'error(create):', error);
          throw new Error(error);
        });

      this.response.status(200).send({
        message: constants.RESULT_SUCCESS
      });
      log.info(func, constants.RESULT_SUCCESS);
      return this.response;
    } catch (error) {
      this.response.status(400).send({
        message: error.message,
      });
      log.error(func, 'error(return):', error.stack);
      return this.response;
    }
  }//sendMessage


  /**
  * Get messages from any rooms
  * - start is id of the rooms table this is identify
  *   the smallest id that you will retrieve in the batch.
  * - limit is number of recors in the batch.
  *   For an example with start = 50, limit =10 
  *   you will get 10 records from id 50 to id 60.  
  * - by user
  *   fill username limit and start don't use room.
  *   filter use like% on user names.
  * - by room
  *   fill room, start and limit but don't use username
  * - by user, room 
  *   fill all and you will get user in room only.
  * - use only limit and start and you will get all rooms and 
  *   users in this range. 
  * 
  * 
  * @apicall URL - /rooms/getMessages
  * @param  {requestBody} requestBody
  * @param  {getMessages} data
  * @returns {Promise<Response>}
  * @example
  *
  * Request Data
  * ------------
  * {
  *    "authname":"testname",
  *    "username":"testname",
  *    "room":"testroom",
  *    "start": 4,
  *    "limit":100, 
  *    "token":"auth token",
  * }
  *
  * Response Success
  * ----------------
  * {
  *    "status":200,
  *    "message": messages[]
  * }
  *
  * Response Error
  * --------------
  * {
  *    "status": 400,
  *    "message": <Error reason>
  * }
  */

  @post(constants.A_GET_MESSAGES)
  @response(200, ResponseSuccess)
  @response(400, ResponseError)
  async getMessages(@requestBody({
    description: 'getMessages',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'getMessages',
          properties: {
            room: { type: 'number' },
            username: { type: 'string' },
            limit: { type: 'number' },
            token: { type: 'string' }
          },
        },
      },
    },
  }) data: getMessages): Promise<Response> {
    const func = await this.getFunc('getMessages');
    log.info(func, 'data:', data);
    try {
      const { authname, username, room, start, limit, token } = data;
      await validateToken({ username: authname, token: token });
      await this.validateGetMessages(data);
      let filter = {};
      if (room && username && limit) {
        filter = {
          where: {
            username: {
              like: `%${username}%`,
            },
            room: {
              eq: room,
            },
            id: {
              gt: start,
            }
          },
          order: ['room ASC', 'username ASC'],
          limit: limit
        };
      } else if (username && limit && !room) {
        filter = {
          where: {
            username: {
              like: `%${username}%`,
            },
            id: {
              gt: start,
            }
          },
          order: ['username ASC'],
          limit: limit
        };
      } else if (!username && limit && room) {
        filter = {
          where: {
            room: {
              eq: room,
            },
            id: {
              gt: start,
            }
          },
          order: ['room ASC'],
          limit: limit
        };
      } else if (!username && limit && !room) {
        filter = {
          where: {
            id: {
              gt: start,
            }
          },
          limit: limit
        };
      }
      log.debug(func, 'filter', filter);
      const messages: any = await this.roomRepository.find(filter)
        .catch(error => {
          log.error(func, 'error(findOne):', error);
          throw new Error(error);
        });
      log.debug(func, 'messages:', messages);

      this.response.status(200).send({
        message: messages
      });
      log.info(func, messages);
      return this.response;
    } catch (error) {
      this.response.status(400).send({
        message: error.message,
      });
      log.error(func, 'error(return):', error.stack);
      return this.response;
    }
  }//getMessages


  /**
   * Add a user to a room
   * @async
   * @apicall URL - /rooms/addUser
   * @param   {requestBody} requestBody
   * @param   {addUser} data
   * @returns {Promise<Response>}
   * @example
   *
   * Request Data
   * ------------
   * {
   *    "username":"testname",
   *    "room":"testroom",
   *    "token":"auth token",
   * }
   *
   * Response Success
   * ----------------
   * {
   *    "status":200,
   *    "message": "Success"
   * }
   *
   * Response Error
   * --------------
   * {
   *    "status": 400,
   *    "message": <Error reason>
   * }
   *
   */
  @post(constants.A_ADD_USER)
  @response(200, ResponseSuccess)
  @response(400, ResponseError)
  async addUser(@requestBody({
    description: 'addUser',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'addUser',
          properties: {
            authname: { type: 'string' },
            room: { type: 'number' },
            username: { type: 'string' },
            token: { type: 'string' }
          },
        },
      },
    },
  }) data: addUser): Promise<Response> {
    const func = await this.getFunc('addUser');
    log.info(func, 'data:', data);
    try {
      const { username, room, token } = data;
      await validateToken({ username: username, token: token });
      await this.validateAddUser(data);
      const user = await this.getUser(username);

      const filter = {
        where: {
          and: [
            { roomid: room },
            { userid: user.id },
          ],
        },
      };
      log.trace(func, 'filter:', filter);
      const roomuser: any = await this.roomUserRepository
        .findOne(filter)
        .catch(error => {
          log.error(func, 'error(findOne):', error);
          throw new Error(error);
        });
      if (roomuser) {
        log.error(func, "error:", errors.USER_EXISTS_IN_ROOM, "\nuser:", user, "\room:", room);
        throw new Error(errors.USER_EXISTS_IN_ROOM);
      }

      const payload: any = new RoomUser();
      payload.userid = user.id;
      payload.roomid = room;
      log.trace(func, 'payload:', payload);
      await this.roomUserRepository
        .create(payload)
        .catch(error => {
          log.trace(func, 'error(create):', error);
          throw new Error(error);
        });

      this.response.status(200).send({
        message: constants.RESULT_SUCCESS
      });
      log.info(func, constants.RESULT_SUCCESS, room);
      return this.response;
    } catch (error) {
      this.response.status(400).send({
        message: error.message,
      });
      log.error(func, 'error(return):', error.stack);
      return this.response;
    }
  }//addUser


  /**
   * Validate /room/sendMessage
   * @param {any} data:sendMessage
   * @returns {any}
   */
  async validateSendMessage(data: sendMessage): Promise<any> {
    const func = await this.getFunc('validateSendMessage');
    log.trace(func, 'data:', data);
    const { room, username, message } = data;
    await this.validateRoomUser(data);
    await this.validateMessage(data);
  }//validateSendMessage


  /**
   * Validate /room/getMessages call
   * @param {any} data:getMessages
   * @returns {any}
   */
  async validateGetMessages(data: getMessages): Promise<any> {
    const func = await this.getFunc('validateGetMessages');
    log.trace(func, 'data:', data);
    //username is validated by token already
    const { room, limit } = data;
    if (room) await validateRoom(room);
    if (!limit) {
      throw new Error(errors.LIMIT_IS_INVALID);
    }
    if (limit > config.room.max_limit) {
      throw new Error(errors.LIMIT_IS_INVALID);
    }

    if (limit && limit <= 0) {
      throw new Error(errors.LIMIT_IS_INVALID);
    }

  }//validateGetMessages


  /** 
   * Validate room param in /room/sendMessage api call
   * @param {sendMessage} data:sendMessage
   * @returns {Promise<void>}
   */
  async validateRoomUser(data: sendMessage): Promise<void> {
    const func = await this.getFunc('validateRoomUser');
    log.trace(func, 'data:', data);
    const { room, username } = data;
    const user = await this.getUser(username);

    let filter = {
      where: {
        and: [
          { roomid: room },
          { userid: user.id },
        ],
      },
    };
    log.trace(func, 'filter:', filter);
    const roomUser: any = await this.roomUserRepository
      .findOne(filter)
      .catch(error => {
        log.error(func, 'error(findOne):', error);
        throw new Error(error);
      });
    if (!roomUser) {
      log.error(func, errors.ROOM_USER_NOT_EXISTS);
      throw new Error(errors.ROOM_USER_NOT_EXISTS);
    }
  }//validateRoomUser

  /** Validate a message in /room/sendMessage call
 * @param {sendMessage} data:sendMessage
 * @returns {Promise<void>}
 */
  async validateMessage(data: sendMessage): Promise<void> {
    const func = await this.getFunc('validateMessage');
    log.trace(func, 'data:', data);
    //TODO check vulgar expressions, etc.
  }//validateMessage


  /** 
   * Validate /room/addUser call
   * @param {addUser} data:addUser
   * @returns {Promise<void>}
   */
  async validateAddUser(data: addUser): Promise<void> {
    const func = await this.getFunc('validateAddUser');
    log.trace(func, 'data:', data);
    const { room } = data;
    await validateRoom(room);
    //user already validated in auth process
  }//validateAddUser

  /** 
   * Get a user object  by username
   * @param {string} username:string
   * @returns {Promise<User>}
   */
  async getUser(username: string): Promise<User> {
    const func = await this.getFunc('getUserId');
    let filter = {
      where: {
        and: [
          { username: username },
        ],
      },
    };
    log.trace(func, 'filter:', filter);
    const user: any = await this.userRepository
      .findOne(filter)
      .catch(error => {
        log.error(func, 'error(findOne):', error);
        throw new Error(error);
      });
    if (!user) {
      log.error(func, errors.USER_NOT_EXISTS);
      throw new Error(errors.USER_NOT_EXISTS);
    }
    return user;
  }//getUserId

} //RoomController
