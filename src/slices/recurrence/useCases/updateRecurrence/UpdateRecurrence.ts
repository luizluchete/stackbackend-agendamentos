import { UpdateRecurrenceRepository } from '@/slices/recurrence/repositories'
import { RecurrenceData, RecurrenceEntity } from '../../entities'
import { Query } from '@/app/type'

export class UpdateRecurrence {
  constructor(private readonly repository: UpdateRecurrenceRepository) {}

  async execute(
    query: Query,
    data: RecurrenceData
  ): Promise<RecurrenceEntity | null> {
    return await this.repository.update(query, data)
  }
}
