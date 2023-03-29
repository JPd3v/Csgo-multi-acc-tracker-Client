import { InfiniteData } from '@tanstack/react-query';

interface IsteamAccount {
  _id: string;
  user_id: string;
  name: string;
  steam_url?: string;
  last_drop_timestamp: string;
  money_revenue: number;
}

type InfiniteSteamAccounts = InfiniteData<{
  steamAccounts: IsteamAccount[];
}>;

type IcreateAccount = Pick<IsteamAccount, 'name' | 'steam_url'>;

type IupdateAccount = Partial<
  Pick<IsteamAccount, 'name' | 'steam_url' | 'last_drop_timestamp'>
>;

export type {
  IsteamAccount,
  IcreateAccount,
  InfiniteSteamAccounts,
  IupdateAccount,
};
