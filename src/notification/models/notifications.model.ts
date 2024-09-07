import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

enum NotificationType {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  PUSH = 'PUSH'
}

@Table
export class Notification extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    defaultValue: DataTypes.UUIDV4
  })
  id: string;

  @Column({
    type: DataTypes.ENUM(...Object.values(NotificationType)),
    defaultValue: NotificationType.PUSH
  })
  type: NotificationType;

  @ForeignKey(() => User)
  @Column
  sender_id: String;

  @Column
  recipient_id: String;

  @Column
  title: string;

  @Column
  body: string;

  @Column
  appointment_id: string;

  @Column({
    defaultValue: false
  })
  read_status: boolean;

  @BelongsTo(() => User)
  sender: String;
}
