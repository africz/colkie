/**
 * ColkieApplication
 * @version 1.0R
 * @copyright Attila Fricz.
 *
 */

import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {RestExplorerComponent} from '@loopback/rest-explorer';
import path from 'path';
//import {log} from './helpers/logger';
import {MySequence} from './sequence';
export {ApplicationConfig};

/**
 * Colkie sample application
 *
 * @export
 * @class ColkieApplication
 * @typedef {ColkieApplication}
 * @extends {BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
)}
 */
export class ColkieApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  /**
   *
   * @public
   * @type {number}
   */
  public delay = 0;
  /**
   * @param  {ApplicationConfig={}} options
   */
  constructor(options: ApplicationConfig = {}) {
    super(options);
    this.component(RestExplorerComponent);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));
    this.projectRoot = __dirname;


    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
