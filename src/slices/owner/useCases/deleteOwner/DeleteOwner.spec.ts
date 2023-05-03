import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteOwnerRepository } from '@/slices/owner/repositories'
import { DeleteOwner } from './DeleteOwner'
import { Query } from '@/app/type'

describe('Delete Owner', () => {
  let sut: DeleteOwner
  let deleteOwnerRepository: MockProxy<DeleteOwnerRepository>

  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    deleteOwnerRepository = mock()
    deleteOwnerRepository.delete.mockResolvedValue()
  })

  beforeEach(async () => {
    sut = new DeleteOwner(deleteOwnerRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call deleteOwner of DeleteOwnerRepository with correct values', async () => {
    await sut.execute(fakeQuery)
    expect(deleteOwnerRepository.delete).toHaveBeenCalledWith(fakeQuery)
    expect(deleteOwnerRepository.delete).toBeCalledTimes(1)
  })

  it('Should rethrow if deleteOwner of DeleteOwnerRepository throws', async () => {
    deleteOwnerRepository.delete.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
