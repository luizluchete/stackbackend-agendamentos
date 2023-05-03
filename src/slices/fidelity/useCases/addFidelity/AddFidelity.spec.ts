import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddFidelityRepository } from '@/slices/fidelity/repositories/contracts'
import { mockFidelity } from '@/slices/fidelity/entities/FidelityEntity.spec'
import { AddFidelity } from './AddFidelity'

describe('addFidelity', () => {
  let sut: AddFidelity
  let addFidelityRepository: MockProxy<AddFidelityRepository>
  const fakeFidelity = mockFidelity()

  beforeAll(async () => {
    MockDate.set(new Date())
    addFidelityRepository = mock()
    addFidelityRepository.addFidelity.mockResolvedValue(fakeFidelity)
  })

  beforeEach(async () => {
    sut = new AddFidelity(addFidelityRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addFidelity of AddFidelityRepository with correct values', async () => {
    await sut.execute(fakeFidelity)
    expect(addFidelityRepository.addFidelity).toHaveBeenCalledWith(fakeFidelity)
    expect(addFidelityRepository.addFidelity).toBeCalledTimes(1)
  })

  it('Should return a new fidelity created when addFidelityRepository insert it', async () => {
    const fidelity = await sut.execute(fakeFidelity)
    expect(fidelity).toEqual(fakeFidelity)
  })

  it('Should return null a new fidelity created when addFidelityRepository insert it', async () => {
    addFidelityRepository.addFidelity.mockResolvedValueOnce(null)
    const fidelity = await sut.execute(fakeFidelity)
    expect(fidelity).toBeFalsy()
  })

  it('Should rethrow if addFidelity of AddFidelityRepository throws', async () => {
    addFidelityRepository.addFidelity.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeFidelity)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
