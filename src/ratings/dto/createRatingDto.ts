import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  rate: number;
}
