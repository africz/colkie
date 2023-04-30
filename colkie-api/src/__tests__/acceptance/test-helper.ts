import { ColkieApplication } from '../../application';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';

import { UserRepository } from '../../repositories/user.repository';
import { RoomUserRepository } from '../../repositories/roomuser.repository';
import { ColkieDataSource } from '../../datasources';
import { log } from '../../helpers/logger';
import { getFunc } from '../../helpers/getfunc';
import { getNextTestValue, authUser } from '../../interfaces';
import * as constants from '../../constants';
import * as errors from '../../errors';
import { RoomUser, User } from '../../models';



/**
 * Setup a test application
 *
 * @export
 * @async
 * @returns {Promise<AppWithClient>}
 */
export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const app = new ColkieApplication({
    rest: restConfig,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return { app, client };
}

/**
 * Define app and client for tests
 * @export
 * @interface AppWithClient
 * @typedef {AppWithClient}
 */
export interface AppWithClient {
  /**
   *
   * @type {ColkieApplication}
   */
  app: ColkieApplication;
  /**
   *
   * @type {Client}
   */
  client: Client;
}

/**
 * Email and username are unique to create succesful a new one need pass a unique name.
 * This function generate a new username and email at every request.
 * @export
 * @async
 * @param {getNextTestValue} data
 * @returns {Promise<getNextTestValue>}
 */
export async function getNextTestValue(data: getNextTestValue): Promise<getNextTestValue> {
  const func = await getFunc('getNextTestValue', 'test-helper.ts');
  const { username, email } = data;
  log.debug(func, 'data:', data);
  const filter = {
    where: {
      username: {
        like: `${username}#%`,
      }
    },
    order: ['username DESC'],
    limit: 1
  };
  const userRepository = new UserRepository(new ColkieDataSource);
  const user: any = await userRepository.find(filter)
    .catch(error => {
      log.error(func, 'error(findOne):', error);
      throw new Error(error);
    });
  log.debug(func, 'user:', user);
  let nextUserName = username;
  let nextEmail = email;
  //need to lead with zero to get proper revers order in (find)
  //after 10 with padding will not gona works. 
  let nextNumber = "";
  if (user.length) {
    log.debug(func, 'user.username:', user[0].username);
    if (user[0].username.indexOf('#') > 0) {
      const tmp = user[0].username.split("#");
      log.debug(func, 'tmp:', tmp);
      nextNumber = (Number(tmp[1]) + 1).toString().padStart(4, '0');
      nextUserName = `${tmp[0]}#${nextNumber}`;
      nextEmail = `${nextNumber}#${email}`;
    } else {
      nextNumber = "1".padStart(4, '0');
      nextUserName = `${username}#${nextNumber}`;
      nextEmail = `${nextNumber}#${email}`;
    }
  } else {
    nextNumber = "1".padStart(4, '0');
    nextUserName = `${username}#${nextNumber}`;
    nextEmail = `${nextNumber}#${email}`;
  }
  const retVal = { username: nextUserName, email: nextEmail };
  log.debug(func, 'retVal:', retVal);
  return retVal;
}//getNextTestValue

/**
 * Execute authentication
 * @param {any} data:authUser
 * @param {any} client:Client
 * @returns {any}
 */
export async function getAuthToken(data: authUser, client: Client): Promise<string> {
  const func = await getFunc('getAuthToken', 'test-helper.ts');
  const authRes = await client
    .post(constants.A_AUTH_USER)
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);

  log.trace(func, 'authRes:', authRes);
  const authToken = authRes.body.message.token;
  log.debug(func, 'authToken:', authToken);
  return authToken;
}

/**
 * get any valid user from any room for test sendMessage
 * @returns {RoomUser}
 */
export async function getRoomUser(): Promise<RoomUser> {
  const func = await getFunc('getRoomUser', 'test-helper.ts');
  const roomUserRepository = new RoomUserRepository(new ColkieDataSource);

  const filter = {
    order: ['id DESC'],
    limit: 1
  };
  const retVal: any = await roomUserRepository.find(filter)
    .catch(error => {
      log.error(func, 'error(findOne):', error);
      throw new Error(error);
    });
  if (!retVal) {
    throw new Error(errors.ROOM_USER_NOT_EXISTS);
  }
  log.debug(func, 'retVal:', retVal);
  return retVal[0];
}//getRoomUser

/**
 * get any valid user from any room for test sendMessage
 * @returns {RoomUser}
 */
export async function getUserById(id: number): Promise<User> {
  const func = await getFunc('getUserById', 'test-helper.ts');
  const userRepository = new UserRepository(new ColkieDataSource);
  log.trace(func, 'id:', id);
  const filter = {
    where: {
      id: {
        eq: id
      }
    }
  }
  log.trace(func, 'filter:', filter);

  const retVal: any = await userRepository.findOne(filter)
    .catch(error => {
      log.error(func, 'error(findOne):', error);
      throw new Error(error);
    });
  if (!retVal) {
    throw new Error(errors.USER_NOT_EXISTS);
  }
  log.debug(func, 'retVal:', retVal);
  return retVal;
}//getUserById