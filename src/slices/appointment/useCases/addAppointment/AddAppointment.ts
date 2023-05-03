import { AddAppointmentRepository } from '@/slices/appointment/repositories/contracts'
import { AppointmentData, AppointmentEntity } from '../../entities'

export class AddAppointment {
  constructor(private readonly repository: AddAppointmentRepository) {}

  async execute(data: AppointmentData): Promise<AppointmentEntity | null> {
    return await this.repository.addAppointment(data)
  }
}
