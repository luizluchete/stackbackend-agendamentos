import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadClientByPageRepository } from '@/slices/client/repositories/contracts'
import { fakeClientPaginated } from '../../entities/ClientEntity.spec'
import { Query } from '@/app/type'
import { LoadClientByPage } from './LoadClientByPage'

describe('LoadClientByPage', () => {
  let sut: LoadClientByPage
  let fakeQuery: Query

  let loadClientRepositoryByPage: MockProxy<LoadClientByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadClientRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadClientRepositoryByPage.loadClientByPage.mockResolvedValue(
      fakeClientPaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadClientByPage(loadClientRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadClientByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadClientRepositoryByPage.loadClientByPage
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadClientRepositoryByPage.loadClientByPage
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a client loaded when LoadClientByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeClientPaginated)
  })

  it('Should return null loaded when LoadClientByPageRepository return it', async () => {
    loadClientRepositoryByPage.loadClientByPage.mockResolvedValueOnce(null)
    const client = await sut.load(fakeQuery)
    expect(client).toBeFalsy()
  })

  it('Should rethrow if loadClientByPage of LoadClientByPageRepository throws', async () => {
    loadClientRepositoryByPage.loadClientByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
