import {useParams} from 'react-router-dom'
import React, {useEffect} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import * as actions from '../../../../setup/redux/groups/actions'
import {RootState} from '../../../../setup'
import {Loader} from '../../../services/Loader'
import {UserTable} from '../../../services/UserTable'

const GroupShow = () => {
  const params: any = useParams()
  const dispatch = useDispatch()
  let {id} = params

  useEffect(() => {
    dispatch(actions.getGroupById(id))
  }, [id, dispatch])

  const {group, actionsLoading}: any = useSelector<RootState>(
    (state) => ({
      group: state.groups.group,
      actionsLoading: state.common.actionsLoading,
    }),
    shallowEqual,
  )
  return (
    <>
      {actionsLoading && <Loader />}
      <div className="card gutter-b">
        <div className="card-body">
          {group && <>
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Name</label>
                <p>{group.name}</p>
              </div>
              <div className="col-md-8">
                <label className="form-label">Description</label>
                <p>{group.description}</p>
              </div>
            </div>
          </>}
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h3 className='card-title'>Users</h3>
        </div>
        <div className="card-body">
          <UserTable users={group?.users} />
        </div>
      </div>
    </>
  )
}
export {GroupShow}