import {
  addDays,
  addDuration,
  addHours,
  addMinutes,
  cloneDate,
  dayOfWeek,
  differenceInDays,
  differenceInMinutes,
  eachHourInterval,
  eachMinuteInterval,
  endOfDay,
  formatISO,
  handleTimezone,
  intervalDuration,
  intervalsOverlapping,
  isAfter,
  isBefore,
  isBeforeToday,
  isPast,
  isToday,
  parseISO,
  setHours,
  setMili,
  setMinutes,
  setSeconds,
  startOfDay,
  subDays,
  subMinutes,
} from './dateFns'
import MockDate from 'mockdate'

describe('dateFns functions', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should return added days when i call addDays', () => {
    expect(addDays(new Date(2021, 9, 12), 1)).toBe(
      new Date(2021, 9, 13).toISOString()
    )
    expect(addDays(new Date(2021, 9, 12), 10)).toBe(
      new Date(2021, 9, 22).toISOString()
    )
  })

  it('should return added minutes when i call addMinutes', () => {
    expect(addMinutes(new Date(2021, 9, 12, 10, 20), 1)).toBe(
      new Date(2021, 9, 12, 10, 21).toISOString()
    )
    expect(addMinutes(new Date(2021, 9, 12, 10, 20), 10)).toBe(
      new Date(2021, 9, 12, 10, 30).toISOString()
    )
  })

  it('addHours function', () => {
    expect(addHours(new Date(2021, 9, 12, 10, 20), 1)).toBe(
      new Date(2021, 9, 12, 11, 20).toISOString()
    )
    expect(addHours(new Date(2021, 9, 12, 10, 20), 10)).toBe(
      new Date(2021, 9, 12, 20, 20).toISOString()
    )
  })

  it('should return if is past when i call isPast', () => {
    expect(isPast(new Date(2021, 9, 12, 10, 20))).toBeTruthy()

    expect(isPast(new Date().setDate(new Date().getDate() + 1))).toBeFalsy()
  })

  it('should return if isBerofeToday when i call isBerofeToday', () => {
    expect(isBeforeToday(new Date(2021, 9, 12, 10, 20))).toBeTruthy()

    expect(
      isBeforeToday(new Date().setDate(new Date().getDate() + 1))
    ).toBeFalsy()
  })

  it('intervalDuration function', () => {
    expect(
      intervalDuration(new Date(2021, 9, 12), new Date(2021, 9, 20))
    ).toEqual({
      days: 8,
      hours: 0,
      minutes: 0,
      months: 0,
      seconds: 0,
      years: 0,
    })
  })

  it('intervalDuration function', () => {
    const duration: Duration = {
      days: 8,
      hours: 0,
      minutes: 0,
      months: 0,
      seconds: 0,
      years: 0,
    }
    const dateTest = formatISO(addDuration(duration, new Date(2021, 9, 15)))

    expect(dateTest).toBe('2021-10-23T00:00:00-03:00')
  })

  it('startOfDay function', () => {
    const todayparseISO = parseISO(
      formatISO(new Date().setHours(3, 0, 0, 0)).replace('-03:00', '') + '.000Z'
    )
    const dateTest = startOfDay(new Date())
    expect(dateTest).toEqual(todayparseISO)
  })

  it('invervalsOverlapping function with date', () => {
    expect(
      intervalsOverlapping(
        parseISO(formatISO(new Date(2021, 9, 11))),
        parseISO(formatISO(new Date(2021, 9, 12))),
        parseISO(formatISO(new Date(2021, 8, 11))),
        parseISO(formatISO(new Date(2021, 10, 10)))
      )
    ).toBe(true)

    expect(
      intervalsOverlapping(
        parseISO(formatISO(new Date(2022, 2, 11))),
        parseISO(formatISO(new Date(2021, 9, 12))),
        parseISO(formatISO(new Date(2021, 8, 10))),
        parseISO(formatISO(new Date(2021, 10, 10)))
      )
    ).toBe(false)
  })

  it('invervalsOverlapping function with string', () => {
    expect(
      intervalsOverlapping(
        formatISO(new Date(2021, 9, 11)),
        formatISO(new Date(2021, 9, 12)),
        formatISO(new Date(2021, 8, 11)),
        formatISO(new Date(2021, 10, 10))
      )
    ).toBe(true)

    expect(
      intervalsOverlapping(
        formatISO(new Date(2022, 2, 11)),
        formatISO(new Date(2021, 9, 12)),
        formatISO(new Date(2021, 8, 10)),
        formatISO(new Date(2021, 10, 10))
      )
    ).toBe(false)
  })

  it('eachHourInterval function in ISO Format', () => {
    const dateTest = eachHourInterval(
      new Date(2023, 4, 11),
      new Date(2023, 4, 12),
      {
        step: 1,
      }
    )
    expect(dateTest).toBeTruthy()

    expect(dateTest.length).toBe(25)
  })
  it('eachminuteInterval function in ISO Format', () => {
    const minuteTest = eachMinuteInterval(
      new Date(2023, 4, 11, 2, 10),
      new Date(2023, 4, 11, 2, 20),
      {
        step: 1,
      }
    )
    expect(minuteTest).toBeTruthy()

    expect(minuteTest.length).toBe(11)
  })

  it('setMinutes function', () => {
    expect(formatISO(setMinutes(new Date(2023, 4, 3, 10, 10), 55))).toBe(
      '2023-05-03T10:55:00-03:00'
    )
  })

  it('setHours function', () => {
    expect(formatISO(setHours(new Date(2023, 4, 3, 10, 10), 5))).toBe(
      '2023-05-03T05:10:00-03:00'
    )
  })

  it('setSeconds function', () => {
    expect(formatISO(setSeconds(new Date(2023, 4, 3, 10, 10), 5))).toBe(
      '2023-05-03T10:10:05-03:00'
    )
  })

  it('setMili function', () => {
    expect(formatISO(setMili(new Date(2023, 4, 3, 10, 10), 5))).toBe(
      '2023-05-03T10:10:00-03:00'
    )
  })

  it('differenceInMinutes function', () => {
    expect(
      differenceInMinutes(
        new Date(2023, 4, 3, 10, 20),
        new Date(2023, 4, 3, 10, 10)
      )
    ).toBe(10)
  })

  it('differenceInDays function', () => {
    expect(
      differenceInDays(
        new Date(2023, 4, 13, 20, 20),
        new Date(2023, 4, 3, 10, 10)
      )
    ).toBe(10)
  })

  it('endOfDay function', () => {
    expect(endOfDay(new Date(2023, 4, 3, 20, 20))).toEqual(
      new Date('2023-05-04T02:59:59.999Z')
    )
  })

  it('dayOfWeek function when the day passe is sunday', () => {
    expect(dayOfWeek(new Date(2023, 3, 30))).toBe('sunday')
  })
  it('dayOfWeek function when the day passe is monday', () => {
    expect(dayOfWeek(new Date(2023, 4, 1))).toBe('monday')
  })
  it('dayOfWeek function when the day passe is tuesday', () => {
    expect(dayOfWeek(new Date(2023, 4, 2))).toBe('tuesday')
  })
  it('dayOfWeek function when the day passe is wednesday', () => {
    expect(dayOfWeek(new Date(2023, 4, 3))).toBe('wednesday')
  })
  it('dayOfWeek function when the day passe is thursday', () => {
    expect(dayOfWeek(new Date(2023, 4, 4))).toBe('thursday')
  })
  it('dayOfWeek function when the day passe is friday', () => {
    expect(dayOfWeek(new Date(2023, 4, 5))).toBe('friday')
  })
  it('dayOfWeek function when the day passe is saturday', () => {
    expect(dayOfWeek(new Date(2023, 4, 6))).toBe('saturday')
  })

  it('subMinutes function', () => {
    expect(subMinutes(new Date(2023, 4, 3, 20, 20), 10)).toEqual(
      new Date(2023, 4, 3, 20, 10)
    )
  })
  it('subDays function', () => {
    expect(subDays(new Date(2023, 4, 13, 20, 20), 10)).toEqual(
      new Date(2023, 4, 3, 20, 20)
    )
  })

  it('isAfter function returned true', () => {
    expect(isAfter(new Date(2023, 5, 13), new Date(2023, 4, 13))).toBe(true)
  })
  it('isAfter function returned false', () => {
    expect(isAfter(new Date(2023, 5, 13), new Date(2023, 6, 13))).toBe(false)
  })

  it('isBefore function returned true', () => {
    expect(isBefore(new Date(2023, 4, 13), new Date(2023, 5, 13))).toBe(true)
  })
  it('isBefore function returned false', () => {
    expect(isBefore(new Date(2023, 6, 13), new Date(2023, 5, 13))).toBe(false)
  })

  it('isToday function returned false', () => {
    expect(isToday(new Date(2023, 6, 13))).toBe(false)
  })

  it('isToday function returned true', () => {
    expect(isToday(new Date())).toBe(true)
  })

  it('cloneDate function', () => {
    const currentDate = new Date()
    const cloneCurrentDate = cloneDate(currentDate)
    expect(currentDate).toEqual(cloneCurrentDate)
  })

  it('handleTimezone function', () => {
    const timezoneDate = formatISO(
      handleTimezone(new Date(2023, 9, 21, 10, 30))
    )
    expect(timezoneDate).toBe('2023-10-21T10:30:00-03:00')
  })
})
