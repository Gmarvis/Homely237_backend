import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
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

  // SIGNUP USER
  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password, phone } = signUpDto;

    const existingUser = await this.userModel.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new UnauthorizedException('email aready exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const userData = await this.userModel.findOne({
      where: {
        id: user.id,
      },
    });

    for (const key in userData) {
      if (key === 'password') {
        delete userData[key];
      }
    }

    console.log('userData', userData);
    const token = this.jwtService.sign({ user: { ...userData } });

    return { token };
  }

  // LOGIN
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('invalid email');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('invalid email or password');
    }

    const userData = await this.userModel.findOne({
      where: {
        id: user.id,
      },
    });

    if (userData) {
      for (const key in userData) {
        if (key === 'password') {
          delete userData[key];
        }
      }

      // console.log('userData', userData);
      const token = this.jwtService.sign({ user: { ...userData } });

      return { token };
    }
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

  // GET USER MY TOKEN
  async getUserByToken(token: string) {
    const id = this.jwtService.verify(token);
    console.log('id', id);
  }
}
