import { DataTypes } from 'sequelize';
import { Table, Model, Column, IsUUID, PrimaryKey } from 'sequelize-typescript';

@Table
export class Review extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @Column
  user_id: string;

  @Column
  product_id: string;

  @Column
  content: string;
}
