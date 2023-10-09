/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, useEffect, useMemo, useState} from 'react'
import {useQuery} from 'react-query'
import {
  createResponseContext,
  initialQueryResponse,
  QUERIES,
  stringifyRequestQuery, WithChildren,
} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'
import {useQueryRequest} from './QueryRequestProvider'
import {getRequest} from '../../../../../setup/redux/common/cruds'
import {AxiosResponse} from 'axios'

const QueryResponseContext = createResponseContext<User>(initialQueryResponse)
const QueryResponseProvider: FC<WithChildren>  = ({children}) => {
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
    `${QUERIES.USERS_LIST}-${query}`,
    () => {
      // return getUsers(query)
      return getRequest(`${process.env.REACT_APP_API_BASE_URL}users?${query}`)
        .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
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

  return response?.data?.users || []
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
