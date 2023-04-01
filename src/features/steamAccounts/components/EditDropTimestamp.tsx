/* eslint-disable react/jsx-props-no-spreading */
import useEditAccount from 'features/steamAccounts/hooks/useEditAccount';
import { useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';
import { useEffect } from 'react';
import { LoadingSpinner } from 'components';

interface Iprops {
  accountId: string;
  lastDropTimestamp: string;
  onClose: () => void;
}

interface Iform {
  last_drop_timestamp: string;
}

export default function EditDropTimestamp({
  accountId,
  lastDropTimestamp,
  onClose,
}: Iprops) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<Iform>({
    mode: 'onChange',
    defaultValues: {
      last_drop_timestamp: lastDropTimestamp,
    },
    shouldUnregister: true,
  });

  const updateTimestamp = useEditAccount();

  function onSubmit(data: Iform) {
    updateTimestamp.mutate({ accountId, editedData: data });
  }

  useEffect(() => {
    if (updateTimestamp.isError) {
      const serverError = updateTimestamp.error.response.data;
      serverError.errors?.map((error) =>
        setError(error.param as keyof Iform, {
          type: 'validate',
          message: error.msg,
        })
      );

      setError('root', { type: 'validate', message: serverError.message });
    }
  }, [updateTimestamp.isError, setError, updateTimestamp.error?.response.data]);

  useEffect(() => {
    if (updateTimestamp.isSuccess) {
      onClose();
    }
  }, [updateTimestamp.isSuccess, onClose]);

  return (
    <form
      className="flex w-full flex-wrap justify-between gap-2 p-1 "
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="drop-timestamp" aria-label="edit last drop timestamp">
        <input
          type="datetime-local"
          id="drop-timestamp"
          aria-labelledby="drop-timestamp-error"
          aria-invalid={errors.last_drop_timestamp ? 'true' : 'false'}
          className="bg-slate-500"
          {...register('last_drop_timestamp', {
            required: { value: true, message: 'drop timestamp cant be empty' },
            validate: (value) =>
              new Date(value) < new Date() ||
              'drop timestamp cant be a future date',
          })}
        />
      </label>

      {errors.last_drop_timestamp ? (
        <p id="drop-timestamp-error">{errors.last_drop_timestamp.message}</p>
      ) : null}

      {errors.root ? (
        <p id="drop-timestamp-error">{errors.root.message}</p>
      ) : null}

      <div className="flex items-center gap-2">
        {updateTimestamp.isLoading ? (
          <LoadingSpinner className="items-center" size="2rem" />
        ) : null}

        <button type="submit" className="rounded bg-blue-700 px-3 py-1">
          Save
        </button>

        <button
          type="button"
          className="flex w-8  flex-row items-center justify-center "
          onClick={onClose}
          aria-label="cancel drop timestamp update"
        >
          <IoCloseOutline size="70%" />
        </button>
      </div>
    </form>
  );
}
