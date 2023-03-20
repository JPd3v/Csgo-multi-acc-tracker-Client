interface IsteamAccount {
  _id: string;
  user_id: string;
  name: string;
  steam_url?: string;
  money_revenue: number;
}

type IcreateAccount = Pick<IsteamAccount, 'name' | 'steam_url'>;

export type { IsteamAccount, IcreateAccount };
