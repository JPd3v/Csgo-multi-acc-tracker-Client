/* eslint-disable react/jsx-props-no-spreading */
import { LoadingSpinner } from 'components';
import useEditAccount from 'features/steamAccounts/hooks/useEditAccount';
import { IcreateAccount } from 'features/steamAccounts/types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Iprops {
  account: IcreateAccount;
  id: string;
  onCancelEdit: () => void;
}

export default function EditAccount({ account, id, onCancelEdit }: Iprops) {
  const { steam_url, name } = account;
  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<IcreateAccount>({
    mode: 'onChange',
    shouldUnregister: true,
    defaultValues: { name, steam_url },
  });
  const editAccount = useEditAccount();

  function onSubmit(formInputs: IcreateAccount) {
    clearErrors();
    const modifiedInputs = Object.fromEntries(
      Object.keys(dirtyFields).map((key) => [
        key,
        formInputs[key as keyof IcreateAccount],
      ])
    );
    editAccount.mutate({
      accountId: id,
      editedData: modifiedInputs as IcreateAccount,
    });
  }

  useEffect(() => {
    if (editAccount.isError) {
      const serverError = editAccount.error.response.data;
      serverError.errors?.map((error) =>
        setError(error.param as keyof IcreateAccount, {
          type: 'validate',
          message: error.msg,
        })
      );

      setError('root', { type: 'validate', message: serverError.message });
    }
  }, [editAccount.isError, setError, editAccount.error?.response.data]);

  useEffect(() => {
    if (editAccount.isSuccess) {
      onCancelEdit();
    }
  }, [editAccount.isSuccess, onCancelEdit]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center gap-3 self-center rounded-xl bg-slate-800 p-4  "
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

      {editAccount.isLoading ? (
        <LoadingSpinner className="text-3xl text-white" />
      ) : null}

      <div className="mt-2 flex flex-row gap-5">
        <button
          type="button"
          onClick={onCancelEdit}
          className="rounded-lg bg-gray-700 p-2 px-4 hover:bg-gray-600"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-700 p-2 px-4  hover:bg-blue-600"
          disabled={editAccount.isLoading}
        >
          Create
        </button>
      </div>
    </form>
  );
}
