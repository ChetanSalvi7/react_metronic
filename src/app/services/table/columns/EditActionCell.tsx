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
export const EditActionCell: FC<Props> = ({id, module, isMaster, parent}) => (
  CheckAccess(`${module}.edit`) && <OverlayTrigger
    key='edit' placement='top' overlay={<Tooltip id='edit'>Edit Record</Tooltip>}
  >
    {isMaster ? <Link to={`/${parent}/${module}/${id}/edit`}
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
      </Link>
      : <Link to={`/${module}/${id}/edit`}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
      </Link>}
  </OverlayTrigger>
)