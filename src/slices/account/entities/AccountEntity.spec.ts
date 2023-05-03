import MockDate from 'mockdate'
import { AccountEntity } from './AccountEntity'

export const mockAccount = (): AccountEntity => ({
  createdById: '123',
  name: 'any_name_account',
  refreshToken: 'any_refresh_account',
  expiresAt: 'any_expiresAt',
  active: false,
  createdAt: new Date(),
  updatedAt: new Date(),
})

export const fakeAccountPaginated = {
  total: 11,
  data: [
    mockAccount(),
    mockAccount(),
    mockAccount(),
    mockAccount(),
    mockAccount(),
    mockAccount(),
    mockAccount(),
    mockAccount(),
    mockAccount(),
    mockAccount(),
    mockAccount(),
  ],
}

describe('Account', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeAccount = mockAccount()
    const account = new AccountEntity(fakeAccount)
    expect(account).toBeTruthy()
    expect(account).toEqual({
      ...fakeAccount,
      _id: undefined,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
