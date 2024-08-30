import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  signUp(@Body() signUoDto: SignUpDto) {
    return this.authService.signUp(signUoDto);
  }

  //LOGIN
  // @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  //Get Profile
  @HttpCode(HttpStatus.OK)
  @Get('/profile/:id')
  async getProfile(@Param('id') id: string) {
    console.log(id)
    return this.getProfile(id);
  }
}
