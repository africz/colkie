/**
 * Main entry
 * @module index
 * version 0.0.1
 * @copyright Attila Fricz.
 */
import fs from 'fs-extra';
import config from './config.json';
import {log} from './helpers/logger';
import {ApplicationConfig, ExpressServer} from './server';

export * from './server';

export async function main(options: ApplicationConfig = {}): Promise<void> {
  const server = new ExpressServer(options);
  await server.boot();
  await server.start();
} //main
//==global
if (require.main === module) {
  // eslint-disable-next-line prefer-const
  let appConfig: any = config;
  (appConfig.rest['key'] = fs.readFileSync(config.rest.ssl_key)),
    (appConfig.rest['cert'] = fs.readFileSync(config.rest.ssl_cert)),
    // Run the application
    main(appConfig).catch(err => {
      console.error('Cannot start the application.', err);
      log.fatal("main(2),index.ts@", err);
      process.exit(1);
    });
}
