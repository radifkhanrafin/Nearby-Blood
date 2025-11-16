'use client'

import useAxiosSecure from '@/lib/axios'
import { useQuery } from '@tanstack/react-query' 

export function useDonar() {
  const axiosSecure = useAxiosSecure()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['donars'],  
    queryFn: async () => {
      const response = await axiosSecure.get('/users')
      return response.data
    },
    staleTime: 1000 * 60 * 1,  
    retry: 1, 
    refetchInterval: 5000,  
    refetchOnWindowFocus: true,  
  })

  return {
    donars: data || [],loading: isLoading,error,refetch,
  }
}
