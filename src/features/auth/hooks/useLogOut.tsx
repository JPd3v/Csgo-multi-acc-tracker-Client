import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosConfig } from 'config';
import type { IauthUserToken } from '../types';

async function logOut() {
  const req = await axiosConfig.post(
    '/users/log-out',
    {},
    { withCredentials: true }
  );

  return req.data;
}
export default function useLogOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logOut,
    onSuccess() {
      queryClient.setQueryData<IauthUserToken>(['authUserToken'], (prev) => {
        if (!prev) {
          return undefined;
        }
        return { ...prev, accessToken: null };
      });
      queryClient.clear();
    },
  });
}
