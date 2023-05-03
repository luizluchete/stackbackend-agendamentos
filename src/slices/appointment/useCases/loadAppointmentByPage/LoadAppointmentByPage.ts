import { Query } from '@/app/type'
import { LoadAppointmentByPageRepository } from '@/slices/appointment/repositories'
import { AppointmentPaginated } from '../../entities'

export class LoadAppointmentByPage {
  constructor(private readonly repository: LoadAppointmentByPageRepository) {}

  async load(query: Query): Promise<AppointmentPaginated | null> {
    return await this.repository.loadAppointmentByPage(query)
  }
}
