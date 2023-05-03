import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadRatingRepository } from '@/slices/rating/repositories/contracts'
import { mockRating } from '../../entities/RatingEntity.spec'
import { Query } from '@/app/type'
import { LoadRating } from './LoadRating'

describe('LoadRating', () => {
  let sut: LoadRating
  let fakeQuery: Query

  let loadRatingRepository: MockProxy<LoadRatingRepository>
  const fakeRating = mockRating()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadRatingRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadRatingRepository.loadRating.mockResolvedValue(fakeRating)
  })

  beforeEach(async () => {
    sut = new LoadRating(loadRatingRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadRatingRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadRatingRepository.loadRating).toHaveBeenCalledWith(fakeQuery)
    expect(loadRatingRepository.loadRating).toHaveBeenCalledTimes(1)
  })

  it('Should return a rating loaded when LoadRatingRepository return it', async () => {
    const rating = await sut.load(fakeQuery)
    expect(rating).toEqual(fakeRating)
  })

  it('Should return null loaded when LoadRatingRepository return it', async () => {
    loadRatingRepository.loadRating.mockResolvedValueOnce(null)
    const rating = await sut.load(fakeQuery)
    expect(rating).toBeFalsy()
  })

  it('Should rethrow if loadRating of LoadRatingRepository throws', async () => {
    loadRatingRepository.loadRating.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
