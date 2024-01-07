import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  location_plan: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  idCard_image_front: string;

  @IsString()
  @IsOptional()
  idCard_image_back: string;

  @IsString()
  @IsOptional()
  service_title: string;

  @IsString()
  @IsOptional()
  role: string;
}
