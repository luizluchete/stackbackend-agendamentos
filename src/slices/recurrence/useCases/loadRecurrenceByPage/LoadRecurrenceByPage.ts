import { Query } from '@/app/type'
import { LoadRecurrenceByPageRepository } from '@/slices/recurrence/repositories'
import { RecurrencePaginated } from '../../entities'

export class LoadRecurrenceByPage {
  constructor(private readonly repository: LoadRecurrenceByPageRepository) {}

  async load(query: Query): Promise<RecurrencePaginated | null> {
    return await this.repository.loadRecurrenceByPage(query)
  }
}
