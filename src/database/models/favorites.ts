import {
  Table,
  Column,
  Model,
  PrimaryKey,
  IsUUID,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Buyers, Products, Categories } from '.';

@Table({
  timestamps: true,
  tableName: 'favorites',
})
export class Favorites extends Model<Favorites> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @ForeignKey(() => Buyers)
  @Column({ type: DataType.UUIDV4 })
  userId!: string;

  @ForeignKey(() => Products)
  @Column({ type: DataType.UUIDV4 })
  productId!: string;

  @ForeignKey(() => Categories)
  @Column({ type: DataType.UUIDV4 })
  categoryId!: string;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  // Associations
  @BelongsTo(() => Categories)
  category!: Categories;

  @BelongsTo(() => Products)
  product!: Products;

  @BelongsTo(() => Buyers)
  user!: Buyers;
}
