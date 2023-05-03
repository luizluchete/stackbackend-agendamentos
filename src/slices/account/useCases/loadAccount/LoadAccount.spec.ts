import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadAccountRepository } from '@/slices/account/repositories/contracts'
import { mockAccount } from '../../entities/AccountEntity.spec'
import { Query } from '@/app/type'
import { LoadAccount } from './LoadAccount'

describe('LoadAccount', () => {
  let sut: LoadAccount
  let fakeQuery: Query

  let loadAccountRepository: MockProxy<LoadAccountRepository>
  const fakeAccount = mockAccount()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadAccountRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadAccountRepository.loadAccount.mockResolvedValue(fakeAccount)
  })

  beforeEach(async () => {
    sut = new LoadAccount(loadAccountRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadAccountRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadAccountRepository.loadAccount).toHaveBeenCalledWith(fakeQuery)
    expect(loadAccountRepository.loadAccount).toHaveBeenCalledTimes(1)
  })

  it('Should return a account loaded when LoadAccountRepository return it', async () => {
    const account = await sut.load(fakeQuery)
    expect(account).toEqual(fakeAccount)
  })

  it('Should return null loaded when LoadAccountRepository return it', async () => {
    loadAccountRepository.loadAccount.mockResolvedValueOnce(null)
    const account = await sut.load(fakeQuery)
    expect(account).toBeFalsy()
  })

  it('Should rethrow if loadAccount of LoadAccountRepository throws', async () => {
    loadAccountRepository.loadAccount.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
