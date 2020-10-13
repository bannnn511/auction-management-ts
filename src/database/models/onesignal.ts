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
  tableName: 'onesignal',
})
export default class OneSignal extends Model<OneSignal> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @Column({ type: DataType.UUIDV4 })
  userId!: string;

  @Unique
  @AllowNull(false)
  @Column({ type: DataType.UUIDV4 })
  playerId!: string;
}
