import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadOrderRepository } from '@/slices/order/repositories/contracts'
import { mockOrder } from '../../entities/OrderEntity.spec'
import { Query } from '@/app/type'
import { LoadOrder } from './LoadOrder'

describe('LoadOrder', () => {
  let sut: LoadOrder
  let fakeQuery: Query

  let loadOrderRepository: MockProxy<LoadOrderRepository>
  const fakeOrder = mockOrder()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadOrderRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadOrderRepository.loadOrder.mockResolvedValue(fakeOrder)
  })

  beforeEach(async () => {
    sut = new LoadOrder(loadOrderRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadOrderRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadOrderRepository.loadOrder).toHaveBeenCalledWith(fakeQuery)
    expect(loadOrderRepository.loadOrder).toHaveBeenCalledTimes(1)
  })

  it('Should return a order loaded when LoadOrderRepository return it', async () => {
    const order = await sut.load(fakeQuery)
    expect(order).toEqual(fakeOrder)
  })

  it('Should return null loaded when LoadOrderRepository return it', async () => {
    loadOrderRepository.loadOrder.mockResolvedValueOnce(null)
    const order = await sut.load(fakeQuery)
    expect(order).toBeFalsy()
  })

  it('Should rethrow if loadOrder of LoadOrderRepository throws', async () => {
    loadOrderRepository.loadOrder.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
