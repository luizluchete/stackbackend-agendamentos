import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteServiceRepository } from '@/slices/service/repositories'
import { DeleteService } from './DeleteService'
import { Query } from '@/app/type'

describe('Delete Service', () => {
  let sut: DeleteService
  let deleteServiceRepository: MockProxy<DeleteServiceRepository>

  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    deleteServiceRepository = mock()
    deleteServiceRepository.delete.mockResolvedValue()
  })

  beforeEach(async () => {
    sut = new DeleteService(deleteServiceRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call deleteService of DeleteServiceRepository with correct values', async () => {
    await sut.execute(fakeQuery)
    expect(deleteServiceRepository.delete).toHaveBeenCalledWith(fakeQuery)
    expect(deleteServiceRepository.delete).toBeCalledTimes(1)
  })

  it('Should rethrow if deleteService of DeleteServiceRepository throws', async () => {
    deleteServiceRepository.delete.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
