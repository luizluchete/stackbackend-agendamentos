import MockDate from 'mockdate'
import { RequestData, RequestEntity } from './RequestEntity'
import { mockOrder } from '@/slices/order/entities/OrderEntity.spec'
import { mockFidelity } from '@/slices/fidelity/entities/FidelityEntity.spec'
import { mockRecurrence } from '@/slices/recurrence/entities/RecurrenceEntity.spec'
import { mockRide } from '@/slices/ride/entities/RideEntity.spec'

const fakeOrderEntity = mockOrder()
const fakeFidelityEntity = mockFidelity()
const fakeRecurrenceEntity = mockRecurrence()
const fakeRideEntity = mockRide()

export const mockRequest = (): RequestData => ({
  createdById: '123',
  name: 'fakeRequestEntity',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  haveDelivery: true,
  haveRecurrence: true,
  haveFidelity: true,
  message: 'Olá fulano, gostaria de marcar horário as 10h da manhã',
  serviceId: 'fakeServiceId',
  createdForId: 'fakeUserId',
  ownerId: 'fakeUserId',
  clientId: 'fakeUserId',
  clientUserId: 'fakeUserId',
  professionalId: 'fakeUserId',
  status: 10,
  initDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  read: false,
  push: false,
  email: false,
  cancelledAt: null,
  order: fakeOrderEntity,
  fidelity: fakeFidelityEntity,
  recurrence: fakeRecurrenceEntity,
  ride: fakeRideEntity,
  updatedById: '61c1f9d0e399d2917bdff44e',
  updatedByRole: 'admin',
})

export const fakeRequestPaginated = {
  total: 11,
  data: [
    mockRequest(),
    mockRequest(),
    mockRequest(),
    mockRequest(),
    mockRequest(),
    mockRequest(),
    mockRequest(),
    mockRequest(),
    mockRequest(),
    mockRequest(),
    mockRequest(),
  ],
}

describe('Request', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeRequest = mockRequest()
    const request = new RequestEntity(fakeRequest)
    expect(request).toBeTruthy()
    expect(request).toEqual({
      ...fakeRequest,
      _id: undefined,
      active: false,
      updatedById: null,
      status: 0,
      read: false,
      updatedByRole: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
