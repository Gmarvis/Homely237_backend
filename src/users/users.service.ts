import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { EmailService } from 'src/email-server/email-server.service';
import { CLIENT_APP_URL } from 'src/Environment.config';
import { WELCOME_PROVIDER_TEMPLATE } from 'src/email-server/templates';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
    private readonly emailService: EmailService,
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
      throw new UnauthorizedException('email already exist');
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
    
    // use Emailservice to send Email
    await this.emailService.sendEmail({
      receiver: userData.email,
      subject: 'welcome to homygig',
      text: 'Thank you for signing up to homygig',
      html: {
        templateName: 'welcome',
        options: { name: userData.name, action_url: CLIENT_APP_URL },
      },
    });
    
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
    try {
      const updatedUser = await this.userModel.update(updateUserDto, {
        where: { id },
      });
      if (updatedUser) {
        const userData = await this.userModel.findOne({
          where: {
            id,
          },
        });
        // use Emailservice to send Email
        await this.emailService.sendEmail({
          receiver: userData.email,
          subject: 'Homygig operations',
          text: 'you are now a homygig service provider',
          html: {
            templateName: WELCOME_PROVIDER_TEMPLATE,
            options: {
              name: userData.name,
              action_url: CLIENT_APP_URL + '/dashboard',
            },
          },
        });
        
        return userData;
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  // GET USER MY TOKEN
  async getUserByToken(token: string) {
    const id = this.jwtService.verify(token);
    console.log('id', id);
  }

  // Create provider
  async createServiceProvider(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const numberOfAffectedRoles = await this.userModel.update(updateUserDto, {
        where: { id },
        returning: true,
      });
      if (numberOfAffectedRoles[1]) {
        const updatedUser = await this.userModel.findOne({
          where: {
            id,
          },
        });

          // use Emailservice to send Email
          // await this.emailService.sendEmail({
          //   receiver: updatedUser.email,
          //   subject: 'Homygig operations',
          //   text: 'you are now a homygig service provider',
          //   html: {
          //     templateName: WELCOME_PROVIDER_TEMPLATE,
          //     options: {
          //       name: updatedUser.name,
          //       action_url: CLIENT_APP_URL + '/dashboard',
          //     },
          //   },
          // });

        return updatedUser
      } else {
        throw new NotFoundException(`user with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException({
        error: 'error creating service provider',
        status: 404,
        message: error.message,
      });
    }
  }
}
