import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';
import { CreateAppointmentDto } from './dto/createAppointmentDto';
import { UpdateAppointmentDto } from './dto/updateAppointmentDto';
import { Product } from 'src/products/models/product.model';
import { User } from 'src/users/models/user.model';
import { NotificationService } from 'src/notification/notification.service';
import { Exception } from 'handlebars';

enum NotificationType {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  PUSH = 'PUSH'
}

@Injectable()
export class AppointmentsService {
  constructor(
    @Inject(NotificationService)
    private readonly notificationService: NotificationService,
    @InjectModel(Appointment)
    private appointmentModel: typeof Appointment
  ) {}

  // CREATE APPOINTMENT
  async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    // send emails to providers for notification after booking i successful
    try {
      const appointment: Appointment = await this.appointmentModel.create({
        ...createAppointmentDto
      });

      console.log('appointment', appointment);
      await this.notificationService.sendNotifications(NotificationType.PUSH, {
        recipient_id: appointment.provider_id,
        title: 'New appointment',
        appointment_id: appointment.id,
        body: `${appointment.description}`,
        type: NotificationType.PUSH
      });

      return appointment;
    } catch (error) {
      throw new HttpException('An error occurred while sending appointment', error);
    }
  }

  // FETCH ALL APPOINTMENTS
  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.findAll({
      include: {
        model: User
      }
    });
  }

  // FIND BY USER ID
  async findByUserId(user_id: string) {
    return this.appointmentModel.findAll({
      where: {
        user_id
      },
      include: {
        model: User
      },
      order: [['updatedAt', 'DESC']]
    });
  }

  // FIND BY providers ID
  async findByProviderId(provider_id: string) {
    return this.appointmentModel.findAll({
      where: {
        provider_id: provider_id
      },
      include: {
        model: User
      },
      order: [['updatedAt', 'DESC']]
    });
  }

  // find by id
  async findOne(id: string) {
    return this.appointmentModel.findOne({
      where: {
        id
      },
      include: {
        model: User
      }
    });
  }

  //   UPDATE APPOINTMENT
  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const updated = await this.appointmentModel.update(updateAppointmentDto, {
      where: {
        id
      }
    });

    if (updated) {
      return this.appointmentModel.findOne({
        where: {
          id
        },
        include: {
          model: User
        }
      });
    }
  }

  // DELETE APPOINTMENT
  async remove(id: string) {
    return await this.appointmentModel.destroy({
      where: {
        id
      }
    });
  }
}
