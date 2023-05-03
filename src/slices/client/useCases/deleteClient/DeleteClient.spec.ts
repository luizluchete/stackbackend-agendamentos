import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteClientRepository } from '@/slices/client/repositories'
import { DeleteClient } from './DeleteClient'
import { Query } from '@/app/type'

describe('Delete Client', () => {
  let sut: DeleteClient
  let deleteClientRepository: MockProxy<DeleteClientRepository>

  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    deleteClientRepository = mock()
    deleteClientRepository.delete.mockResolvedValue()
  })

  beforeEach(async () => {
    sut = new DeleteClient(deleteClientRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call deleteClient of DeleteClientRepository with correct values', async () => {
    await sut.execute(fakeQuery)
    expect(deleteClientRepository.delete).toHaveBeenCalledWith(fakeQuery)
    expect(deleteClientRepository.delete).toBeCalledTimes(1)
  })

  it('Should rethrow if deleteClient of DeleteClientRepository throws', async () => {
    deleteClientRepository.delete.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
