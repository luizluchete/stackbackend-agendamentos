import { Query } from '@/app/type'
import { LoadAccountByPageRepository } from '@/slices/account/repositories'
import { AccountPaginated } from '../../entities'

export class LoadAccountByPage {
  constructor(private readonly repository: LoadAccountByPageRepository) {}

  async load(query: Query): Promise<AccountPaginated | null> {
    return await this.repository.loadAccountByPage(query)
  }
}
