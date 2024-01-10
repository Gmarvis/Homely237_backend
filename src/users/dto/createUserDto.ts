import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Exclude()
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

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
