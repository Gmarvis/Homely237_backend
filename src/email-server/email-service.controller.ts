import { Controller, Get, Res } from '@nestjs/common';
import { EmailService } from './email-server.service';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  // @Get("/test")
  // async sentTestEmail(){
  //   return this.emailService.sendTestEmail({
  //     receiver: 'sgmarvis@gmail.com',
  //     subject: 'hello homygig',
  //     text: 'homygig response'
  //   })
  // }


}
