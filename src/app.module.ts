import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { ProductsModule } from './products/products.module';
import { Product } from './products/models/product.model';

@Module({
  imports: [
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
      models: [User, Product],
    }),
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
