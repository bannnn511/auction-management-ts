import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { Sequelize, Model, DataTypes } from 'sequelize';

const basename = path.basename(__filename);
const db: any = {};

const dbName = _.toString(process.env.MYSQL_DB);
const dbUserName = _.toString(process.env.MYSQL_USERNAME);
const dbPassword = _.toString(process.env.MYSQL_PASSWORD);

const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch((err: Error) => {
    console.log('Unable to connect to database', err);
  });

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
