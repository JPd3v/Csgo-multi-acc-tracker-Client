import { useQueryClient } from '@tanstack/react-query';
import { ModalWrapper } from 'features/modals';
import { closeAll, selectModals } from 'features/modals/redux/modalsSlice';
import useDeleteAccount from 'features/steamAccounts/hooks/useDeleteAccount';
import type { InfiniteSteamAccounts } from 'features/steamAccounts/types';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'stores/store';

export default function ModalDeleteAccount() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const modalSelector = useAppSelector(selectModals);
  const deleteAccount = useDeleteAccount();
  const steamAccounts = queryClient.getQueryData<InfiniteSteamAccounts>([
    'steamAccounts',
  ]);

  const accountBeingDeleted = steamAccounts?.pages.map((page) => {
    return page.steamAccounts.find(
      (account) =>
        account._id === modalSelector.deleteSteamAccount.extraInfo?.id
    );
  });

  function handleClose() {
    dispatch(closeAll());
  }

  function handleDelete() {
    deleteAccount.mutate(
      modalSelector.deleteSteamAccount.extraInfo?.id as string
    );
    handleClose();
  }

  if (!accountBeingDeleted) {
    return null;
  }

  return modalSelector.deleteSteamAccount.show ? (
    <ModalWrapper>
      <div className="flex max-w-sm flex-col rounded-xl bg-slate-800 p-4 ">
        <p>
          Are you sure you want to delete{' '}
          <span className="text-xl font-medium text-red-400">
            {accountBeingDeleted[0]?.name}
          </span>{' '}
          steam account? this action is irreversible.
        </p>
        <div className="mt-2 flex flex-row justify-center gap-5">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg bg-gray-700 p-2 px-4 hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg bg-red-700 p-2 px-4  hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </ModalWrapper>
  ) : null;
}
