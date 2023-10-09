import {ID, Response} from '../../../../../_metronic/helpers'
export type Group = {
  id?: ID
  name?: string
  description?: string
  is_active?: boolean
}

export type GroupsQueryResponse = Response<Array<Group>>

export const initialGroup: Group = {
  name: '',
  description: '',
  is_active: true
}
