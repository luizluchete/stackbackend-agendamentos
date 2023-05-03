import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddAppointmentRepository } from '@/slices/appointment/repositories/contracts'
import { mockAppointment } from '@/slices/appointment/entities/AppointmentEntity.spec'
import { AddAppointment } from './AddAppointment'

describe('addAppointment', () => {
  let sut: AddAppointment
  let addAppointmentRepository: MockProxy<AddAppointmentRepository>
  const fakeAppointment = mockAppointment()

  beforeAll(async () => {
    MockDate.set(new Date())
    addAppointmentRepository = mock()
    addAppointmentRepository.addAppointment.mockResolvedValue(fakeAppointment)
  })

  beforeEach(async () => {
    sut = new AddAppointment(addAppointmentRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addAppointment of AddAppointmentRepository with correct values', async () => {
    await sut.execute(fakeAppointment)
    expect(addAppointmentRepository.addAppointment).toHaveBeenCalledWith(fakeAppointment)
    expect(addAppointmentRepository.addAppointment).toBeCalledTimes(1)
  })

  it('Should return a new appointment created when addAppointmentRepository insert it', async () => {
    const appointment = await sut.execute(fakeAppointment)
    expect(appointment).toEqual(fakeAppointment)
  })

  it('Should return null a new appointment created when addAppointmentRepository insert it', async () => {
    addAppointmentRepository.addAppointment.mockResolvedValueOnce(null)
    const appointment = await sut.execute(fakeAppointment)
    expect(appointment).toBeFalsy()
  })

  it('Should rethrow if addAppointment of AddAppointmentRepository throws', async () => {
    addAppointmentRepository.addAppointment.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeAppointment)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
