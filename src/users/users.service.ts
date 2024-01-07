import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  // CREATE NEW USER
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log('createUser data:', createUserDto);
    return this.userModel.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }

  // FETCH ALL USERS
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  // FIND USER BY ID
  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  // FIND AND DELETE USER
  async remove(id: string): Promise<any> {
    return await this.userModel.destroy({
      where: {
        id,
      },
    });
  }

  // FIND AND UPDATE USER
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.update(updateUserDto, {
      where: { id },
    });
    if (updatedUser) {
      return await this.userModel.findOne({
        where: {
          id,
        },
      });
    }
  }
}
