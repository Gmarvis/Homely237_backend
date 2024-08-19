import { Controller, Get, Res } from '@nestjs/common';
import { EmailService } from './email-server.service';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  async sendEmail(@Res() res: any) {
    const mail = await this.emailService.sendEmail({
      from: 'Sam Gmarvis <sgmarvis@gmail.com>',
      to: 'inforsamgmarvis@gmail.com' ,
      subject: 'Greetings From Homygig',
      text: 'Thank you joining us at homygig where we grow our business together',
    });

    console.log(mail);

    return res.status(200).json({
      message: 'successful',
      mail,
    });
  }
}
