import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadRatingByPageRepository } from '@/slices/rating/repositories/contracts'
import { fakeRatingPaginated } from '../../entities/RatingEntity.spec'
import { Query } from '@/app/type'
import { LoadRatingByPage } from './LoadRatingByPage'

describe('LoadRatingByPage', () => {
  let sut: LoadRatingByPage
  let fakeQuery: Query

  let loadRatingRepositoryByPage: MockProxy<LoadRatingByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadRatingRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadRatingRepositoryByPage.loadRatingByPage.mockResolvedValue(
      fakeRatingPaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadRatingByPage(loadRatingRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadRatingByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadRatingRepositoryByPage.loadRatingByPage
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadRatingRepositoryByPage.loadRatingByPage
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a rating loaded when LoadRatingByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeRatingPaginated)
  })

  it('Should return null loaded when LoadRatingByPageRepository return it', async () => {
    loadRatingRepositoryByPage.loadRatingByPage.mockResolvedValueOnce(null)
    const rating = await sut.load(fakeQuery)
    expect(rating).toBeFalsy()
  })

  it('Should rethrow if loadRatingByPage of LoadRatingByPageRepository throws', async () => {
    loadRatingRepositoryByPage.loadRatingByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
