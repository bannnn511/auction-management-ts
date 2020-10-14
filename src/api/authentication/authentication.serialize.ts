import _ from 'lodash';
import { User } from '../../shared/models/user';

export function serializeUser(user: User) {
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
