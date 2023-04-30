import { ColkieApplication } from '../../application';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';

import { UserRepository } from '../../repositories/user.repository';
import { ColkieDataSource } from '../../datasources';
import { log } from '../../helpers/logger';
import { getFunc } from '../../helpers/getfunc';
import { getNextTestValue, authUser } from '../../interfaces';
import * as constants from '../../constants';



/**
 * Setup a test application
 * @date 4/30/2023 - 4:58:04 PM
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
 * @date 4/30/2023 - 4:58:04 PM
 *
 * @export
 * @async
 * @param {getNextTestValue} data
 * @returns {Promise<getNextTestValue>}
 */
export async function getNextTestValue(data: getNextTestValue): Promise<getNextTestValue> {
  const func = await getFunc('getNextTestValue', 'test-helper.ts');
  const { username, email } = data;
  log.debug(func, 'data:', data);
  // like: 'africz#%'
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