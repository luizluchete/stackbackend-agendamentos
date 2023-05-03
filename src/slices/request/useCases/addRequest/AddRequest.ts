import { AddRequestRepository } from '@/slices/request/repositories/contracts'
import { RequestData, RequestEntity } from '../../entities'

export class AddRequest {
  constructor(private readonly repository: AddRequestRepository) {}

  async execute(data: RequestData): Promise<RequestEntity | null> {
    return await this.repository.addRequest(data)
  }
}
