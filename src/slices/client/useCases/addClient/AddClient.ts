import { AddClientRepository } from '@/slices/client/repositories/contracts'
import { ClientData, ClientEntity } from '../../entities'

export class AddClient {
  constructor(private readonly repository: AddClientRepository) {}

  async execute(data: ClientData): Promise<ClientEntity | null> {
    return await this.repository.addClient(data)
  }
}
