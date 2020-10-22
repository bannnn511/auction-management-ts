import { Request } from 'express';
import _ from 'lodash';
import { AppError } from '../../../shared/utils';
import {
  addOneSignalPlayerId,
  getOneSignalPlayerIdsOfAUser,
} from '../database';

/**
 * Check if playerId is already in db.
 *
 * @param {string} playerId - OneSignal playerId
 * @param {string} userId - user Id
 * @return {Promise<boolean>}
 */
async function checkOneSignalId(playerId: string, userId: string) {
  if (_.indexOf(await getOneSignalPlayerIdsOfAUser(userId), playerId)) {
    return true;
  }
  return false;
}

/**
 * Business for adding new onesignal playerId.
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function addOneSignalPlayerIdBusiness(req: Request) {
  const userId = _.get(req, 'currentUser.id');
  const { playerId } = req.body;

  if (await checkOneSignalId(playerId, userId)) {
    return 'OneSignal playerId already exists';
  }

  const data = await addOneSignalPlayerId(userId, playerId);
  if (!data) {
    throw new AppError('Cannot add user onesignal playerId', 500, true);
  }
  return 'OneSignal playerId sent successfully';
}
