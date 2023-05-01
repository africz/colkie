import config from '../config.json';
import {getFunc} from './getfunc';
import {log} from './logger';
/**
 * Swich the database to testdatabase if defined in config for unit tests
 * to not pollute the real one with test data.
 * Usuall this is happen only at end of development cycle in beta stage. 
 * @param  {string} func
 * @param  {string} fileName
 * @param  {string|null} caller?
 */
export function getDatabase(caller: string): string {
  const func = getFunc('getDatabase', 'getdatabase', caller);

  const myArgs = process.argv.slice(2);
  log.trace(func, 'myArgs:', myArgs);
  let retVal = config.db.database;
  //if test running switch the database here to avoid pollution
  // of production database
  //-t in Visual Studio Code other in command line
  const test = process.env['TEST'];
  if (test && test === 'true') {
    retVal = config.db.testdatabase;
  } else if (
    myArgs[3] === '-t' ||
    myArgs[0] === 'dist/__tests__' ||
    myArgs[0] === 'test'
  ) {
    retVal = config.db.testdatabase;
  }
  log.trace(func, 'selected database:', retVal);
  return retVal;
}//getDatabase
