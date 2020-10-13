import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  IsUUID,
  DataType,
  Unique,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'products',
})
export default class Products extends Model<Products> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @Column
  productName!: string;

  @Column
  imgURL!: string;

  @Column({ type: DataType.DECIMAL })
  currentPrice!: number;

  @Column({ type: DataType.DECIMAL, field: 'buy_now_price' })
  buyNowPrice!: number;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;
}
