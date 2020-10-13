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
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'notifications',
})
export default class Notifications extends Model<Notifications> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @AllowNull(false)
  @Column({ type: DataType.UUIDV4 })
  userId!: string;

  @Column
  description!: string;

  @Column
  isRead!: boolean;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;
}
