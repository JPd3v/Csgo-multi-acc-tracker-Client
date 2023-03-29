import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { axiosConfig } from 'config';
import { IupdateAccount, IsteamAccount } from 'features/steamAccounts/types';
import { IaxiosDefaultErrors } from 'types';

interface ImutationParams {
  accountId: string;
  editedData: IupdateAccount;
}

async function editAccount(accountId: string, editedData: IupdateAccount) {
  const req = await axiosConfig.put(`/steamAccounts/${accountId}`, editedData);

  return req.data;
}

export default function useEditAccount() {
  const queryclient = useQueryClient();

  return useMutation<IsteamAccount, IaxiosDefaultErrors, ImutationParams>({
    mutationFn: ({ accountId, editedData }) =>
      editAccount(accountId, editedData),
    onSuccess(data) {
      queryclient.setQueryData<
        InfiniteData<{
          steamAccounts: IsteamAccount[];
        }>
      >(['steamAccounts'], (prev) => {
        if (!prev) return undefined;
        return {
          ...prev,
          pages: prev.pages.map((page) => ({
            ...page,
            steamAccounts: page.steamAccounts.map((account) => {
              if (account._id === data._id) {
                return { ...account, ...data };
              }
              return account;
            }),
          })),
        };
      });
    },
  });
}
