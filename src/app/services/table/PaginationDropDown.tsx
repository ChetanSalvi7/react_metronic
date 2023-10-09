export const PaginationDropDown = (pagination: any, updateState: any) => {
  return <select className="appearance form-control form-control-sm font-weight-bold border-0 bg-light w-75px"
                 value={pagination.items_per_page}
                 onChange={e => {
                   updateState({page: 1, items_per_page: Number(e.target.value)})
                 }}
  >
    {[10, 20, 30, 40, 50].map(pageSize => (
      <option key={pageSize} value={pageSize}>
        {pageSize}
      </option>
    ))}
  </select>
}