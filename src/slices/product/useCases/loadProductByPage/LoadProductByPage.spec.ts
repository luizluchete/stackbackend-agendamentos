import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadProductByPageRepository } from '@/slices/product/repositories/contracts'
import { fakeProductPaginated } from '../../entities/ProductEntity.spec'
import { Query } from '@/app/type'
import { LoadProductByPage } from './LoadProductByPage'

describe('LoadProductByPage', () => {
  let sut: LoadProductByPage
  let fakeQuery: Query

  let loadProductRepositoryByPage: MockProxy<LoadProductByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadProductRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadProductRepositoryByPage.loadProductByPage.mockResolvedValue(
      fakeProductPaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadProductByPage(loadProductRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadProductByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadProductRepositoryByPage.loadProductByPage
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadProductRepositoryByPage.loadProductByPage
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a product loaded when LoadProductByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeProductPaginated)
  })

  it('Should return null loaded when LoadProductByPageRepository return it', async () => {
    loadProductRepositoryByPage.loadProductByPage.mockResolvedValueOnce(null)
    const product = await sut.load(fakeQuery)
    expect(product).toBeFalsy()
  })

  it('Should rethrow if loadProductByPage of LoadProductByPageRepository throws', async () => {
    loadProductRepositoryByPage.loadProductByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
