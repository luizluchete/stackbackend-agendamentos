import { Query } from '@/app/type'

export interface DeleteUserRepository {
  delete(query: Query): Promise<void>
}
