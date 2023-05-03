import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadOwnerRepository } from '@/slices/owner/repositories/contracts'
import { mockOwner } from '../../entities/OwnerEntity.spec'
import { Query } from '@/app/type'
import { LoadOwner } from './LoadOwner'

describe('LoadOwner', () => {
  let sut: LoadOwner
  let fakeQuery: Query

  let loadOwnerRepository: MockProxy<LoadOwnerRepository>
  const fakeOwner = mockOwner()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadOwnerRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadOwnerRepository.loadOwner.mockResolvedValue(fakeOwner)
  })

  beforeEach(async () => {
    sut = new LoadOwner(loadOwnerRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadOwnerRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadOwnerRepository.loadOwner).toHaveBeenCalledWith(fakeQuery)
    expect(loadOwnerRepository.loadOwner).toHaveBeenCalledTimes(1)
  })

  it('Should return a owner loaded when LoadOwnerRepository return it', async () => {
    const owner = await sut.load(fakeQuery)
    expect(owner).toEqual(fakeOwner)
  })

  it('Should return null loaded when LoadOwnerRepository return it', async () => {
    loadOwnerRepository.loadOwner.mockResolvedValueOnce(null)
    const owner = await sut.load(fakeQuery)
    expect(owner).toBeFalsy()
  })

  it('Should rethrow if loadOwner of LoadOwnerRepository throws', async () => {
    loadOwnerRepository.loadOwner.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
