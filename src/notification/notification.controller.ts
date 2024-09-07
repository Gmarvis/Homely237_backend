import { BadRequestException, Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('notifications')
@ApiTags('Notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/:user_id')
  async getUserNotifications(@Param('user_id') user_id: string) {
    console.log('user_id', user_id);
    return this.notificationService.getNotifications(user_id);
  }

  @Patch('/:notification_id')
  async readNotification(@Param('notification_id') notification_id: string) {
    return this.notificationService.readNotification(notification_id);
  }

  @Delete('/:notification_id')
  async deleteNotification(@Param('notification_id') notification_id: string) {
    return this.notificationService.deleteNotification(notification_id);
  }

  @Delete()
  async deleteAll(@Query('user_id') user_id: string ){
    if (!user_id) {
      throw new BadRequestException('user_id is missing');
    }
    return this.notificationService.deleteAll(user_id)
  }
}


