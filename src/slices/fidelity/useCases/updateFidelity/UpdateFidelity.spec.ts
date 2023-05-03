import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateFidelityRepository } from '@/slices/fidelity/repositories'
import { mockFidelity } from '@/slices/fidelity/entities/FidelityEntity.spec'
import { UpdateFidelity } from './UpdateFidelity'
import { Query } from '@/app/type'

describe('Update Fidelity', () => {
  let sut: UpdateFidelity
  let updateFidelityRepository: MockProxy<UpdateFidelityRepository>
  const fakeFidelity = mockFidelity()
  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    updateFidelityRepository = mock()
    updateFidelityRepository.update.mockResolvedValue(fakeFidelity)
  })

  beforeEach(async () => {
    sut = new UpdateFidelity(updateFidelityRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call updateFidelity of UpdateFidelityRepository with correct values', async () => {
    await sut.execute(fakeQuery, fakeFidelity)
    expect(updateFidelityRepository.update).toHaveBeenCalledWith(
      fakeQuery,
      fakeFidelity
    )
    expect(updateFidelityRepository.update).toBeCalledTimes(1)
  })

  it('Should return a new fidelity created when updateFidelityRepository insert it', async () => {
    const fidelity = await sut.execute(fakeQuery, fakeFidelity)
    expect(fidelity).toEqual(fakeFidelity)
  })

  it('Should return null a new fidelity created when updateFidelityRepository insert it', async () => {
    updateFidelityRepository.update.mockResolvedValueOnce(null)
    const fidelity = await sut.execute(fakeQuery, fakeFidelity)
    expect(fidelity).toBeFalsy()
  })

  it('Should rethrow if updateFidelity of UpdateFidelityRepository throws', async () => {
    updateFidelityRepository.update.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery, fakeFidelity)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
