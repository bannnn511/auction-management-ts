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
import { AuctionManagements, Buyers } from '.';

@Table({
  timestamps: true,
  tableName: 'auction_participatings',
})
export class AuctionParticipatings extends Model<AuctionParticipatings> {
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

  @Column
  status!: boolean;

  @Column({ type: DataType.BOOLEAN, field: 'is_reminder_created' })
  isReminderCreated!: boolean;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;
}
