/**
 * Interface Definitions
 * @module Interfaces
 * version 0.0.1
 * @copyright Attila Fricz.
 */


export interface createUser {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  token: string;
}
export interface authUser {
  username: string;
  password: string;
}

export interface token {
  username: string;
  email: string;
  expireTime: number;
}
export interface validateToken {
  username: string;
  token: string;
}

export interface validateString {
  length: number;
  empty?: boolean;
  null?: boolean;
  symbol?: boolean;
  number?: boolean;
  char?: boolean;
}

