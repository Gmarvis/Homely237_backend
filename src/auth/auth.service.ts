import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signUp.dto';
import { User } from 'src/users/models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CLIENT_APP_URL } from 'src/Environment.config';
import { EmailService } from 'src/email-server/email-server.service';
import { LoginDto } from './dto/login.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private emailService: EmailService,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  // SIGNUP FUNCTION
  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.userModel.findOne({
      where: {
        email: signUpDto.email,
      },
    });

    if (existingUser) {
      // user already exist with the same email
      throw new UnauthorizedException('email already exist');
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const { id, name, email } = await this.userModel.create({
      name: signUpDto.name,
      email: signUpDto.email,
      password: hashedPassword,
    });

    // use Emailservice to send Email
    this.emailService.sendEmail({
      receiver: email,
      subject: 'welcome to homygig',
      text: 'Thank you for signing up to homygig',
      html: {
        templateName: 'welcome',
        options: { name: name, action_url: CLIENT_APP_URL },
      },
    });

    // return access token
    return {
      access_token: await this.jwtService.signAsync({ id, name, email }),
    };
  }

  // Login
  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('invalid email');
    }

    const isPasswordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('invalid email or password');
    }

    const { id, name, email, role } = user;

    // return access token
    return {
      access_token: await this.jwtService.signAsync({ id, name, email }),
    };
  }

  //get user profile
  async getProfile(id: string): Promise<UserData>{
    try{
        return this.userModel.findOne({
            where: {id}
        })
    }catch{
        throw new NotFoundError(`no user with id: ${id}`)
    }
  }
}
