import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddRatingResultRepository } from '@/slices/ratingResult/repositories/contracts'
import { mockRatingResult } from '@/slices/ratingResult/entities/RatingResultEntity.spec'
import { AddRatingResult } from './AddRatingResult'

describe('addRatingResult', () => {
  let sut: AddRatingResult
  let addRatingResultRepository: MockProxy<AddRatingResultRepository>
  const fakeRatingResult = mockRatingResult()

  beforeAll(async () => {
    MockDate.set(new Date())
    addRatingResultRepository = mock()
    addRatingResultRepository.addRatingResult.mockResolvedValue(fakeRatingResult)
  })

  beforeEach(async () => {
    sut = new AddRatingResult(addRatingResultRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addRatingResult of AddRatingResultRepository with correct values', async () => {
    await sut.execute(fakeRatingResult)
    expect(addRatingResultRepository.addRatingResult).toHaveBeenCalledWith(fakeRatingResult)
    expect(addRatingResultRepository.addRatingResult).toBeCalledTimes(1)
  })

  it('Should return a new ratingResult created when addRatingResultRepository insert it', async () => {
    const ratingResult = await sut.execute(fakeRatingResult)
    expect(ratingResult).toEqual(fakeRatingResult)
  })

  it('Should return null a new ratingResult created when addRatingResultRepository insert it', async () => {
    addRatingResultRepository.addRatingResult.mockResolvedValueOnce(null)
    const ratingResult = await sut.execute(fakeRatingResult)
    expect(ratingResult).toBeFalsy()
  })

  it('Should rethrow if addRatingResult of AddRatingResultRepository throws', async () => {
    addRatingResultRepository.addRatingResult.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeRatingResult)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
