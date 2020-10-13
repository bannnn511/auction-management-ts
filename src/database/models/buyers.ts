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
  tableName: 'buyers',
})
export default class Buyers extends Model<Buyers> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @Column
  @Unique
  @AllowNull(false)
  email!: string;

  @Column
  @AllowNull(false)
  password!: string;

  @Column({ type: DataType.ENUM, values: ['buyer', 'seller', 'admin'] })
  type!: string;

  @Column({ type: DataType.ENUM, values: ['active', 'disable', 'delete'] })
  status!: string;

  @Column({ type: DataType.TEXT })
  address!: string;

  @Column
  fullname!: string;

  @Column
  isSeller!: boolean;

  @Column
  plusPoint!: number;

  @Column
  minusPoint!: number;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;
}
