import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteOrderRepository } from '@/slices/order/repositories'
import { DeleteOrder } from './DeleteOrder'
import { Query } from '@/app/type'

describe('Delete Order', () => {
  let sut: DeleteOrder
  let deleteOrderRepository: MockProxy<DeleteOrderRepository>

  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    deleteOrderRepository = mock()
    deleteOrderRepository.delete.mockResolvedValue()
  })

  beforeEach(async () => {
    sut = new DeleteOrder(deleteOrderRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call deleteOrder of DeleteOrderRepository with correct values', async () => {
    await sut.execute(fakeQuery)
    expect(deleteOrderRepository.delete).toHaveBeenCalledWith(fakeQuery)
    expect(deleteOrderRepository.delete).toBeCalledTimes(1)
  })

  it('Should rethrow if deleteOrder of DeleteOrderRepository throws', async () => {
    deleteOrderRepository.delete.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
