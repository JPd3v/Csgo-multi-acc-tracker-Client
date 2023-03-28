/* eslint-disable react/jsx-props-no-spreading */
import { LoadingSpinner } from 'components';
import useSearchDrop from 'features/items/hooks/useSearchItem';
import { ItemsInfo } from 'features/items/types';
import useDebounce from 'hooks/useDebounce';
import { useForm } from 'react-hook-form';

interface IformInput {
  itemName: string;
}

interface Iprops {
  onItemSelection: (item: ItemsInfo) => void;
}

export default function SearchItems({ onItemSelection }: Iprops) {
  const { register, watch, handleSubmit } = useForm<IformInput>({
    mode: 'onChange',
  });
  const { itemName } = watch();
  const bounceInput = useDebounce(itemName, 700);
  const searchDrop = useSearchDrop(bounceInput);

  function onSubmit() {
    return undefined;
  }
  return (
    <div className="w-full bg-neutral-800 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="item name"
          {...register('itemName')}
          className="w-full rounded-lg bg-neutral-800  placeholder:text-blue-100"
        />
      </form>

      <div className="absolute flex w-full flex-col bg-neutral-800 ">
        {searchDrop.data?.map((item) => (
          <button
            type="button"
            key={item._id}
            className="w-full p-2 hover:bg-blue-900 "
            onClick={() => onItemSelection(item)}
          >
            <p>{item.item_name}</p>
          </button>
        ))}

        {searchDrop.isLoading && searchDrop.fetchStatus !== 'idle' ? (
          <LoadingSpinner className="m-2 self-center" size="2rem" />
        ) : null}

        {searchDrop.isError ? (
          <p aria-label="alert" className="text-center text-lg ">
            Something went wrong getting list of items
          </p>
        ) : null}

        {searchDrop.data?.length === 0 ? (
          <p aria-label="alert" className="text-center text-lg ">
            Item not found.
          </p>
        ) : null}
      </div>
    </div>
  );
}
