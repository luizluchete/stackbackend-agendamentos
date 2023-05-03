import { Query } from '@/app/type'
import { AccountPaginated } from '@/slices/account/entities'

export interface LoadAccountByPageRepository {
  loadAccountByPage(query: Query): Promise<AccountPaginated | null>
}
