import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadRecurrenceRepository } from '@/slices/recurrence/repositories/contracts'
import { mockRecurrence } from '../../entities/RecurrenceEntity.spec'
import { Query } from '@/app/type'
import { LoadRecurrence } from './LoadRecurrence'

describe('LoadRecurrence', () => {
  let sut: LoadRecurrence
  let fakeQuery: Query

  let loadRecurrenceRepository: MockProxy<LoadRecurrenceRepository>
  const fakeRecurrence = mockRecurrence()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadRecurrenceRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadRecurrenceRepository.loadRecurrence.mockResolvedValue(fakeRecurrence)
  })

  beforeEach(async () => {
    sut = new LoadRecurrence(loadRecurrenceRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadRecurrenceRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadRecurrenceRepository.loadRecurrence).toHaveBeenCalledWith(fakeQuery)
    expect(loadRecurrenceRepository.loadRecurrence).toHaveBeenCalledTimes(1)
  })

  it('Should return a recurrence loaded when LoadRecurrenceRepository return it', async () => {
    const recurrence = await sut.load(fakeQuery)
    expect(recurrence).toEqual(fakeRecurrence)
  })

  it('Should return null loaded when LoadRecurrenceRepository return it', async () => {
    loadRecurrenceRepository.loadRecurrence.mockResolvedValueOnce(null)
    const recurrence = await sut.load(fakeQuery)
    expect(recurrence).toBeFalsy()
  })

  it('Should rethrow if loadRecurrence of LoadRecurrenceRepository throws', async () => {
    loadRecurrenceRepository.loadRecurrence.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
