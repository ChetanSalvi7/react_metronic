import {FC} from 'react'

type Props = {
  is_active?: boolean
}

const ActiveCell: FC<Props> = ({is_active}) => (
  <> {is_active
    ? <div className='badge badge-light-success fw-bolder'><i className="fa fa-check text-success" /></div>
    : <div className='badge badge-light-danger fw-bolder'><i className="fa fa-times text-danger" /></div>
  }</>
)

export {ActiveCell}
