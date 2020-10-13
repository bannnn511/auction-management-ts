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
  tableName: 'ratings',
})
export default class Ratings extends Model<Ratings> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @Column({ type: DataType.UUIDV4 })
  raterId!: string;

  @Column({ type: DataType.UUIDV4 })
  ratedId!: string;

  @Column({ type: DataType.UUIDV4 })
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
