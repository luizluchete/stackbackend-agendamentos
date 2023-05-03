import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteRatingResultRepository } from '@/slices/ratingResult/repositories'
import { DeleteRatingResult } from './DeleteRatingResult'
import { Query } from '@/app/type'

describe('Delete RatingResult', () => {
  let sut: DeleteRatingResult
  let deleteRatingResultRepository: MockProxy<DeleteRatingResultRepository>

  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    deleteRatingResultRepository = mock()
    deleteRatingResultRepository.delete.mockResolvedValue()
  })

  beforeEach(async () => {
    sut = new DeleteRatingResult(deleteRatingResultRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call deleteRatingResult of DeleteRatingResultRepository with correct values', async () => {
    await sut.execute(fakeQuery)
    expect(deleteRatingResultRepository.delete).toHaveBeenCalledWith(fakeQuery)
    expect(deleteRatingResultRepository.delete).toBeCalledTimes(1)
  })

  it('Should rethrow if deleteRatingResult of DeleteRatingResultRepository throws', async () => {
    deleteRatingResultRepository.delete.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
