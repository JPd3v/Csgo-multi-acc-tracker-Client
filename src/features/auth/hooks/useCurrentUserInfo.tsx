import { useQuery } from '@tanstack/react-query';
import { axiosConfig } from 'config';
import { IauthUserToken } from 'features/auth';
import { IaxiosDefaultErrors } from 'types';

async function currentUserInfo() {
  const req = await axiosConfig.get('/users/current-user');

  return req.data;
}

export default function useCurrentUserInfo() {
  return useQuery<unknown, IaxiosDefaultErrors, IauthUserToken>({
    queryKey: ['currentUserInfo'],
    queryFn: currentUserInfo,
    refetchIntervalInBackground: true,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
