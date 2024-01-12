import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { ProductsModule } from './products/products.module';
import { Product } from './products/models/product.model';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/models/category.model';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/models/review.model';
import { AppointmentsModule } from './appointments/appointments.module';
import { Appointment } from './appointments/models/appointment.model';
import { RatingsModule } from './ratings/ratings.module';
import { Rating } from './ratings/models/rating.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    SequelizeModule.forRoot({
      dialect: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: 'Password123#@!',
      // database: 'homely237',

      // DB4FREE CONNECTION
      host: 'db4free.net',
      port: 3306,
      username: 'homely237',
      password: 'homely237',
      database: 'homely237',
      // DB4FREE CONNECTION

      autoLoadModels: true,
      synchronize: true,
      models: [User, Product, Category, Review, Appointment, Rating],
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    ReviewsModule,
    AppointmentsModule,
    RatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
