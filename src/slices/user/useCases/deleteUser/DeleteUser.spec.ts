import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteUserRepository } from '@/slices/user/repositories'
import { DeleteUser } from './DeleteUser'
import { Query } from '@/app/type'

describe('Delete User', () => {
  let sut: DeleteUser
  let deleteUserRepository: MockProxy<DeleteUserRepository>

  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    deleteUserRepository = mock()
    deleteUserRepository.delete.mockResolvedValue()
  })

  beforeEach(async () => {
    sut = new DeleteUser(deleteUserRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call deleteUser of DeleteUserRepository with correct values', async () => {
    await sut.execute(fakeQuery)
    expect(deleteUserRepository.delete).toHaveBeenCalledWith(fakeQuery)
    expect(deleteUserRepository.delete).toBeCalledTimes(1)
  })

  it('Should rethrow if deleteUser of DeleteUserRepository throws', async () => {
    deleteUserRepository.delete.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
