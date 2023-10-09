import {Column} from 'react-table'
import {GroupActionsCell} from './GroupActionsCell'
import {GroupCustomHeader} from './GroupCustomHeader'
import {Group} from '../../core/_models'
import {ActiveCell} from '../../../../../services/table/columns/ActiveCell'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {IndexCell} from '../../../../../services/table/columns/IndexCell'
import {DescriptionCell} from '../../../../../services/table/columns/DescriptionCell'

const groupsColumns: ReadonlyArray<Column<Group>> = [
  {
    Header: (props) => <GroupCustomHeader tableProps={props} title='Index' />,
    id: 'index',
    Cell: ({...props}) => <IndexCell rowIndex={props.row.index} useQueryRequest={useQueryRequest} />,
  },
  {
    Header: (props) => <GroupCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    accessor: 'name',
  },
  {
    Header: (props) => <GroupCustomHeader tableProps={props} title='Description' className='min-w-125px' />,
    id: 'description',
    Cell: ({...props}) => <DescriptionCell description={props.data[props.row.index].description} />,
  },
  {
    Header: (props) => (
      <GroupCustomHeader tableProps={props} title='Is Active' className='min-w-100px' />
    ),
    id: 'is_active',
    Cell: ({...props}) => <ActiveCell is_active={props.data[props.row.index].is_active} />,
  },
  {
    Header: (props) => (
      <GroupCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <GroupActionsCell id={props.data[props.row.index].id} />,
  },
]

export {groupsColumns}
