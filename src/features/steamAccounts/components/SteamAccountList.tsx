import { LoadingSpinner } from 'components';
import Account from 'features/steamAccounts/components/Account';
import useSteamAccounts from 'features/steamAccounts/hooks/useSteamAccounts';
import { useEffect, useRef } from 'react';

export default function SteamAccountList() {
  const accountList = useSteamAccounts();
  const loadingDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio <= 0) return;

      if (accountList.hasNextPage) {
        accountList.fetchNextPage();
      }
    });

    if (loadingDivRef.current) {
      intersectionObserver.observe(loadingDivRef.current);
    }

    return () => {
      intersectionObserver.disconnect();
    };
  }, [loadingDivRef, accountList]);

  return (
    <div className="mt-4 flex flex-col gap-3 overflow-auto p-1 sm:flex-row">
      {accountList.data?.pages.map((page) =>
        page.steamAccounts.map((account) => (
          <Account account={account} key={account._id} />
        ))
      )}

      {accountList.hasNextPage ? (
        <div
          ref={loadingDivRef}
          className="flex min-h-[4rem] items-center justify-center"
        >
          <LoadingSpinner size="3rem" />
        </div>
      ) : null}

      {accountList.isError ? (
        <p>Something went wrong getting your steam accounts</p>
      ) : null}
    </div>
  );
}
