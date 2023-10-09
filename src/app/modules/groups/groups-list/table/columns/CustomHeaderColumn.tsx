import {FC} from 'react'
import {ColumnInstance} from 'react-table'
import {Group} from '../../core/_models'

type Props = {
  column: ColumnInstance<Group>
}

const CustomHeaderColumn: FC<Props> = ({column}) => (
  <>
    {column.Header && typeof column.Header === 'string' ? (
      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    ) : (
      column.render('Header')
    )}
  </>
)

export {CustomHeaderColumn}
