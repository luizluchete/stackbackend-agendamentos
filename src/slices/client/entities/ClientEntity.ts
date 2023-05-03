export type ClientData = {
  _id?: string
  createdById: string
  name: string
  cpf?: string
  phone?: string
  userId: string
  ownerId: string
  birthDate: Date
  appointmentsTotal?: number
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type ClientPaginated = {
  data: ClientData[]
  total: number
}

export class ClientEntity {
  createdById: string
  name: string
  cpf?: string
  phone?: string
  userId: string
  ownerId: string
  birthDate: Date
  appointmentsTotal?: number
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  constructor(data: ClientData) {
    this.createdById = data.createdById
    this.name = data.name
    this.active = false
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.cpf = data.cpf
    this.phone = data.phone
    this.userId = data.userId
    this.ownerId = data.ownerId
    this.birthDate = data.birthDate
    this.appointmentsTotal = 0
  }
}
