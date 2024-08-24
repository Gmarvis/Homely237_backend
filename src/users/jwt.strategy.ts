import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// import { InjectModel } from '@nestjs/sequelize';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './models/user.model';
import { Model } from 'sequelize';

// ===> ***********TODO*********<====|
// finnish jwt token validation
// ===> ***********TODO*********<====|

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      // here we extract the jwt token from the clients header, we sent during signup
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // Now we overwrite the user information with the user info

  async validate(payload) {
    // get id from the payload
    const { id } = payload;

    const user = await this.userModel.get(id);

    if (!user) {
      throw new UnauthorizedException('please login first');
    }

    return user;
  }
}
