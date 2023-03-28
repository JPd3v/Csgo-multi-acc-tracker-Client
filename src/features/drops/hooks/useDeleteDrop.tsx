import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { axiosConfig } from 'config';
import { Idrop } from 'features/drops/types';
import { InfiniteSteamAccounts } from 'features/steamAccounts';

interface ImutationParams {
  dropId: string;
  _dropPrice: number;
  _steamAccountId: string;
}

async function DeleteDrop(dropId: string) {
  const req = await axiosConfig.delete(`/drops/${dropId}`);

  return req.data;
}

export default function useDeleteDrop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dropId, _steamAccountId, _dropPrice }: ImutationParams) =>
      DeleteDrop(dropId),
    onMutate: async (drop) => {
      await queryClient.cancelQueries({
        queryKey: ['account drops', drop._steamAccountId],
      });

      const previousDrops = queryClient.getQueryData<
        InfiniteData<{ drops: Idrop[] }>
      >(['account drops', drop._steamAccountId]);

      queryClient.setQueryData<InfiniteData<{ drops: Idrop[] }>>(
        ['account drops', drop._steamAccountId],
        (prev) => {
          if (!prev) return undefined;
          return {
            ...prev,
            pages: prev?.pages.map((page) => ({
              ...page,
              drops: page.drops.filter(
                (element) => element._id !== drop.dropId
              ),
            })),
          };
        }
      );

      const previousSteamAccounts =
        queryClient.getQueryData<InfiniteSteamAccounts>(['steamAccounts']);

      queryClient.setQueryData<InfiniteSteamAccounts>(
        ['steamAccounts'],
        (prev) => {
          if (!prev) return undefined;
          return {
            ...prev,
            pages: prev?.pages.map((page) => ({
              ...page,
              steamAccounts: page.steamAccounts.map((account) => {
                if (account._id === drop._steamAccountId) {
                  return {
                    ...account,
                    money_revenue: account.money_revenue - drop._dropPrice,
                  };
                }
                return account;
              }),
            })),
          };
        }
      );

      return { previousDrops, previousSteamAccounts };
    },

    onError: (err, drop, context) => {
      queryClient.setQueryData(
        ['account drops', drop._steamAccountId],
        context?.previousDrops
      );

      queryClient.setQueryData(
        ['steamAccounts'],
        context?.previousSteamAccounts
      );
    },
  });
}
