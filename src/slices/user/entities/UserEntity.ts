export type UserData = {
  _id?: string
  createdById: string
  name: string
  email: string
  role: string
  confirmedEmail: boolean
  sendedEmail: boolean
  password: string
  cardId?: string
  ownerId: string
  myOwnerId?: string
  payDay: Date
  photoUrl: string
  cpf: string
  phone: string
  coord?: any
  distance?: number
  appointmentsTotal?: number
  plan?: string
  cnpj?: string
  address?: string
  complement?: string
  photoId: string
  cash?: boolean
  creditcard?: boolean
  debitcard?: boolean
  transferbank?: boolean
  cheque?: boolean
  pix?: boolean
  nextPlan?: string
  addresses?: any
  clientId?: string

  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type UserPaginated = {
  data: UserData[]
  total: number
}

export class UserEntity {
  createdById: string
  name: string
  email: string
  role: string
  confirmedEmail: boolean
  sendedEmail: boolean
  password: string
  cardId?: string
  ownerId: string
  myOwnerId?: string
  payDay: Date
  photoUrl: string
  cpf: string
  phone: string
  coord?: any
  distance?: number
  appointmentsTotal?: number
  plan?: string
  cnpj?: string
  address?: string
  complement?: string
  photoId: string
  cash?: boolean
  creditcard?: boolean
  debitcard?: boolean
  transferbank?: boolean
  cheque?: boolean
  pix?: boolean
  nextPlan?: string
  addresses?: any
  clientId?: string

  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  constructor(data: UserData) {
    this.createdById = data.createdById
    this.name = data.name
    this.email = data.email
    this.role = data.role
    this.confirmedEmail = false
    this.sendedEmail = false
    this.password = data.password
    this.ownerId = data.ownerId
    this.payDay = data.payDay
    this.photoUrl = data.photoUrl
    this.cpf = data.cpf
    this.phone = data.phone
    this.photoId = data.photoId
    this.active = false
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
