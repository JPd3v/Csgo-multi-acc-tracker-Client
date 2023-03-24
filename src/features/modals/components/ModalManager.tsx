import { ModalCreateAccount, ModalDeleteAccount } from 'features/steamAccounts';

export default function ModalManager() {
  return (
    <div>
      <ModalCreateAccount />
      <ModalDeleteAccount />
    </div>
  );
}
