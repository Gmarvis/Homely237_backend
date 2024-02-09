import { IsString, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  images: [];

  @IsOptional()
  product_image: string;

  @IsString()
  @IsOptional()
  user_id: string;

  @IsString()
  @IsOptional()
  category_name: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsString()
  @IsOptional()
  rating: number;

  @IsString()
  @IsOptional()
  category_id: string;

  @IsString()
  @IsOptional()
  description: string;
}
