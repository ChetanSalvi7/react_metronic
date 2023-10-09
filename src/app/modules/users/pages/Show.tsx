import {useParams} from 'react-router-dom'
import React, {useEffect} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import * as actions from '../../../../setup/redux/users/actions'
import {RootState} from '../../../../setup'
import {KTCard} from '../../../../_metronic/helpers'
import {Loader} from '../../../services/Loader'

const UserShow = () => {
  const params: any = useParams()
  const dispatch = useDispatch()
  let {id} = params
  useEffect(() => {
    dispatch(actions.getUserById(id, 'show'))
  }, [id, dispatch])
  const {user, actionsLoading}: any = useSelector<RootState>(
    (state) => ({
      user: state.users.user,
      actionsLoading: state.common.actionsLoading,
    }),
    shallowEqual,
  )
  return (
    <>
      {actionsLoading && <Loader />}
      <KTCard>
        <div className="card-body">
          {user && <>
            <div className="row gutter-b">
              <div className="col-md-4">
                <label className="form-label">Name</label>
                <p>{user.name}</p>
              </div>
              <div className="col-md-4">
                <label className="form-label">User Name</label>
                <p>{user.username}</p>
              </div>
              <div className="col-md-4">
                <label className="form-label">Email</label>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="row gutter-b">
              <div className="col-md-4">
                <label className="form-label">Phone</label>
                <p>+{user.country_code} {user.phone}</p>
              </div>
              <div className="col-md-4">
                <label className="form-label">User Group</label>
                <p>{user?.group?.name}</p>
              </div>
            </div>
          </>}
        </div>
      </KTCard>
    </>
  )
}
export {UserShow}