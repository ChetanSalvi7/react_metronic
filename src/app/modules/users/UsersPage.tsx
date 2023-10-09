import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UserShow} from './pages/Show'
import {ManageUser} from './pages/Manage'
import {CheckAccess} from '../../services/Functional'
import {UsersListWrapper} from './users-list/UsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Home',
    path: '/dashboard',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Users',
    path: '/users',
    isSeparator: false,
    isActive: false,
  },
]

const Users = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/create'
          element={
            // CheckAccess('users.create') ?
              <>
                <PageTitle module="USER" breadcrumbs={usersBreadcrumbs}>User Create</PageTitle>
                <ManageUser />
              </>
              // : <Navigate to="/error" />
          }
        />
        <Route
          path='/:id/edit'
          element={
            // CheckAccess('users.edit') ?
              <>
                <PageTitle module="USER" breadcrumbs={usersBreadcrumbs}>User Edit</PageTitle>
                <ManageUser />
              </>
              // : <Navigate to="/error" />
          }
        />
        <Route
          path='/:id/show'
          element={
            // CheckAccess('users.show') ?
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>User Show</PageTitle>
                <UserShow />
              </>
              // : <Navigate to="/error" />
          }
        />
        <Route
          index
          element={
            // CheckAccess('users.index') ?
              <>
                <PageTitle breadcrumbs={[usersBreadcrumbs[0]]}>User Listing</PageTitle>
                <UsersListWrapper />
              </>
              // : <Navigate to="/error" />
          }
        />
      </Route>
    </Routes>
  )
}

export default Users
