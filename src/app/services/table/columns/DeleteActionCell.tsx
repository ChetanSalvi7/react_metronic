import React, {FC, useEffect, useState} from 'react'
import {CheckAccess, handleNotificationWithToastify} from '../../Functional'
import {DeleteListItem} from '../DeleteListItem'
import {KTSVG} from '../../../../_metronic/helpers'
import {useMutation} from 'react-query'
import {deleteRequest} from '../../../../setup/redux/common/cruds'
import {Loader} from '../../Loader'
import {MenuComponent} from '../../../../_metronic/assets/ts/components'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

type Props = {
  id: number
  module?: string
  query: string
  queryClient: any
}
export const DeleteActionCell: FC<Props> = ({id, module, query, queryClient}) => {
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const deleteItem = useMutation(() => deleteRequest(`${process.env.REACT_APP_API_BASE_URL}${module}/${id}`), {
    onSuccess: async (response) => {
      await queryClient.invalidateQueries([`${module}-${query}`])
      handleNotificationWithToastify(response.data)
      setLoading(false)
    }, onError: () => {
      setLoading(false)
    },
  })
  return CheckAccess(`${module}.delete`) ? <>
    {loading && <Loader />}
    <OverlayTrigger
      key='delete'
      placement='top'
      overlay={<Tooltip id='delete'>Delete Record</Tooltip>}
    ><a className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
        onClick={async () => await DeleteListItem(deleteItem, setLoading)}>
      <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
    </a>
    </OverlayTrigger>
  </> : null
}
