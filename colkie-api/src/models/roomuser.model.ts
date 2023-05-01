import {Entity, model, property} from '@loopback/repository';

/**
 * Keep the current logged in users by rooms
 * Send a message only possible if the table hold 
 * the user in a room.
 *
 * @export
 * @class RoomUser
 * @typedef {RoomUser}
 * @extends {Entity}
 */
@model({
  name: 'roomuser',
  settings: {strict: true, validateUpsert: true, plural: 'roomusers', idInjection: true}
})
export class RoomUser extends Entity {
  /**
   *
   * @constructor
   * @param {?Partial<RoomUser>} [data]
   */
  constructor(data?: Partial<RoomUser>) {
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
   * Room id
   *
   * @type {number}
   */
  @property({
    type: 'number',
  })
  roomid: number;
  /**
   * User id
   *
   * @type {number}
   */
  @property({
    type: 'number',
  })
  userid: number;

  /**
   * Automated timestamp on the record by the database server
   *
   * @type {number}
   */
  @property({
    type: 'number',
  })
  timestamp: number;

  }

/**
 *
 * @export
 * @interface RoomUserRelations
 * @typedef {RoomUserRelations}
 */
export interface RoomUserRelations {
  // describe navigational properties here
}

/**
 *
 * @export
 * @typedef {RoomUserWithRelations}
 */
export type RoomUserWithRelations = RoomUser & RoomUserRelations;
