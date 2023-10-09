import {ID, Response} from '../../../../../_metronic/helpers'

export type User = {
  id?: ID
  name?: string
  username?: string
  phone?: string
  email?: string
  role?: string
  group?: {
    name: string
  }
  avatar?: '',
  initials?: ''
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  role: 'Admin',
  name: '',
  email: '',
}
