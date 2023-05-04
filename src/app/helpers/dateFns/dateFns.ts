import { utcToZonedTime as utcToZonedTimeDateFns } from 'date-fns-tz'
import {
  addDays as addDaysDateFns,
  isToday as isTodayDateFns,
  subMinutes as subMinutesDateFns,
  getDay as getDayDateFns,
  addMinutes as addMinutesDateFns,
  isPast as isPastDateFns,
  addHours as addHoursDateFns,
  eachHourOfInterval as eachHourOfIntervalDateFns,
  eachMinuteOfInterval as eachMinuteOfIntervalFns,
  intervalToDuration as intervalToDurationDateFns,
  areIntervalsOverlapping as areIntervalsOverlappingDateFns,
  setMinutes as setMinutesDateFns,
  setHours as setHoursDateFns,
  endOfDay as endOfDayDateFns,
  startOfDay as startOfDayDateFns,
  add as addDateFns,
  formatISO as formatISODateFns,
  isAfter as isAfterDateFns,
  parseISO as parseISODateFns,
  toDate as toDateDateFns,
  differenceInMinutes as differenceInMinutesDateFns,
  setMilliseconds as setMillisecondsDateFns,
  setSeconds as setSecondsDateFns,
  isBefore as isBeforeDateFns,
  differenceInDays as differenceInDaysDateFns,
  subDays as subDaysDateFns,
} from 'date-fns'

type Options = {
  step?: number
}

type Duration = {
  year?: number
  months?: number
  weeks?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}

export const addDays = (date: number | Date, amount: number): string => {
  return addDaysDateFns(date, amount)?.toISOString?.()
}

export const addMinutes = (date: number | Date, amount: number): string => {
  return addMinutesDateFns(date, amount).toISOString?.()
}

export const addHours = (date: number | Date, amount: number): string => {
  return addHoursDateFns(date, amount).toISOString?.()
}

export const isPast = (date: number | Date): boolean => {
  return isPastDateFns(date)
}

export const startOfDay = (date: number | Date): Date => startOfDayDateFns(date)
export const endOfDay = (date: number | Date): Date => endOfDayDateFns(date)
export const isBeforeToday = (date: number | Date): boolean => {
  const today = startOfDayDateFns(new Date())
  return isBeforeDateFns(date, today)
}

export const formatISO = (date: number | Date): string => formatISODateFns(date)
export const parseISO = (date: string): Date => parseISODateFns(date)

export const intervalDuration = (
  start: number | Date,
  end: number | Date
): Duration => {
  return intervalToDurationDateFns({ start, end })
}

export const addDuration = (duration: Duration, date: number | Date): Date => {
  return addDateFns(date, duration)
}

export const intervalsOverlapping = (
  started1: Date | string,
  ended1: Date | string,
  started2: Date | string,
  ended2: Date | string
): boolean => {
  const start1Aux =
    typeof started1 === 'string' ? parseISODateFns(started1) : started1
  const start2Aux =
    typeof started2 === 'string' ? parseISODateFns(started2) : started2

  const end1Aux = typeof ended1 === 'string' ? parseISODateFns(ended1) : ended1
  const ended2Aux =
    typeof ended2 === 'string' ? parseISODateFns(ended2) : ended2

  if (
    start2Aux.getTime() > start1Aux.getTime() ||
    start1Aux.getTime() > end1Aux.getTime() ||
    start2Aux.getTime() > ended2Aux.getTime() ||
    end1Aux.getTime() > ended2Aux.getTime() ||
    end1Aux.getTime() < start2Aux.getTime()
  ) {
    return false
  }
  return areIntervalsOverlappingDateFns(
    { start: start1Aux, end: end1Aux },
    { start: start2Aux, end: ended2Aux }
  )
}

export const eachHourInterval = (
  start: number | Date,
  end: number | Date,
  options: Options
): Date[] => {
  return eachHourOfIntervalDateFns({ end, start }, options)
}

export const eachMinuteOfInterval = (
  start: number | Date,
  end: number | Date,
  options: Options
): Date[] => {
  return eachMinuteOfIntervalFns({ end, start }, options)
}

export const setMinutes = (date: number | Date, minutes: number): Date => {
  return setMinutesDateFns(date, minutes)
}

export const setHours = (date: number | Date, hours: number): Date => {
  return setHoursDateFns(date, hours)
}

export const setSeconds = (date: number | Date, seconds: number): Date => {
  return setSecondsDateFns(date, seconds)
}

export const setMili = (date: number | Date, milliseconds: number): Date => {
  return setMillisecondsDateFns(date, milliseconds)
}

export const differenceInMinutes = (
  start: Date | number,
  end: Date | number
): number => {
  return differenceInMinutesDateFns(start, end)
}

export const differenceInDays = (
  start: Date | number,
  end: Date | number
): number => {
  return differenceInDaysDateFns(start, end)
}

export const dayOfWeek = (date: Date | number): string => {
  const result = getDayDateFns(date)

  switch (result) {
    case 0:
      return 'sunday'
    case 1:
      return 'monday'
    case 2:
      return 'tuesday'
    case 3:
      return 'wednesday'
    case 4:
      return 'thursday'
    case 5:
      return 'friday'
    case 6:
      return 'saturday'
  }
}

export const subMinutes = (date: Date | number, amount: number) =>
  subMinutesDateFns(date, amount)

export const subDays = (date: Date | number, amount: number) =>
  subDaysDateFns(date, amount)

export const isAfter = (
  date: number | Date,
  dateToCompare: number | Date
): boolean => {
  return isAfterDateFns(date, dateToCompare)
}

export const isBefore = (
  date: number | Date,
  dateToCompare: number | Date
): boolean => {
  return isBeforeDateFns(date, dateToCompare)
}

export const isToday = (date: number | Date): boolean => {
  return isTodayDateFns(date)
}

export const cloneDate = (date: number | Date): Date => {
  return toDateDateFns(date)
}

export const handleTimezone = (date: Date | number): Date => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return utcToZonedTimeDateFns(date, timezone)
}
