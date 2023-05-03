import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadRequestRepository } from '@/slices/request/repositories/contracts'
import { mockRequest } from '../../entities/RequestEntity.spec'
import { Query } from '@/app/type'
import { LoadRequest } from './LoadRequest'

describe('LoadRequest', () => {
  let sut: LoadRequest
  let fakeQuery: Query

  let loadRequestRepository: MockProxy<LoadRequestRepository>
  const fakeRequest = mockRequest()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadRequestRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadRequestRepository.loadRequest.mockResolvedValue(fakeRequest)
  })

  beforeEach(async () => {
    sut = new LoadRequest(loadRequestRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadRequestRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadRequestRepository.loadRequest).toHaveBeenCalledWith(fakeQuery)
    expect(loadRequestRepository.loadRequest).toHaveBeenCalledTimes(1)
  })

  it('Should return a request loaded when LoadRequestRepository return it', async () => {
    const request = await sut.load(fakeQuery)
    expect(request).toEqual(fakeRequest)
  })

  it('Should return null loaded when LoadRequestRepository return it', async () => {
    loadRequestRepository.loadRequest.mockResolvedValueOnce(null)
    const request = await sut.load(fakeQuery)
    expect(request).toBeFalsy()
  })

  it('Should rethrow if loadRequest of LoadRequestRepository throws', async () => {
    loadRequestRepository.loadRequest.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
