import { QueryKey, useQuery } from '@tanstack/react-query';
import axiosInstance from './axiosConfig';

const fetchData = async <T>(dataUrl: string): Promise<T> => {
  const response = await axiosInstance(dataUrl);
  return response.data.data;
};

export const useGetData = <T>(queryKey: QueryKey, dataUrl: string, refetchMs: number = 30000) => {
  return useQuery<T>({
    queryKey: [queryKey],
    queryFn: () => fetchData<T>(dataUrl),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    refetchInterval: refetchMs,
  });
};
