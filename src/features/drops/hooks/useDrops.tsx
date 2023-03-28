import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosConfig } from 'config';
import { Idrop } from 'features/drops/types';

async function getDrops(
  id: string,
  pageParam: number,
  pageSize = 5,
  sortBy = 'creation_date',
  sort = 'desc'
): Promise<{ drops: Idrop[] }> {
  const req = await axiosConfig.get(`/drops/${id}`, {
    params: { page: pageParam, pageSize, sortBy, sort },
  });

  return { drops: req.data.reverse() };
}

export default function useDrops(id: string) {
  return useInfiniteQuery({
    queryKey: ['account drops', id],
    queryFn: ({ pageParam = 1 }) => getDrops(id, pageParam, 10),
    select: (data) => ({
      pages: [...data.pages].reverse(),
      pageParams: [...data.pageParams],
    }),
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.drops.length ? allPages.length + 1 : undefined,
  });
}
