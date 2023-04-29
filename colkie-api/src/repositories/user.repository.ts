/**
 * User repository
 * version 0.0.1
 * @copyright Attila Fricz.
 */

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ColkieDataSource} from '../datasources';
import {User, UserRelations} from '../models';
export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(@inject('datasources.Colkie') dataSource: ColkieDataSource) {
    super(User, dataSource);
  }
}
