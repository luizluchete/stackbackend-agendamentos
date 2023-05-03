import { AddUserRepository } from '@/slices/user/repositories/contracts'
import { UserData, UserEntity } from '../../entities'

export class AddUser {
  constructor(private readonly repository: AddUserRepository) {}

  async execute(data: UserData): Promise<UserEntity | null> {
    return await this.repository.addUser(data)
  }
}
