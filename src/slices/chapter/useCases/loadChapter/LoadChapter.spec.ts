import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadChapterRepository } from '@/slices/chapter/repositories/contracts'
import { mockChapter } from '../../entities/ChapterEntity.spec'
import { Query } from '@/app/type'
import { LoadChapter } from './LoadChapter'

describe('LoadChapter', () => {
  let sut: LoadChapter
  let fakeQuery: Query

  let loadChapterRepository: MockProxy<LoadChapterRepository>
  const fakeChapter = mockChapter()

  beforeAll(async () => {
    MockDate.set(new Date())
    loadChapterRepository = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadChapterRepository.loadChapter.mockResolvedValue(fakeChapter)
  })

  beforeEach(async () => {
    sut = new LoadChapter(loadChapterRepository)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadChapterRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadChapterRepository.loadChapter).toHaveBeenCalledWith(fakeQuery)
    expect(loadChapterRepository.loadChapter).toHaveBeenCalledTimes(1)
  })

  it('Should return a chapter loaded when LoadChapterRepository return it', async () => {
    const chapter = await sut.load(fakeQuery)
    expect(chapter).toEqual(fakeChapter)
  })

  it('Should return null loaded when LoadChapterRepository return it', async () => {
    loadChapterRepository.loadChapter.mockResolvedValueOnce(null)
    const chapter = await sut.load(fakeQuery)
    expect(chapter).toBeFalsy()
  })

  it('Should rethrow if loadChapter of LoadChapterRepository throws', async () => {
    loadChapterRepository.loadChapter.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
