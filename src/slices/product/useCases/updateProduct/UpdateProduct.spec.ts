import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateProductRepository } from '@/slices/product/repositories'
import { mockProduct } from '@/slices/product/entities/ProductEntity.spec'
import { UpdateProduct } from './UpdateProduct'
import { Query } from '@/app/type'

describe('Update Product', () => {
  let sut: UpdateProduct
  let updateProductRepository: MockProxy<UpdateProductRepository>
  const fakeProduct = mockProduct()
  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    updateProductRepository = mock()
    updateProductRepository.update.mockResolvedValue(fakeProduct)
  })

  beforeEach(async () => {
    sut = new UpdateProduct(updateProductRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call updateProduct of UpdateProductRepository with correct values', async () => {
    await sut.execute(fakeQuery, fakeProduct)
    expect(updateProductRepository.update).toHaveBeenCalledWith(
      fakeQuery,
      fakeProduct
    )
    expect(updateProductRepository.update).toBeCalledTimes(1)
  })

  it('Should return a new product created when updateProductRepository insert it', async () => {
    const product = await sut.execute(fakeQuery, fakeProduct)
    expect(product).toEqual(fakeProduct)
  })

  it('Should return null a new product created when updateProductRepository insert it', async () => {
    updateProductRepository.update.mockResolvedValueOnce(null)
    const product = await sut.execute(fakeQuery, fakeProduct)
    expect(product).toBeFalsy()
  })

  it('Should rethrow if updateProduct of UpdateProductRepository throws', async () => {
    updateProductRepository.update.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery, fakeProduct)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
