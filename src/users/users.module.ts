import { Module } from '@nestjs/common';
// import {ConfigService} from '@nestjs/config'
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRES, JWT_SECRET } from 'src/Environment.config';
import { EmailService } from 'src/email-server/email-server.service';
// import { config } from 'process';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [],
      useFactory: () => {
        return {
          secret: JWT_SECRET,
          signOptions: {
            expiresIn: JWT_EXPIRES
          },
        };
      },
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService, EmailService],
  exports: [SequelizeModule],
})
export class UsersModule {}
