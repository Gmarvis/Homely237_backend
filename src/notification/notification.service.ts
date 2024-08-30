import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './models/notifications.model';
import { SendNotificationDto } from './dto/notifications.dto';

enum NotificationType {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  PUSH = 'PUSH'
}


@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification)
    private notificationModel: typeof Notification
  ) {}

  // Send Notification
  async sendNotifications(type: NotificationType, notificationsDto: SendNotificationDto) {
    switch (type) {
      case NotificationType.PUSH:
        try {
          const notification = await this.notificationModel.create({
            type,
            ...notificationsDto
          });
          return notification;
        } catch (error) {
          throw new HttpException(
            'an error occurred while sending notification',
            error?.message || error
          );
        }
      case NotificationType.EMAIL:
    }
  }

  //Get notifications
  async getNotifications(id: string) {
    try {
      return this.notificationModel.findAll({
        where: { id }
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  // update notification
  async readNotification(id: string) {
    try {
      return this.notificationModel.update(
        { read_status: 'read' },
        {
          where: { id }
        }
      );
    } catch (error) {
      throw new NotFoundException(`no notification with ${id}`, error?.message || error);
    }
  }
  // Delete Notification
  async deleteNotification(id: string) {
    try {
      return this.notificationModel.destroy({
        where: { id }
      });
    } catch (error) {}
  }
}
