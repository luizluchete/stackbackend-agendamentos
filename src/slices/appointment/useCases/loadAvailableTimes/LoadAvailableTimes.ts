import { LoadAvailableTimesRepository } from '@/slices/appointment/repositories/contracts'
import { QueryAvailableTimesRepository } from '../../entities'

export class LoadAvailableTimes {
  constructor(private readonly repository: LoadAvailableTimesRepository) {}

  async loadAvailableTimes(query: QueryAvailableTimesRepository) {
    return await this.repository.loadAvailableTimes(query)
  }
}
