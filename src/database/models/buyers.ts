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
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import {
  Products,
  AuctionManagements,
  Ratings,
  Notifications,
  Favorites,
} from '.';

@Table({
  timestamps: true,
  tableName: 'buyers',
})
export class Buyers extends Model<Buyers> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @Unique
  @AllowNull(false)
  @Column
  email!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @Column({ type: DataType.ENUM, values: ['buyer', 'seller', 'admin'] })
  type!: string;

  @Column({ type: DataType.ENUM, values: ['active', 'disable', 'delete'] })
  status!: string;

  @Column({ type: DataType.TEXT })
  address!: string;

  @Column
  fullname!: string;

  @Column({ field: 'is_seller' })
  isSeller!: boolean;

  @Column({ field: 'plus_point' })
  plusPoint!: number;

  @Column({ field: 'minus_point' })
  minusPoint!: number;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  // Associations
  @HasMany(() => Favorites)
  favorites!: Favorites[];

  @BelongsToMany(() => Products, () => AuctionManagements)
  products!: Products[];

  @BelongsToMany(() => AuctionManagements, () => Ratings, 'raterId')
  rater!: Ratings[];

  @BelongsToMany(() => AuctionManagements, () => Ratings, 'ratedId')
  rated!: Ratings[];

  @HasMany(() => Notifications)
  notifications!: Notifications[];

  @HasMany(() => AuctionManagements, 'buyer_id')
  auction!: AuctionManagements;
}
