import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadAverageRatingResultRepository } from '@/slices/appointment/repositories/contracts'
import { Query } from '@/app/type'
import { LoadAverageRatingResult } from './LoadAverage'
import { mockRatingResultAverage } from '@/slices/ratingResult/entities/RatingResultEntity.spec'

describe('LoadAverageRatingResult', () => {
  let sut: LoadAverageRatingResult
  let fakeQuery: Query

  let loadAppointmentRepository: MockProxy<LoadAverageRatingResultRepository>
  const fakeRatingResultAverage = mockRatingResultAverage()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadAppointmentRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadAppointmentRepository.loadAverateRatingReuslt.mockResolvedValue(
      fakeRatingResultAverage
    )
  })

  beforeEach(async () => {
    sut = new LoadAverageRatingResult(loadAppointmentRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadAverageRatingResultRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadAppointmentRepository.loadAverateRatingReuslt
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadAppointmentRepository.loadAverateRatingReuslt
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a appointment loaded when LoadAverageRatingResultRepository return it', async () => {
    const appointment = await sut.load(fakeQuery)
    expect(appointment).toEqual(fakeRatingResultAverage)
  })

  it('Should return null loaded when LoadAverageRatingResultRepository return it', async () => {
    loadAppointmentRepository.loadAverateRatingReuslt.mockResolvedValueOnce(
      null
    )
    const appointment = await sut.load(fakeQuery)
    expect(appointment).toBeFalsy()
  })

  it('Should rethrow if loadAppointment of LoadAverageRatingResultRepository throws', async () => {
    loadAppointmentRepository.loadAverateRatingReuslt.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
