import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadUserByPageRepository } from '@/slices/user/repositories/contracts'
import { fakeUserPaginated } from '../../entities/UserEntity.spec'
import { Query } from '@/app/type'
import { LoadUserByPage } from './LoadUserByPage'

describe('LoadUserByPage', () => {
  let sut: LoadUserByPage
  let fakeQuery: Query

  let loadUserRepositoryByPage: MockProxy<LoadUserByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadUserRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadUserRepositoryByPage.loadUserByPage.mockResolvedValue(
      fakeUserPaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadUserByPage(loadUserRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadUserByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadUserRepositoryByPage.loadUserByPage
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadUserRepositoryByPage.loadUserByPage
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a user loaded when LoadUserByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeUserPaginated)
  })

  it('Should return null loaded when LoadUserByPageRepository return it', async () => {
    loadUserRepositoryByPage.loadUserByPage.mockResolvedValueOnce(null)
    const user = await sut.load(fakeQuery)
    expect(user).toBeFalsy()
  })

  it('Should rethrow if loadUserByPage of LoadUserByPageRepository throws', async () => {
    loadUserRepositoryByPage.loadUserByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
