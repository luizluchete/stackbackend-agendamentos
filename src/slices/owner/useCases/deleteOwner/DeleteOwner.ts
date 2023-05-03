import { DeleteOwnerRepository } from '@/slices/owner/repositories'
import { Query } from '@/app/type'

export class DeleteOwner {
  constructor(private readonly repository: DeleteOwnerRepository) {}

  async execute(query: Query): Promise<void> {
    await this.repository.delete(query)
  }
}
