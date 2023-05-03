import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadProductRepository } from '@/slices/product/repositories/contracts'
import { mockProduct } from '../../entities/ProductEntity.spec'
import { Query } from '@/app/type'
import { LoadProduct } from './LoadProduct'

describe('LoadProduct', () => {
  let sut: LoadProduct
  let fakeQuery: Query

  let loadProductRepository: MockProxy<LoadProductRepository>
  const fakeProduct = mockProduct()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadProductRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadProductRepository.loadProduct.mockResolvedValue(fakeProduct)
  })

  beforeEach(async () => {
    sut = new LoadProduct(loadProductRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadProductRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadProductRepository.loadProduct).toHaveBeenCalledWith(fakeQuery)
    expect(loadProductRepository.loadProduct).toHaveBeenCalledTimes(1)
  })

  it('Should return a product loaded when LoadProductRepository return it', async () => {
    const product = await sut.load(fakeQuery)
    expect(product).toEqual(fakeProduct)
  })

  it('Should return null loaded when LoadProductRepository return it', async () => {
    loadProductRepository.loadProduct.mockResolvedValueOnce(null)
    const product = await sut.load(fakeQuery)
    expect(product).toBeFalsy()
  })

  it('Should rethrow if loadProduct of LoadProductRepository throws', async () => {
    loadProductRepository.loadProduct.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
