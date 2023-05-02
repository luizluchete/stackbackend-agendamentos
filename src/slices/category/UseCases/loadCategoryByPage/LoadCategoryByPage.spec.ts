import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadCategoryByPageRepository } from '@/slices/category/repositories/contracts'
import { fakeCategoryPaginated } from '../../entities/CategoryEntity.spec'
import { Query } from '@/app/type'
import { LoadCategoryByPage } from './LoadCategoryByPage'

describe('LoadCategoryByPage', () => {
  let sut: LoadCategoryByPage
  let fakeQuery: Query

  let loadCategoryRepositoryByPage: MockProxy<LoadCategoryByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadCategoryRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadCategoryRepositoryByPage.loadCategoryByPage.mockResolvedValue(
      fakeCategoryPaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadCategoryByPage(loadCategoryRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadCategoryByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadCategoryRepositoryByPage.loadCategoryByPage
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadCategoryRepositoryByPage.loadCategoryByPage
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a category loaded when LoadCategoryByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeCategoryPaginated)
  })

  it('Should return null loaded when LoadCategoryByPageRepository return it', async () => {
    loadCategoryRepositoryByPage.loadCategoryByPage.mockResolvedValueOnce(null)
    const category = await sut.load(fakeQuery)
    expect(category).toBeFalsy()
  })

  it('Should rethrow if loadCategoryByPage of LoadCategoryByPageRepository throws', async () => {
    loadCategoryRepositoryByPage.loadCategoryByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
