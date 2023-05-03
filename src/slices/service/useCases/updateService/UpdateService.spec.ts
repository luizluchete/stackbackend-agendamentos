import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateServiceRepository } from '@/slices/service/repositories'
import { mockService } from '@/slices/service/entities/ServiceEntity.spec'
import { UpdateService } from './UpdateService'
import { Query } from '@/app/type'

describe('Update Service', () => {
  let sut: UpdateService
  let updateServiceRepository: MockProxy<UpdateServiceRepository>
  const fakeService = mockService()
  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    updateServiceRepository = mock()
    updateServiceRepository.update.mockResolvedValue(fakeService)
  })

  beforeEach(async () => {
    sut = new UpdateService(updateServiceRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call updateService of UpdateServiceRepository with correct values', async () => {
    await sut.execute(fakeQuery, fakeService)
    expect(updateServiceRepository.update).toHaveBeenCalledWith(
      fakeQuery,
      fakeService
    )
    expect(updateServiceRepository.update).toBeCalledTimes(1)
  })

  it('Should return a new service created when updateServiceRepository insert it', async () => {
    const service = await sut.execute(fakeQuery, fakeService)
    expect(service).toEqual(fakeService)
  })

  it('Should return null a new service created when updateServiceRepository insert it', async () => {
    updateServiceRepository.update.mockResolvedValueOnce(null)
    const service = await sut.execute(fakeQuery, fakeService)
    expect(service).toBeFalsy()
  })

  it('Should rethrow if updateService of UpdateServiceRepository throws', async () => {
    updateServiceRepository.update.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery, fakeService)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
