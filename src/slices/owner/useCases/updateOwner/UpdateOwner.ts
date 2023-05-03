import { UpdateOwnerRepository } from '@/slices/owner/repositories'
import { OwnerData, OwnerEntity } from '../../entities'
import { Query } from '@/app/type'

export class UpdateOwner {
  constructor(private readonly repository: UpdateOwnerRepository) {}

  async execute(
    query: Query,
    data: OwnerData
  ): Promise<OwnerEntity | null> {
    return await this.repository.update(query, data)
  }
}
