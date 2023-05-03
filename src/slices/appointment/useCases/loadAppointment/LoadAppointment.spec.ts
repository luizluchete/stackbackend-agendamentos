import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadAppointmentRepository } from '@/slices/appointment/repositories/contracts'
import { mockAppointment } from '../../entities/AppointmentEntity.spec'
import { Query } from '@/app/type'
import { LoadAppointment } from './LoadAppointment'

describe('LoadAppointment', () => {
  let sut: LoadAppointment
  let fakeQuery: Query

  let loadAppointmentRepository: MockProxy<LoadAppointmentRepository>
  const fakeAppointment = mockAppointment()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadAppointmentRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadAppointmentRepository.loadAppointment.mockResolvedValue(fakeAppointment)
  })

  beforeEach(async () => {
    sut = new LoadAppointment(loadAppointmentRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadAppointmentRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadAppointmentRepository.loadAppointment).toHaveBeenCalledWith(fakeQuery)
    expect(loadAppointmentRepository.loadAppointment).toHaveBeenCalledTimes(1)
  })

  it('Should return a appointment loaded when LoadAppointmentRepository return it', async () => {
    const appointment = await sut.load(fakeQuery)
    expect(appointment).toEqual(fakeAppointment)
  })

  it('Should return null loaded when LoadAppointmentRepository return it', async () => {
    loadAppointmentRepository.loadAppointment.mockResolvedValueOnce(null)
    const appointment = await sut.load(fakeQuery)
    expect(appointment).toBeFalsy()
  })

  it('Should rethrow if loadAppointment of LoadAppointmentRepository throws', async () => {
    loadAppointmentRepository.loadAppointment.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
