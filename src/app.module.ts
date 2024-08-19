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
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailServiceModule } from './email-server/email-server.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),


    /**
     * email server configurations with nodemailer
     * 
     * this config uses nodemailer and an SMPT platform
     * link to helpful resources {@link: https://www.freecodecamp.org/news/how-to-use-nodemailer-in-nestjs/}
     */
    
    // setup email service 
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER_NAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        logger: true, // Enable detailed logs
        debug: true, // Enable debug output
      },
    }),

    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,

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
  providers: [AppService],
})
export class AppModule {}
