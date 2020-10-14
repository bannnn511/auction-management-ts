import { Server } from 'https';
import _ from 'lodash';
import expressLoader from './express';
import * as redisLoader from './redis';
import socketLoader from './socket';
import { sequelize } from '../database/sequelize';
/**
 * Initialize Loader
 * Init Express.
 * Init Redis.
 * Init Socket.
 * Init Sequelize
 * Start cron jobs.
 *
 * @param {*} app - Express app.
 * @param {*} server - App server.
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

  // sequelize
  const dbName = _.toString(process.env.MYSQL_DB);
  const dbUserName = _.toString(process.env.MYSQL_USERNAME);
  const dbPassword = _.toString(process.env.MYSQL_PASSWORD);
  await sequelize(dbName, dbUserName, dbPassword).sync({ force: true });
  console.log('Sequelize Initialized');

  // Cron jobs
  // const cronJobs = new Cron(app);
  // cronJobs.start();
}

export default async ({ app, server }: any) => {
  init(app, server);
};
