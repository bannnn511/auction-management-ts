import { Server } from 'https';
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
async function init(app: any, server: Server) {
  // Express
  await expressLoader({ app });
  console.log('Express Initialized');

  // Redis
  redisLoader.init();
  console.log('Redis Initialized');

  // Socket
  const { io, activeAuctions } = socketLoader.init(server);
  console.log('Socket Initialized');
  app.set('socket', io);
  app.set('activeAuctions', activeAuctions);

  // Cron jobs
  // const cronJobs = new Cron(app);
  // cronJobs.start();
}

export default async ({ app, server }: any) => {
  init(app, server);
};
