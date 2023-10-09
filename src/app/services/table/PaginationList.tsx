import {PaginationDropDown} from './PaginationDropDown'
import Pagination from '@mui/material/Pagination'
import React from 'react'

export const PaginationList = ({totalPages, isLoading, updateState, state}: any) => {
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (!page || isLoading || state.page === page) {
      return
    }
    updateState({page, items_per_page: state.items_per_page || 10})
  }
  return (
    <div className='row mt-4'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>
        {totalPages ? PaginationDropDown(state, updateState) : null}
      </div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        {totalPages ? <Pagination count={totalPages}
                                  page={state.page}
                                  siblingCount={2}
                                  onChange={handleChange}
                                  shape="rounded"
                                  color="primary" /> : null
        }
      </div>
    </div>
  )
}