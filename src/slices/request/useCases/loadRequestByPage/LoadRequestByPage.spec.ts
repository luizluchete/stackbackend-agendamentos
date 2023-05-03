import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadRequestByPageRepository } from '@/slices/request/repositories/contracts'
import { fakeRequestPaginated } from '../../entities/RequestEntity.spec'
import { Query } from '@/app/type'
import { LoadRequestByPage } from './LoadRequestByPage'

describe('LoadRequestByPage', () => {
  let sut: LoadRequestByPage
  let fakeQuery: Query

  let loadRequestRepositoryByPage: MockProxy<LoadRequestByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadRequestRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadRequestRepositoryByPage.loadRequestByPage.mockResolvedValue(
      fakeRequestPaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadRequestByPage(loadRequestRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadRequestByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadRequestRepositoryByPage.loadRequestByPage
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadRequestRepositoryByPage.loadRequestByPage
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a request loaded when LoadRequestByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeRequestPaginated)
  })

  it('Should return null loaded when LoadRequestByPageRepository return it', async () => {
    loadRequestRepositoryByPage.loadRequestByPage.mockResolvedValueOnce(null)
    const request = await sut.load(fakeQuery)
    expect(request).toBeFalsy()
  })

  it('Should rethrow if loadRequestByPage of LoadRequestByPageRepository throws', async () => {
    loadRequestRepositoryByPage.loadRequestByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
