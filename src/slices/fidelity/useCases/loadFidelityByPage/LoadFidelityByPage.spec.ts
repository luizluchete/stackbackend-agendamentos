import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadFidelityByPageRepository } from '@/slices/fidelity/repositories/contracts'
import { fakeFidelityPaginated } from '../../entities/FidelityEntity.spec'
import { Query } from '@/app/type'
import { LoadFidelityByPage } from './LoadFidelityByPage'

describe('LoadFidelityByPage', () => {
  let sut: LoadFidelityByPage
  let fakeQuery: Query

  let loadFidelityRepositoryByPage: MockProxy<LoadFidelityByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadFidelityRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadFidelityRepositoryByPage.loadFidelityByPage.mockResolvedValue(
      fakeFidelityPaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadFidelityByPage(loadFidelityRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadFidelityByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadFidelityRepositoryByPage.loadFidelityByPage
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadFidelityRepositoryByPage.loadFidelityByPage
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a fidelity loaded when LoadFidelityByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeFidelityPaginated)
  })

  it('Should return null loaded when LoadFidelityByPageRepository return it', async () => {
    loadFidelityRepositoryByPage.loadFidelityByPage.mockResolvedValueOnce(null)
    const fidelity = await sut.load(fakeQuery)
    expect(fidelity).toBeFalsy()
  })

  it('Should rethrow if loadFidelityByPage of LoadFidelityByPageRepository throws', async () => {
    loadFidelityRepositoryByPage.loadFidelityByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
