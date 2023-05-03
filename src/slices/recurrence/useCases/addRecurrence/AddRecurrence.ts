import { AddRecurrenceRepository } from '@/slices/recurrence/repositories/contracts'
import { RecurrenceData, RecurrenceEntity } from '../../entities'

export class AddRecurrence {
  constructor(private readonly repository: AddRecurrenceRepository) {}

  async execute(data: RecurrenceData): Promise<RecurrenceEntity | null> {
    return await this.repository.addRecurrence(data)
  }
}
