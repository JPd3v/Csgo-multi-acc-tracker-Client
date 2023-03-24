import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosConfig } from 'config';
import { InfiniteSteamAccounts } from 'features/steamAccounts/types';
import { IaxiosDefaultErrors } from 'types';

async function deleteAccount(accountId: string): Promise<boolean> {
  const req = await axiosConfig.delete(`/steamAccounts/${accountId}`);

  return req.data;
}

export default function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountId: string) => deleteAccount(accountId),

    onMutate: async (accountId) => {
      await queryClient.cancelQueries({ queryKey: ['steamAccounts'] });

      const previousSteamAccounts =
        queryClient.getQueryData<InfiniteSteamAccounts>(['steamAccounts']);
      queryClient.setQueryData<InfiniteSteamAccounts>(
        ['steamAccounts'],
        (prev) => {
          if (!prev) return undefined;
          return {
            ...prev,
            pages: prev.pages.map((page) => ({
              ...page,
              steamAccounts: page.steamAccounts.filter(
                (account) => account._id !== accountId
              ),
            })),
          };
        }
      );

      return { previousSteamAccounts };
    },

    onError(_error: IaxiosDefaultErrors, variables, context) {
      queryClient.setQueryData(
        ['steamAccounts'],
        context?.previousSteamAccounts
      );
    },
  });
}
