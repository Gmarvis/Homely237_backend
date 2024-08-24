import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class SignUpDto {
   
        @IsString()
        @IsNotEmpty()
        name: string;
      
        @IsNotEmpty()
        @IsEmail({}, { message: ' please enter a valid email' })
        email: string;
      
        @IsString()
        @IsNotEmpty()
        @MinLength(6)
        @IsStrongPassword()
        readonly password: string;

}