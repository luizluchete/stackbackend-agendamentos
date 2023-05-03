import { UpdateServiceRepository } from '@/slices/service/repositories'
import { ServiceData, ServiceEntity } from '../../entities'
import { Query } from '@/app/type'

export class UpdateService {
  constructor(private readonly repository: UpdateServiceRepository) {}

  async execute(
    query: Query,
    data: ServiceData
  ): Promise<ServiceEntity | null> {
    return await this.repository.update(query, data)
  }
}
