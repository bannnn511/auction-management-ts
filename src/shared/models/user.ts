import _ from 'lodash';
import { Buyers } from '../../database/models';

export class BuyersObject extends Buyers {
  constructor(
    email?: string,
    type?: string,
    status?: string,
    address?: string,
    fullname?: string,
    isSeller?: boolean,
    plusPoint?: number,
    minusPoint?: number,
    password?: string,
  ) {
    super();
    this.email = _.defaultTo(email, '');
    this.password = _.defaultTo(password, '');
    this.type = _.defaultTo(type, '');
    this.status = _.defaultTo(status, '');
    this.address = _.defaultTo(address, '');
    this.fullname = _.defaultTo(fullname, '');
    this.isSeller = _.defaultTo(isSeller, false);
    this.plusPoint = _.defaultTo(plusPoint, 0);
    this.minusPoint = _.defaultTo(minusPoint, 0);
  }
}
