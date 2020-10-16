import { Router } from 'express';
import { getWinningHistoryFromAuction } from './history.controller';

const historiesRouter = Router();
historiesRouter.get('/', getWinningHistoryFromAuction);

export { historiesRouter };
