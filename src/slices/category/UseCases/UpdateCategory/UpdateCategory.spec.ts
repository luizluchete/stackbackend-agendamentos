import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateCategoryRepository } from '@/slices/category/repositories'
import { mockCategory } from '@/slices/category/entities/CategoryEntity.spec'
import { UpdateCategory } from './UpdateCategory'
import { Query } from '@/app/type'

describe('Update Category', () => {
  let sut: UpdateCategory
  let updateCategoryRepository: MockProxy<UpdateCategoryRepository>
  const fakeCategory = mockCategory()
  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    updateCategoryRepository = mock()
    updateCategoryRepository.update.mockResolvedValue(fakeCategory)
  })

  beforeEach(async () => {
    sut = new UpdateCategory(updateCategoryRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call updateCategory of UpdateCategoryRepository with correct values', async () => {
    await sut.execute(fakeQuery, fakeCategory)
    expect(updateCategoryRepository.update).toHaveBeenCalledWith(
      fakeQuery,
      fakeCategory
    )
    expect(updateCategoryRepository.update).toBeCalledTimes(1)
  })

  it('Should return a new category created when updateCategoryRepository insert it', async () => {
    const category = await sut.execute(fakeQuery, fakeCategory)
    expect(category).toEqual(fakeCategory)
  })

  it('Should return null a new category created when updateCategoryRepository insert it', async () => {
    updateCategoryRepository.update.mockResolvedValueOnce(null)
    const category = await sut.execute(fakeQuery, fakeCategory)
    expect(category).toBeFalsy()
  })

  it('Should rethrow if updateCategory of UpdateCategoryRepository throws', async () => {
    updateCategoryRepository.update.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery, fakeCategory)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
