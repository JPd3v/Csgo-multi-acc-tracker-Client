import { useQuery } from '@tanstack/react-query';
import { axiosConfig } from 'config';
import { ItemsInfo } from 'features/items/types';

async function searchItem(itemName: string): Promise<ItemsInfo[]> {
  const req = await axiosConfig.get('/items/', {
    params: { itemName, pageSize: 7, curretPage: 1 },
  });

  return req.data;
}

export default function useSearchItem(itemName: string) {
  return useQuery({
    queryKey: ['drop', itemName],
    queryFn: () => searchItem(itemName),
    refetchOnWindowFocus: false,
    enabled: !!itemName,
  });
}
