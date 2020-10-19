import {
  Table,
  Column,
  Model,
  PrimaryKey,
  IsUUID,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasOne,
} from 'sequelize-typescript';
import { AuctionManagements } from './auctionManagements';

@Table({
  timestamps: true,
  tableName: 'products',
})
export class Products extends Model<Products> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @Column({ field: 'product_name' })
  productName!: string;

  @Column({ field: 'img_url' })
  imgURL!: string;

  @Column({ type: DataType.DECIMAL, field: 'current_price' })
  currentPrice!: number;

  @Column({ type: DataType.DECIMAL, field: 'buy_now_price' })
  buyNowPrice!: number;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  // Associations
  @HasOne(() => AuctionManagements)
  auction!: AuctionManagements;
}
