import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddOwnerRepository } from '@/slices/owner/repositories/contracts'
import { mockOwner } from '@/slices/owner/entities/OwnerEntity.spec'
import { AddOwner } from './AddOwner'

describe('addOwner', () => {
  let sut: AddOwner
  let addOwnerRepository: MockProxy<AddOwnerRepository>
  const fakeOwner = mockOwner()

  beforeAll(async () => {
    MockDate.set(new Date())
    addOwnerRepository = mock()
    addOwnerRepository.addOwner.mockResolvedValue(fakeOwner)
  })

  beforeEach(async () => {
    sut = new AddOwner(addOwnerRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addOwner of AddOwnerRepository with correct values', async () => {
    await sut.execute(fakeOwner)
    expect(addOwnerRepository.addOwner).toHaveBeenCalledWith(fakeOwner)
    expect(addOwnerRepository.addOwner).toBeCalledTimes(1)
  })

  it('Should return a new owner created when addOwnerRepository insert it', async () => {
    const owner = await sut.execute(fakeOwner)
    expect(owner).toEqual(fakeOwner)
  })

  it('Should return null a new owner created when addOwnerRepository insert it', async () => {
    addOwnerRepository.addOwner.mockResolvedValueOnce(null)
    const owner = await sut.execute(fakeOwner)
    expect(owner).toBeFalsy()
  })

  it('Should rethrow if addOwner of AddOwnerRepository throws', async () => {
    addOwnerRepository.addOwner.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeOwner)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
