import _ from 'lodash';
import { Buyers } from '../../database/models';

export function serializeUser(user: Buyers) {
  if (user) {
    return {
      id: _.get(user, 'id', ''),
      email: _.get(user, 'email', ''),
      fullname: _.get(user, 'fullname', ''),
      type: _.get(user, 'type', ''),
      status: _.get(user, 'status', ''),
      address: _.get(user, 'address', ''),
      isSeller: _.get(user, 'isSeller', ''),
      plusPoint: _.get(user, 'plusPoint', 1),
      minusPoint: _.get(user, 'minusPoint', 0),
    };
  }
  return null;
}
