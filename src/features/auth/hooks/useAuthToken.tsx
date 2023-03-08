import { useQuery } from '@tanstack/react-query';
import { axiosConfig } from 'config';
import { IauthUserToken } from 'features/auth';
import { IaxiosDefaultErrors } from 'types';

async function refreshUser() {
  const req = await axiosConfig.get('/users/refresh-token', {
    withCredentials: true,
  });
  return req.data;
}

export default function useAuthToken() {
  return useQuery<unknown, IaxiosDefaultErrors, IauthUserToken>({
    queryKey: ['authUserToken'],
    queryFn: refreshUser,
    refetchInterval: 1000 * 60 * 10,
    // 10minutes
    refetchIntervalInBackground: true,
    staleTime: Infinity,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });
}
