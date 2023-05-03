import MockDate from 'mockdate'
import { RideData, RideEntity } from './RideEntity'

export const mockRide = (): RideData => ({
  _id: '123',
  createdById: '123',
  name: 'fakeRideEntity',
  active: true,
  createdAt: new Date(),
  requestId: 'fakeRequestId',
  driverUserType: 'owner',
  origin: [43.111, 22.2222],
  destiny: [43.111, 22.2222],
  status: 0,
  distance: 0,
  distanceTime: 0,
  maxCostEstimated: 0,
  minCostEstimated: 0,
  finalCost: 0,
  costDefinedByOwner: 0,
  initDate: new Date(),
  endDateEstimated: new Date(),
  endDate: new Date(),
  updatedAt: new Date(),
})

export const fakeRidePaginated = {
  total: 11,
  data: [
    mockRide(),
    mockRide(),
    mockRide(),
    mockRide(),
    mockRide(),
    mockRide(),
    mockRide(),
    mockRide(),
    mockRide(),
    mockRide(),
    mockRide(),
  ],
}

describe('Ride', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeRide = mockRide()
    const ride = new RideEntity(fakeRide)
    expect(ride).toBeTruthy()
    expect(ride).toEqual({
      ...fakeRide,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
