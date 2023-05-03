import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddRecurrenceRepository } from '@/slices/recurrence/repositories/contracts'
import { mockRecurrence } from '@/slices/recurrence/entities/RecurrenceEntity.spec'
import { AddRecurrence } from './AddRecurrence'

describe('addRecurrence', () => {
  let sut: AddRecurrence
  let addRecurrenceRepository: MockProxy<AddRecurrenceRepository>
  const fakeRecurrence = mockRecurrence()

  beforeAll(async () => {
    MockDate.set(new Date())
    addRecurrenceRepository = mock()
    addRecurrenceRepository.addRecurrence.mockResolvedValue(fakeRecurrence)
  })

  beforeEach(async () => {
    sut = new AddRecurrence(addRecurrenceRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addRecurrence of AddRecurrenceRepository with correct values', async () => {
    await sut.execute(fakeRecurrence)
    expect(addRecurrenceRepository.addRecurrence).toHaveBeenCalledWith(fakeRecurrence)
    expect(addRecurrenceRepository.addRecurrence).toBeCalledTimes(1)
  })

  it('Should return a new recurrence created when addRecurrenceRepository insert it', async () => {
    const recurrence = await sut.execute(fakeRecurrence)
    expect(recurrence).toEqual(fakeRecurrence)
  })

  it('Should return null a new recurrence created when addRecurrenceRepository insert it', async () => {
    addRecurrenceRepository.addRecurrence.mockResolvedValueOnce(null)
    const recurrence = await sut.execute(fakeRecurrence)
    expect(recurrence).toBeFalsy()
  })

  it('Should rethrow if addRecurrence of AddRecurrenceRepository throws', async () => {
    addRecurrenceRepository.addRecurrence.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeRecurrence)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
