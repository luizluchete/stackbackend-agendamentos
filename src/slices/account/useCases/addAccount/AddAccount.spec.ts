import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddAccountRepository } from '@/slices/account/repositories/contracts'
import { mockAccount } from '@/slices/account/entities/AccountEntity.spec'
import { AddAccount } from './AddAccount'

describe('addAccount', () => {
  let sut: AddAccount
  let addAccountRepository: MockProxy<AddAccountRepository>
  const fakeAccount = mockAccount()

  beforeAll(async () => {
    MockDate.set(new Date())
    addAccountRepository = mock()
    addAccountRepository.addAccount.mockResolvedValue(fakeAccount)
  })

  beforeEach(async () => {
    sut = new AddAccount(addAccountRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addAccount of AddAccountRepository with correct values', async () => {
    await sut.execute(fakeAccount)
    expect(addAccountRepository.addAccount).toHaveBeenCalledWith(fakeAccount)
    expect(addAccountRepository.addAccount).toBeCalledTimes(1)
  })

  it('Should return a new account created when addAccountRepository insert it', async () => {
    const account = await sut.execute(fakeAccount)
    expect(account).toEqual(fakeAccount)
  })

  it('Should return null a new account created when addAccountRepository insert it', async () => {
    addAccountRepository.addAccount.mockResolvedValueOnce(null)
    const account = await sut.execute(fakeAccount)
    expect(account).toBeFalsy()
  })

  it('Should rethrow if addAccount of AddAccountRepository throws', async () => {
    addAccountRepository.addAccount.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeAccount)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
