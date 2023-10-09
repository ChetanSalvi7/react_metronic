import {Link} from 'react-router-dom'
import React from 'react'

export const UserTable = ({users}: any) => (
  <div className="table-responsive">
    <table id="kt_table_templates"
           className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
           role="table">
      <thead>
      <tr className="text-start text-muted fs-6 gs-0">
        <th>Index</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
      </tr>
      </thead>
      <tbody className="text-gray-600">
      {(() => {
        if (users && users.length) {
          return users.map((user: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name
                ? <Link to={`/users/${user.id}/show`}>{user.name}</Link>
                : '-'}
              </td>
              <td>{user.email}</td>
              <td>{`+${user.country_code} ${user.phone}`}</td>
            </tr>
          ))
        } else {
          return <tr role="row">
            <td colSpan={4}>
              <div
                className="d-flex text-center w-100 align-content-center justify-content-center">
                No matching records found
              </div>
            </td>
          </tr>
        }
      })()}
      </tbody>
    </table>
  </div>
)