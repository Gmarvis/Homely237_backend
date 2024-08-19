import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateEmailDto } from './dto/createEmail.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(createEmailDto: CreateEmailDto) {
    return  await this.mailerService.sendMail(createEmailDto);
  }
}
