import Account from 'features/steamAccounts/components/Account';
import useSteamAccounts from 'features/steamAccounts/hooks/useSteamAccounts';

export default function SteamAccountList() {
  const accountList = useSteamAccounts();

  console.log(accountList.data?.pages);

  return (
    <div>
      {accountList.data?.pages.map((page) =>
        page.steamAccounts.map((account) => (
          <Account account={account} key={account._id} />
        ))
      )}
    </div>
  );
}
