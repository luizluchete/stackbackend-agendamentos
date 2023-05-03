import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadClientRepository } from '@/slices/client/repositories/contracts'
import { mockClient } from '../../entities/ClientEntity.spec'
import { Query } from '@/app/type'
import { LoadClient } from './LoadClient'

describe('LoadClient', () => {
  let sut: LoadClient
  let fakeQuery: Query

  let loadClientRepository: MockProxy<LoadClientRepository>
  const fakeClient = mockClient()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadClientRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadClientRepository.loadClient.mockResolvedValue(fakeClient)
  })

  beforeEach(async () => {
    sut = new LoadClient(loadClientRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadClientRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadClientRepository.loadClient).toHaveBeenCalledWith(fakeQuery)
    expect(loadClientRepository.loadClient).toHaveBeenCalledTimes(1)
  })

  it('Should return a client loaded when LoadClientRepository return it', async () => {
    const client = await sut.load(fakeQuery)
    expect(client).toEqual(fakeClient)
  })

  it('Should return null loaded when LoadClientRepository return it', async () => {
    loadClientRepository.loadClient.mockResolvedValueOnce(null)
    const client = await sut.load(fakeQuery)
    expect(client).toBeFalsy()
  })

  it('Should rethrow if loadClient of LoadClientRepository throws', async () => {
    loadClientRepository.loadClient.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
