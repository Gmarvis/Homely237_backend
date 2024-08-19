import { Module } from '@nestjs/common';
import { EmailController } from './email-service.controller';
import { EmailService } from './email-server.service';

@Module({
  imports: [],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailServiceModule {}
