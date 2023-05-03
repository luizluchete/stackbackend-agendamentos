import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateUserRepository } from '@/slices/user/repositories'
import { mockUser } from '@/slices/user/entities/UserEntity.spec'
import { UpdateUser } from './UpdateUser'
import { Query } from '@/app/type'

describe('Update User', () => {
  let sut: UpdateUser
  let updateUserRepository: MockProxy<UpdateUserRepository>
  const fakeUser = mockUser()
  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    updateUserRepository = mock()
    updateUserRepository.update.mockResolvedValue(fakeUser)
  })

  beforeEach(async () => {
    sut = new UpdateUser(updateUserRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call updateUser of UpdateUserRepository with correct values', async () => {
    await sut.execute(fakeQuery, fakeUser)
    expect(updateUserRepository.update).toHaveBeenCalledWith(
      fakeQuery,
      fakeUser
    )
    expect(updateUserRepository.update).toBeCalledTimes(1)
  })

  it('Should return a new user created when updateUserRepository insert it', async () => {
    const user = await sut.execute(fakeQuery, fakeUser)
    expect(user).toEqual(fakeUser)
  })

  it('Should return null a new user created when updateUserRepository insert it', async () => {
    updateUserRepository.update.mockResolvedValueOnce(null)
    const user = await sut.execute(fakeQuery, fakeUser)
    expect(user).toBeFalsy()
  })

  it('Should rethrow if updateUser of UpdateUserRepository throws', async () => {
    updateUserRepository.update.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery, fakeUser)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
