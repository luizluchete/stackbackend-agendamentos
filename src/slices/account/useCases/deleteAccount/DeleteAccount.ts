import { DeleteAccountRepository } from '@/slices/account/repositories'
import { Query } from '@/app/type'

export class DeleteAccount {
  constructor(private readonly repository: DeleteAccountRepository) {}

  async execute(query: Query): Promise<void> {
    await this.repository.delete(query)
  }
}
