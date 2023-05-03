import { AddServiceRepository } from '@/slices/service/repositories/contracts'
import { ServiceData, ServiceEntity } from '../../entities'

export class AddService {
  constructor(private readonly repository: AddServiceRepository) {}

  async execute(data: ServiceData): Promise<ServiceEntity | null> {
    return await this.repository.addService(data)
  }
}
