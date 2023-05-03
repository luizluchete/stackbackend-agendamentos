import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteAppointmentRepository } from '@/slices/appointment/repositories'
import { DeleteAppointment } from './DeleteAppointment'
import { Query } from '@/app/type'

describe('Delete Appointment', () => {
  let sut: DeleteAppointment
  let deleteAppointmentRepository: MockProxy<DeleteAppointmentRepository>

  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    deleteAppointmentRepository = mock()
    deleteAppointmentRepository.delete.mockResolvedValue()
  })

  beforeEach(async () => {
    sut = new DeleteAppointment(deleteAppointmentRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call deleteAppointment of DeleteAppointmentRepository with correct values', async () => {
    await sut.execute(fakeQuery)
    expect(deleteAppointmentRepository.delete).toHaveBeenCalledWith(fakeQuery)
    expect(deleteAppointmentRepository.delete).toBeCalledTimes(1)
  })

  it('Should rethrow if deleteAppointment of DeleteAppointmentRepository throws', async () => {
    deleteAppointmentRepository.delete.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
