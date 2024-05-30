import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'please enter a valid email' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  // @IsStrongPassword()
  @MinLength(6)
  readonly password: string;
}
