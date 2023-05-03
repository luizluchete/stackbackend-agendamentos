import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateAppointmentRepository } from '@/slices/appointment/repositories'
import { mockAppointment } from '@/slices/appointment/entities/AppointmentEntity.spec'
import { UpdateAppointment } from './UpdateAppointment'
import { Query } from '@/app/type'

describe('Update Appointment', () => {
  let sut: UpdateAppointment
  let updateAppointmentRepository: MockProxy<UpdateAppointmentRepository>
  const fakeAppointment = mockAppointment()
  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    updateAppointmentRepository = mock()
    updateAppointmentRepository.update.mockResolvedValue(fakeAppointment)
  })

  beforeEach(async () => {
    sut = new UpdateAppointment(updateAppointmentRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call updateAppointment of UpdateAppointmentRepository with correct values', async () => {
    await sut.execute(fakeQuery, fakeAppointment)
    expect(updateAppointmentRepository.update).toHaveBeenCalledWith(
      fakeQuery,
      fakeAppointment
    )
    expect(updateAppointmentRepository.update).toBeCalledTimes(1)
  })

  it('Should return a new appointment created when updateAppointmentRepository insert it', async () => {
    const appointment = await sut.execute(fakeQuery, fakeAppointment)
    expect(appointment).toEqual(fakeAppointment)
  })

  it('Should return null a new appointment created when updateAppointmentRepository insert it', async () => {
    updateAppointmentRepository.update.mockResolvedValueOnce(null)
    const appointment = await sut.execute(fakeQuery, fakeAppointment)
    expect(appointment).toBeFalsy()
  })

  it('Should rethrow if updateAppointment of UpdateAppointmentRepository throws', async () => {
    updateAppointmentRepository.update.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery, fakeAppointment)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
