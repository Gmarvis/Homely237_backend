import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
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

  // GET ALL USERS
  @Get()
  getAllUsers() {
    return this.usersSercive.findAll();
  }

  // FIND USER BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersSercive.findOne(id);
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
}
