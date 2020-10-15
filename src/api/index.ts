import { Router } from 'express';
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
export { apiRouter };
