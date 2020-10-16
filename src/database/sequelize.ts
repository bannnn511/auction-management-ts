import _ from 'lodash';
import { Sequelize } from 'sequelize-typescript';
import {
  AuctionHistories,
  AuctionManagements,
  AuctionParticipatings,
  Buyers,
  Categories,
  CategoriesManagements,
  Favorites,
  Notifications,
  OneSignal,
  Products,
  Ratings,
  Reminders,
} from './models';

require('dotenv').config();

function sequelizeInit(
  dbName: string,
  dbUserName: string,
  dbPassword: string,
): Sequelize {
  const sequelize = new Sequelize({
    database: dbName,
    dialect: 'mysql',
    username: dbUserName,
    password: dbPassword,
    storage: ':memory:',
    models: [
      Buyers,
      AuctionHistories,
      AuctionManagements,
      AuctionParticipatings,
      Categories,
      CategoriesManagements,
      Favorites,
      Notifications,
      OneSignal,
      Products,
      Ratings,
      Reminders,
    ],
  });
  console.log('Sequelize Initialized');
  return sequelize;
}

const dbName = _.toString(process.env.MYSQL_DB);
const dbUserName = _.toString(process.env.MYSQL_USERNAME);
const dbPassword = _.toString(process.env.MYSQL_PASSWORD);
const sequelize = sequelizeInit(dbName, dbUserName, dbPassword);

export { sequelize };
