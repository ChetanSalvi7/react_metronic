import React, {FC} from 'react'
import {useQueryClient} from 'react-query'
import {ID} from '../../../../../../_metronic/helpers'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {ShowActionCell} from '../../../../../services/table/columns/ShowActionCell'
import {EditActionCell} from '../../../../../services/table/columns/EditActionCell'
import {DeleteActionCell} from '../../../../../services/table/columns/DeleteActionCell'

type Props = {
  id: ID
}

const UserActionsCell: FC<Props> = ({id}) => {
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  const module = 'users'

  return (
    <div className='d-flex justify-content-end flex-shrink-0'>
      <ShowActionCell id={id ? id : 0} module={module} />
      <EditActionCell id={id ? id : 0} module={module} />
      <DeleteActionCell id={id ? id : 0} module={module} query={query} queryClient={queryClient} />
    </div>
  )
}

export {UserActionsCell}