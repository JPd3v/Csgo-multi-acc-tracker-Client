import { DropsList } from 'features/drops';
import DropTimestamp from 'features/steamAccounts/components/DropTimestamp';
import EditAccount from 'features/steamAccounts/components/EditAccount';
import { IsteamAccount } from 'features/steamAccounts/types';
import { useState } from 'react';
import OptionsDropDown from './OptionsDropDown';

interface Iprops {
  account: IsteamAccount;
}

export default function Account({ account }: Iprops) {
  const [isEditing, setIsEditing] = useState(false);
  const { _id, money_revenue, name, steam_url, last_drop_timestamp } = account;

  function handleCancelEdit() {
    setIsEditing(false);
  }

  function handleOpenEdit() {
    setIsEditing(true);
  }
  return (
    <article className="relative flex h-[32rem] w-full flex-shrink-0 flex-col rounded-lg border-2 border-slate-600/40 bg-slate-800 p-2 sm:w-96 ">
      {isEditing ? (
        <EditAccount
          id={_id}
          account={{ name, steam_url }}
          onCancelEdit={() => handleCancelEdit()}
        />
      ) : (
        <>
          <p className="text-xl">
            <a href={steam_url} rel="noreferrer" target="_blank">
              {name}
            </a>
          </p>

          <OptionsDropDown
            onOpenEdit={() => handleOpenEdit()}
            accountId={_id}
          />

          <DropTimestamp
            accountId={_id}
            lastDropTimestamp={last_drop_timestamp}
          />

          <DropsList accountId={_id} />
          <p className="text-xl">
            account total revenue: ${money_revenue.toFixed(2)}
          </p>
        </>
      )}
    </article>
  );
}
