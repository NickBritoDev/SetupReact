import { useQuery } from 'react-query'
import connectApi from '../../../../api/connect'

const useGetValidacaoToken = (token: string | null) => {
  return useQuery(
    'login_useGetValidacaoToken',
    async () => {
      const response = await connectApi.get(`/v1/api/public/auth/?h=${token}`)
      return response.data
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 5000,
      refetchInterval: 5000
    }
  )
}

export { useGetValidacaoToken }