import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddServiceRepository } from '@/slices/service/repositories/contracts'
import { mockService } from '@/slices/service/entities/ServiceEntity.spec'
import { AddService } from './AddService'

describe('addService', () => {
  let sut: AddService
  let addServiceRepository: MockProxy<AddServiceRepository>
  const fakeService = mockService()

  beforeAll(async () => {
    MockDate.set(new Date())
    addServiceRepository = mock()
    addServiceRepository.addService.mockResolvedValue(fakeService)
  })

  beforeEach(async () => {
    sut = new AddService(addServiceRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addService of AddServiceRepository with correct values', async () => {
    await sut.execute(fakeService)
    expect(addServiceRepository.addService).toHaveBeenCalledWith(fakeService)
    expect(addServiceRepository.addService).toBeCalledTimes(1)
  })

  it('Should return a new service created when addServiceRepository insert it', async () => {
    const service = await sut.execute(fakeService)
    expect(service).toEqual(fakeService)
  })

  it('Should return null a new service created when addServiceRepository insert it', async () => {
    addServiceRepository.addService.mockResolvedValueOnce(null)
    const service = await sut.execute(fakeService)
    expect(service).toBeFalsy()
  })

  it('Should rethrow if addService of AddServiceRepository throws', async () => {
    addServiceRepository.addService.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeService)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
