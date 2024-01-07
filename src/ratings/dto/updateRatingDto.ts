import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRatingDto {
  @IsString()
  @IsNotEmpty()
  rate: number;
}
