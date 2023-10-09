import {Column} from 'react-table'
import {UserActionsCell} from './UserActionsCell'
import {UserCustomHeader} from './UserCustomHeader'
import {User} from '../../core/_models'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {IndexCell} from '../../../../../services/table/columns/IndexCell'
import {UserInfoCell} from './UserInfoCell'
import moment from 'moment'
import {UserSelectionCell} from './UserSelectionCell'
import {UserSelectionHeader} from './UserSelectionHeader'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  /*{
    Header: (props) => <UserCustomHeader tableProps={props} title='Index' />,
    id: 'index',
    Cell: ({...props}) => <IndexCell rowIndex={props.row.index} useQueryRequest={useQueryRequest} />,
  },*/
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-125px ' />,
    id: 'name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
    id: 'role',
    Cell: ({...props}) => <div>{props.data[props.row.index]?.group?.name}</div>,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Phone' className='min-w-125px' />,
    id: 'phone',
    Cell: ({...props}) => {
      return <div
        className="text-nowrap">{`+${props.data[props.row.index].country_code} ${props.data[props.row.index].phone}`}</div>
    },
  },
  /*{
    Header: (props) => <UserCustomHeader tableProps={props} title='User Name' className='min-w-125px' />,
    accessor: 'username',
  },*/
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Joined Day' className='min-w-125px' />,
    id: 'created_at',
    Cell: ({...props}) => {
      return <div className="text-nowrap">{moment(props.data[props.row.index].created_at).format('DD MMM YYYY')}</div>
    },
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
