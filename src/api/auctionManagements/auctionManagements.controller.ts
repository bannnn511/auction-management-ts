import { Request, Response } from 'express';
import { responseSuccess } from '../../shared/helpers';
import { serializeUser } from '../authentication/authentication.serialize';
import {
  serializeAllAuctions,
  serializeAllBuyerInAuction,
  serializeAuction,
  serializeAuctionFromRawQuery,
  serializeFullAuctionJoinProduct,
} from './auctionManagements.serialize';
import {
  banUserFromAuctionBusiness,
  getAllAuctionsBusiness,
  getAuctionByIdBusiness,
  getAuctionsOnMarketOfASellerBusiness,
  getAuctionsSoldOnMarketOfASellerBusiness,
  getAUserWinningAuctionBusiness,
  getListAuctionSortByBiddingCountBusiness,
  getListAuctionsWithHighestPriceBusiness,
  getListBuyersInAuctionBusiness,
} from './business';
import { getListAuctionsSortByRemainTimeBusiness } from './business/getListAuctionsSortByRemainingTimeBusiness';

/**
 * Controller for getting auctions with params.
 *
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function getAuctionsController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await getAllAuctionsBusiness(req);
    const auctionData = serializeAuction(data);
    responseSuccess(res, auctionData);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for getting an auction by its id.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function getAnAuctionByIdController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await getAuctionByIdBusiness(req);
    const auctionData = serializeFullAuctionJoinProduct(data);
    responseSuccess(res, auctionData);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for getting auctions sort by product highest price.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function getAuctionsWithHighestPriceController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await getListAuctionsWithHighestPriceBusiness(req);
    const auctionData = serializeAllAuctions(data);
    responseSuccess(res, auctionData);
  } catch (error) {
    next(error);
  }
}
/**
 * Controller for getting auctions sort by highest bidding count.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function getAuctionsSortByBiddingCountController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await getListAuctionSortByBiddingCountBusiness(req);
    const serializedData = serializeAuctionFromRawQuery(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for getting buyers who have participated in an auction.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function getBuyersInAuctionController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await getListBuyersInAuctionBusiness(req);
    const serializedData = serializeAllBuyerInAuction(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for getting auctions sort by remaining end time.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function getAuctionsSortByRemainingTimeController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await getListAuctionsSortByRemainTimeBusiness(req);
    const serializedAuction = serializeAllAuctions(data);
    responseSuccess(res, serializedAuction);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for getting auctions that a user have won.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function getAUserWinningAuctionsController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await getAUserWinningAuctionBusiness(req);
    const serializedData = serializeAuction(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for getting auctions on market of a seller.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function getAuctionsOnMarketOfASellerController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await getAuctionsOnMarketOfASellerBusiness(req);
    const serializedData = serializeAllAuctions(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for getting auction that has been sold by a seller.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function getAuctionsSoldOnMarketOfASellerController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await getAuctionsSoldOnMarketOfASellerBusiness(req);
    const serializedData = serializeAllAuctions(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for sellers to ban a user from their auctions.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export async function banUserFromAuctionController(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await banUserFromAuctionBusiness(req);
    const serializedData = serializeUser(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}
