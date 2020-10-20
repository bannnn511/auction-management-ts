import { Router } from 'express';
import {
  authentication,
  redisValidation,
  restrictedTo,
  UserType,
  validateBody,
} from '../../shared';
import {
  getAuctionsController,
  getBuyersInAuctionController,
  getAuctionsSortByBiddingCountController,
  getAuctionsWithHighestPriceController,
  getAuctionsSortByRemainingTimeController,
  getAuctionsSoldOnMarketOfASellerController,
  getAUserWinningAuctionsController,
  getAnAuctionByIdController,
  banUserFromAuctionController,
  getAuctionsOnMarketOfASellerController,
} from './auctionManagements.controller';
import { banUserFromAuctionSchema } from './auctionmanagments.schema';

const auctionRouter = Router();

auctionRouter.get('/', getAuctionsController);
auctionRouter.get('/history', getBuyersInAuctionController);
auctionRouter.get(
  '/highestbiddingcount',
  getAuctionsSortByBiddingCountController,
);
auctionRouter.get('/highestprice', getAuctionsWithHighestPriceController);
auctionRouter.get('/remainingtime', getAuctionsSortByRemainingTimeController);
auctionRouter.get(
  '/selling',
  authentication,
  redisValidation,
  restrictedTo(UserType.SELLER),
  getAuctionsOnMarketOfASellerController,
);
auctionRouter.get(
  '/sold',
  authentication,
  redisValidation,
  restrictedTo(UserType.SELLER),
  getAuctionsSoldOnMarketOfASellerController,
);
auctionRouter.get('/:id/buyers', getBuyersInAuctionController);
auctionRouter.get(
  '/bought-products',
  authentication,
  redisValidation,
  getAUserWinningAuctionsController,
);
auctionRouter.get('/:id', getAnAuctionByIdController);
auctionRouter.post(
  '/:id/ban',
  validateBody(banUserFromAuctionSchema),
  authentication,
  redisValidation,
  restrictedTo(UserType.SELLER),
  banUserFromAuctionController,
);

export { auctionRouter };
