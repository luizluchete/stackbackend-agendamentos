import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateOwnerRepository } from '@/slices/owner/repositories'
import { mockOwner } from '@/slices/owner/entities/OwnerEntity.spec'
import { UpdateOwner } from './UpdateOwner'
import { Query } from '@/app/type'

describe('Update Owner', () => {
  let sut: UpdateOwner
  let updateOwnerRepository: MockProxy<UpdateOwnerRepository>
  const fakeOwner = mockOwner()
  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    updateOwnerRepository = mock()
    updateOwnerRepository.update.mockResolvedValue(fakeOwner)
  })

  beforeEach(async () => {
    sut = new UpdateOwner(updateOwnerRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call updateOwner of UpdateOwnerRepository with correct values', async () => {
    await sut.execute(fakeQuery, fakeOwner)
    expect(updateOwnerRepository.update).toHaveBeenCalledWith(
      fakeQuery,
      fakeOwner
    )
    expect(updateOwnerRepository.update).toBeCalledTimes(1)
  })

  it('Should return a new owner created when updateOwnerRepository insert it', async () => {
    const owner = await sut.execute(fakeQuery, fakeOwner)
    expect(owner).toEqual(fakeOwner)
  })

  it('Should return null a new owner created when updateOwnerRepository insert it', async () => {
    updateOwnerRepository.update.mockResolvedValueOnce(null)
    const owner = await sut.execute(fakeQuery, fakeOwner)
    expect(owner).toBeFalsy()
  })

  it('Should rethrow if updateOwner of UpdateOwnerRepository throws', async () => {
    updateOwnerRepository.update.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery, fakeOwner)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
