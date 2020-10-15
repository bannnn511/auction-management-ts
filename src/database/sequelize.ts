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

const sequelize = (dbName: string, dbUserName: string, dbPassword: string) => {
  return new Sequelize({
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
};
export { sequelize };
