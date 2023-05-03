import { Query } from '@/app/type'
import { LoadRideRepository } from '@/slices/ride/repositories/contracts'

export class LoadRide {
  constructor(private readonly repository: LoadRideRepository) {}

  async load(query: Query) {
    return await this.repository.loadRide(query)
  }
}
