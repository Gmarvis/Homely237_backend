import { IsOptional, IsString } from 'class-validator';

export class UpdateAppointmentDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  status: string;
}
