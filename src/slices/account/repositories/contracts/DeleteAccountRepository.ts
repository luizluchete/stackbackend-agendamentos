import { Query } from '@/app/type'

export interface DeleteAccountRepository {
  delete(query: Query): Promise<void>
}
