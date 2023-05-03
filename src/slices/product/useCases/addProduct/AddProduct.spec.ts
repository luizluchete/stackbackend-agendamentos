import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddProductRepository } from '@/slices/product/repositories/contracts'
import { mockProduct } from '@/slices/product/entities/ProductEntity.spec'
import { AddProduct } from './AddProduct'

describe('addProduct', () => {
  let sut: AddProduct
  let addProductRepository: MockProxy<AddProductRepository>
  const fakeProduct = mockProduct()

  beforeAll(async () => {
    MockDate.set(new Date())
    addProductRepository = mock()
    addProductRepository.addProduct.mockResolvedValue(fakeProduct)
  })

  beforeEach(async () => {
    sut = new AddProduct(addProductRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addProduct of AddProductRepository with correct values', async () => {
    await sut.execute(fakeProduct)
    expect(addProductRepository.addProduct).toHaveBeenCalledWith(fakeProduct)
    expect(addProductRepository.addProduct).toBeCalledTimes(1)
  })

  it('Should return a new product created when addProductRepository insert it', async () => {
    const product = await sut.execute(fakeProduct)
    expect(product).toEqual(fakeProduct)
  })

  it('Should return null a new product created when addProductRepository insert it', async () => {
    addProductRepository.addProduct.mockResolvedValueOnce(null)
    const product = await sut.execute(fakeProduct)
    expect(product).toBeFalsy()
  })

  it('Should rethrow if addProduct of AddProductRepository throws', async () => {
    addProductRepository.addProduct.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeProduct)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
