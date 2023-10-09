/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {User} from '../../core/_models'
import {getInitials} from '../../../../../services/Functional'

type Props = {
  user: User
}

const UserInfoCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
      {user.avatar ? (
        <img src={process.env.REACT_APP_AWS_URL + user.avatar} alt={user.name} className='user-avatar-img' />
      ) : (
        <div className='symbol-label fs-3 bg-light-primary text-primary'>
          {getInitials(user.name)}
        </div>
      )}
    </div>
    <div className='d-flex flex-column'>
      <span className='text-gray-800 mb-1'>
        {user.name}
      </span>
      <span>{user.email}</span>
    </div>
  </div>
)

export {UserInfoCell}
