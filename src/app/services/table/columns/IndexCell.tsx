const IndexCell = ({rowIndex, useQueryRequest}: any) => {
  const {state} = useQueryRequest()
  const page = state.page - 1
  const pageSize = state.items_per_page
  return (page * pageSize) + rowIndex + 1
}

export {IndexCell}
