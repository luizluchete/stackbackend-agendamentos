import MockDate from 'mockdate'
import { ChapterEntity } from './ChapterEntity'

export const mockChapter = (): ChapterEntity => ({
  createdById: '123',
  name: 'any_name_chapter',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
})

export const fakeChapterPaginated = {
  total: 11,
  data: [
    mockChapter(),
    mockChapter(),
    mockChapter(),
    mockChapter(),
    mockChapter(),
    mockChapter(),
    mockChapter(),
    mockChapter(),
    mockChapter(),
    mockChapter(),
    mockChapter(),
  ],
}

describe('Chapter', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Can be created', () => {
    const fakeChapter = mockChapter()
    const chapter = new ChapterEntity(fakeChapter)
    expect(chapter).toBeTruthy()
    expect(chapter).toEqual({
      ...fakeChapter,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
