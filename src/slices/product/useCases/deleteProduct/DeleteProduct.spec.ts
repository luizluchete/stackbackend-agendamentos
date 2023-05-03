import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteProductRepository } from '@/slices/product/repositories'
import { DeleteProduct } from './DeleteProduct'
import { Query } from '@/app/type'

describe('Delete Product', () => {
  let sut: DeleteProduct
  let deleteProductRepository: MockProxy<DeleteProductRepository>

  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    deleteProductRepository = mock()
    deleteProductRepository.delete.mockResolvedValue()
  })

  beforeEach(async () => {
    sut = new DeleteProduct(deleteProductRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call deleteProduct of DeleteProductRepository with correct values', async () => {
    await sut.execute(fakeQuery)
    expect(deleteProductRepository.delete).toHaveBeenCalledWith(fakeQuery)
    expect(deleteProductRepository.delete).toBeCalledTimes(1)
  })

  it('Should rethrow if deleteProduct of DeleteProductRepository throws', async () => {
    deleteProductRepository.delete.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
