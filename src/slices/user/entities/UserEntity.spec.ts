import MockDate from 'mockdate'
import { UserEntity } from './UserEntity'

export const mockUser = (): UserEntity => ({
  confirmedEmail: false,
  sendedEmail: false,
  role: 'any_role',
  cpf: 'any_cpf',
  email: 'any_email',
  ownerId: 'any_owner_id',
  password: 'any_password',
  payDay: new Date(),
  phone: 'any_phone',
  photoId: 'any_photoId',
  photoUrl: 'any_photoUrl',
  createdById: '123',
  name: 'any_name_user',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
})

export const fakeUserPaginated = {
  total: 11,
  data: [
    mockUser(),
    mockUser(),
    mockUser(),
    mockUser(),
    mockUser(),
    mockUser(),
    mockUser(),
    mockUser(),
    mockUser(),
    mockUser(),
    mockUser(),
  ],
}

describe('User', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeUser = mockUser()
    const user = new UserEntity(fakeUser)
    expect(user).toBeTruthy()
    expect(user).toEqual({
      ...fakeUser,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
