import { Query } from '@/app/type'
import { LoadClientByPageRepository } from '@/slices/client/repositories'
import { ClientPaginated } from '../../entities'

export class LoadClientByPage {
  constructor(private readonly repository: LoadClientByPageRepository) {}

  async load(query: Query): Promise<ClientPaginated | null> {
    return await this.repository.loadClientByPage(query)
  }
}
