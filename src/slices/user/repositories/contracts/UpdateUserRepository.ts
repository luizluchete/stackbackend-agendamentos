import { Query } from '@/app/type'
import { UserData } from '../../entities'

export interface UpdateUserRepository {
  update(query: Query, data: UserData): Promise<UserData | null>
}
