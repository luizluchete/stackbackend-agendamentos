import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadRecurrenceByPageRepository } from '@/slices/recurrence/repositories/contracts'
import { fakeRecurrencePaginated } from '../../entities/RecurrenceEntity.spec'
import { Query } from '@/app/type'
import { LoadRecurrenceByPage } from './LoadRecurrenceByPage'

describe('LoadRecurrenceByPage', () => {
  let sut: LoadRecurrenceByPage
  let fakeQuery: Query

  let loadRecurrenceRepositoryByPage: MockProxy<LoadRecurrenceByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadRecurrenceRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadRecurrenceRepositoryByPage.loadRecurrenceByPage.mockResolvedValue(
      fakeRecurrencePaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadRecurrenceByPage(loadRecurrenceRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadRecurrenceByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadRecurrenceRepositoryByPage.loadRecurrenceByPage
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadRecurrenceRepositoryByPage.loadRecurrenceByPage
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a recurrence loaded when LoadRecurrenceByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeRecurrencePaginated)
  })

  it('Should return null loaded when LoadRecurrenceByPageRepository return it', async () => {
    loadRecurrenceRepositoryByPage.loadRecurrenceByPage.mockResolvedValueOnce(null)
    const recurrence = await sut.load(fakeQuery)
    expect(recurrence).toBeFalsy()
  })

  it('Should rethrow if loadRecurrenceByPage of LoadRecurrenceByPageRepository throws', async () => {
    loadRecurrenceRepositoryByPage.loadRecurrenceByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
