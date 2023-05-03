import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateRatingResultRepository } from '@/slices/ratingResult/repositories'
import { mockRatingResult } from '@/slices/ratingResult/entities/RatingResultEntity.spec'
import { UpdateRatingResult } from './UpdateRatingResult'
import { Query } from '@/app/type'

describe('Update RatingResult', () => {
  let sut: UpdateRatingResult
  let updateRatingResultRepository: MockProxy<UpdateRatingResultRepository>
  const fakeRatingResult = mockRatingResult()
  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    updateRatingResultRepository = mock()
    updateRatingResultRepository.update.mockResolvedValue(fakeRatingResult)
  })

  beforeEach(async () => {
    sut = new UpdateRatingResult(updateRatingResultRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call updateRatingResult of UpdateRatingResultRepository with correct values', async () => {
    await sut.execute(fakeQuery, fakeRatingResult)
    expect(updateRatingResultRepository.update).toHaveBeenCalledWith(
      fakeQuery,
      fakeRatingResult
    )
    expect(updateRatingResultRepository.update).toBeCalledTimes(1)
  })

  it('Should return a new ratingResult created when updateRatingResultRepository insert it', async () => {
    const ratingResult = await sut.execute(fakeQuery, fakeRatingResult)
    expect(ratingResult).toEqual(fakeRatingResult)
  })

  it('Should return null a new ratingResult created when updateRatingResultRepository insert it', async () => {
    updateRatingResultRepository.update.mockResolvedValueOnce(null)
    const ratingResult = await sut.execute(fakeQuery, fakeRatingResult)
    expect(ratingResult).toBeFalsy()
  })

  it('Should rethrow if updateRatingResult of UpdateRatingResultRepository throws', async () => {
    updateRatingResultRepository.update.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery, fakeRatingResult)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
