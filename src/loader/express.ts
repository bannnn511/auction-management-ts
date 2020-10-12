import helmet from 'helmet';
import cors from 'cors';
import { json } from 'body-parser';
import logger from 'morgan';

// import { errorHandler } from '../shared/middleware/error-handler';
// import { apiRouter } from '../api';

export default async ({ app }: any) => {
  const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    exposedHeaders: ['X-Total-Count'],
  };
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(logger('dev'));
  app.use(json());
  // app.use('/api', apiRouter);

  // Error handling middleware, we delegate the handling to the centralized error handler
  // app.use(errorHandler);
};
