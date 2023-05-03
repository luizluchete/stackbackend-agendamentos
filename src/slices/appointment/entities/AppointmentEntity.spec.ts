import MockDate from 'mockdate'
import { AppointmentEntity } from './AppointmentEntity'

export const mockAppointment = (): AppointmentEntity => ({
  createdById: '123',
  name: 'fakeAppointmentEntity',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  requestId: 'fakeRequestId',
  cancelled: true,
  message: 'Olá fulano, gostaria de marcar horário as 10h da manhã',
  serviceId: 'fakeServiceId',
  createdForId: 'fakeUserId',
  ownerId: 'fakeUserId',
  clientId: 'fakeUserId',
  professionalId: 'fakeUserId',
  status: 'pending',
  initDate: new Date(),
  endDate: new Date(),
  read: false,
  push: false,
  email: false,
  cancelledAt: null,
})

export const fakeAppointmentPaginated = {
  total: 11,
  data: [
    mockAppointment(),
    mockAppointment(),
    mockAppointment(),
    mockAppointment(),
    mockAppointment(),
    mockAppointment(),
    mockAppointment(),
    mockAppointment(),
    mockAppointment(),
    mockAppointment(),
    mockAppointment(),
  ],
}

describe('Appointment', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeAppointment = mockAppointment()
    const appointment = new AppointmentEntity(fakeAppointment)
    expect(appointment).toBeTruthy()
    expect(appointment).toEqual({
      ...fakeAppointment,
      _id: undefined,
      active: false,
      cancelled: false,
      cancelledBy: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
