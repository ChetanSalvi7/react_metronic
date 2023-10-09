import {FC} from 'react'
import moment from 'moment'

type Props = {
  date?: Date
}
export const DateCell: FC<Props> = ({date}) => (
  <span>
    {moment(date).format('DD-MM-YYYY')}
  </span>
)