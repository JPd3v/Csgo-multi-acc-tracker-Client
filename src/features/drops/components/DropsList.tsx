import { LoadingSpinner } from 'components';
import CreateDrop from 'features/drops/components/CreateDrop';
import Drop from 'features/drops/components/Drop';
import useDrops from 'features/drops/hooks/useDrops';
import { ItemsInfo, SearchItems } from 'features/items';
import { useState } from 'react';
import { BiError } from 'react-icons/bi';

interface Iprops {
  accountId: string;
}

export default function DropsList({ accountId }: Iprops) {
  const [showAddDropForm, setShowAddDropForm] = useState(false);
  const [item, setItem] = useState<ItemsInfo | undefined>(undefined);
  const drops = useDrops(accountId);

  function handleOpenForm() {
    setShowAddDropForm(true);
  }

  function handleCloseForm() {
    setItem(undefined);
    setShowAddDropForm(false);
  }

  function handleItemSelection(selectedItem: ItemsInfo | undefined) {
    setItem(selectedItem);
  }

  return (
    <div className=" relative flex w-full flex-1 flex-col gap-3 overflow-auto rounded bg-slate-900">
      {drops.isInitialLoading ? (
        <div className="flex h-full items-center justify-center overflow-hidden">
          <LoadingSpinner size="4rem" />
        </div>
      ) : (
        <>
          {showAddDropForm && !item ? (
            <div className="sticky top-0">
              <SearchItems
                onItemSelection={(selectedItem: ItemsInfo) =>
                  handleItemSelection(selectedItem)
                }
              />
            </div>
          ) : null}

          {item && showAddDropForm ? (
            <div className="sticky top-0">
              <CreateDrop
                item_data={item.item_data}
                item_name={item.item_name}
                accountId={accountId}
                onCancel={() => handleCloseForm()}
              />
            </div>
          ) : null}

          {drops.hasNextPage ? (
            <button
              type="button"
              onClick={() => drops.fetchNextPage()}
              className=" flex items-center justify-center gap-2 bg-gray-800"
            >
              load more
              {drops.isLoading ? <LoadingSpinner /> : null}
            </button>
          ) : null}

          {drops.data?.pages.map((page) =>
            page.drops.map((drop) => <Drop drop={drop} key={drop._id} />)
          )}
          {!showAddDropForm && !item && !drops.isError ? (
            <button
              type="button"
              className="sticky bottom-1 mt-3 w-1/2 self-center justify-self-center rounded bg-blue-700"
              onClick={handleOpenForm}
            >
              Add Drop
            </button>
          ) : null}
          {drops.isError ? (
            <p className="mt-9 flex flex-col items-center justify-center text-center text-lg font-medium">
              <BiError size="3rem" /> something went wrong in our server
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
