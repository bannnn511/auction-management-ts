import {
  Table,
  Column,
  Model,
  PrimaryKey,
  IsUUID,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import AuctionManagements from './auctionManagements';

@Table({
  timestamps: true,
  tableName: 'auction_histories',
})
export default class AuctionHistories extends Model<AuctionHistories> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @Column({ type: DataType.UUIDV4, field: 'user_id' })
  userId!: string;

  @ForeignKey(() => AuctionManagements)
  @Column({ type: DataType.UUIDV4, field: 'auction_id' })
  auctionId!: string;

  @BelongsTo(() => AuctionManagements)
  auctions!: AuctionManagements;

  @Column({ type: DataType.FLOAT })
  price!: number;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;
}
