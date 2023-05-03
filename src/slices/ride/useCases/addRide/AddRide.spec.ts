import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddRideRepository } from '@/slices/ride/repositories/contracts'
import { mockRide } from '@/slices/ride/entities/RideEntity.spec'
import { AddRide } from './AddRide'

describe('addRide', () => {
  let sut: AddRide
  let addRideRepository: MockProxy<AddRideRepository>
  const fakeRide = mockRide()

  beforeAll(async () => {
    MockDate.set(new Date())
    addRideRepository = mock()
    addRideRepository.addRide.mockResolvedValue(fakeRide)
  })

  beforeEach(async () => {
    sut = new AddRide(addRideRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addRide of AddRideRepository with correct values', async () => {
    await sut.execute(fakeRide)
    expect(addRideRepository.addRide).toHaveBeenCalledWith(fakeRide)
    expect(addRideRepository.addRide).toBeCalledTimes(1)
  })

  it('Should return a new ride created when addRideRepository insert it', async () => {
    const ride = await sut.execute(fakeRide)
    expect(ride).toEqual(fakeRide)
  })

  it('Should return null a new ride created when addRideRepository insert it', async () => {
    addRideRepository.addRide.mockResolvedValueOnce(null)
    const ride = await sut.execute(fakeRide)
    expect(ride).toBeFalsy()
  })

  it('Should rethrow if addRide of AddRideRepository throws', async () => {
    addRideRepository.addRide.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeRide)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
