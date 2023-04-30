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
  sendMessage,
} from '../interfaces';
import { ColkieController, ResponseError, ResponseSuccess } from './colkie.controller';
import { Room, RoomUser, User } from '../models';
import { RoomRepository } from '../repositories/room.repository';
import { UserRepository } from '../repositories/user.repository';
import { RoomUserRepository } from '../repositories/roomuser.repository';
import { Response, RestBindings } from '@loopback/rest';
import { inject } from '@loopback/core';
import { validateString, validateToken, validateRoom } from '../helpers/validate';

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
   * @param  {createRoom} data
   * @returns {Promise<any>}
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
            room: { type: 'string' },
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
      await this.validateMessage(data);
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
  }//sendMessage


  /**
   * Send a message to the room
   * @apicall URL - /rooms/addUser
   * @param  {requestBody} requestBody
   * @param  {createRoom} data
   * @returns {Promise<any>}
   * @example
   *
   * Request Data
   * ------------
   * {
   *    "room":"testroom",
   *    "username":"testname",
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

  /**
   * Add a user to a room
   *
   * @async
   * @param {addUser} data
   * @returns {Promise<Response>}
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
      const { room, username, token } = data;
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
   * @param {any} data:sendMessage
   * @returns {any}
   */
  async validateMessage(data: sendMessage): Promise<any> {
    const func = await this.getFunc('validateCreateUser');
    log.trace(func, 'data:', data);
    const { room, username, message } = data;
    await validateString(username, { length: 20, empty: false, null: false });
    //validate room valid room id for current user
    //validate message vulgar expressions for an example
  }

  /**
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
      log.error(func, errors.USER_NOT_EXISTS, user);
      throw new Error(errors.USER_NOT_EXISTS);
    }
    return user;
  }//getUserId

} //RoomController
