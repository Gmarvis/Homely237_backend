import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { SendNotificationDto } from './dto/notifications.dto';
import { Notification } from './models/notifications.model';
import { InjectModel } from '@nestjs/sequelize';



@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification) private notificationsModel: typeof Notification,
  ) {}
  // Send Notification
  async sendNotifications(
    type: NotificationType,
    notificationsDto: SendNotificationDto,
  ) {
    switch (type) {
      case NotificationType.PUSH:
        try {
          const notification = await this.notificationsModel.create({
            type,
            ...notificationsDto,
          });
          return notification;
        } catch (error) {
          throw new HttpException(
            'an error occurred while sending notification',
            error?.message || error,
          );
        }
      case NotificationType.EMAIL:
    }
  }
  //Get notifications
  async getNotifications(id: string) {
    try {
      return this.notificationsModel.findAll({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  // update notification
  async readNotification(id: string) {
    try {
      return this.notificationsModel.update(
        { read_status: 'read' },
        {
          where: { id },
        },
      );
    } catch (error) {
      throw new NotFoundException(
        `no notification with ${id}`,
        error?.message || error,
      );
    }
  }
  // Delete Notification
  async deleteNotification(id: string){
    try{
      return this.notificationsModel.destroy({
        where: {id}
      })
    }catch(error){

    }
  }
}

