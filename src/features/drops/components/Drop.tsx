import useDeleteDrop from 'features/drops/hooks/useDeleteDrop';
import { Idrop } from 'features/drops/types';
import { RiDeleteBin6Fill } from 'react-icons/ri';

interface Iprops {
  drop: Idrop;
}
export default function Drop({ drop }: Iprops) {
  const { name, price, _id, quality, steam_account_id } = drop;

  const deleteDrop = useDeleteDrop();

  function handleDelete() {
    deleteDrop.mutate({
      dropId: _id,
      _dropPrice: price,
      _steamAccountId: steam_account_id,
    });
  }

  return (
    <div className="flex items-center justify-between px-3">
      <div>
        <p>{name}</p>
        <p className="text-xs">{quality}</p>
      </div>
      <div className="flex items-center gap-1">
        <p>{price}</p>
        <button type="button" aria-label="delete drop" onClick={handleDelete}>
          <RiDeleteBin6Fill />
        </button>
      </div>
    </div>
  );
}
