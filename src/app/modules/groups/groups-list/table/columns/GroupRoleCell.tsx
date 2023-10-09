import {FC} from 'react'

type Props = {
  group?: {
    name: string
  }
}

const GroupRoleCell: FC<Props> = ({group}) => (
  <div className='badge badge-light fw-bolder'>{group?.name}</div>
)

export {GroupRoleCell}
