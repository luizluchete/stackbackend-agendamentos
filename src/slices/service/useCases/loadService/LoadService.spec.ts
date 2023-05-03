import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadServiceRepository } from '@/slices/service/repositories/contracts'
import { mockService } from '../../entities/ServiceEntity.spec'
import { Query } from '@/app/type'
import { LoadService } from './LoadService'

describe('LoadService', () => {
  let sut: LoadService
  let fakeQuery: Query

  let loadServiceRepository: MockProxy<LoadServiceRepository>
  const fakeService = mockService()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadServiceRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadServiceRepository.loadService.mockResolvedValue(fakeService)
  })

  beforeEach(async () => {
    sut = new LoadService(loadServiceRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadServiceRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadServiceRepository.loadService).toHaveBeenCalledWith(fakeQuery)
    expect(loadServiceRepository.loadService).toHaveBeenCalledTimes(1)
  })

  it('Should return a service loaded when LoadServiceRepository return it', async () => {
    const service = await sut.load(fakeQuery)
    expect(service).toEqual(fakeService)
  })

  it('Should return null loaded when LoadServiceRepository return it', async () => {
    loadServiceRepository.loadService.mockResolvedValueOnce(null)
    const service = await sut.load(fakeQuery)
    expect(service).toBeFalsy()
  })

  it('Should rethrow if loadService of LoadServiceRepository throws', async () => {
    loadServiceRepository.loadService.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
