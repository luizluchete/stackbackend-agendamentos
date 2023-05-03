import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadRideRepository } from '@/slices/ride/repositories/contracts'
import { mockRide } from '../../entities/RideEntity.spec'
import { Query } from '@/app/type'
import { LoadRide } from './LoadRide'

describe('LoadRide', () => {
  let sut: LoadRide
  let fakeQuery: Query

  let loadRideRepository: MockProxy<LoadRideRepository>
  const fakeRide = mockRide()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadRideRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadRideRepository.loadRide.mockResolvedValue(fakeRide)
  })

  beforeEach(async () => {
    sut = new LoadRide(loadRideRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadRideRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadRideRepository.loadRide).toHaveBeenCalledWith(fakeQuery)
    expect(loadRideRepository.loadRide).toHaveBeenCalledTimes(1)
  })

  it('Should return a ride loaded when LoadRideRepository return it', async () => {
    const ride = await sut.load(fakeQuery)
    expect(ride).toEqual(fakeRide)
  })

  it('Should return null loaded when LoadRideRepository return it', async () => {
    loadRideRepository.loadRide.mockResolvedValueOnce(null)
    const ride = await sut.load(fakeQuery)
    expect(ride).toBeFalsy()
  })

  it('Should rethrow if loadRide of LoadRideRepository throws', async () => {
    loadRideRepository.loadRide.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
