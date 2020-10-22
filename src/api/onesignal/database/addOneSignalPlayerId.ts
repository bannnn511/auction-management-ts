import { OneSignal } from '../../../database/models/onesignal';

/**
 * Query for adding new onesignal playerId.
 *
 * @export
 * @param {string} userId - user id.
 * @param {string} playerId - onesignal playerId.
 * @return {*}
 */
export async function addOneSignalPlayerId(userId: string, playerId: string) {
  return OneSignal.create({
    userId,
    playerId,
  });
}
