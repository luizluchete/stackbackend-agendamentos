import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddRatingRepository } from '@/slices/rating/repositories/contracts'
import { mockRating } from '@/slices/rating/entities/RatingEntity.spec'
import { AddRating } from './AddRating'

describe('addRating', () => {
  let sut: AddRating
  let addRatingRepository: MockProxy<AddRatingRepository>
  const fakeRating = mockRating()

  beforeAll(async () => {
    MockDate.set(new Date())
    addRatingRepository = mock()
    addRatingRepository.addRating.mockResolvedValue(fakeRating)
  })

  beforeEach(async () => {
    sut = new AddRating(addRatingRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addRating of AddRatingRepository with correct values', async () => {
    await sut.execute(fakeRating)
    expect(addRatingRepository.addRating).toHaveBeenCalledWith(fakeRating)
    expect(addRatingRepository.addRating).toBeCalledTimes(1)
  })

  it('Should return a new rating created when addRatingRepository insert it', async () => {
    const rating = await sut.execute(fakeRating)
    expect(rating).toEqual(fakeRating)
  })

  it('Should return null a new rating created when addRatingRepository insert it', async () => {
    addRatingRepository.addRating.mockResolvedValueOnce(null)
    const rating = await sut.execute(fakeRating)
    expect(rating).toBeFalsy()
  })

  it('Should rethrow if addRating of AddRatingRepository throws', async () => {
    addRatingRepository.addRating.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeRating)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
