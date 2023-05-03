import { Query } from '@/app/type'
import { LoadRideByPageRepository } from '@/slices/ride/repositories'
import { RidePaginated } from '../../entities'

export class LoadRideByPage {
  constructor(private readonly repository: LoadRideByPageRepository) {}

  async load(query: Query): Promise<RidePaginated | null> {
    return await this.repository.loadRideByPage(query)
  }
}
