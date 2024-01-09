import { Module } from '@nestjs/common';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rating } from './models/rating.model';

@Module({
  imports: [SequelizeModule.forFeature([Rating])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
