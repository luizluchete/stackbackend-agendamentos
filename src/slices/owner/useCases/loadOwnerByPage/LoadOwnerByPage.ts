import { Query } from '@/app/type'
import { LoadOwnerByPageRepository } from '@/slices/owner/repositories'
import { OwnerPaginated } from '../../entities'

export class LoadOwnerByPage {
  constructor(private readonly repository: LoadOwnerByPageRepository) {}

  async load(query: Query): Promise<OwnerPaginated | null> {
    return await this.repository.loadOwnerByPage(query)
  }
}
