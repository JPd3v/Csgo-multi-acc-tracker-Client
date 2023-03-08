import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosConfig } from 'config';

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
      queryClient.invalidateQueries(['authUserToken']);
      queryClient.removeQueries(['authUserToken']);
      queryClient.clear();
    },
  });
}
