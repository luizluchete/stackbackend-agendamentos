import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddOrderRepository } from '@/slices/order/repositories/contracts'
import { mockOrder } from '@/slices/order/entities/OrderEntity.spec'
import { AddOrder } from './AddOrder'

describe('addOrder', () => {
  let sut: AddOrder
  let addOrderRepository: MockProxy<AddOrderRepository>
  const fakeOrder = mockOrder()

  beforeAll(async () => {
    MockDate.set(new Date())
    addOrderRepository = mock()
    addOrderRepository.addOrder.mockResolvedValue(fakeOrder)
  })

  beforeEach(async () => {
    sut = new AddOrder(addOrderRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addOrder of AddOrderRepository with correct values', async () => {
    await sut.execute(fakeOrder)
    expect(addOrderRepository.addOrder).toHaveBeenCalledWith(fakeOrder)
    expect(addOrderRepository.addOrder).toBeCalledTimes(1)
  })

  it('Should return a new order created when addOrderRepository insert it', async () => {
    const order = await sut.execute(fakeOrder)
    expect(order).toEqual(fakeOrder)
  })

  it('Should return null a new order created when addOrderRepository insert it', async () => {
    addOrderRepository.addOrder.mockResolvedValueOnce(null)
    const order = await sut.execute(fakeOrder)
    expect(order).toBeFalsy()
  })

  it('Should rethrow if addOrder of AddOrderRepository throws', async () => {
    addOrderRepository.addOrder.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeOrder)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
