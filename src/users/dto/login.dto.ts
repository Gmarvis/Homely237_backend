import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'please enter correct email' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
