import { useAuthToken } from 'features/auth';
import { SteamAccountsHub } from 'features/steamAccounts/';

export default function Home() {
  const auth = useAuthToken();
  return (
    <main className="m-3">
      {auth.data ? <SteamAccountsHub /> : <p>Home</p>}
    </main>
  );
}
