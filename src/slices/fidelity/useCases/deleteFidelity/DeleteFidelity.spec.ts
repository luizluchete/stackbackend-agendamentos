import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteFidelityRepository } from '@/slices/fidelity/repositories'
import { DeleteFidelity } from './DeleteFidelity'
import { Query } from '@/app/type'

describe('Delete Fidelity', () => {
  let sut: DeleteFidelity
  let deleteFidelityRepository: MockProxy<DeleteFidelityRepository>

  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    deleteFidelityRepository = mock()
    deleteFidelityRepository.delete.mockResolvedValue()
  })

  beforeEach(async () => {
    sut = new DeleteFidelity(deleteFidelityRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call deleteFidelity of DeleteFidelityRepository with correct values', async () => {
    await sut.execute(fakeQuery)
    expect(deleteFidelityRepository.delete).toHaveBeenCalledWith(fakeQuery)
    expect(deleteFidelityRepository.delete).toBeCalledTimes(1)
  })

  it('Should rethrow if deleteFidelity of DeleteFidelityRepository throws', async () => {
    deleteFidelityRepository.delete.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
