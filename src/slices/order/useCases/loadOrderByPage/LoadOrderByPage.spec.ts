import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadOrderByPageRepository } from '@/slices/order/repositories/contracts'
import { fakeOrderPaginated } from '../../entities/OrderEntity.spec'
import { Query } from '@/app/type'
import { LoadOrderByPage } from './LoadOrderByPage'

describe('LoadOrderByPage', () => {
  let sut: LoadOrderByPage
  let fakeQuery: Query

  let loadOrderRepositoryByPage: MockProxy<LoadOrderByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadOrderRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadOrderRepositoryByPage.loadOrderByPage.mockResolvedValue(
      fakeOrderPaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadOrderByPage(loadOrderRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadOrderByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadOrderRepositoryByPage.loadOrderByPage
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadOrderRepositoryByPage.loadOrderByPage
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a order loaded when LoadOrderByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeOrderPaginated)
  })

  it('Should return null loaded when LoadOrderByPageRepository return it', async () => {
    loadOrderRepositoryByPage.loadOrderByPage.mockResolvedValueOnce(null)
    const order = await sut.load(fakeQuery)
    expect(order).toBeFalsy()
  })

  it('Should rethrow if loadOrderByPage of LoadOrderByPageRepository throws', async () => {
    loadOrderRepositoryByPage.loadOrderByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
