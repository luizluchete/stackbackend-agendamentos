import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateOrderRepository } from '@/slices/order/repositories'
import { mockOrder } from '@/slices/order/entities/OrderEntity.spec'
import { UpdateOrder } from './UpdateOrder'
import { Query } from '@/app/type'

describe('Update Order', () => {
  let sut: UpdateOrder
  let updateOrderRepository: MockProxy<UpdateOrderRepository>
  const fakeOrder = mockOrder()
  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    updateOrderRepository = mock()
    updateOrderRepository.update.mockResolvedValue(fakeOrder)
  })

  beforeEach(async () => {
    sut = new UpdateOrder(updateOrderRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call updateOrder of UpdateOrderRepository with correct values', async () => {
    await sut.execute(fakeQuery, fakeOrder)
    expect(updateOrderRepository.update).toHaveBeenCalledWith(
      fakeQuery,
      fakeOrder
    )
    expect(updateOrderRepository.update).toBeCalledTimes(1)
  })

  it('Should return a new order created when updateOrderRepository insert it', async () => {
    const order = await sut.execute(fakeQuery, fakeOrder)
    expect(order).toEqual(fakeOrder)
  })

  it('Should return null a new order created when updateOrderRepository insert it', async () => {
    updateOrderRepository.update.mockResolvedValueOnce(null)
    const order = await sut.execute(fakeQuery, fakeOrder)
    expect(order).toBeFalsy()
  })

  it('Should rethrow if updateOrder of UpdateOrderRepository throws', async () => {
    updateOrderRepository.update.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery, fakeOrder)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
