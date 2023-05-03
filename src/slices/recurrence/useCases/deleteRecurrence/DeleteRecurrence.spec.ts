import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteRecurrenceRepository } from '@/slices/recurrence/repositories'
import { DeleteRecurrence } from './DeleteRecurrence'
import { Query } from '@/app/type'

describe('Delete Recurrence', () => {
  let sut: DeleteRecurrence
  let deleteRecurrenceRepository: MockProxy<DeleteRecurrenceRepository>

  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    deleteRecurrenceRepository = mock()
    deleteRecurrenceRepository.delete.mockResolvedValue()
  })

  beforeEach(async () => {
    sut = new DeleteRecurrence(deleteRecurrenceRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call deleteRecurrence of DeleteRecurrenceRepository with correct values', async () => {
    await sut.execute(fakeQuery)
    expect(deleteRecurrenceRepository.delete).toHaveBeenCalledWith(fakeQuery)
    expect(deleteRecurrenceRepository.delete).toBeCalledTimes(1)
  })

  it('Should rethrow if deleteRecurrence of DeleteRecurrenceRepository throws', async () => {
    deleteRecurrenceRepository.delete.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
