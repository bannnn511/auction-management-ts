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
  tableName: 'categories',
})
export default class Categories extends Model<Categories> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @Column
  categoryName!: string;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;
}
