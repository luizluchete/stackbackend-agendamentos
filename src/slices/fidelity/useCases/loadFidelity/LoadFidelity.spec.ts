import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadFidelityRepository } from '@/slices/fidelity/repositories/contracts'
import { mockFidelity } from '../../entities/FidelityEntity.spec'
import { Query } from '@/app/type'
import { LoadFidelity } from './LoadFidelity'

describe('LoadFidelity', () => {
  let sut: LoadFidelity
  let fakeQuery: Query

  let loadFidelityRepository: MockProxy<LoadFidelityRepository>
  const fakeFidelity = mockFidelity()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadFidelityRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadFidelityRepository.loadFidelity.mockResolvedValue(fakeFidelity)
  })

  beforeEach(async () => {
    sut = new LoadFidelity(loadFidelityRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadFidelityRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadFidelityRepository.loadFidelity).toHaveBeenCalledWith(fakeQuery)
    expect(loadFidelityRepository.loadFidelity).toHaveBeenCalledTimes(1)
  })

  it('Should return a fidelity loaded when LoadFidelityRepository return it', async () => {
    const fidelity = await sut.load(fakeQuery)
    expect(fidelity).toEqual(fakeFidelity)
  })

  it('Should return null loaded when LoadFidelityRepository return it', async () => {
    loadFidelityRepository.loadFidelity.mockResolvedValueOnce(null)
    const fidelity = await sut.load(fakeQuery)
    expect(fidelity).toBeFalsy()
  })

  it('Should rethrow if loadFidelity of LoadFidelityRepository throws', async () => {
    loadFidelityRepository.loadFidelity.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
