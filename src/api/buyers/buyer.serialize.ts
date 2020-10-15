import _ from 'lodash';
import { BuyersObject } from '../../shared/models/user';
import { UserStatus, UserType } from '../../shared/helpers/constant';
import { safeParseInt } from '../../shared/helpers';
import { Buyers } from '../../database/models';

export function serializeBuyers(
  buyer: Buyers,
  showPassword?: boolean,
): BuyersObject {
  const data = new BuyersObject(
    _.get(buyer, 'email', ''),
    _.get(buyer, 'type', UserType.BUYER),
    _.get(buyer, 'status', UserStatus.ACTIVE),
    _.get(buyer, 'address', ''),
    _.get(buyer, 'fullname', ''),
    _.get(buyer, 'isSeller', false),
    safeParseInt(buyer.plusPoint, 0),
    safeParseInt(buyer.minusPoint, 0),
  );
  if (showPassword) {
    data.password = _.get(buyer, 'password');
  }
  return data;
}

export function serializeAllBuyers(buyers: BuyersObject[]) {
  if (buyers) {
    const data: Buyers[] = [];
    buyers.forEach((buyer: Buyers) => {
      data.push(serializeBuyers(buyer));
    });
    return data;
  }
  return null;
}
