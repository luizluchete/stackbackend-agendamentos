import MockDate from 'mockdate'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadChapterByPageRepository } from '@/slices/chapter/repositories/contracts'
import { fakeChapterPaginated } from '../../entities/ChapterEntity.spec'
import { Query } from '@/app/type'
import { LoadChapterByPage } from './LoadChapterByPage'

describe('LoadChapterByPage', () => {
  let sut: LoadChapterByPage
  let fakeQuery: Query

  let loadChapterRepositoryByPage: MockProxy<LoadChapterByPageRepository>

  beforeAll(async () => {
    MockDate.set(new Date())
    loadChapterRepositoryByPage = mock()
    fakeQuery = { fields: { name: '123' }, options: {} }
    loadChapterRepositoryByPage.loadChapterByPage.mockResolvedValue(
      fakeChapterPaginated
    )
  })

  beforeEach(async () => {
    sut = new LoadChapterByPage(loadChapterRepositoryByPage)
  })

  afterAll(async () => {
    MockDate.reset()
  })

  it('should call LoadChapterByPageRepository with corrrect values', async () => {
    await sut.load(fakeQuery)
    expect(loadChapterRepositoryByPage.loadChapterByPage).toHaveBeenCalledWith(
      fakeQuery
    )
    expect(loadChapterRepositoryByPage.loadChapterByPage).toHaveBeenCalledTimes(
      1
    )
  })

  it('Should return a chapter loaded when LoadChapterByPageRepository return it', async () => {
    const result = await sut.load(fakeQuery)
    expect(result).toEqual(fakeChapterPaginated)
  })

  it('Should return null loaded when LoadChapterByPageRepository return it', async () => {
    loadChapterRepositoryByPage.loadChapterByPage.mockResolvedValueOnce(null)
    const chapter = await sut.load(fakeQuery)
    expect(chapter).toBeFalsy()
  })

  it('Should rethrow if loadChapterByPage of LoadChapterByPageRepository throws', async () => {
    loadChapterRepositoryByPage.loadChapterByPage.mockRejectedValueOnce(
      new Error('any_error')
    )
    await expect(sut.load(fakeQuery)).rejects.toThrowError(
      new Error('any_error')
    )
  })
})
