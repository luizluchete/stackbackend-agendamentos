import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateRequestRepository } from '@/slices/request/repositories'
import { mockRequest } from '@/slices/request/entities/RequestEntity.spec'
import { UpdateRequest } from './UpdateRequest'
import { Query } from '@/app/type'

describe('Update Request', () => {
  let sut: UpdateRequest
  let updateRequestRepository: MockProxy<UpdateRequestRepository>
  const fakeRequest = mockRequest()
  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    updateRequestRepository = mock()
    updateRequestRepository.update.mockResolvedValue(fakeRequest)
  })

  beforeEach(async () => {
    sut = new UpdateRequest(updateRequestRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call updateRequest of UpdateRequestRepository with correct values', async () => {
    await sut.execute(fakeQuery, fakeRequest)
    expect(updateRequestRepository.update).toHaveBeenCalledWith(
      fakeQuery,
      fakeRequest
    )
    expect(updateRequestRepository.update).toBeCalledTimes(1)
  })

  it('Should return a new request created when updateRequestRepository insert it', async () => {
    const request = await sut.execute(fakeQuery, fakeRequest)
    expect(request).toEqual(fakeRequest)
  })

  it('Should return null a new request created when updateRequestRepository insert it', async () => {
    updateRequestRepository.update.mockResolvedValueOnce(null)
    const request = await sut.execute(fakeQuery, fakeRequest)
    expect(request).toBeFalsy()
  })

  it('Should rethrow if updateRequest of UpdateRequestRepository throws', async () => {
    updateRequestRepository.update.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery, fakeRequest)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
