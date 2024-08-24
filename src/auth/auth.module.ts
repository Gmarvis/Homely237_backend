import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/Environment.config';
import { JWT_EXPIRES } from 'src/Environment.config';
import { UsersService } from 'src/users/users.service';
import { EmailModule } from 'mailersend/lib/modules/Email.module';
import { EmailService } from 'src/email-server/email-server.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES },
    }),
    EmailModule,
    SequelizeModule.forFeature([User]),

  ],
  providers: [AuthService, UsersService, EmailService, UsersService],
  controllers: [AuthController],
  exports: [AuthService, UsersService],
})
export class AuthModule {}
