export type FidelityData = {
  _id?: string
  createdById: string
  name: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  ownerId: string
  requestId: string
  points: number
  clientId: string
}

export type FidelityPaginated = {
  data: FidelityData[]
  total: number
}

export class FidelityEntity {
  createdById: string
  name: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  ownerId: string
  requestId: string
  points: number
  clientId: string
  constructor(data: FidelityData) {
    this.createdById = data.createdById
    this.name = data.name
    this.active = true
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.ownerId = data.ownerId
    this.requestId = data.requestId
    this.points = data.points
    this.clientId = data.clientId
  }
}
