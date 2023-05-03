import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadServiceByPageRepository } from '@/slices/service/repositories/contracts'
import { fakeServicePaginated } from '../../entities/ServiceEntity.spec'
import { Query } from '@/app/type'
import { LoadServiceByPage } from './LoadServiceByPage'

describe('LoadServiceByPage', () => {
  let sut: LoadServiceByPage
  let fakeQuery: Query

  let loadServiceRepositoryByPage: MockProxy<LoadServiceByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadServiceRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadServiceRepositoryByPage.loadServiceByPage.mockResolvedValue(
      fakeServicePaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadServiceByPage(loadServiceRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadServiceByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadServiceRepositoryByPage.loadServiceByPage
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadServiceRepositoryByPage.loadServiceByPage
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a service loaded when LoadServiceByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeServicePaginated)
  })

  it('Should return null loaded when LoadServiceByPageRepository return it', async () => {
    loadServiceRepositoryByPage.loadServiceByPage.mockResolvedValueOnce(null)
    const service = await sut.load(fakeQuery)
    expect(service).toBeFalsy()
  })

  it('Should rethrow if loadServiceByPage of LoadServiceByPageRepository throws', async () => {
    loadServiceRepositoryByPage.loadServiceByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
