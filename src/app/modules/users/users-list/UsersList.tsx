import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider, useQueryRequest} from './core/QueryRequestProvider'
import {QueryResponseProvider, useQueryResponse} from './core/QueryResponseProvider'
import {UsersTable} from './table/UsersTable'
import {KTCard} from '../../../../_metronic/helpers'
import React from 'react'
import {ListHeader} from '../../../services/table/ListHeader'
import {ListDeleteHeader} from '../../../services/table/ListDeleteHeader'

const UsersList = () => {
  const {updateState} = useQueryRequest()
  const listView = useListView()
  const {selected} = listView
  const {query} = useQueryResponse()
  return (
    <>
      <KTCard>
        {selected.length > 0
          ? <ListDeleteHeader listView={listView} updateState={updateState} query={query} module='users' />
          : <ListHeader updateState={updateState} module='users' />}
        <UsersTable />
      </KTCard>
    </>
  )
}

const UsersListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {UsersListWrapper}
