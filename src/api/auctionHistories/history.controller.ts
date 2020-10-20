import { Request, Response } from 'express';
import { serializeAuctionHistory } from './history.serialize';
import { responseSuccess } from '../../shared';
import { getWinningHistoryFromAuctionBusiness } from './business/getWinningHistoryFromAuctionBusiness';

/**
 * Controller for getting highest bidding price of an auction.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function getWinningHistoryFromAuctionController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const history = await getWinningHistoryFromAuctionBusiness(req);
    const serializedHistory = serializeAuctionHistory(history);
    responseSuccess(res, serializedHistory);
  } catch (error) {
    next(error);
  }
}
