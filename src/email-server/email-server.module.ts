import { Module } from '@nestjs/common';
import { EmailController } from './email-service.controller';
import { EmailService } from './email-server.service';
import { MailerModule } from '@nestjs-modules/mailer';
import {
  EMAIL_HOST,
  EMAIL_PASSWORD,
  EMAIL_USER_NAME,
} from 'src/Environment.config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'; 
import { join } from "path"

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: EMAIL_USER_NAME,
          pass: EMAIL_PASSWORD,
        },
      },

      defaults: {
        from: ` ${EMAIL_USER_NAME} "Homygig"`,
      },
      template: {
        // dir: join(__dirname, 'templates'), // Optional, for using email templates
        adapter: new HandlebarsAdapter(), // Optional, for using Handlebars as the template engine
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailServiceModule {}
