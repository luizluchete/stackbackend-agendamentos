import MockDate from 'mockdate'
import { OrderData, OrderEntity } from './OrderEntity'

export const mockOrder = (): OrderData => ({
  _id: '123',
  createdById: '123',
  name: 'fakeOrderEntity',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  appointmentDate: new Date(),
  comissionPaidByOwner: true,
  comissionValue: 80.9,
  extraCost: 0,
  haveFidelity: true,
  normalCost: 80.9,
  orderPaidByClient: true,
  paymentForm: 'pix',
  percentageAdopted: 80.9,
  pointsUsed: 0,
  totalValue: 93,
})

export const fakeOrderPaginated = {
  total: 11,
  data: [
    mockOrder(),
    mockOrder(),
    mockOrder(),
    mockOrder(),
    mockOrder(),
    mockOrder(),
    mockOrder(),
    mockOrder(),
    mockOrder(),
    mockOrder(),
    mockOrder(),
  ],
}

describe('Order', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeOrder = mockOrder()
    const order = new OrderEntity(fakeOrder)
    expect(order).toBeTruthy()
    expect(order).toEqual({
      ...fakeOrder,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
