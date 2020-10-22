import { OneSignal } from '../../../database/models';

/**
 * Query for getting onesignal player Id of a user.
 *
 * @export
 * @param {string} userId
 * @return {Promise<string[]>}
 */
export async function getOneSignalPlayerIdsOfAUser(userId: string) {
  const data = await OneSignal.findAll({ where: { userId }, raw: true });
  const playerIds: string[] = [];
  data.forEach((player) => {
    playerIds.push(player.playerId);
  });
  return playerIds;
}
