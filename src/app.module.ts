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
import { EmailServiceModule } from './email-server/email-server.module';
import { EmailService } from './email-server/email-server.service';
import { DATABASE, DATABASE_PASSWORD, DATABASE_USERNAME } from './Environment.config';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE,
      synchronize: true,
      retryDelay: 2000,
      // autoLoadModels: true,
      models: [User, Product, Category, Review, Appointment, Rating],
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    ReviewsModule,
    AppointmentsModule,
    RatingsModule,
    EmailServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
