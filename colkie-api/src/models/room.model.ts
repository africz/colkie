import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'room',
  settings: {strict: true, validateUpsert: true, plural: 'rooms', idInjection: true}
})
export class Room extends Entity {
  constructor(data?: Partial<Room>) {
    super(data);
  }

  @property({
    type: 'number',
    id: true,
    generated: true,
    updateOnly: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  room: number;

  @property({
    type: 'string',
  })
  username: string;

  @property({
    type: 'string',
  })
  message: string;

  @property({
    type: 'number',
  })
  timestamp: number;

  }

export interface RoomRelations {
  // describe navigational properties here
}

export type RoomWithRelations = Room & RoomRelations;
