import steam_01 from 'assets/steam_01.png';
import useRefreshAccesToken from 'features/auth/hooks/useAuthToken';

export default function SteamLoginLink() {
  const { data } = useRefreshAccesToken();

  return !data?.accessToken ? (
    <a href={`${import.meta.env.VITE_BASE_URL}users/auth/steam`}>
      <img className="h-auto w-36 " src={steam_01} alt="Log in with steam" />
    </a>
  ) : null;
}
