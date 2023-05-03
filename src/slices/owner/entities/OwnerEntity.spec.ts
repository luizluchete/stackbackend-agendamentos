import MockDate from 'mockdate'
import { OwnerEntity } from './OwnerEntity'

export const mockOwner = (): OwnerEntity => ({
  createdById: '123',
  name: 'fakeOwnerEntity',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  costByTimeDriving: 1.2,
  minimumTimeForReSchedule: 50,
  fidelityTaxPoints: 20,
  appointmentsTotal: 3,
  ratingsTotal: 4,
  haveDelivery: true,
  days1: {
    monday1: true,
    sunday1: true,
    tuesday1: true,
    thursday1: true,
    friday1: true,
    wednsday1: true,
    saturday1: true,
  },
  hourEnd1: '23:59',
  hourStart1: '00:00',
  typeTax: 'fixed',
})

export const fakeOwnerPaginated = {
  total: 11,
  data: [
    mockOwner(),
    mockOwner(),
    mockOwner(),
    mockOwner(),
    mockOwner(),
    mockOwner(),
    mockOwner(),
    mockOwner(),
    mockOwner(),
    mockOwner(),
    mockOwner(),
  ],
}

describe('Owner', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeOwner = mockOwner()
    const owner = new OwnerEntity(fakeOwner)
    expect(owner).toBeTruthy()
    expect(owner).toEqual({
      ...fakeOwner,
      _id: undefined,
      active: false,
      ratingsTotal: 0,
      appointmentsTotal: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
