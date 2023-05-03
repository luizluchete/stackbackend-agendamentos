import { Query } from '@/app/type'
import { RecurrencePaginated } from '@/slices/recurrence/entities'

export interface LoadRecurrenceByPageRepository {
  loadRecurrenceByPage(query: Query): Promise<RecurrencePaginated | null>
}
