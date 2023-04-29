// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/example-lb3-application
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {ApplicationConfig} from '@loopback/core';
//import config from './config.json';
// const loopback = require('loopback');
// const compression = require('compression');
import cors from 'cors';
import {once} from 'events';
import express, {Request, Response} from 'express';
import path from 'path';
import {ColkieApplication} from './application';
import * as constants from './constants';
import {log} from './helpers/logger';

//must be const http = ... import default will get stuck without
//any warnings!
// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('http');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const https = require('https');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const helmet = require('helmet');

export {ApplicationConfig};
export class ExpressServer {
  private app: express.Application;
  public readonly lbApp: ColkieApplication;
  public server: any;
  public url: string;

  constructor(options: ApplicationConfig = {}) {
    //console.log('options',options);
    this.app = express();
    this.lbApp = new ColkieApplication(options);
    //console.log(this.lbApp.restServer.config);

    // // Middleware migrated from LoopBack 3
    // this.app.use(loopback.favicon());
    // this.app.use(compression());
    this.app.use(cors());
    this.app.use(
      helmet({
        contentSecurityPolicy: false,
      })
    );
    this.app.use((req, res, next) => {

      res.setHeader('Content-Security-Policy', 'nonce-rAnd0m');
   
      next();
    
    });
    
    const args = process.argv.slice(2);
    // Mount the LB4 REST API
    if (args[0] === 'logserver') {
      this.app.use(options.logserver.basePath, this.lbApp.requestHandler);
    } else {
      this.app.use(options.log.basePath, this.lbApp.requestHandler);
    }

    // Custom Express routes
    this.app.get('/ping', function (_req: Request, res: Response) {
      res.send('pong');
    });

    // Serve static files in the public folder
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  public async boot(): Promise<void> {
    await this.lbApp.boot();
  }

  public async start(): Promise<void> {
    const func = 'start(),server.ts@';
    const mod = constants.MODULE_CHAT;
    const mod2 = constants.MODULE_LOGIN;
    log.trace(func, mod, 'moduleTest:', 'chat test');
    log.trace(func, mod2, 'moduleTest:', 'login test');
    //console.log('lbApp.options', this.lbApp.options);
    await this.lbApp.start();
    let port = this.lbApp.options.log.port;
    let host: any = this.lbApp.options.log.host;
    let serverName = 'server';
    const args = process.argv.slice(2);

    //console.log(process.argv);
    //console.log(args[0]);

    if (args[0] === 'logserver') {
      port = this.lbApp.options.logserver.port;
      host = this.lbApp.options.logserver.host;
      serverName = 'logserver';
    }
    log.info(func, 'port:', port);
    log.info(func, 'host:', host);

    if (this.lbApp.options.rest.protocol === 'https') {
      const options = {
        key: this.lbApp.options.rest.key,
        cert: this.lbApp.options.rest.cert,
      };
      this.server = https.createServer(options, this.app);
      log.trace(func, 'https server created:', this.server);
    } else {
      this.server = http.createServer(this.lbApp.options.rest, this.app);
      log.trace(func, 'http server created:', this.server);
    }

    this.server.listen(port, host);
    const message = `${serverName} v${process.env.npm_package_version} is running at: ${this.lbApp.options.rest.protocol}://${host}:${port}`;
    console.log(message);
    // Here we send the ready signal to PM2
    if (typeof process.send === 'function') {
      process.send('ready');
    }
    log.info(func, message);
    return this.server;
  }

  public async stop(): Promise<void> {
    if (!this.server) return;
    await this.lbApp.stop();
    this.server.close();
    await once(this.server, 'close');
    this.server = undefined;
  }
}
