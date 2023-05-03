import MockDate from 'mockdate'
import { ClientEntity } from './ClientEntity'

export const mockClient = (): ClientEntity => ({
  birthDate: new Date(),
  ownerId: 'any-string',
  userId: 'any_userId',
  appointmentsTotal: 10,
  cpf: 'any_cpf',
  phone: 'any_phone',
  createdById: '123',
  name: 'any_name_client',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
})

export const fakeClientPaginated = {
  total: 11,
  data: [
    mockClient(),
    mockClient(),
    mockClient(),
    mockClient(),
    mockClient(),
    mockClient(),
    mockClient(),
    mockClient(),
    mockClient(),
    mockClient(),
    mockClient(),
  ],
}

describe('Client', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeClient = mockClient()
    const client = new ClientEntity(fakeClient)
    expect(client).toBeTruthy()
    expect(client).toEqual({
      ...fakeClient,
      _id: undefined,
      active: false,
      appointmentsTotal: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
