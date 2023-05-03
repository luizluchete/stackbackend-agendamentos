import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadUserRepository } from '@/slices/user/repositories/contracts'
import { mockUser } from '../../entities/UserEntity.spec'
import { Query } from '@/app/type'
import { LoadUser } from './LoadUser'

describe('LoadUser', () => {
  let sut: LoadUser
  let fakeQuery: Query

  let loadUserRepository: MockProxy<LoadUserRepository>
  const fakeUser = mockUser()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadUserRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadUserRepository.loadUser.mockResolvedValue(fakeUser)
  })

  beforeEach(async () => {
    sut = new LoadUser(loadUserRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadUserRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadUserRepository.loadUser).toHaveBeenCalledWith(fakeQuery)
    expect(loadUserRepository.loadUser).toHaveBeenCalledTimes(1)
  })

  it('Should return a user loaded when LoadUserRepository return it', async () => {
    const user = await sut.load(fakeQuery)
    expect(user).toEqual(fakeUser)
  })

  it('Should return null loaded when LoadUserRepository return it', async () => {
    loadUserRepository.loadUser.mockResolvedValueOnce(null)
    const user = await sut.load(fakeQuery)
    expect(user).toBeFalsy()
  })

  it('Should rethrow if loadUser of LoadUserRepository throws', async () => {
    loadUserRepository.loadUser.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
