
/**
 * RoomUser repository
 * version 0.0.1
 * @copyright Attila Fricz.
 */

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ColkieDataSource} from '../datasources';
import {RoomUser, RoomUserRelations} from '../models';
/**
 * RoomUser repository
 *
 * @export
 * @class RoomUserRepository
 * @typedef {RoomUserRepository}
 * @extends {DefaultCrudRepository<RoomUser, typeof RoomUser.prototype.id, RoomUserRelations>}
 */
export class RoomUserRepository extends DefaultCrudRepository<
  RoomUser,
  typeof RoomUser.prototype.id,
  RoomUserRelations
> {
  /**
   *
   * @constructor
   * @param {ColkieDataSource} dataSource
   */
  constructor(@inject('datasources.Colkie') dataSource: ColkieDataSource) {
    super(RoomUser, dataSource);
  }
}
