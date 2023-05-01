import {Entity, model, property} from '@loopback/repository';

/**
 * Room model
 *
 * @export
 * @class Room
 * @typedef {Room}
 * @extends {Entity}
 */
@model({
  name: 'room',
  settings: {strict: true, validateUpsert: true, plural: 'rooms', idInjection: true}
})
export class Room extends Entity {
  /**
   * Creates an instance of Room.
   *
   * @constructor
   * @param {?Partial<Room>} [data]
   */
  constructor(data?: Partial<Room>) {
    super(data);
  }

  /**
   * Autoincremented unique id column
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
   * Id of the room
   *
   * @type {number}
   */
  @property({
    type: 'number',
  })
  room: number;

  /**
   * user in the room
   *
   * @type {string}
   */
  @property({
    type: 'string',
  })
  username: string;

  /**
   * message by the user
   *
   * @type {string}
   */
  @property({
    type: 'string',
  })
  message: string;

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
 * @interface RoomRelations
 * @typedef {RoomRelations}
 */
export interface RoomRelations {
  // describe navigational properties here
}

/**
 * 
 *
 * @export
 * @typedef {RoomWithRelations}
 */
export type RoomWithRelations = Room & RoomRelations;
