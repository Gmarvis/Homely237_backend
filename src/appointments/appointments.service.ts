import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';
import { CreateAppointmentDto } from './dto/createAppointmentDto';
import { UpdateAppointmentDto } from './dto/updateAppointmentDto';
import { Product } from 'src/products/models/product.model';
@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment)
    private appointmentModel: typeof Appointment,
  ) {}

  // CREATE APPOINTMENT
  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentModel.create({ ...createAppointmentDto });
  }

  // FETCH ALL APPOINTMENTS
  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.findAll({
      include: {
        model: Product,
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
        model: Product,
      },
    });
  }

  // FIND BY providers ID
  async findByProviderId(provider_id: string) {
    return this.appointmentModel.findAll({
      where: {
        provider_id,
      },
      include: {
        model: Product,
      },
    });
  }

  // find by id
  async findOne(id: string) {
    return this.appointmentModel.findOne({
      where: {
        id,
      },
      include: {
        model: Product,
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
          model: Product,
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
