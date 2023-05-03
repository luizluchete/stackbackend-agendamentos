import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddClientRepository } from '@/slices/client/repositories/contracts'
import { mockClient } from '@/slices/client/entities/ClientEntity.spec'
import { AddClient } from './AddClient'

describe('addClient', () => {
  let sut: AddClient
  let addClientRepository: MockProxy<AddClientRepository>
  const fakeClient = mockClient()

  beforeAll(async () => {
    MockDate.set(new Date())
    addClientRepository = mock()
    addClientRepository.addClient.mockResolvedValue(fakeClient)
  })

  beforeEach(async () => {
    sut = new AddClient(addClientRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addClient of AddClientRepository with correct values', async () => {
    await sut.execute(fakeClient)
    expect(addClientRepository.addClient).toHaveBeenCalledWith(fakeClient)
    expect(addClientRepository.addClient).toBeCalledTimes(1)
  })

  it('Should return a new client created when addClientRepository insert it', async () => {
    const client = await sut.execute(fakeClient)
    expect(client).toEqual(fakeClient)
  })

  it('Should return null a new client created when addClientRepository insert it', async () => {
    addClientRepository.addClient.mockResolvedValueOnce(null)
    const client = await sut.execute(fakeClient)
    expect(client).toBeFalsy()
  })

  it('Should rethrow if addClient of AddClientRepository throws', async () => {
    addClientRepository.addClient.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeClient)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
