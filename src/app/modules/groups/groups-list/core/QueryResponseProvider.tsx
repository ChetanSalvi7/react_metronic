import {FC, useContext, useEffect, useMemo, useState} from 'react'
import {useQuery} from 'react-query'
import {
  createResponseContext,
  initialQueryResponse,
  QUERIES,
  stringifyRequestQuery, WithChildren,
} from '../../../../../_metronic/helpers'
import {Group, GroupsQueryResponse} from './_models'
import {useQueryRequest} from './QueryRequestProvider'

import {AxiosResponse} from 'axios'
import {getRequest} from "../../../../../setup/redux/common/cruds";

const QueryResponseContext = createResponseContext<Group>(initialQueryResponse)
const QueryResponseProvider: FC<WithChildren> = ({children}) => {
  const {state} = useQueryRequest()
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery])

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${QUERIES.GROUPS_LIST}-${query}`,
    () => {
      return getRequest(`${process.env.REACT_APP_API_BASE_URL}groups?${query}`)
        .then((d: AxiosResponse<GroupsQueryResponse>) => d.data)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false},
  )

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const {response} = useQueryResponse()
  if (!response) {
    return []
  }

  return response?.data?.groups || []
}

const useQueryResponseLoading = (): boolean => {
  const {isLoading} = useQueryResponse()
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponseLoading,
}
