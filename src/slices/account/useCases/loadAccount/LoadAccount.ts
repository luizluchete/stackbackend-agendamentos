import { Query } from '@/app/type'
import { LoadAccountRepository } from '@/slices/account/repositories/contracts'

export class LoadAccount {
  constructor(private readonly repository: LoadAccountRepository) {}

  async load(query: Query) {
    return await this.repository.loadAccount(query)
  }
}
