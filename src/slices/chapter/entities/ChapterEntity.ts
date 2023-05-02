export type ChapterData = {
  _id?: string
  createdById: string
  name: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type ChapterPaginated = {
  data: ChapterData[]
  total: number
}

export class ChapterEntity {
  createdById: string
  name: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  constructor(data: ChapterData) {
    this.createdById = data.createdById
    this.name = data.name
    this.active = false
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
