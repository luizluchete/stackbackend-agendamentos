import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddUserRepository } from '@/slices/user/repositories/contracts'
import { mockUser } from '@/slices/user/entities/UserEntity.spec'
import { AddUser } from './AddUser'

describe('addUser', () => {
  let sut: AddUser
  let addUserRepository: MockProxy<AddUserRepository>
  const fakeUser = mockUser()

  beforeAll(async () => {
    MockDate.set(new Date())
    addUserRepository = mock()
    addUserRepository.addUser.mockResolvedValue(fakeUser)
  })

  beforeEach(async () => {
    sut = new AddUser(addUserRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addUser of AddUserRepository with correct values', async () => {
    await sut.execute(fakeUser)
    expect(addUserRepository.addUser).toHaveBeenCalledWith(fakeUser)
    expect(addUserRepository.addUser).toBeCalledTimes(1)
  })

  it('Should return a new user created when addUserRepository insert it', async () => {
    const user = await sut.execute(fakeUser)
    expect(user).toEqual(fakeUser)
  })

  it('Should return null a new user created when addUserRepository insert it', async () => {
    addUserRepository.addUser.mockResolvedValueOnce(null)
    const user = await sut.execute(fakeUser)
    expect(user).toBeFalsy()
  })

  it('Should rethrow if addUser of AddUserRepository throws', async () => {
    addUserRepository.addUser.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeUser)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
