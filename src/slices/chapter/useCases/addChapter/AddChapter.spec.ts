import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { AddChapterRepository } from '@/slices/chapter/repositories/contracts'
import { mockChapter } from '@/slices/chapter/entities/ChapterEntity.spec'
import { AddChapter } from './AddChapter'

describe('addChapter', () => {
  let sut: AddChapter
  let addChapterRepository: MockProxy<AddChapterRepository>
  const fakeChapter = mockChapter()

  beforeAll(async () => {
    MockDate.set(new Date())
    addChapterRepository = mock()
    addChapterRepository.addChapter.mockResolvedValue(fakeChapter)
  })

  beforeEach(async () => {
    sut = new AddChapter(addChapterRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('Should call addChapter of AddChapterRepository with correct values', async () => {
    await sut.execute(fakeChapter)
    expect(addChapterRepository.addChapter).toHaveBeenCalledWith(fakeChapter)
    expect(addChapterRepository.addChapter).toBeCalledTimes(1)
  })

  it('Should return a new chapter created when addChapterRepository insert it', async () => {
    const chapter = await sut.execute(fakeChapter)
    expect(chapter).toEqual(fakeChapter)
  })

  it('Should return null a new chapter created when addChapterRepository insert it', async () => {
    addChapterRepository.addChapter.mockResolvedValueOnce(null)
    const chapter = await sut.execute(fakeChapter)
    expect(chapter).toBeFalsy()
  })

  it('Should rethrow if addChapter of AddChapterRepository throws', async () => {
    addChapterRepository.addChapter.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.execute(fakeChapter)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
