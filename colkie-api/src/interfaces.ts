/**
 * Interface Definitions
 * @module Interfaces
 * version 0.0.1
 * @copyright Attila Fricz.
 */

import {JSONObject} from '@loopback/core';

export interface retValJSON {
  response: string;
  message: any;
}

export interface createUser {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
}
export interface token {
  username: string;
  email: string;
  expireTime:number;
}