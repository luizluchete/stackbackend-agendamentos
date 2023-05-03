import { Query } from '@/app/type'
import { AppointmentPaginated } from '@/slices/appointment/entities'

export interface LoadAppointmentByPageRepository {
  loadAppointmentByPage(query: Query): Promise<AppointmentPaginated | null>
}
