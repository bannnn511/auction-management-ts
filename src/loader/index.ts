import { Server } from 'https';
import expressLoader from './express';
import * as redisLoader from './redis';
import socketLoader from './socket';

/**
 * Initialize Loader
 * Init express.
 * Init Redis.
 * Init Socket.
 * Start cron jobs.
 *
 * @param {*} app - Express app.
 * @param {*} server - App server.
 */
async function init(app: any, server: Server) {
  // Express
  await expressLoader({ app });
  console.log('Express Initalized');

  // Redis
  redisLoader.init();
  console.log('Redis Initalized');

  // Socket
  const { io, activeAuctions } = socketLoader.init(server);
  console.log('Socket Initalized');
  app.set('socket', io);
  app.set('activeAuctions', activeAuctions);

  // Cron jobs
  // const cronJobs = new Cron(app);
  // cronJobs.start();
}

export default async ({ app, server }: any) => {
  init(app, server);
};
