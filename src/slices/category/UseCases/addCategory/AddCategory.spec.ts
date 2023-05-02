import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddCategoryRepository } from '@/slices/category/repositories'
import { mockCategory } from '@/slices/category/entities/CategoryEntity.spec'
import { AddCategory } from './AddCategory'

describe('addCategory', () => {
  let sut: AddCategory
  let addCategoryRepository: MockProxy<AddCategoryRepository>
  const fakeCategory = mockCategory()

  beforeAll(async () => {
    MockDate.set(new Date())
    addCategoryRepository = mock()
    addCategoryRepository.addCategory.mockResolvedValue(fakeCategory)
  })

  beforeEach(async () => {
    sut = new AddCategory(addCategoryRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addCategory of AddCategoryRepository with correct values', async () => {
    await sut.execute(fakeCategory)
    expect(addCategoryRepository.addCategory).toHaveBeenCalledWith(fakeCategory)
    expect(addCategoryRepository.addCategory).toBeCalledTimes(1)
  })

  it('Should return a new category created when addCategoryRepository insert it', async () => {
    const category = await sut.execute(fakeCategory)
    expect(category).toEqual(fakeCategory)
  })

  it('Should return null a new category created when addCategoryRepository insert it', async () => {
    addCategoryRepository.addCategory.mockResolvedValueOnce(null)
    const category = await sut.execute(fakeCategory)
    expect(category).toBeFalsy()
  })

  it('Should rethrow if addCategory of AddCategoryRepository throws', async () => {
    addCategoryRepository.addCategory.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeCategory)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
