import { UpdateClientRepository } from '@/slices/client/repositories'
import { ClientData, ClientEntity } from '../../entities'
import { Query } from '@/app/type'

export class UpdateClient {
  constructor(private readonly repository: UpdateClientRepository) {}

  async execute(
    query: Query,
    data: ClientData
  ): Promise<ClientEntity | null> {
    return await this.repository.update(query, data)
  }
}
