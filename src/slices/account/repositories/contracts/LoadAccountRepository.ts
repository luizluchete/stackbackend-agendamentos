import { Query } from '@/app/type'
import { AccountData } from '@/slices/account/entities'

export interface LoadAccountRepository {
  loadAccount(query: Query): Promise<AccountData | null>
}
