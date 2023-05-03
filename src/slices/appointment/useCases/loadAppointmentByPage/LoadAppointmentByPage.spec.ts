import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadAppointmentByPageRepository } from '@/slices/appointment/repositories/contracts'
import { fakeAppointmentPaginated } from '../../entities/AppointmentEntity.spec'
import { Query } from '@/app/type'
import { LoadAppointmentByPage } from './LoadAppointmentByPage'

describe('LoadAppointmentByPage', () => {
  let sut: LoadAppointmentByPage
  let fakeQuery: Query

  let loadAppointmentRepositoryByPage: MockProxy<LoadAppointmentByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadAppointmentRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadAppointmentRepositoryByPage.loadAppointmentByPage.mockResolvedValue(
      fakeAppointmentPaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadAppointmentByPage(loadAppointmentRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadAppointmentByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(
      loadAppointmentRepositoryByPage.loadAppointmentByPage
    ).toHaveBeenCalledWith(fakeQuery)
    expect(
      loadAppointmentRepositoryByPage.loadAppointmentByPage
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a appointment loaded when LoadAppointmentByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeAppointmentPaginated)
  })

  it('Should return null loaded when LoadAppointmentByPageRepository return it', async () => {
    loadAppointmentRepositoryByPage.loadAppointmentByPage.mockResolvedValueOnce(null)
    const appointment = await sut.load(fakeQuery)
    expect(appointment).toBeFalsy()
  })

  it('Should rethrow if loadAppointmentByPage of LoadAppointmentByPageRepository throws', async () => {
    loadAppointmentRepositoryByPage.loadAppointmentByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
