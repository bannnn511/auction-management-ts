import {
  Table,
  Column,
  Model,
  PrimaryKey,
  IsUUID,
  DataType,
  HasMany,
  BelongsToMany,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  // HasOne,
} from 'sequelize-typescript';
import {
  Products,
  AuctionHistories,
  AuctionParticipatings,
  Ratings,
  Reminders,
  Buyers,
} from '.';

@Table({
  timestamps: true,
  tableName: 'auction_managements',
})
export class AuctionManagements extends Model<AuctionManagements> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @ForeignKey(() => Buyers)
  @Column({ type: DataType.UUIDV4, field: 'buyer_id' })
  buyerId!: string;

  @ForeignKey(() => Buyers)
  @Column({ type: DataType.UUIDV4, field: 'seller_id' })
  sellerId!: string;

  @ForeignKey(() => Products)
  @Column({ type: DataType.UUIDV4, field: 'product_id' })
  productId!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column({ field: 'end_at' })
  endAt!: Date;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  // Associations
  @HasMany(() => AuctionHistories)
  histories!: AuctionHistories[];

  @BelongsToMany(() => Buyers, () => AuctionParticipatings, 'auction_id')
  users!: Buyers[];

  @BelongsTo(() => Products)
  products!: Products;

  @BelongsToMany(() => Buyers, () => Ratings, 'auction_id')
  ratings!: Buyers[];

  @HasMany(() => Reminders)
  reminders!: Reminders[];

  @BelongsTo(() => Buyers)
  buyers!: Buyers;
}
