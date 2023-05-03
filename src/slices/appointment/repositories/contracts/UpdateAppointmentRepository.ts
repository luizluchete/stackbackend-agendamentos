import { Query } from '@/app/type'
import { AppointmentData } from '../../entities'

export interface UpdateAppointmentRepository {
  update(query: Query, data: AppointmentData): Promise<AppointmentData | null>
}
