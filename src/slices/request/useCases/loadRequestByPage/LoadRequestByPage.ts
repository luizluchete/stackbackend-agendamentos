import { Query } from '@/app/type'
import { LoadRequestByPageRepository } from '@/slices/request/repositories'
import { RequestPaginated } from '../../entities'

export class LoadRequestByPage {
  constructor(private readonly repository: LoadRequestByPageRepository) {}

  async load(query: Query): Promise<RequestPaginated | null> {
    return await this.repository.loadRequestByPage(query)
  }
}
