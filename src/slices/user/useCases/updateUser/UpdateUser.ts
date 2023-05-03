import { UpdateUserRepository } from '@/slices/user/repositories'
import { UserData, UserEntity } from '../../entities'
import { Query } from '@/app/type'

export class UpdateUser {
  constructor(private readonly repository: UpdateUserRepository) {}

  async execute(
    query: Query,
    data: UserData
  ): Promise<UserEntity | null> {
    return await this.repository.update(query, data)
  }
}
