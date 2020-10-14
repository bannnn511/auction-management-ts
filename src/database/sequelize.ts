import { Sequelize } from 'sequelize-typescript';

const sequelize = (dbName: string, dbUserName: string, dbPassword: string) => {
  return new Sequelize({
    database: dbName,
    dialect: 'mysql',
    username: dbUserName,
    password: dbPassword,
    storage: ':memory:',
    models: [`${__dirname}./models`],
  });
};

export { sequelize };
