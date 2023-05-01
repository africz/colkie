import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
import configJSON from '../config.json';
import { getDatabase } from '../helpers/getdatabase';
import { getFunc } from '../helpers/getfunc';
import { log } from '../helpers/logger';

/**
 * Config object for database connection
 *
 * @type {{ url: any; host: any; port: any; user: any; password: any; connector: any; name: any; database: any; }}
 */
const config = {
  url: configJSON.db.url,
  host: configJSON.db.host,
  port: configJSON.db.port,
  user: configJSON.db.user,
  password: configJSON.db.password,
  connector: configJSON.db.connector,
  name: configJSON.db.connector,
  database: getDatabase('colkie.datasource.ts'),
};

/**
 * Just for debugging purpose, print out current config in debug.log
 * @type {*}
 */
const func = getFunc('colkie.datasource', 'config');
log.debug(func, 'config:', config);

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html

/**
 *
 * @export
 * @class ColkieDataSource
 * @typedef {ColkieDataSource}
 * @extends {juggler.DataSource}
 * @implements {LifeCycleObserver}
 */
@lifeCycleObserver('datasource')
export class ColkieDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  /**
   * 
   * @static
   * @type {string}
   */
  static dataSourceName = 'Colkie';
  /**
   * @static
   * @readonly
   * @type {{ url: any; host: any; port: any; user: any; password: any; connector: any; name: any; database: any; }}
   */
  static readonly defaultConfig = config;

  /**
   * @constructor
   * @param {*} [dsConfig=config]
   */
  constructor(
    @inject('datasources.config.Colkie', { optional: true })
    dsConfig: any = config,
  ) {
    log.trace('constructor,colkie.datasource.ts@', 'config:', config);
    super(dsConfig);
  }
}//ColkieDataSource
