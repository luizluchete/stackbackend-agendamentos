import { Query } from '@/app/type'

export interface DeleteOwnerRepository {
  delete(query: Query): Promise<void>
}
