import useRefreshAccesToken from 'features/auth/hooks/useAuthToken';
import useLogOut from 'features/auth/hooks/useLogOut';

export default function LogOutButton() {
  const { data } = useRefreshAccesToken();
  const logOut = useLogOut();

  function handleClick() {
    return logOut.mutate();
  }

  return data?.accessToken ? (
    <button type="button" onClick={handleClick}>
      Log out
    </button>
  ) : null;
}
