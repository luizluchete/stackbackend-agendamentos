import { Query } from '@/app/type'
import { AccountData } from '../../entities'

export interface UpdateAccountRepository {
  update(query: Query, data: AccountData): Promise<AccountData | null>
}
