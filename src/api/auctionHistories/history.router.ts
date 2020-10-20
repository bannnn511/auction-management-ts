import { Router } from 'express';
import { getWinningHistoryFromAuctionController } from './history.controller';

const historiesRouter = Router();
historiesRouter.get('/', getWinningHistoryFromAuctionController);

export { historiesRouter };
