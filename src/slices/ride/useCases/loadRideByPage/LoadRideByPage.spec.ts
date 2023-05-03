import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadRideByPageRepository } from '@/slices/ride/repositories/contracts'
import { fakeRidePaginated } from '../../entities/RideEntity.spec'
import { Query } from '@/app/type'
import { LoadRideByPage } from './LoadRideByPage'

describe('LoadRideByPage', () => {
  let sut: LoadRideByPage
  let fakeQuery: Query

  let loadRideRepositoryByPage: MockProxy<LoadRideByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadRideRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadRideRepositoryByPage.loadRideByPage.mockResolvedValue(
      fakeRidePaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadRideByPage(loadRideRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadRideByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadRideRepositoryByPage.loadRideByPage
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadRideRepositoryByPage.loadRideByPage
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a ride loaded when LoadRideByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeRidePaginated)
  })

  it('Should return null loaded when LoadRideByPageRepository return it', async () => {
    loadRideRepositoryByPage.loadRideByPage.mockResolvedValueOnce(null)
    const ride = await sut.load(fakeQuery)
    expect(ride).toBeFalsy()
  })

  it('Should rethrow if loadRideByPage of LoadRideByPageRepository throws', async () => {
    loadRideRepositoryByPage.loadRideByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
