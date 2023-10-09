import React, {useEffect} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import * as actions from '../../../../setup/redux/groups/actions'
import * as auth_actions from '../../../../setup/redux/auth/actions'
import {CustomForm} from './CustomForm'
import {useNavigate, useParams} from 'react-router-dom'
import {RootState} from '../../../../setup'
import {Loader} from '../../../services/Loader'

const initGroup = {
  id: undefined,
  name: '',
  description: '',
  modules: [],
  is_active: true,
}

export const ManageGroup = () => {
  const dispatch = useDispatch()
  const params: any = useParams()
  const navigate = useNavigate()
  let id: number = params?.id ? params.id : 0
  const {group, actionsLoading}: any = useSelector<RootState>(
    (state) => ({
      actionsLoading: state.common.actionsLoading,
      group: state.groups.group,
    }),
    shallowEqual,
  )
  useEffect(() => {
    if (id) {
      dispatch(actions.getGroupById(id))
    }
  }, [id, dispatch])

  const saveGroup = async (values: any) => {
    if (!id) {
      let response = await dispatch(actions.createGroup(values))
      backToGroupsList(response)
    } else {
      let response: any = await dispatch(actions.updateGroup(values))
      if (response?.success) {
        await dispatch(auth_actions.getUserAccess())
        backToGroupsList(response)
      }
    }
  }

  const backToGroupsList = (response: any) => {
    if (response?.success) {
      navigate(`/groups`)
    }
  }

  return (
    <>
      {actionsLoading && <Loader />}
      <div className="row">
        <CustomForm
          id={id}
          group={id ? group || initGroup : initGroup}
          saveGroup={saveGroup}
        />
      </div>
    </>
  )
}