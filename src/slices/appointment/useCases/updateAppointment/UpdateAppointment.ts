import { UpdateAppointmentRepository } from '@/slices/appointment/repositories'
import { AppointmentData, AppointmentEntity } from '../../entities'
import { Query } from '@/app/type'

export class UpdateAppointment {
  constructor(private readonly repository: UpdateAppointmentRepository) {}

  async execute(
    query: Query,
    data: AppointmentData
  ): Promise<AppointmentEntity | null> {
    return await this.repository.update(query, data)
  }
}
