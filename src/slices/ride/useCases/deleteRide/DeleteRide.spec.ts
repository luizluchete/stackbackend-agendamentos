import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteRideRepository } from '@/slices/ride/repositories'
import { DeleteRide } from './DeleteRide'
import { Query } from '@/app/type'

describe('Delete Ride', () => {
  let sut: DeleteRide
  let deleteRideRepository: MockProxy<DeleteRideRepository>

  const fakeQuery: Query = { fields: { _id: 'any_id' } }

  beforeAll(async () => {
    MockDate.set(new Date())
    deleteRideRepository = mock()
    deleteRideRepository.delete.mockResolvedValue()
  })

  beforeEach(async () => {
    sut = new DeleteRide(deleteRideRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call deleteRide of DeleteRideRepository with correct values', async () => {
    await sut.execute(fakeQuery)
    expect(deleteRideRepository.delete).toHaveBeenCalledWith(fakeQuery)
    expect(deleteRideRepository.delete).toBeCalledTimes(1)
  })

  it('Should rethrow if deleteRide of DeleteRideRepository throws', async () => {
    deleteRideRepository.delete.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
