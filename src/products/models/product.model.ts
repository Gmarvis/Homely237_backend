import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

@Table
export class Product extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @ForeignKey(() => User)
  @Column
  user_id: string;

  @Column
  name: string;

  @Column
  image: string;

  @Column
  rating: number;

  @Column
  price: number;

  @BelongsTo(() => User)
  user: User;
}
