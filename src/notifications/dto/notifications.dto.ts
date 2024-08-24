import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ENUM } from 'sequelize';

export class SendNotificationDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  type: NotificationType;

  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsOptional() 
  appointment_id: string

  @IsNotEmpty()
  @IsBoolean()
  read_status: Boolean;
}

 interface Recipient {
    id: string;
    email?: string;
    phoneNumber?: string;
    name?: string
    pushToken?: string;
  };

