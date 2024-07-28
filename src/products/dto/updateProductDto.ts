import {
  IsString,
  IsOptional,
  MinLength,
  Max,
  MaxLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @MinLength(5, { message: 'service name most not be less than 5 characters' })
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
  rating: string;

  @IsString()
  @IsOptional()
  category_id: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  locality: string;

  @IsString()
  @MinLength(60, { message: 'description most not be less than 60 characters' })
  @MaxLength(2000, {
    message: 'description most not be more than 200 characters',
  })
  @IsOptional()
  description: string;
}
