import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateRatingRepository } from '@/slices/rating/repositories'
import { mockRating } from '@/slices/rating/entities/RatingEntity.spec'
import { UpdateRating } from './UpdateRating'
import { Query } from '@/app/type'

describe('Update Rating', () => {
  let sut: UpdateRating
  let updateRatingRepository: MockProxy<UpdateRatingRepository>
  const fakeRating = mockRating()
  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    updateRatingRepository = mock()
    updateRatingRepository.update.mockResolvedValue(fakeRating)
  })

  beforeEach(async () => {
    sut = new UpdateRating(updateRatingRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call updateRating of UpdateRatingRepository with correct values', async () => {
    await sut.execute(fakeQuery, fakeRating)
    expect(updateRatingRepository.update).toHaveBeenCalledWith(
      fakeQuery,
      fakeRating
    )
    expect(updateRatingRepository.update).toBeCalledTimes(1)
  })

  it('Should return a new rating created when updateRatingRepository insert it', async () => {
    const rating = await sut.execute(fakeQuery, fakeRating)
    expect(rating).toEqual(fakeRating)
  })

  it('Should return null a new rating created when updateRatingRepository insert it', async () => {
    updateRatingRepository.update.mockResolvedValueOnce(null)
    const rating = await sut.execute(fakeQuery, fakeRating)
    expect(rating).toBeFalsy()
  })

  it('Should rethrow if updateRating of UpdateRatingRepository throws', async () => {
    updateRatingRepository.update.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery, fakeRating)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
