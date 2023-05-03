import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateAccountRepository } from '@/slices/account/repositories'
import { mockAccount } from '@/slices/account/entities/AccountEntity.spec'
import { UpdateAccount } from './UpdateAccount'
import { Query } from '@/app/type'

describe('Update Account', () => {
  let sut: UpdateAccount
  let updateAccountRepository: MockProxy<UpdateAccountRepository>
  const fakeAccount = mockAccount()
  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    updateAccountRepository = mock()
    updateAccountRepository.update.mockResolvedValue(fakeAccount)
  })

  beforeEach(async () => {
    sut = new UpdateAccount(updateAccountRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call updateAccount of UpdateAccountRepository with correct values', async () => {
    await sut.execute(fakeQuery, fakeAccount)
    expect(updateAccountRepository.update).toHaveBeenCalledWith(
      fakeQuery,
      fakeAccount
    )
    expect(updateAccountRepository.update).toBeCalledTimes(1)
  })

  it('Should return a new account created when updateAccountRepository insert it', async () => {
    const account = await sut.execute(fakeQuery, fakeAccount)
    expect(account).toEqual(fakeAccount)
  })

  it('Should return null a new account created when updateAccountRepository insert it', async () => {
    updateAccountRepository.update.mockResolvedValueOnce(null)
    const account = await sut.execute(fakeQuery, fakeAccount)
    expect(account).toBeFalsy()
  })

  it('Should rethrow if updateAccount of UpdateAccountRepository throws', async () => {
    updateAccountRepository.update.mockRejectedValueOnce(new Error('any_error'))
    await expect(sut.execute(fakeQuery, fakeAccount)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
