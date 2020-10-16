import _ from 'lodash';
import { Buyers } from '../../database/models';

export class BuyersObject extends Buyers {
  constructor(
    id?: string,
    email?: string,
    type?: string,
    status?: string,
    address?: string,
    fullname?: string,
    isSeller?: boolean,
    plusPoint?: number,
    minusPoint?: number,
    password?: string,
    createdBy?: string,
    updatedBy?: string,
    created_at?: Date,
    updated_at?: Date,
  ) {
    super();
    this.id = _.defaultTo(id, '');
    this.email = _.defaultTo(email, '');
    this.password = _.defaultTo(password, '');
    this.type = _.defaultTo(type, '');
    this.status = _.defaultTo(status, '');
    this.address = _.defaultTo(address, '');
    this.fullname = _.defaultTo(fullname, '');
    this.isSeller = _.defaultTo(isSeller, false);
    this.plusPoint = _.defaultTo(plusPoint, 0);
    this.minusPoint = _.defaultTo(minusPoint, 0);
    this.createdBy = _.defaultTo(createdBy, '');
    this.updatedBy = _.defaultTo(updatedBy, '');
    this.created_at = _.defaultTo(created_at, new Date(_.now()));
    this.updated_at = _.defaultTo(updated_at, new Date(_.now()));
  }
}
