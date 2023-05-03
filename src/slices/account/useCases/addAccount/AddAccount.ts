import { AddAccountRepository } from '@/slices/account/repositories/contracts'
import { AccountData, AccountEntity } from '../../entities'

export class AddAccount {
  constructor(private readonly repository: AddAccountRepository) {}

  async execute(data: AccountData): Promise<AccountEntity | null> {
    return await this.repository.addAccount(data)
  }
}
