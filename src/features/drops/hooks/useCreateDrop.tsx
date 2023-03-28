import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosConfig } from 'config';
import { IcreateDrop } from 'features/drops/types';

async function createDrop(itemInfo: IcreateDrop) {
  const req = await axiosConfig.post('/drops/', { ...itemInfo });

  return req.data;
}

export default function useCreateDrop() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemInfo: IcreateDrop) => createDrop(itemInfo),

    onSuccess: (_data, itemInfo) => {
      queryClient.invalidateQueries([
        'account drops',
        itemInfo.steam_account_id,
      ]);

      queryClient.invalidateQueries(['steamAccounts']);
    },
  });
}
