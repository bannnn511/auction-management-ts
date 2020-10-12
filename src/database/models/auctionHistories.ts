import { Model, Association, DataTypes, Sequelize } from 'sequelize';
import db from './index';

class AuctionHistories extends Model {
  public id!: string;
  public userId!: string;
  public auctionid!: string;
  public price!: string;
  public createdBy!: string;
  public updatedBy!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AuctionHistories.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      field: 'id',
    },
    userId: {
      type: DataTypes.UUID,
      field: 'user_id',
    },
    auctionId: {
      type: DataTypes.UUID,
      field: 'auction_id',
    },
    price: {
      type: DataTypes.FLOAT,
      field: 'price',
    },
    createdBy: {
      type: DataTypes.UUID,
      field: 'created_by',
    },
    updatedBy: {
      type: DataTypes.UUID,
      field: 'updated_by',
    },
  },
  {
    sequelize: db.sequelize,
    tableName: 'auction_histories',
    timestamps: true,
  },
);
