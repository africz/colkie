import { ColkieApplication } from '../../application';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
  inject,
} from '@loopback/testlab';

import { UserRepository } from '../../repositories/user.repository';
import { ColkieDataSource } from '../../datasources';
import { log } from '../../helpers/logger';
import { getFunc } from '../../helpers/getfunc';
import { getNextTestValue } from '../../interfaces';



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
  if (user.length) {
    log.debug(func, 'user.username:', user[0].username);
    if (user[0].username.indexOf('#') > 0) {
      const tmp = user[0].username.split("#");
      log.debug(func, 'tmp:', tmp);
      nextUserName = `${tmp[0]}#${(Number(tmp[1]) + 1)}`;
      nextEmail = `${Number(tmp[1])+ 1}#${email}`;
    } else {
      nextUserName = `${username}#1`;
      nextEmail = `1#${email}`;
    }
  } else {
    nextUserName = `${username}#1`;
    nextEmail = `1#${email}`;
  }
  const retVal = { username: nextUserName, email: nextEmail };
  log.debug(func, 'retVal:', retVal);
  return retVal;
}//getNextTestValue