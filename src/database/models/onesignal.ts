import {
  Table,
  Column,
  Model,
  PrimaryKey,
  IsUUID,
  DataType,
  Unique,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { Buyers } from '.';

@Table({
  timestamps: true,
  tableName: 'onesignal',
})
export class OneSignal extends Model<OneSignal> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @ForeignKey(() => Buyers)
  @Column({ type: DataType.UUIDV4, field: 'user_id' })
  userId!: string;

  @Unique
  @AllowNull(false)
  @Column({ type: DataType.UUIDV4, field: 'player_id' })
  playerId!: string;
}
