import { AddOwnerRepository } from '@/slices/owner/repositories/contracts'
import { OwnerData, OwnerEntity } from '../../entities'

export class AddOwner {
  constructor(private readonly repository: AddOwnerRepository) {}

  async execute(data: OwnerData): Promise<OwnerEntity | null> {
    return await this.repository.addOwner(data)
  }
}
