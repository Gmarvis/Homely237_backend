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
import {
  DATABASE,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
} from './Environment.config';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { Notification } from './notification/models/notifications.model';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { AppointmentsService } from './appointments/appointments.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: DATABASE_HOST,
      port: 3306,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE,
      synchronize: true,
      retryDelay: 2000,
      autoLoadModels: true,
      models: [
        User,
        Product,
        Category,
        Review,
        Appointment,
        Rating,
        Notification,
      ],
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    ReviewsModule,
    AppointmentsModule,
    RatingsModule,
    EmailServiceModule,
    AuthModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
