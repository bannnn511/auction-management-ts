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

  @Column
  userId!: string;

  @Column
  auctionId!: string;

  @Column
  pushAt!: Date;

  @Column
  isPushed!: boolean;

  @Column({ type: DataType.UUIDV4, field: 'created_by' })
  createdBy!: string;

  @Column({ type: DataType.UUIDV4, field: 'updated_by' })
  updatedBy!: string;
}
