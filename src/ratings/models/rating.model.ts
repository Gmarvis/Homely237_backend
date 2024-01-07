import { DataTypes } from 'sequelize';
import { Column, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Rating extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @Column
  product_id: string;

  @Column
  user_id: string;

  @Column
  rate: number;
}
