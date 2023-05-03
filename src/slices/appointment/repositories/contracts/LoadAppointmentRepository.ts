import { Query } from '@/app/type'
import { AppointmentData } from '@/slices/appointment/entities'

export interface LoadAppointmentRepository {
  loadAppointment(query: Query): Promise<AppointmentData | null>
}
