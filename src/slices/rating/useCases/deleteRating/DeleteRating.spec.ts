import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteRatingRepository } from '@/slices/rating/repositories'
import { DeleteRating } from './DeleteRating'
import { Query } from '@/app/type'

describe('Delete Rating', () => {
  let sut: DeleteRating
  let deleteRatingRepository: MockProxy<DeleteRatingRepository>

  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    deleteRatingRepository = mock()
    deleteRatingRepository.delete.mockResolvedValue()
  })

  beforeEach(async () => {
    sut = new DeleteRating(deleteRatingRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call deleteRating of DeleteRatingRepository with correct values', async () => {
    await sut.execute(fakeQuery)
    expect(deleteRatingRepository.delete).toHaveBeenCalledWith(fakeQuery)
    expect(deleteRatingRepository.delete).toBeCalledTimes(1)
  })

  it('Should rethrow if deleteRating of DeleteRatingRepository throws', async () => {
    deleteRatingRepository.delete.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
