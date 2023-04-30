import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'roomuser',
  settings: {strict: true, validateUpsert: true, plural: 'roomusers', idInjection: true}
})
export class RoomUser extends Entity {
  constructor(data?: Partial<RoomUser>) {
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
  roomid: number;
  @property({
    type: 'number',
  })
  userid: number;

  @property({
    type: 'number',
  })
  timestamp: number;

  }

export interface RoomUserRelations {
  // describe navigational properties here
}

export type RoomUserWithRelations = RoomUser & RoomUserRelations;
