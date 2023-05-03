import { Query } from '@/app/type'
import { RecurrenceData } from '@/slices/recurrence/entities'

export interface LoadRecurrenceRepository {
  loadRecurrence(query: Query): Promise<RecurrenceData | null>
}
