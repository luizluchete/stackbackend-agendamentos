import MockDate from 'mockdate'
import { RecurrenceData, RecurrenceEntity } from './RecurrenceEntity'

export const mockRecurrence = (): RecurrenceData => ({
  _id: '123',
  createdById: '123',
  name: 'fakeRecurrenceEntity',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  type: 0,
  frequency: 3,
  endDate: new Date(),
  initDate: new Date(),
  serviceId: 'fakeServiceId',
  professionalId: 'fakeUserId',
  clientId: 'fakeUserId',
  ownerId: 'fakeUserId',
  accept: false,
  appointmentsWasInserted: false,
  requestId: 'fakeRequestId',
})

export const fakeRecurrencePaginated = {
  total: 11,
  data: [
    mockRecurrence(),
    mockRecurrence(),
    mockRecurrence(),
    mockRecurrence(),
    mockRecurrence(),
    mockRecurrence(),
    mockRecurrence(),
    mockRecurrence(),
    mockRecurrence(),
    mockRecurrence(),
    mockRecurrence(),
  ],
}

describe('Recurrence', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeRecurrence = mockRecurrence()
    const recurrence = new RecurrenceEntity(fakeRecurrence)
    expect(recurrence).toBeTruthy()
    expect(recurrence).toEqual({
      ...fakeRecurrence,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
