import {
  Table,
  Column,
  Model,
  PrimaryKey,
  IsUUID,
  DataType,
  Unique,
  BelongsToMany,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Products, CategoriesManagements, Favorites } from '.';

@Table({
  timestamps: true,
  tableName: 'categories',
})
export class Categories extends Model<Categories> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @Unique
  @Column({ field: 'category_name' })
  categoryName!: string;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  // Associations
  @BelongsToMany(() => Products, () => CategoriesManagements)
  products!: Products[];

  @HasMany(() => Favorites)
  favorites!: Favorites[];
}
