import {Entity, model, property} from '@loopback/repository';

/**
 * Description placeholder
 *
 * @export
 * @class User
 * @typedef {User}
 * @extends {Entity}
 */
@model({
  name: 'user',
  settings: {strict: true, validateUpsert: true, plural: 'users', idInjection: true}
})
export class User extends Entity {
  /**
   * Creates an instance of User.
   *
   * @constructor
   * @param {?Partial<User>} [data]
   */
  constructor(data?: Partial<User>) {
    super(data);
  }

  /**
   * Autoincremented unique record id
   *
   * @type {?number}
   */
  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  id?: number;

  /**
   * Username
   *
   * @type {string}
   */
  @property({
    type: 'string',
    required: true,
    index: {unique: true},
  })
  username: string;

  /**
   * Email
   *
   * @type {string}
   */
  @property({
    type: 'string',
  })
  email: string;

  /**
   * Password
   *
   * @type {string}
   */
  @property({
    type: 'string',
  })
  password: string;

  /**
   * First name
   *
   * @type {string}
   */
  @property({
    type: 'string',
  })
  firstname: string;

  /**
   * Last name
   *
   * @type {string}
   */
  @property({
    type: 'string',
  })
  lastname: string;

  /**
   * JWT webtoken for authorization
   *
   * @type {string}
   */
  @property({
    type: 'string',
  })
  token: string;

  }

/**
 *
 * @export
 * @interface UserRelations
 * @typedef {UserRelations}
 */
export interface UserRelations {
  // describe navigational properties here
}

/**
 *
 * @export
 * @typedef {UserWithRelations}
 */
export type UserWithRelations = User & UserRelations;
