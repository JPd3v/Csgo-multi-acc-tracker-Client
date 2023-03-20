import { IsteamAccount } from 'features/steamAccounts/types';
import React from 'react';

interface Iprops {
  account: IsteamAccount;
}

export default function Account({ account }: Iprops) {
  const { _id, money_revenue, name, user_id, steam_url } = account;
  return (
    <div>
      <p>{_id}</p>
      <p>{money_revenue}</p>
      <p>{name}</p>
      <p>{user_id}</p>
      <p>{steam_url}</p>
    </div>
  );
}
