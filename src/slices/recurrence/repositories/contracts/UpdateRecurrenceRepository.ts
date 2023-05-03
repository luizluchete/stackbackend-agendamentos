import { Query } from '@/app/type'
import { RecurrenceData } from '../../entities'

export interface UpdateRecurrenceRepository {
  update(query: Query, data: RecurrenceData): Promise<RecurrenceData | null>
}
