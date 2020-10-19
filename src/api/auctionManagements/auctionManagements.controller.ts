import { Request, Response } from 'express';
import { responseSuccess } from '../../shared/helpers';
import { serializeUser } from '../authentication/authentication.serialize';
import {
  serializeAllAuctions,
  serializeAllBuyerInAuction,
  serializeAuction,
  serializeAuctionSortByBiddingCount,
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

export async function getListAuction(req: Request, res: Response, next: any) {
  try {
    const data = await getAllAuctionsBusiness(req);
    const auctionData = serializeAuction(data);
    responseSuccess(res, auctionData);
  } catch (error) {
    next(error);
  }
}

export async function getAnAuctionById(req: Request, res: Response, next: any) {
  try {
    const data = await getAuctionByIdBusiness(req);
    const auctionData = serializeAuction(data);
    responseSuccess(res, auctionData);
  } catch (error) {
    next(error);
  }
}

export async function getListAuctionWithHighestPrice(
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
export async function getListAuctionSortByBiddingCount(
  req: Request,
  res: Response,
  next: any,
) {
  try {
    const data = await getListAuctionSortByBiddingCountBusiness(req);
    const serializedData = serializeAuctionSortByBiddingCount(data);
    responseSuccess(res, serializedData);
  } catch (error) {
    next(error);
  }
}

// get list buyer in auction
export async function getListBuyerInAuction(
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

export async function getListAuctionsSortByRemainingTime(
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

export async function getAUserWinningAuction(
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

export async function getAuctionOnMarketOfASeller(
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

export async function getAuctionSoldOnMarketOfASeller(
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

export async function banUserFromAuction(
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
