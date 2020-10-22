import expressLoader from './express';
import * as redisLoader from './redis';
import socketLoader from './socket';

// Need require to run script.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sequelize = require('../database/sequelize');

/**
 * Initialize Loader
 * Init Express.
 * Init Redis.
 * Init Socket.
 * Init Sequelize
 * Start cron jobs.
 *
 * @param {Express} app - Express app.
 * @param {Server} server - App server.
 */

export default async ({ app, server }: any) => {
  await expressLoader({ app });
  console.log('Express Initialized');

  // Redis
  redisLoader.init();

  // Socket
  const { io, activeAuctions } = socketLoader.init(server);
  console.log('Socket Initialized');
  app.set('socket', io);
  app.set('activeAuctions', activeAuctions);

  // Cron jobs
  // const cronJobs = new Cron(app);
  // cronJobs.start();
};
