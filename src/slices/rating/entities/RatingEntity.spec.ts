import MockDate from 'mockdate'
import { RatingData, RatingEntity } from './RatingEntity'

export const mockRating = (): RatingData => ({
  _id: '123',
  createdById: '123',
  name: 'fakeRatingEntity',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ratingType: 'any_ratingType',
  ratings: [{ rating: 'Excelente', stars: 5 }],
})

export const fakeRatingPaginated = {
  total: 11,
  data: [
    mockRating(),
    mockRating(),
    mockRating(),
    mockRating(),
    mockRating(),
    mockRating(),
    mockRating(),
    mockRating(),
    mockRating(),
    mockRating(),
    mockRating(),
  ],
}

describe('Rating', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeRating = mockRating()
    const rating = new RatingEntity(fakeRating)
    expect(rating).toBeTruthy()
    expect(rating).toEqual({
      ...fakeRating,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
