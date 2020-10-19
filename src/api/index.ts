import { Router } from 'express';
import { historiesRouter } from './auctionHistories/history.router';
import { auctionRouter } from './auctionManagements/auctionManagements.router';
import { authRouter } from './authentication/authentication.router';
import { userRouter } from './buyers/buyer.router';

const apiRouter = Router();

// Log request
apiRouter.use('*', (req, res, next) => {
  console.log('📧 📧 📧', { 'Request body': req.body });
  next();
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/buyers', userRouter);
apiRouter.use('/histories', historiesRouter);
apiRouter.use('/auctions', auctionRouter);

export { apiRouter };
