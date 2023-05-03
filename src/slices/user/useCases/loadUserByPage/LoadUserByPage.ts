import { Query } from '@/app/type'
import { LoadUserByPageRepository } from '@/slices/user/repositories'
import { UserPaginated } from '../../entities'

export class LoadUserByPage {
  constructor(private readonly repository: LoadUserByPageRepository) {}

  async load(query: Query): Promise<UserPaginated | null> {
    return await this.repository.loadUserByPage(query)
  }
}
