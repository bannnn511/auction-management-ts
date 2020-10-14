import { Router } from 'express';
import { authRouter } from './authentication/authentication.router';

const apiRouter = Router();

// Log request
apiRouter.use('*', (req, res, next) => {
  console.log('📧 📧 📧', { 'Request body': req.body });
  next();
});

apiRouter.use('/auth', authRouter);

export { apiRouter };
