import { Sequelize } from 'sequelize-typescript';

const dbName = process.env.MYSQL_DB;
const dbUserName = process.env.MYSQL_USERNAME;
const dbPassword = process.env.MYSQL_PASSWORD;

export const sequelize = new Sequelize({
  database: dbName,
  dialect: 'mysql',
  username: dbUserName,
  password: dbPassword,
  storage: ':memory:',
  models: [__dirname],
});
