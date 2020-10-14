import {
  Table,
  Column,
  Model,
  PrimaryKey,
  IsUUID,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Buyers, AuctionManagements } from '.';

@Table({
  timestamps: true,
  tableName: 'reminders',
})
export class Reminders extends Model<Reminders> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @ForeignKey(() => Buyers)
  @Column({ type: DataType.UUIDV4, field: 'user_id' })
  userId!: string;

  @ForeignKey(() => AuctionManagements)
  @Column({ type: DataType.UUIDV4, field: 'auction_id' })
  auctionId!: string;

  @Column({ field: 'push_at' })
  pushAt!: Date;

  @Column({ field: 'is_pushed' })
  isPushed!: boolean;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;
}
