import MockDate from 'mockdate'
import { ProductEntity } from './ProductEntity'

export const mockProduct = (): ProductEntity => ({
  createdById: '123',
  name: 'any_name_product',
  quantity: 10,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
})

export const fakeProductPaginated = {
  total: 11,
  data: [
    mockProduct(),
    mockProduct(),
    mockProduct(),
    mockProduct(),
    mockProduct(),
    mockProduct(),
    mockProduct(),
    mockProduct(),
    mockProduct(),
    mockProduct(),
    mockProduct(),
  ],
}

describe('Product', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeProduct = mockProduct()
    const product = new ProductEntity(fakeProduct)
    expect(product).toBeTruthy()
    expect(product).toEqual({
      ...fakeProduct,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
