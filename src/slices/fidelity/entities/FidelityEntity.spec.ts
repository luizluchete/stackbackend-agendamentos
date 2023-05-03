import MockDate from 'mockdate'
import { FidelityEntity } from './FidelityEntity'

export const mockFidelity = (): FidelityEntity => ({
  createdById: '123',
  clientId: 'any_clientId',
  ownerId: 'any_ownerId',
  points: 0,
  requestId: 'any_request',
  name: 'any_name_fidelity',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
})

export const fakeFidelityPaginated = {
  total: 11,
  data: [
    mockFidelity(),
    mockFidelity(),
    mockFidelity(),
    mockFidelity(),
    mockFidelity(),
    mockFidelity(),
    mockFidelity(),
    mockFidelity(),
    mockFidelity(),
    mockFidelity(),
    mockFidelity(),
  ],
}

describe('Fidelity', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeFidelity = mockFidelity()
    const fidelity = new FidelityEntity(fakeFidelity)
    expect(fidelity).toBeTruthy()
    expect(fidelity).toEqual({
      ...fakeFidelity,
      _id: undefined,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
