import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {GroupsListWrapper} from './groups-list/GroupsList'
import {GroupShow} from './pages/Show'
import {ManageGroup} from './pages/Manage'
// import {CheckAccess, IsRootUserOrAdmin} from '../../services/Functional'

const groupsBreadcrumbs: Array<PageLink> = [
  {
    title: 'Home',
    path: '/dashboard',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Groups',
    path: '/groups',
    isSeparator: false,
    isActive: false,
  },
]

const Groups = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/create'
          element={
            // (CheckAccess('groups.create') && IsRootUserOrAdmin()) ?
              <>
                <PageTitle module="GROUP" breadcrumbs={groupsBreadcrumbs}>Group Create</PageTitle>
                <ManageGroup />
              </>
              // // : <Navigate to="/error" />
          }
        />
        <Route
          path='/:id/edit'
          element={
            // (CheckAccess('groups.edit') && IsRootUserOrAdmin()) ?
              <>
                <PageTitle module="GROUP" breadcrumbs={groupsBreadcrumbs}>Group Edit</PageTitle>
                <ManageGroup />
              </>
              // : <Navigate to="/error" />
          }
        />
        <Route
          path='/:id/show'
          element={
            // (CheckAccess('groups.show') && IsRootUserOrAdmin()) ?
              <>
                <PageTitle breadcrumbs={groupsBreadcrumbs}>Group Show</PageTitle>
                <GroupShow />
              </>
              // : <Navigate to="/error" />
          }
        />
        <Route
          index
          element={
            // (CheckAccess('groups.index') && IsRootUserOrAdmin())?
              <>
                <PageTitle breadcrumbs={[groupsBreadcrumbs[0]]}>Group Listing</PageTitle>
                <GroupsListWrapper />
              </>
              // : <Navigate to="/error" />
          }
        />
      </Route>
    </Routes>
  )
}

export default Groups
