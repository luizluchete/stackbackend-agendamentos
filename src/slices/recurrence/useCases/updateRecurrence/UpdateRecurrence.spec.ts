import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateRecurrenceRepository } from '@/slices/recurrence/repositories'
import { mockRecurrence } from '@/slices/recurrence/entities/RecurrenceEntity.spec'
import { UpdateRecurrence } from './UpdateRecurrence'
import { Query } from '@/app/type'

describe('Update Recurrence', () => {
  let sut: UpdateRecurrence
  let updateRecurrenceRepository: MockProxy<UpdateRecurrenceRepository>
  const fakeRecurrence = mockRecurrence()
  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    updateRecurrenceRepository = mock()
    updateRecurrenceRepository.update.mockResolvedValue(fakeRecurrence)
  })

  beforeEach(async () => {
    sut = new UpdateRecurrence(updateRecurrenceRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call updateRecurrence of UpdateRecurrenceRepository with correct values', async () => {
    await sut.execute(fakeQuery, fakeRecurrence)
    expect(updateRecurrenceRepository.update).toHaveBeenCalledWith(
      fakeQuery,
      fakeRecurrence
    )
    expect(updateRecurrenceRepository.update).toBeCalledTimes(1)
  })

  it('Should return a new recurrence created when updateRecurrenceRepository insert it', async () => {
    const recurrence = await sut.execute(fakeQuery, fakeRecurrence)
    expect(recurrence).toEqual(fakeRecurrence)
  })

  it('Should return null a new recurrence created when updateRecurrenceRepository insert it', async () => {
    updateRecurrenceRepository.update.mockResolvedValueOnce(null)
    const recurrence = await sut.execute(fakeQuery, fakeRecurrence)
    expect(recurrence).toBeFalsy()
  })

  it('Should rethrow if updateRecurrence of UpdateRecurrenceRepository throws', async () => {
    updateRecurrenceRepository.update.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery, fakeRecurrence)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
