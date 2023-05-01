/**
 * Colkie component class
 * version 0.0.1
 * @copyright Attila Fricz.
 */

import { repository } from '@loopback/repository';
import config from '../config.json';
import { getDatabase } from '../helpers/getdatabase';
import { getFunc } from '../helpers/getfunc';
import { log } from '../helpers/logger';
import { UserRepository } from '../repositories';


/**
 * Success response on each calls
 *
 * @type {{ description: string; content: { 'application/json': { schema: { type: string; title: string; properties: { message: { type: string; }; }; }; }; }; }}
 */
export const ResponseSuccess = {
  description: 'Response success structure on each api calls',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'API response',
        properties: {
          message: { type: 'string' }
        },
      },
    },
  },
};
/**
 * Response error structure on each api calls',
 *
 * @type {{ description: string; content: { 'application/json': { schema: { type: string; title: string; properties: { message: { type: string; }; }; }; }; }; }}
 */
export const ResponseError = {
  description: 'Response error structure on each api calls',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'API response',
        properties: {
          message: { type: 'string' }
        },
      },
    },
  },
};

/**
 * Parent class of all controllers
 * @class
 */
export class ColkieController {
  /**
   * Hold file name for logger 
   * @protected
   * @type {string}
   */
  protected fileName: string;
  /**
   * 
   * @protected
   * @type {string}
   */
  protected dbName: string;
  /**
   * Hold usernames for logging purpose
   * empty in current project
   * @static
   * @type {Map<string, string>}
   */
  static userNames: Map<string, string>;
  /**
   * @date 5/1/2023 - 12:35:03 PM
   *
   * @protected
   * @type {UserRepository}
   */
  @repository(UserRepository)
  protected userRepository: UserRepository;
  /**
   * Log is possible  by modules for an example
   * one log for auth, another log for rooms etc
   * @protected
   * @type {*}
   */
  protected moduleLoggers: any;
  /**
   * @constructor
   */
  constructor() {
    if (!ColkieController.userNames) {
      ColkieController.userNames = new Map();
    }
    this.createModuleLogger();
    this.dbName = getDatabase('ColkieController');
  }

  /**
   * Get current function information for logging in sub class
   * @param  {string} func
   * @param  {string|null} caller?
   * @returns Promise<string>
   * @example
   *
   * Parameters
   * ----------
   *    "ba0a81c0-e8b8-11ec-aaf3-b3e22db0860f"
   *    "chargeStreamCommon(balance-success)(),transactionlog-test.ts@"
   *
   * Response Success
   * ----------------
   *    <mod><userName><func(<caller>),<fileName>@
   *    "findValidCustomer(),tools.controller.ts@"
   */
  async getFunc(
    func: string,
    caller?: string | null,
    mod?: string | null,
  ): Promise<string> {
    if (!mod) mod = '';
    const userName=''; //not using here yet 
    return await getFunc(func, this.fileName, caller, userName, mod);
  } //getFunc


  /**
   * Create seperate logger by modules if need
   * void
   * @returns Promise<void>
   */
  async createModuleLogger(): Promise<void> {
    const func = await this.getFunc('createModuleLogger');
    const args = process.argv.slice(2);
    //need only at logserver
    this.moduleLoggers = [];
    //log.trace(func, 'args', args);
    if (args === undefined) {
      return;
    }
    if (args[0] !== 'logserver') {
      //log.trace(func,"args[0]!==logserver, return");
      return;
    }
    const logOpts = config.streamlog;
    log.trace(func, 'logOpts:', logOpts);
    if (logOpts.module != undefined) {
      const modules = logOpts.module;
      log.trace(func, 'modules:', modules);
      for (let i = 0; i < modules.length; i++) {
        if (modules[i].status === 'on') {
          //console.log(modules[i]);
          //deep copy of the array from config.json
          // eslint-disable-next-line prefer-const
          let loggerOpts = JSON.parse(JSON.stringify(logOpts));
          loggerOpts.fileNamePattern =
            modules[i].name + '-' + loggerOpts.fileNamePattern;
          log.trace(func, 'loggerOpts:', loggerOpts);
          //create a new logger for the active module
          const logger =
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require('simple-node-logger').createRollingFileLogger(loggerOpts);
          this.moduleLoggers[this.moduleLoggers.length] = [
            modules[i].name,
            logger,
          ];
        }
      }
      log.trace(func, 'this.moduleLoggers:', this.moduleLoggers);
    }
  }
} //ColkieController
