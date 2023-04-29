/*
npm install --save-dev source-map-support
tsconfig.json
"compilerOptions": {
  "outDir": "dist",
  "rootDir": "src",
  "sourceMap": true
},
*/
import 'source-map-support/register';
require("json-circular-stringify");
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * logger function
 * @module logger
 * version 0.0.1
 * @copyright Attila Fricz.
 */
/**
 * create global logger
 * create a rolling file logger based on date/time that fires process events
 * @name log
 * @see  {@link https://www.npmjs.com/package/simple-node-logger simple-node-logger}
 */
import config from '../config.json';

const args = process.argv.slice(2);
const logOpts = config.log;
const logServerOpts = config.logserver;
//console.log(process.argv);
//console.log(args[0]);
export let log = require('simple-node-logger').createRollingFileLogger(logOpts);
const moduleLoggers: any = [];

if (args[0] === 'logserver') {
  log = require('simple-node-logger').createRollingFileLogger(logServerOpts);
} else {
  //need only on normal log

  if (logOpts.module != undefined) {
    const modules = logOpts.module;
    for (let i = 0; i < modules.length; i++) {
      if (modules[i].status === 'on') {
        //console.log(modules[i]);
        //deep copy of the array from config.json
        const loggerOpts = JSON.parse(JSON.stringify(logOpts));
        loggerOpts.fileNamePattern =
          modules[i].name + '-' + loggerOpts.fileNamePattern;
        //create a new logger for the active module
        const logger =
          require('simple-node-logger').createRollingFileLogger(loggerOpts);
        moduleLoggers[moduleLoggers.length] = [modules[i].name, logger];
      }
    }
  }

}
export const streamlog = require('simple-node-logger').createRollingFileLogger(
  config.streamlog,
);


function addLineNum(level: string, args: any) {
  const newErr: Error = new Error('xx');
  const stack = newErr.stack;
  let stackArray: any = [];
  if (stack) {
    stackArray = stack.split('at ');
    const logLineDetails = stackArray[3].trim();
    const tmp = logLineDetails.split(':');
    const lineNum = tmp[1];
    args.splice(1, 0, `${lineNum},`);
  }
  let i = 0;
  while (i < args.length) {
    if (args[i] === Object(args[i])) {
      args[i] = JSON.stringify(args[i], null, '\t');
    }
    i++;
  }

  let moduleWritten = false;
  if (args[0] !== 'logserver') {
    i = 0;

    //if module parameter match with an active module write it there
    while (i < moduleLoggers.length) {
      if (moduleLoggers[i][0] === args[2]) {
        args.splice(3, 0, ',');
        moduleLoggers[i][1].log(level, args);
        moduleWritten = true;
        break;
      }
      i++;
    }
  }//addLineNum
  // //write everything to the main node file
  if (!moduleWritten) {
    log.log(level, args);
  }

  if (level === 'fatal') {
  }
}

log.fatal = function () {
  // eslint-disable-next-line prefer-rest-params
  const args = Array.prototype.slice.call(arguments);
  addLineNum('fatal', args);
};

log.error = function () {
  // eslint-disable-next-line prefer-rest-params
  const args = Array.prototype.slice.call(arguments);
  addLineNum('error', args);
};

log.trace = function () {
  // eslint-disable-next-line prefer-rest-params
  const args = Array.prototype.slice.call(arguments);
  addLineNum('warn', args);
};

log.info = function () {
  // eslint-disable-next-line prefer-rest-params
  const args = Array.prototype.slice.call(arguments);
  addLineNum('info', args);
};

log.debug = function () {
  // eslint-disable-next-line prefer-rest-params
  const args = Array.prototype.slice.call(arguments);
  addLineNum('debug', args);
};
log.trace = function () {
  // eslint-disable-next-line prefer-rest-params
  const args = Array.prototype.slice.call(arguments);
  addLineNum('trace', args);
};
