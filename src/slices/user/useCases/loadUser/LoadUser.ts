import { Query } from '@/app/type'
import { LoadUserRepository } from '@/slices/user/repositories/contracts'

export class LoadUser {
  constructor(private readonly repository: LoadUserRepository) {}

  async load(query: Query) {
    return await this.repository.loadUser(query)
  }
}
