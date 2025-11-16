'use client'

import useAxiosSecure from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
 
export function useBloodRequest() {
  const axiosSecure = useAxiosSecure();

  const {
    data: bloodRequest = [],
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ['bloodRequests'],
    queryFn: async () => {
      const response = await axiosSecure.get('/blood');
      return response.data;
    }
  });

  return { bloodRequest, loading, error, refetch };
}
