import { UpdateRequestRepository } from '@/slices/request/repositories'
import { RequestData, RequestEntity } from '../../entities'
import { Query } from '@/app/type'

export class UpdateRequest {
  constructor(private readonly repository: UpdateRequestRepository) {}

  async execute(
    query: Query,
    data: RequestData
  ): Promise<RequestEntity | null> {
    return await this.repository.update(query, data)
  }
}
