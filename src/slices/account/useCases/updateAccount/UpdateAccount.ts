import { UpdateAccountRepository } from '@/slices/account/repositories'
import { AccountData, AccountEntity } from '../../entities'
import { Query } from '@/app/type'

export class UpdateAccount {
  constructor(private readonly repository: UpdateAccountRepository) {}

  async execute(
    query: Query,
    data: AccountData
  ): Promise<AccountEntity | null> {
    return await this.repository.update(query, data)
  }
}
