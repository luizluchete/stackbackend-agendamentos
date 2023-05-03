import { Query } from '@/app/type'
import { UserPaginated } from '@/slices/user/entities'

export interface LoadUserByPageRepository {
  loadUserByPage(query: Query): Promise<UserPaginated | null>
}
