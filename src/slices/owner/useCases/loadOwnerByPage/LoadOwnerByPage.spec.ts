import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadOwnerByPageRepository } from '@/slices/owner/repositories/contracts'
import { fakeOwnerPaginated } from '../../entities/OwnerEntity.spec'
import { Query } from '@/app/type'
import { LoadOwnerByPage } from './LoadOwnerByPage'

describe('LoadOwnerByPage', () => {
  let sut: LoadOwnerByPage
  let fakeQuery: Query

  let loadOwnerRepositoryByPage: MockProxy<LoadOwnerByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadOwnerRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadOwnerRepositoryByPage.loadOwnerByPage.mockResolvedValue(
      fakeOwnerPaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadOwnerByPage(loadOwnerRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadOwnerByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadOwnerRepositoryByPage.loadOwnerByPage
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadOwnerRepositoryByPage.loadOwnerByPage
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a owner loaded when LoadOwnerByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeOwnerPaginated)
  })

  it('Should return null loaded when LoadOwnerByPageRepository return it', async () => {
    loadOwnerRepositoryByPage.loadOwnerByPage.mockResolvedValueOnce(null)
    const owner = await sut.load(fakeQuery)
    expect(owner).toBeFalsy()
  })

  it('Should rethrow if loadOwnerByPage of LoadOwnerByPageRepository throws', async () => {
    loadOwnerRepositoryByPage.loadOwnerByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
