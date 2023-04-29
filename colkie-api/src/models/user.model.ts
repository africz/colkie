import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'user',
  settings: {strict: true, validateUpsert: true, plural: 'users', idInjection: true}
})
export class User extends Entity {
  constructor(data?: Partial<User>) {
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
    type: 'string',
    required: true,
    index: {unique: true},
  })
  username: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'string',
  })
  firstname?: string;

  @property({
    type: 'string',
  })
  lastname?: string;

}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
