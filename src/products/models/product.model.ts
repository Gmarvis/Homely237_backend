import { DataTypes } from 'sequelize';

import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  // DataType,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Appointment } from 'src/appointments/models/appointment.model';
import { Category } from 'src/categories/models/category.model';
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

  @ForeignKey(() => Category)
  @Column
  category_id: string;

  @Column
  category_name: string;

  @Column
  name: string;

  @Column
  image: string;

  @Column
  rating: string;

  @Column
  price: string;

  @Column
  description: string;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Appointment)
  appointment: Appointment;
}
