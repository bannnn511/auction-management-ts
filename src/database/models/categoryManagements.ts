import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  IsUUID,
  DataType,
  Unique,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'categories_managments',
})
export default class CategoriesManagements extends Model<
  CategoriesManagements
> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @Column({ type: DataType.UUIDV4 })
  categoryId!: string;

  @Column({ type: DataType.UUIDV4 })
  productId!: string;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;
}
