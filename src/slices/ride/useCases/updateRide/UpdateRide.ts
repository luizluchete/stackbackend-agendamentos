import { UpdateRideRepository } from '@/slices/ride/repositories'
import { RideData, RideEntity } from '../../entities'
import { Query } from '@/app/type'

export class UpdateRide {
  constructor(private readonly repository: UpdateRideRepository) {}

  async execute(
    query: Query,
    data: RideData
  ): Promise<RideEntity | null> {
    return await this.repository.update(query, data)
  }
}
