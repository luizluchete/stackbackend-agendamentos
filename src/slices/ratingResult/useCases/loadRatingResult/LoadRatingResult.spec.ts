import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadRatingResultRepository } from '@/slices/ratingResult/repositories/contracts'
import { mockRatingResult } from '../../entities/RatingResultEntity.spec'
import { Query } from '@/app/type'
import { LoadRatingResult } from './LoadRatingResult'

describe('LoadRatingResult', () => {
  let sut: LoadRatingResult
  let fakeQuery: Query

  let loadRatingResultRepository: MockProxy<LoadRatingResultRepository>
  const fakeRatingResult = mockRatingResult()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadRatingResultRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadRatingResultRepository.loadRatingResult.mockResolvedValue(fakeRatingResult)
  })

  beforeEach(async () => {
    sut = new LoadRatingResult(loadRatingResultRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadRatingResultRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadRatingResultRepository.loadRatingResult).toHaveBeenCalledWith(fakeQuery)
    expect(loadRatingResultRepository.loadRatingResult).toHaveBeenCalledTimes(1)
  })

  it('Should return a ratingResult loaded when LoadRatingResultRepository return it', async () => {
    const ratingResult = await sut.load(fakeQuery)
    expect(ratingResult).toEqual(fakeRatingResult)
  })

  it('Should return null loaded when LoadRatingResultRepository return it', async () => {
    loadRatingResultRepository.loadRatingResult.mockResolvedValueOnce(null)
    const ratingResult = await sut.load(fakeQuery)
    expect(ratingResult).toBeFalsy()
  })

  it('Should rethrow if loadRatingResult of LoadRatingResultRepository throws', async () => {
    loadRatingResultRepository.loadRatingResult.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
