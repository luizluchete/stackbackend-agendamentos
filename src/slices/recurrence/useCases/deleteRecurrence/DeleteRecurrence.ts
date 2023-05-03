import { DeleteRecurrenceRepository } from '@/slices/recurrence/repositories'
import { Query } from '@/app/type'

export class DeleteRecurrence {
  constructor(private readonly repository: DeleteRecurrenceRepository) {}

  async execute(query: Query): Promise<void> {
    await this.repository.delete(query)
  }
}
