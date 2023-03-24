import { InfiniteData } from '@tanstack/react-query';

interface IsteamAccount {
  _id: string;
  user_id: string;
  name: string;
  steam_url?: string;
  money_revenue: number;
}

type InfiniteSteamAccounts = InfiniteData<{
  steamAccounts: IsteamAccount[];
}>;

type IcreateAccount = Pick<IsteamAccount, 'name' | 'steam_url'>;

export type { IsteamAccount, IcreateAccount, InfiniteSteamAccounts };
