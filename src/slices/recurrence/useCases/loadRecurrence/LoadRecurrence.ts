import { Query } from '@/app/type'
import { LoadRecurrenceRepository } from '@/slices/recurrence/repositories/contracts'

export class LoadRecurrence {
  constructor(private readonly repository: LoadRecurrenceRepository) {}

  async load(query: Query) {
    return await this.repository.loadRecurrence(query)
  }
}
