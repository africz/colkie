/**
 * User controller
 * version 0.0.1
 * @copyright Attila Fricz.
 *
 */

import { repository } from '@loopback/repository';
import { post, requestBody, response, param, RequestBody } from '@loopback/rest';
import * as constants from '../constants';
import { log } from '../helpers/logger';
import {
  createUser,
} from '../interfaces';
import { ColkieController, ResponseError, ResponseSuccess } from './colkie.controller';
import { User } from '../models';
import { UserRepository } from '../repositories/user.repository';
import { Response, RestBindings } from '@loopback/rest';
import { inject } from '@loopback/core';
import bcrypt from "bcrypt";

/**
 * This controller handle all user related functions such as
 * login, authUser, customerInf etc.
 */
export class UserController extends ColkieController {
  /**
   * User controller handle all user related requests
   */
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(RestBindings.Http.RESPONSE) private response: Response
  ) {
    super();
    this.fileName = 'user.controller.ts';
  }

  /**
   * createUser
   * @apicall URL - /users/createUser
   * @param  {requestBody} requestBody
   * @param  {createUser} data
   * @returns {Promise<any>}
   * @example
   *
   * Request Data
   * ------------
   * {
   *    "username":"testuser",
   *    "password":"testpassword",
   *    "email":"testemail@dummy.com",
   *    "firstname":"testfirstname",
   *    "lastname":"testlastname",
   * }
   *
   * Response Success
   * ----------------
   * {
   *    "response":"Success",
   *    "message":
   *      {
   *        "ok":"host created",
   *        "host_id":"a73b2974-f8e9-11eb-8c8a-55bf5e96db99"
   *      }
   * }
   *
   * Response Error
   * --------------
   * {
   *    "response":"Error",
   *    "message":"New user is NULL"
   * }
   */

  @post(constants.A_CREATE_USER)
  @response(200, ResponseSuccess)
  @response(400, ResponseError)
  async createUser(@requestBody({
    description: 'createUser',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'createUser',
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
            email: { type: 'string' },
            firstname: { type: 'string' },
            lastname: { type: 'string' },
          },
        },
      },
    },
  }) data: createUser): Promise<Response> {
    const func = await this.getFunc('createUser');
    log.info(func, 'data:', data);
    try {
      const { username, password, email, firstname, lastname } = data;
      const filter = {
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
      if (user) {
        log.error(func, 'User already exists!', user);
        throw new Error('User already exists!');
      }
      else {
        const newUserRecord: any = new User();
        newUserRecord.username = username;
        newUserRecord.password = await this.encodePassword(password);
        newUserRecord.email = email;
        newUserRecord.firstname = firstname;
        newUserRecord.lastname = lastname;
        log.trace(func, 'newUserRecord:', newUserRecord);

        const newRecord = await this.userRepository
          .create(newUserRecord)
          .catch(error => {
            log.trace(func, 'error(create):', error);
            throw new Error(error);
          });
      }
      this.response.status(200).send({
        message: 'User creation was successful!'
      });
      log.info(func, 'User creation was successful!', user);
      return this.response;
    } catch (error) {
      this.response.status(400).send({
        message: error.message,
      });
      log.error(func, 'error(return):', error.stack);
      return this.response;
    }
  }//createUser

  /**
   * @param  {string} password
   * @returns {Promise<string> encodePassword}
   */
  async encodePassword(password: string): Promise<string> {
    const func = await this.getFunc('createUser');
    log.trace(func, 'password:', password);
    const salt = bcrypt.genSaltSync(10);
    const retVal = await bcrypt.hash(password, salt);
    log.trace(func, 'retVal:', retVal);
    return retVal;
  }//encodePassword

} //UserController
