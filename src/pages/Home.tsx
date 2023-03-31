import { useAuthToken } from 'features/auth';
import { SteamAccountsHub } from 'features/steamAccounts';

export default function Home() {
  const auth = useAuthToken();

  return (
    <main className="m-3 h-fit">
      {auth.data?.accessToken ? (
        <SteamAccountsHub />
      ) : (
        <div className="flex h-72 items-center justify-center p-5 text-center text-3xl font-bold">
          <p className=" sm:w-2/4">
            Track your <span className="text-blue-500">CS:GO</span> multi
            accounts drops and resets in a single place.
          </p>
        </div>
      )}
    </main>
  );
}
