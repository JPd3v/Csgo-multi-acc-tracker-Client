/* eslint-disable react/jsx-props-no-spreading */
import { LoadingSpinner } from 'components';
import { ModalWrapper } from 'features/modals';
import { closeAll, selectModals } from 'features/modals/redux/modalsSlice';
import useCreateAccount from 'features/steamAccounts/hooks/useCreateAccount';
import { IcreateAccount } from 'features/steamAccounts/types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'stores/store';
import { useEffect } from 'react';

export default function ModalCreateAccount() {
  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<IcreateAccount>({
    mode: 'onChange',
    shouldUnregister: true,
  });
  const dispatch = useDispatch();
  const modalsStates = useAppSelector(selectModals);
  const createAccount = useCreateAccount();

  function handleClose() {
    dispatch(closeAll());
    clearErrors('root');
  }

  useEffect(() => {
    if (createAccount.isSuccess) {
      dispatch(closeAll());
    }
  }, [createAccount.isSuccess, dispatch]);

  useEffect(() => {
    if (createAccount.isError) {
      const serverError = createAccount.error.response.data;
      serverError.errors?.map((error) =>
        setError(error.param as keyof IcreateAccount, {
          type: 'validate',
          message: error.msg,
        })
      );

      setError('root', { type: 'validate', message: serverError.message });
    }
  }, [createAccount.isError, setError, createAccount.error?.response.data]);

  function onSubmit(formInputs: IcreateAccount) {
    const modifiedInputs = Object.fromEntries(
      Object.keys(dirtyFields).map((key) => [
        key,
        formInputs[key as keyof IcreateAccount],
      ])
    );
    createAccount.mutate(modifiedInputs as IcreateAccount);
  }
  return modalsStates.newSteamAccount ? (
    <ModalWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col items-center gap-3 self-center rounded-xl bg-slate-800 p-4  "
        noValidate
      >
        <label htmlFor="account name" className="flex w-4/5 flex-col ">
          <p>
            Account name{' '}
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
          </p>
          <input
            type="text"
            autoComplete="off"
            required
            {...register('name', {
              required: 'Account name is required',
              maxLength: {
                value: 15,
                message: "Account name can't be longer than 15 characters",
              },
            })}
            id="account name"
            className=" rounded-lg bg-slate-700 p-1 text-center"
            aria-labelledby="name-error"
            aria-invalid={errors.name ? 'true' : 'false'}
          />
        </label>
        {errors.name ? (
          <p className="text-center text-red-400 " id="name-error">
            {errors.name.message}
          </p>
        ) : null}

        <label htmlFor="account url" className=" flex w-4/5 flex-col">
          Steam profile url
          <input
            type="text"
            autoComplete="off"
            {...register('steam_url', {
              pattern: {
                value: /steamcommunity.com/g,
                message: 'Steam profile url is not valid',
              },
            })}
            id="account url"
            className=" w-full rounded-lg bg-slate-700 p-1 text-center"
            aria-labelledby="steam-url-error"
            aria-invalid={errors.steam_url ? 'true' : 'false'}
          />
        </label>

        {errors.steam_url ? (
          <p className=" text-center text-red-400 " id="steam-url-error">
            {errors.steam_url.message}
          </p>
        ) : null}
        {errors.root ? (
          <p className=" text-center text-red-400" role="alert">
            {errors.root?.message}
          </p>
        ) : null}

        {createAccount.isLoading ? (
          <LoadingSpinner className="text-3xl text-white" />
        ) : null}

        <div className="mt-2 flex flex-row gap-5">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg bg-gray-700 p-2 px-4 hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-700 p-2 px-4  hover:bg-blue-600"
            disabled={createAccount.isLoading}
          >
            Create
          </button>
        </div>
      </form>
    </ModalWrapper>
  ) : null;
}
