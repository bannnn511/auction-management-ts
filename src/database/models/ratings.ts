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
  tableName: 'ratings',
})
export class Ratings extends Model<Ratings> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @ForeignKey(() => Buyers)
  @Column({ type: DataType.UUIDV4, field: 'rater_id' })
  raterId!: string;

  @ForeignKey(() => Buyers)
  @Column({ type: DataType.UUIDV4, field: 'rated_id' })
  ratedId!: string;

  @ForeignKey(() => AuctionManagements)
  @Column({ type: DataType.UUIDV4, field: 'auction_id' })
  auctionId!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column
  point!: number;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;
}
