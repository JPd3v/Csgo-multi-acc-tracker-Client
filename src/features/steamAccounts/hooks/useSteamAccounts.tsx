import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosConfig } from 'config';
import { IsteamAccount } from 'features/steamAccounts/types';

async function steamAccounts(
  pageParam: number,
  pageSize = 5,
  sortBy = 'creation_date',
  sort = 'asc'
): Promise<{ steamAccounts: IsteamAccount[] }> {
  const req = await axiosConfig.get('/steamAccounts', {
    params: { page: pageParam, pageSize, sortBy, sort },
  });

  return { steamAccounts: req.data };
}

export default function useSteamAccounts() {
  return useInfiniteQuery({
    queryKey: ['steamAccounts'],
    queryFn: ({ pageParam = 1 }) => steamAccounts(pageParam, 5),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.steamAccounts.length ? allPages.length + 1 : undefined,
  });
}
