import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  // UseInterceptors,
  // ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
// import { User } from './models/user.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersSercive: UsersService) {}
  // CREATE NEW USER
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('user from controller:', createUserDto);
    return this.usersSercive.createUser(createUserDto);
  }

  // SIGNUP
  @Post('/signup')
  signUP(@Body() signUpDto: SignUpDto) {
    return this.usersSercive.signUp(signUpDto);
  }

  // LOGIN
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    console.log('user login,', loginDto);

    return this.usersSercive.login(loginDto);
  }

  // GET ALL USERS
  @Get()
  getAllUsers() {
    return this.usersSercive.findAll();
  }

  // FIND USER BY ID
  // @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersSercive.findOne(id);
    // return new CreateUserDto(user);
  }

  // FIND AND UPDATE USER
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersSercive.updateUser(id, updateUserDto);
  }

  // FIND AND DELETE
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersSercive.remove(id);
  }

  @Get('/verify/:token')
  verify(@Param('token') token: string) {
    return this.verify(token);
  }
}
