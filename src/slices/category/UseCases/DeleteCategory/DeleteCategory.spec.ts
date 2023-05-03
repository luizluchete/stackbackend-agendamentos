import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteCategoryRepository } from '@/slices/category/repositories'
import { DeleteCategory } from './DeleteCategory'
import { Query } from '@/app/type'

describe('Delete Category', () => {
  let sut: DeleteCategory
  let deleteCategoryRepository: MockProxy<DeleteCategoryRepository>

  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    deleteCategoryRepository = mock()
    deleteCategoryRepository.delete.mockResolvedValue()
  })

  beforeEach(async () => {
    sut = new DeleteCategory(deleteCategoryRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call deleteCategory of DeleteCategoryRepository with correct values', async () => {
    await sut.execute(fakeQuery)
    expect(deleteCategoryRepository.delete).toHaveBeenCalledWith(fakeQuery)
    expect(deleteCategoryRepository.delete).toBeCalledTimes(1)
  })

  it('Should rethrow if deleteCategory of DeleteCategoryRepository throws', async () => {
    deleteCategoryRepository.delete.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
