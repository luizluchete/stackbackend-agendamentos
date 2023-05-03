import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteRequestRepository } from '@/slices/request/repositories'
import { DeleteRequest } from './DeleteRequest'
import { Query } from '@/app/type'

describe('Delete Request', () => {
  let sut: DeleteRequest
  let deleteRequestRepository: MockProxy<DeleteRequestRepository>

  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    deleteRequestRepository = mock()
    deleteRequestRepository.delete.mockResolvedValue()
  })

  beforeEach(async () => {
    sut = new DeleteRequest(deleteRequestRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call deleteRequest of DeleteRequestRepository with correct values', async () => {
    await sut.execute(fakeQuery)
    expect(deleteRequestRepository.delete).toHaveBeenCalledWith(fakeQuery)
    expect(deleteRequestRepository.delete).toBeCalledTimes(1)
  })

  it('Should rethrow if deleteRequest of DeleteRequestRepository throws', async () => {
    deleteRequestRepository.delete.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
