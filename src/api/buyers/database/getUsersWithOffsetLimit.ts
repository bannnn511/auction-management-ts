import { Op } from 'sequelize';
import { UserStatus, UserType } from '../../../shared/helpers/constant';
import { pagination } from '../../../shared/helpers';
import { Buyers } from '../../../database/models';

export function getBuyers(page: number, pagesize: number) {
  const { offset, limit } = pagination(page, pagesize);

  return Buyers.findAll({
    where: {
      status: UserStatus.ACTIVE,
      type: {
        [Op.not]: UserType.ADMIN,
      },
    },
    offset,
    limit,
  });
}
