import { IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto {
  @IsString()
  @IsOptional()
  user_id: string;

  @IsString()
  @IsOptional()
  product_id: string;

  @IsString()
  @IsOptional()
  content: string;
}
