import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateRideRepository } from '@/slices/ride/repositories'
import { mockRide } from '@/slices/ride/entities/RideEntity.spec'
import { UpdateRide } from './UpdateRide'
import { Query } from '@/app/type'

describe('Update Ride', () => {
  let sut: UpdateRide
  let updateRideRepository: MockProxy<UpdateRideRepository>
  const fakeRide = mockRide()
  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    updateRideRepository = mock()
    updateRideRepository.update.mockResolvedValue(fakeRide)
  })

  beforeEach(async () => {
    sut = new UpdateRide(updateRideRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call updateRide of UpdateRideRepository with correct values', async () => {
    await sut.execute(fakeQuery, fakeRide)
    expect(updateRideRepository.update).toHaveBeenCalledWith(
      fakeQuery,
      fakeRide
    )
    expect(updateRideRepository.update).toBeCalledTimes(1)
  })

  it('Should return a new ride created when updateRideRepository insert it', async () => {
    const ride = await sut.execute(fakeQuery, fakeRide)
    expect(ride).toEqual(fakeRide)
  })

  it('Should return null a new ride created when updateRideRepository insert it', async () => {
    updateRideRepository.update.mockResolvedValueOnce(null)
    const ride = await sut.execute(fakeQuery, fakeRide)
    expect(ride).toBeFalsy()
  })

  it('Should rethrow if updateRide of UpdateRideRepository throws', async () => {
    updateRideRepository.update.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery, fakeRide)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
