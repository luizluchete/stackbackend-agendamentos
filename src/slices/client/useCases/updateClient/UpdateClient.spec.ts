import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateClientRepository } from '@/slices/client/repositories'
import { mockClient } from '@/slices/client/entities/ClientEntity.spec'
import { UpdateClient } from './UpdateClient'
import { Query } from '@/app/type'

describe('Update Client', () => {
  let sut: UpdateClient
  let updateClientRepository: MockProxy<UpdateClientRepository>
  const fakeClient = mockClient()
  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    updateClientRepository = mock()
    updateClientRepository.update.mockResolvedValue(fakeClient)
  })

  beforeEach(async () => {
    sut = new UpdateClient(updateClientRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call updateClient of UpdateClientRepository with correct values', async () => {
    await sut.execute(fakeQuery, fakeClient)
    expect(updateClientRepository.update).toHaveBeenCalledWith(
      fakeQuery,
      fakeClient
    )
    expect(updateClientRepository.update).toBeCalledTimes(1)
  })

  it('Should return a new client created when updateClientRepository insert it', async () => {
    const client = await sut.execute(fakeQuery, fakeClient)
    expect(client).toEqual(fakeClient)
  })

  it('Should return null a new client created when updateClientRepository insert it', async () => {
    updateClientRepository.update.mockResolvedValueOnce(null)
    const client = await sut.execute(fakeQuery, fakeClient)
    expect(client).toBeFalsy()
  })

  it('Should rethrow if updateClient of UpdateClientRepository throws', async () => {
    updateClientRepository.update.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery, fakeClient)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
