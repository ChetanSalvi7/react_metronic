import {SearchComponent} from './SearchComponent'
import {useMutation, useQueryClient} from 'react-query'
import React, {useState} from 'react'
import {deleteRequestWithParams} from '../../../setup/redux/common/cruds'
import {Loader} from '../Loader'
import {DeleteListItem} from './DeleteListItem'
import {handleNotificationWithToastify} from '../Functional'

const ListDeleteHeader = ({listView, updateState, query, module}: any) => {
  const {selected, clearSelected} = listView
  const queryClient = useQueryClient()

  const [loading, setLoading] = useState<boolean>(false)
  let payload: any = {
    ids: selected,
  }
  const deleteSelectedItems = useMutation(() =>
    deleteRequestWithParams(`${process.env.REACT_APP_API_BASE_URL}${module}`, payload), {
    onSuccess: async (response) => {
      await queryClient.invalidateQueries([`${module}-${query}`])
      handleNotificationWithToastify(response.data)
      clearSelected()
      setLoading(false)
    }, onError: () => {
      setLoading(false)
    },
  })

  return (
    <>
      {loading && <Loader />}
      <div className='card-header border-0 pt-6'>
        <SearchComponent updateState={updateState} />
        <div className="card-toolbar">
          <div className='d-flex justify-content-end align-items-center'>
            <div className='fw-bolder me-5'>
              <span className='me-2'>{selected.length}</span> Selected
            </div>

            <button
              type='button'
              className='btn btn-danger'
              onClick={async () => await DeleteListItem(deleteSelectedItems, setLoading)}
            >
              Delete Selected
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export {ListDeleteHeader}
