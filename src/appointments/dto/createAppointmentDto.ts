import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  sender_id: string;

  @IsString()
  @IsNotEmpty()
  sender_name: string;


  @IsString()
  @IsNotEmpty()
  provider_id: string;
  

  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsOptional()
  location_details: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsOptional()
  locality: string;

  // @IsString()
  // @IsNotEmpty()
  // status: string;
}
