import { Query } from '@/app/type'
import { LoadAppointmentRepository } from '@/slices/appointment/repositories/contracts'

export class LoadAppointment {
  constructor(private readonly repository: LoadAppointmentRepository) {}

  async load(query: Query) {
    return await this.repository.loadAppointment(query)
  }
}
