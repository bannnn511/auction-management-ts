import {
  Table,
  Column,
  Model,
  PrimaryKey,
  IsUUID,
  DataType,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Categories, Products } from '.';

@Table({
  timestamps: true,
  tableName: 'categories_managements',
})
export class CategoriesManagements extends Model<CategoriesManagements> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @ForeignKey(() => Categories)
  @Column({ type: DataType.UUIDV4 })
  categoryId!: string;

  @ForeignKey(() => Products)
  @Column({ type: DataType.UUIDV4 })
  productId!: string;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;
}
