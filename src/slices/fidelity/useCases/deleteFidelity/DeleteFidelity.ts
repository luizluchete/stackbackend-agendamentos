import { DeleteFidelityRepository } from '@/slices/fidelity/repositories'
import { Query } from '@/app/type'

export class DeleteFidelity {
  constructor(private readonly repository: DeleteFidelityRepository) {}

  async execute(query: Query): Promise<void> {
    await this.repository.delete(query)
  }
}
