import { LogOutButton, SteamLoginLink } from 'features/auth';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex h-10 items-center justify-between gap-8 bg-gray-800 px-10 py-1 font-medium text-zinc-50">
      <Link to="/">
        <h1>CSMultiTracker</h1>
      </Link>
      <LogOutButton />
      <SteamLoginLink />
    </nav>
  );
}
