import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';
import { CreateAppointmentDto } from './dto/createAppointmentDto';
import { UpdateAppointmentDto } from './dto/updateAppointmentDto';
import { Product } from 'src/products/models/product.model';
import { User } from 'src/users/models/user.model';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class AppointmentsService {
  private notificationService: NotificationService
  constructor(
    @InjectModel(Appointment)
    private appointmentModel: typeof Appointment,
  ) {}

  // CREATE APPOINTMENT
  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    // send emails to providers for notification after booking i successful
    const appointment: Appointment = await this.appointmentModel.create({
      ...createAppointmentDto,
    });

    // if (appointment.id) {
    //   await this.notificationService.sendNotifications(NotificationType.PUSH, {
    //     recipient_id: appointment.provider_id,
    //     title: 'You have an new appointment',
    //     appointment_id: appointment.id,
    //     body: `${appointment.user.name} sent you an appointment`,
    //     type: NotificationType.PUSH,
    //   });
    // }
    return appointment;
  }

  // FETCH ALL APPOINTMENTS
  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.findAll({
      include: {
        model: User,
      },
    });
  }

  // FIND BY USER ID
  async findByUserId(user_id: string) {
    return this.appointmentModel.findAll({
      where: {
        user_id,
      },
      include: {
        model: User,
      },
      order: [['updatedAt', 'DESC']]
    });
  }

  // FIND BY providers ID
  async findByProviderId(provider_id: string) {
    return this.appointmentModel.findAll({
      where: {
        provider_id: provider_id,
      },
      include: {
        model: User,
      },
      order: [['updatedAt', 'DESC']]
    });
  }

  // find by id
  async findOne(id: string) {
    return this.appointmentModel.findOne({
      where: {
        id,
      },
      include: {
        model: User,
      },
    });
  }

  //   UPDATE APPOINTMENT
  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const updated = await this.appointmentModel.update(updateAppointmentDto, {
      where: {
        id,
      },
    });

    if (updated) {
      return this.appointmentModel.findOne({
        where: {
          id,
        },
        include: {
          model: User,
        },
      });
    }
  }

  // DELETE APPOINTMENT
  async remove(id: string) {
    return await this.appointmentModel.destroy({
      where: {
        id,
      },
    });
  }
}
