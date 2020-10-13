import {
  Table,
  Column,
  Model,
  PrimaryKey,
  IsUUID,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import AuctionHistories from './auctionHistories';

@Table({
  timestamps: true,
})
export default class AuctionManagements extends Model<AuctionManagements> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @Column({ type: DataType.UUIDV4, field: 'buyer_id' })
  buyerId!: string;

  @Column({ type: DataType.UUIDV4, field: 'seller_id' })
  sellerId!: string;

  @Column({ type: DataType.UUIDV4, field: 'product_id' })
  productId!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column
  endAt!: Date;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;

  @HasMany(() => AuctionHistories)
  histories!: AuctionHistories[];
}
