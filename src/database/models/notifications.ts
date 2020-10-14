import {
  Table,
  Column,
  Model,
  PrimaryKey,
  IsUUID,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Buyers } from '.';

@Table({
  timestamps: true,
  tableName: 'notifications',
})
export class Notifications extends Model<Notifications> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @AllowNull(false)
  @ForeignKey(() => Buyers)
  @Column({ type: DataType.UUIDV4, field: 'user_id' })
  userId!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column({ field: 'is_read' })
  isRead!: boolean;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;

  // Associations
  @BelongsTo(() => Buyers)
  user!: Buyers;
}
