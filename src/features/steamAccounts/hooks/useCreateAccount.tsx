import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosConfig } from 'config';
import { IcreateAccount, IsteamAccount } from 'features/steamAccounts/types';
import { IaxiosDefaultErrors } from 'types';

async function createAccount(newAccountInfo: IcreateAccount) {
  const req = await axiosConfig.post('/steamAccounts', newAccountInfo);

  return req.data;
}

export default function useCreateAccount() {
  const queryClient = useQueryClient();
  return useMutation<IsteamAccount, IaxiosDefaultErrors, IcreateAccount>({
    mutationFn: (formData) => createAccount(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['steamAccounts']);
    },
  });
}
