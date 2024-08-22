import { HttpException, Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/createEmail.dto';
import { EMAIL_USER_NAME } from 'src/Environment.config';
import * as fs from 'fs-extra';
import * as handlebars from 'handlebars';
import * as path from 'path';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  // load html template with handlebars (hbs)
  private async loadTemplate(templateName: string, variables: any) {
    const templatePath = path.join(__dirname, `/templates/${templateName}.hbs`);
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const template = handlebars.compile(templateContent);
    return template(variables);
  }

  async sendEmail(emailContent: CreateEmailDto): Promise<any> {
    try {
      await this.mailerService.sendMail({
        to: emailContent.receiver,
        from: `"HomyGig" "${EMAIL_USER_NAME}"`,
        subject: emailContent.subject,
        text: emailContent.text,
        html: await this.loadTemplate(
          emailContent.html.templateName,
          emailContent.html.options,
        ),
      });
      return { status: 201, message: 'Email sent successfully' };
    } catch (error) {
      throw new HttpException('error sending email', error);
    }
  }
}
