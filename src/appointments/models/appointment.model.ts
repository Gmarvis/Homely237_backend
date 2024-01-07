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
import { Product } from 'src/products/models/product.model';

enum StatusType {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

@Table
export class Appointment extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @Column
  user_id: string;

  @Column
  provider_id: string;

  @ForeignKey(() => Product)
  @Column
  product_id: string;

  @Column
  description: string;

  @Column
  location: string;

  @Column({
    type: DataTypes.ENUM(...Object.values(StatusType)),
    defaultValue: StatusType.PENDING,
  })
  status: string;

  @BelongsTo(() => Product)
  product: Product;
}
