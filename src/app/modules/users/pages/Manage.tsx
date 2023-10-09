import React, {useEffect} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import * as actions from '../../../../setup/redux/users/actions'
import {groupList} from '../../../../setup/redux/groups/actions'
import {CustomForm} from './CustomForm'
import {useNavigate, useParams} from 'react-router-dom'
import {RootState} from '../../../../setup'
import {Loader} from '../../../services/Loader'
import {serialize} from 'object-to-formdata'

const initUser = {
  id: undefined,
  group: '',
  username: '',
  name: '',
  email: '',
  avatar: undefined,
  country_code: '',
  phone: '',
  password: '',
  confirm_password: '',
  internal_notes: '',
  is_active: true,
}

export const ManageUser = () => {
  const dispatch = useDispatch()
  const params: any = useParams()
  const navigate = useNavigate()
  let id: number = params?.id ? params.id : 0
  const {actionsLoading, user, groups}: any = useSelector<RootState>(
    (state) => ({
      actionsLoading: state.common.actionsLoading,
      user: state.users.user,
      groups: state.groups.groupsDropdown
    }),
    shallowEqual,
  )
  useEffect(() => {
    dispatch(groupList())
    if (id) {
      dispatch(actions.getUserById(id, 'edit'))
    }
  }, [id, dispatch])

  const saveUser = async (values: any) => {
    let userValue = {...values}
    if (!id) {
      let response = await dispatch(actions.createUser(serialize(userValue)))
      backToUsersList(response)
    } else {
      let response = await dispatch(actions.updateUser(serialize(userValue)))
      backToUsersList(response)
    }
  }

  const backToUsersList = (response: any) => {
    if (response?.success) {
      navigate(`/users`)
    }
  }

  return (
    <>
      {actionsLoading && <Loader />}
      <div className="row">
        <CustomForm
          id={id}
          user={id ? user || initUser : initUser}
          saveUser={saveUser}
          groupsList={groups}
        />
      </div>
    </>
  )
}