import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteAccountRepository } from '@/slices/account/repositories'
import { DeleteAccount } from './DeleteAccount'
import { Query } from '@/app/type'

describe('Delete Account', () => {
  let sut: DeleteAccount
  let deleteAccountRepository: MockProxy<DeleteAccountRepository>

  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    deleteAccountRepository = mock()
    deleteAccountRepository.delete.mockResolvedValue()
  })

  beforeEach(async () => {
    sut = new DeleteAccount(deleteAccountRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call deleteAccount of DeleteAccountRepository with correct values', async () => {
    await sut.execute(fakeQuery)
    expect(deleteAccountRepository.delete).toHaveBeenCalledWith(fakeQuery)
    expect(deleteAccountRepository.delete).toBeCalledTimes(1)
  })

  it('Should rethrow if deleteAccount of DeleteAccountRepository throws', async () => {
    deleteAccountRepository.delete.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
