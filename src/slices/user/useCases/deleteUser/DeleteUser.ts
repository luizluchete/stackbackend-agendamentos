import { DeleteUserRepository } from '@/slices/user/repositories'
import { Query } from '@/app/type'

export class DeleteUser {
  constructor(private readonly repository: DeleteUserRepository) {}

  async execute(query: Query): Promise<void> {
    await this.repository.delete(query)
  }
}
