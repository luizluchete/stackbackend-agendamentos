import { DeleteAppointmentRepository } from '@/slices/appointment/repositories'
import { Query } from '@/app/type'

export class DeleteAppointment {
  constructor(private readonly repository: DeleteAppointmentRepository) {}

  async execute(query: Query): Promise<void> {
    await this.repository.delete(query)
  }
}
