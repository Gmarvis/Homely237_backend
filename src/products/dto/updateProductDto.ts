import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  image: [];

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
