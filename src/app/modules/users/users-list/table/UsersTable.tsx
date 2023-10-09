import React, {useMemo} from 'react'
import {ColumnInstance, Row, useTable} from 'react-table'
import {CustomHeaderColumn} from './columns/CustomHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {useQueryResponse, useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import {useQueryRequest} from '../core/QueryRequestProvider'
import {usersColumns} from './columns/_columns'
import {User} from '../core/_models'
import {KTCardBody} from '../../../../../_metronic/helpers'
import {PaginationList} from '../../../../services/table/PaginationList'
import {ListLoading} from '../../../../services/table/ListLoading'
import {Loader} from "../../../../services/Loader";

const UsersTable = () => {
  const users = useQueryResponseData()
  const totalPages = useQueryResponse().response?.data?.total_pages
  const {updateState, state} = useQueryRequest()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => users, [users])
  const columns = useMemo(() => usersColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>
      {/*<Loader/>*/}
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
          <tr className='text-start text-gray-600 fw-bold text-uppercase fs-6 gs-0'>
            {headers.map((column: ColumnInstance<User>) => (
              <CustomHeaderColumn key={column.id} column={column} />
            ))}
          </tr>
          </thead>
          <tbody className='text-gray-600' {...getTableBodyProps()}>
          {rows.length > 0 ? (
            rows.map((row: Row<User>, i) => {
              prepareRow(row)
              return <CustomRow row={row} key={`row-${i}-${row.id}`} />
            })
          ) : (
            <tr>
              <td colSpan={7}>
                <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                  No matching records found
                </div>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
      <PaginationList totalPages={totalPages} isLoading={isLoading} updateState={updateState} state={state} />
      {isLoading && <ListLoading />}
    </KTCardBody>
  )
}

export {UsersTable}
