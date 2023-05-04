import MockDate from 'mockdate'
import { mock, MockProxy } from 'jest-mock-extended'
import { LoadAvailableTimesRepository } from '@/slices/appointment/repositories/contracts'
import { LoadAvailableTimes } from './LoadAvailableTimes'
import {
  AvailableTimesModelRepository,
  QueryAvailableTimesRepository,
} from '@/slices/appointment/entities'
import { formatISO } from '@/app/helpers/dateFns/dateFns'

describe('LoadAvailableTimes', () => {
  let sut: LoadAvailableTimes

  let loadAvailableTimesRepository: MockProxy<LoadAvailableTimesRepository>
  const fakeQueryTimesAvailable: QueryAvailableTimesRepository = {
    endDay: formatISO(new Date(10, 10, 10)),
    initDay: formatISO(new Date(10, 10, 1)),
    professionalId: 'any_professionalId',
  }

  const mockAvailableTimesModelRepository: AvailableTimesModelRepository = {
    _id: {
      hourStart1: '8:00',
      hourEnd1: '18:00',
      hourLunchEnd1: '13:00',
      hourLunchStart1: '12:00',
      hourStart2: '8:00',
      hourEnd2: '18:00',
      hourLunchEnd2: '13:00',
      hourLunchStart2: '12:00',
      hourStart3: '8:00',
      hourEnd3: '18:00',
      hourLunchEnd3: '13:00',
      hourLunchStart3: '12:00',
      days1: {
        monday1: true,
        sunday1: false,
        tuesday1: true,
        thursday1: true,
        friday1: true,
        wednsday1: false,
        saturday1: false,
      },
      days2: {
        monday2: false,
        sunday2: false,
        tuesday2: false,
        thursday2: false,
        friday2: false,
        wednsday2: true,
        saturday2: false,
      },
      days3: {
        monday3: false,
        sunday3: false,
        tuesday3: false,
        thursday3: false,
        friday3: false,
        wednsday3: false,
        saturday3: true,
      },
    },
    data: [],
  }

  beforeAll(async () => {
    MockDate.set(new Date())
    loadAvailableTimesRepository = mock()
    loadAvailableTimesRepository.loadAvailableTimes.mockResolvedValue(
      mockAvailableTimesModelRepository
    )
  })

  beforeEach(async () => {
    sut = new LoadAvailableTimes(loadAvailableTimesRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadAvailableTimesRepository with corrrect values', async () => {
    await sut.loadAvailableTimes(fakeQueryTimesAvailable)
    expect(
      loadAvailableTimesRepository.loadAvailableTimes
    ).toHaveBeenCalledWith(fakeQueryTimesAvailable)
    expect(
      loadAvailableTimesRepository.loadAvailableTimes
    ).toHaveBeenCalledTimes(1)
  })

  it('Should return a appointment loaded when LoadAvailableTimesRepository return it', async () => {
    const appointment = await sut.loadAvailableTimes(fakeQueryTimesAvailable)
    expect(appointment).toEqual(mockAvailableTimesModelRepository)
  })

  it('Should return null loaded when LoadAvailableTimesRepository return it', async () => {
    loadAvailableTimesRepository.loadAvailableTimes.mockResolvedValueOnce(null)
    const appointment = await sut.loadAvailableTimes(fakeQueryTimesAvailable)
    expect(appointment).toBeFalsy()
  })

  it('Should rethrow if loadAvailableTimes of LoadAvailableTimesRepository throws', async () => {
    loadAvailableTimesRepository.loadAvailableTimes.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(
      sut.loadAvailableTimes(fakeQueryTimesAvailable)
    ).rejects.toThrowError(new Error('any_error'))
  })
})
