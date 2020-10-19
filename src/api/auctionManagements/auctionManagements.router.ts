import { Router } from 'express';
import {
  authentication,
  redisValidation,
  restrictedTo,
  UserType,
  validateBody,
} from '../../shared';
import {
  getListAuction,
  getListBuyerInAuction,
  getListAuctionSortByBiddingCount,
  getListAuctionWithHighestPrice,
  getListAuctionsSortByRemainingTime,
  getAuctionSoldOnMarketOfASeller,
  getAUserWinningAuction,
  getAnAuctionById,
  banUserFromAuction,
  getAuctionOnMarketOfASeller,
} from './auctionManagements.controller';
import { banUserFromAuctionSchema } from './auctionmanagments.schema';

const auctionRouter = Router();

auctionRouter.get('/', getListAuction);
auctionRouter.get('/history', getListBuyerInAuction);
auctionRouter.get('/highestbiddingcount', getListAuctionSortByBiddingCount);
auctionRouter.get('/highestprice', getListAuctionWithHighestPrice);
auctionRouter.get('/remainingtime', getListAuctionsSortByRemainingTime);
auctionRouter.get(
  '/selling',
  authentication,
  redisValidation,
  restrictedTo(UserType.SELLER),
  getAuctionOnMarketOfASeller,
);
auctionRouter.get(
  '/sold',
  authentication,
  redisValidation,
  restrictedTo(UserType.SELLER),
  getAuctionSoldOnMarketOfASeller,
);
auctionRouter.get('/:id/buyers', getListBuyerInAuction);

/*
 * Get User winning auction products
 */
auctionRouter.get(
  '/bought-products',
  authentication,
  redisValidation,
  getAUserWinningAuction,
);
auctionRouter.get('/:id', getAnAuctionById);
auctionRouter.post(
  '/:id/ban',
  validateBody(banUserFromAuctionSchema),
  authentication,
  redisValidation,
  restrictedTo(UserType.SELLER),
  banUserFromAuction,
);

export { auctionRouter };
