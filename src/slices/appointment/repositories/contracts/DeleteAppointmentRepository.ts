import { Query } from '@/app/type'

export interface DeleteAppointmentRepository {
  delete(query: Query): Promise<void>
}
