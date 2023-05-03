import { AddRideRepository } from '@/slices/ride/repositories/contracts'
import { RideData, RideEntity } from '../../entities'

export class AddRide {
  constructor(private readonly repository: AddRideRepository) {}

  async execute(data: RideData): Promise<RideEntity | null> {
    return await this.repository.addRide(data)
  }
}
