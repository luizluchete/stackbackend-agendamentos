import MockDate from 'mockdate'
import { CategoryEntity } from './CategoryEntity'

export const mockCategory = (): CategoryEntity => ({
  createdById: '123',
  name: 'any_name_category',
  active: true,
  image: 'any_image',
  description: 'any_descripion',
  createdAt: new Date(),
  updatedAt: new Date(),
})

export const fakeCategoryPaginated = {
  total: 11,
  categories: [
    mockCategory(),
    mockCategory(),
    mockCategory(),
    mockCategory(),
    mockCategory(),
    mockCategory(),
    mockCategory(),
    mockCategory(),
    mockCategory(),
    mockCategory(),
    mockCategory(),
  ],
}

describe('Category', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeCategory = mockCategory()
    const category = new CategoryEntity(fakeCategory)
    expect(category).toBeTruthy()
    expect(category).toEqual({
      ...fakeCategory,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
