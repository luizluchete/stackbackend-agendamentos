import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddRequestRepository } from '@/slices/request/repositories/contracts'
import { mockRequest } from '@/slices/request/entities/RequestEntity.spec'
import { AddRequest } from './AddRequest'

describe('addRequest', () => {
  let sut: AddRequest
  let addRequestRepository: MockProxy<AddRequestRepository>
  const fakeRequest = mockRequest()

  beforeAll(async () => {
    MockDate.set(new Date())
    addRequestRepository = mock()
    addRequestRepository.addRequest.mockResolvedValue(fakeRequest)
  })

  beforeEach(async () => {
    sut = new AddRequest(addRequestRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addRequest of AddRequestRepository with correct values', async () => {
    await sut.execute(fakeRequest)
    expect(addRequestRepository.addRequest).toHaveBeenCalledWith(fakeRequest)
    expect(addRequestRepository.addRequest).toBeCalledTimes(1)
  })

  it('Should return a new request created when addRequestRepository insert it', async () => {
    const request = await sut.execute(fakeRequest)
    expect(request).toEqual(fakeRequest)
  })

  it('Should return null a new request created when addRequestRepository insert it', async () => {
    addRequestRepository.addRequest.mockResolvedValueOnce(null)
    const request = await sut.execute(fakeRequest)
    expect(request).toBeFalsy()
  })

  it('Should rethrow if addRequest of AddRequestRepository throws', async () => {
    addRequestRepository.addRequest.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeRequest)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
