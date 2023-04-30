/**
 * Room repository
 * version 0.0.1
 * @copyright Attila Fricz.
 */

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ColkieDataSource} from '../datasources';
import {Room, RoomRelations} from '../models';
export class RoomRepository extends DefaultCrudRepository<
  Room,
  typeof Room.prototype.id,
  RoomRelations
> {
  constructor(@inject('datasources.Colkie') dataSource: ColkieDataSource) {
    super(Room, dataSource);
  }
}
