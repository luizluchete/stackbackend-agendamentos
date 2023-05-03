import MockDate from 'mockdate'
import {
  RatingResultAverage,
  RatingResultData,
  RatingResultEntity,
} from './RatingResultEntity'

export const mockRatingResultAverage = (): RatingResultAverage => ({
  createdAt: new Date(),
  ratingId: 'any_rating_id',
  ratings: [
    {
      comments: ['hellou'],
      count: 10,
      percent: 10,
      rating: 'any_rating',
      stars: 0,
    },
  ],
  ratingType: 'any_rating_type',
  starsAvg: 10,
})

export const mockRatingResult = (): RatingResultData => ({
  _id: '123',
  createdById: '123',
  name: 'fakeRatingResultEntity',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ratingForId: 'fakeUserId',
  ratingType: 'fakeRatingId',
  requestId: 'fakerequestId',
  ratingId: 'fakerequestId',
  ratings: [
    { rating: 'Excelente', stars: 5, comment: '', count: 0, percent: 0 },
  ],
})

export const fakeRatingResultPaginated = {
  total: 11,
  data: [
    mockRatingResult(),
    mockRatingResult(),
    mockRatingResult(),
    mockRatingResult(),
    mockRatingResult(),
    mockRatingResult(),
    mockRatingResult(),
    mockRatingResult(),
    mockRatingResult(),
    mockRatingResult(),
    mockRatingResult(),
  ],
}

describe('RatingResult', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeRatingResult = mockRatingResult()
    const ratingResult = new RatingResultEntity(fakeRatingResult)
    expect(ratingResult).toBeTruthy()
    expect(ratingResult).toEqual({
      ...fakeRatingResult,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
