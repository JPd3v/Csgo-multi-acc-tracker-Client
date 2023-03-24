import { GoPlus } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { open } from 'features/modals/redux/modalsSlice';
import SteamAccountList from './SteamAccountList';

export default function SteamAccountsHub() {
  const dispatch = useDispatch();

  function handleOpenForm() {
    dispatch(open({ modal: 'newSteamAccount' }));
  }

  return (
    <>
      <div className="flex flex-col">
        <button
          type="button"
          onClick={handleOpenForm}
          className="flex w-fit items-center justify-center gap-1 self-center rounded bg-violet-700 p-1 px-2 hover:bg-violet-600"
        >
          <GoPlus />
          Add account
        </button>
      </div>
      <SteamAccountList />
    </>
  );
}
