import {useEffect, useState} from 'react'
import {KTSVG, useDebounce} from '../../../_metronic/helpers'

const SearchComponent = ({updateState}: any) => {

  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchTerm, 150)
  useEffect(
    () => {
      if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
        updateState({search: debouncedSearchTerm, page: 1})
      }
    },
    [debouncedSearchTerm],
  )

  return (
    <div className='card-title'>
      <div className='d-flex align-items-center position-relative my-1'>
        <KTSVG
          path='/media/icons/duotune/general/gen021.svg'
          className='svg-icon-1 position-absolute ms-6'
        />
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid ps-14'
          placeholder='Type here to search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}

export {SearchComponent}
