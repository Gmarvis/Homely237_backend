import {
  Column,
  HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Product } from 'src/products/models/product.model';

@Table
export class Category extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @Column
  name: string;

  @Column
  image: string;

  @HasMany(() => Product)
  products: Product[];
}
