import MockDate from 'mockdate'
import { ServiceEntity } from './ServiceEntity'

export const mockService = (): ServiceEntity => ({
  createdById: '123',
  name: 'fakeServiceEntity',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  duration: 60,
  categoryId: 'any_category_id',
  productsQuantityNeeded: 0,
  productId: 'any_product_id',
  description: 'desc',
  promotionalPrice: 10,
  price: 20,
  finalPrice: 0,
  havePromotionalPrice: true,
  hasFidelityGenerator: false,
  appointmentsTotal: 1,
  canPayWithFidelityPoints: false,
  comission: 99,
})

export const fakeServicePaginated = {
  total: 11,
  data: [
    mockService(),
    mockService(),
    mockService(),
    mockService(),
    mockService(),
    mockService(),
    mockService(),
    mockService(),
    mockService(),
    mockService(),
    mockService(),
  ],
}

describe('Service', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeService = mockService()
    const service = new ServiceEntity(fakeService)
    expect(service).toBeTruthy()
    expect(service).toEqual({
      ...fakeService,
      _id: undefined,
      appointmentsTotal: 0,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
