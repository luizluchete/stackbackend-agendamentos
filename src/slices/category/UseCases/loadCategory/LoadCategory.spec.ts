import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadCategoryRepository } from '@/slices/category/repositories/contracts'
import { mockCategory } from '../../entities/CategoryEntity.spec'
import { Query } from '@/app/type'
import { LoadCategory } from './LoadCategory'

describe('LoadCategory', () => {
  let sut: LoadCategory
  let fakeQuery: Query

  let loadCategoryRepository: MockProxy<LoadCategoryRepository>
  const fakeCategory = mockCategory()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadCategoryRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadCategoryRepository.loadCategory.mockResolvedValue(fakeCategory)
  })

  beforeEach(async () => {
    sut = new LoadCategory(loadCategoryRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadCategoryRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadCategoryRepository.loadCategory).toHaveBeenCalledWith(fakeQuery)
    expect(loadCategoryRepository.loadCategory).toHaveBeenCalledTimes(1)
  })

  it('Should return a category loaded when LoadCategoryRepository return it', async () => {
    const category = await sut.load(fakeQuery)
    expect(category).toEqual(fakeCategory)
  })

  it('Should return null loaded when LoadCategoryRepository return it', async () => {
    loadCategoryRepository.loadCategory.mockResolvedValueOnce(null)
    const category = await sut.load(fakeQuery)
    expect(category).toBeFalsy()
  })

  it('Should rethrow if loadCategory of LoadCategoryRepository throws', async () => {
    loadCategoryRepository.loadCategory.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
