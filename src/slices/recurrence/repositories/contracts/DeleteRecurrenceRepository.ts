import { Query } from '@/app/type'

export interface DeleteRecurrenceRepository {
  delete(query: Query): Promise<void>
}
