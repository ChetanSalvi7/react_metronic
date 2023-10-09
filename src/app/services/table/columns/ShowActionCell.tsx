import {Link} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'
import React, {FC} from 'react'
import {CheckAccess} from '../../Functional'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

type Props = {
  id: number
  module?: string
  isMaster?: boolean
  parent?: string
}
export const ShowActionCell: FC<Props> = ({id, module, isMaster, parent}) => (
  CheckAccess(`${module}.show`) && <OverlayTrigger
    key='show' placement='top' overlay={<Tooltip id='show'>Show Record</Tooltip>}
  >
    {isMaster ? <Link to={`/${parent}/${module}/${id}/show`} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
        <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
      </Link>
      :<Link to={`/${module}/${id}/show`} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
      <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
    </Link>}
  </OverlayTrigger>
)