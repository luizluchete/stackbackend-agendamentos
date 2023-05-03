import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadRatingResultByPageRepository } from '@/slices/ratingResult/repositories/contracts'
import { fakeRatingResultPaginated } from '../../entities/RatingResultEntity.spec'
import { Query } from '@/app/type'
import { LoadRatingResultByPage } from './LoadRatingResultByPage'

describe('LoadRatingResultByPage', () => {
  let sut: LoadRatingResultByPage
  let fakeQuery: Query

  let loadRatingResultRepositoryByPage: MockProxy<LoadRatingResultByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadRatingResultRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadRatingResultRepositoryByPage.loadRatingResultByPage.mockResolvedValue(
      fakeRatingResultPaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadRatingResultByPage(loadRatingResultRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadRatingResultByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadRatingResultRepositoryByPage.loadRatingResultByPage
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadRatingResultRepositoryByPage.loadRatingResultByPage
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a ratingResult loaded when LoadRatingResultByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeRatingResultPaginated)
  })

  it('Should return null loaded when LoadRatingResultByPageRepository return it', async () => {
    loadRatingResultRepositoryByPage.loadRatingResultByPage.mockResolvedValueOnce(null)
    const ratingResult = await sut.load(fakeQuery)
    expect(ratingResult).toBeFalsy()
  })

  it('Should rethrow if loadRatingResultByPage of LoadRatingResultByPageRepository throws', async () => {
    loadRatingResultRepositoryByPage.loadRatingResultByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
