export type AccountData = {
  _id?: string
  createdById: string
  name: string
  refreshToken: string
  expiresAt?: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type AccountPaginated = {
  data: AccountData[]
  total: number
}

export class AccountEntity {
  createdById: string
  name: string
  refreshToken: string
  expiresAt?: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  constructor(data: AccountData) {
    this.createdById = data.createdById
    this.name = data.name
    this.active = true
    this.refreshToken = data.refreshToken
    this.expiresAt = data.expiresAt
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
