import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadAccountByPageRepository } from '@/slices/account/repositories/contracts'
import { fakeAccountPaginated } from '../../entities/AccountEntity.spec'
import { Query } from '@/app/type'
import { LoadAccountByPage } from './LoadAccountByPage'

describe('LoadAccountByPage', () => {
  let sut: LoadAccountByPage
  let fakeQuery: Query

  let loadAccountRepositoryByPage: MockProxy<LoadAccountByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadAccountRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadAccountRepositoryByPage.loadAccountByPage.mockResolvedValue(
      fakeAccountPaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadAccountByPage(loadAccountRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadAccountByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadAccountRepositoryByPage.loadAccountByPage
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadAccountRepositoryByPage.loadAccountByPage
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a account loaded when LoadAccountByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeAccountPaginated)
  })

  it('Should return null loaded when LoadAccountByPageRepository return it', async () => {
    loadAccountRepositoryByPage.loadAccountByPage.mockResolvedValueOnce(null)
    const account = await sut.load(fakeQuery)
    expect(account).toBeFalsy()
  })

  it('Should rethrow if loadAccountByPage of LoadAccountByPageRepository throws', async () => {
    loadAccountRepositoryByPage.loadAccountByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
