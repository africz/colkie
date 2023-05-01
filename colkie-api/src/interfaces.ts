/**
 * Interface Definitions
 * @module Interfaces
 * version 0.0.1
 * @copyright Attila Fricz.
 */


export interface createUser {
  authname: string;
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
export interface validateTokenParams {
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

export interface getNextTestValue {
  username: string;
  email: string;
}

export interface sendMessage {
  room: number;
  username: string;
  message: string;
  token: string;
}
export interface getMessages {
  authname:string;
  username?: string;
  room?: number;
  start:number;
  limit: number;
  token: string;
}

export interface addUser {
  username: string;
  room: number;
  token: string;
}
