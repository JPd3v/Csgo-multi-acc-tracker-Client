/* eslint-disable react/jsx-props-no-spreading */
import { LoadingSpinner } from 'components';
import useCreateDrop from 'features/drops/hooks/useCreateDrop';
import { ItemsInfo } from 'features/items';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ImCancelCircle } from 'react-icons/im';
import { MdOutlineOpenInNew } from 'react-icons/md';

interface Iprops extends Pick<ItemsInfo, 'item_data' | 'item_name'> {
  accountId: string;
  onCancel: () => void;
}

interface IformInputs {
  price: number;
  quality: string;
}

export default function CreateDrop({
  item_data,
  item_name,
  accountId,
  onCancel,
}: Iprops) {
  const { register, handleSubmit, setValue } = useForm<IformInputs>({
    mode: 'onChange',
    defaultValues: { price: item_data[0].price, quality: item_data[0].quality },
  });
  let communityMarketLink = item_data[0].steam_url;
  const newDrop = useCreateDrop();

  useEffect(() => {
    if (newDrop.isSuccess) {
      return () => onCancel();
    }
    return undefined;
  }, [newDrop.isSuccess, onCancel]);

  function handleQualityChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const currentItem = item_data.find(
      (item) => item.quality === event.target.value
    );
    setValue('price', currentItem?.price as number);
    communityMarketLink = currentItem?.steam_url as string;
  }

  function onSubmit(IformInputs: IformInputs) {
    newDrop.mutate({
      ...IformInputs,
      name: item_name,
      steam_account_id: accountId,
    });
  }
  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="absolute w-full border-b-2 border-neutral-600 bg-neutral-800 p-2"
    >
      <button
        type="button"
        aria-label="cancel new drop creation"
        onClick={onCancel}
        className="absolute right-2 top-2"
      >
        <ImCancelCircle />
      </button>

      <div>
        <p>Name</p>
        <p>{item_name}</p>
      </div>

      <div className="mt-3 flex gap-3">
        {item_data[0].quality ? (
          <label htmlFor="drop-name" className="flex flex-grow flex-col ">
            Quality
            <select
              {...register('quality', {
                onChange: (event) => handleQualityChange(event),
              })}
              className="w-full rounded-lg bg-slate-700 p-1"
            >
              {item_data.map((data) => (
                <option key={data.quality} value={data.quality}>
                  {data.quality}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <label htmlFor="item-price" className="flex w-16 flex-col  ">
          <p className="flex gap-1">
            Price
            <a
              href={communityMarketLink}
              target="_blank"
              rel="noreferrer"
              aria-label="view item price in steam"
            >
              <MdOutlineOpenInNew />
            </a>
          </p>
          <input
            {...register('price')}
            type="number"
            id="item-price"
            step=".01"
            className="rounded-lg bg-slate-700 p-1"
          />
        </label>
      </div>

      <div className="flex flex-col items-center justify-center">
        {newDrop.isLoading ? <LoadingSpinner size="2rem" /> : null}

        <button
          type="submit"
          disabled={newDrop.isLoading}
          className="m-3 rounded bg-violet-700 p-1 px-2 hover:bg-violet-600"
        >
          Create
        </button>
      </div>
    </form>
  );
}
