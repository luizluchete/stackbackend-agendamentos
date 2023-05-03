import { Query } from '@/app/type'
import { LoadServiceByPageRepository } from '@/slices/service/repositories'
import { ServicePaginated } from '../../entities'

export class LoadServiceByPage {
  constructor(private readonly repository: LoadServiceByPageRepository) {}

  async load(query: Query): Promise<ServicePaginated | null> {
    return await this.repository.loadServiceByPage(query)
  }
}
