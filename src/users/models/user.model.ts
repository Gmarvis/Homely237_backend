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

enum Role {
  ADMIN = 'admin',
  USER = 'user',
  PROVIDER = 'provider',
}

@Table
export class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  image: string;

  @Column
  phone: string;

  @Column
  location: string;

  @Column
  location_plan: string;

  @Column
  bio: string;

  @Column
  idCard_image_front: string;

  @Column
  idCard_image_back: string;

  @Column
  service_title: string;

  @Column({
    type: DataTypes.ENUM(...Object.values(Role)),
    // allowNull: false,
    defaultValue: Role.USER,
  })
  role: Role;

  @HasMany(() => Product)
  products: Product[];
}
