import { DeleteRideRepository } from '@/slices/ride/repositories'
import { Query } from '@/app/type'

export class DeleteRide {
  constructor(private readonly repository: DeleteRideRepository) {}

  async execute(query: Query): Promise<void> {
    await this.repository.delete(query)
  }
}
