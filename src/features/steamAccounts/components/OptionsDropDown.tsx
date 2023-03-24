import { open } from 'features/modals/redux/modalsSlice';
import useClickOutside from 'hooks/useClickOutside';
import { useState, useRef, useEffect } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

interface Iprops {
  accountId: string;
  onOpenEdit: () => void;
}

export default function OptionsDropDown({ onOpenEdit, accountId }: Iprops) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);
  const hasClickedOutside = useClickOutside(dropDownRef);

  const dispatch = useDispatch();

  function handleCloseDropDown() {
    setIsOpen(false);
  }

  function handleToggleDropDown() {
    setIsOpen((prev) => !prev);
  }

  function handleEdit() {
    handleCloseDropDown();
    onOpenEdit();
  }
  function handleDelete() {
    handleCloseDropDown();

    dispatch(
      open({ modal: 'deleteSteamAccount', extraInfo: { id: accountId } })
    );
  }

  useEffect(() => {
    return handleCloseDropDown();
  }, [hasClickedOutside]);

  return (
    <div ref={dropDownRef} className="absolute right-3 top-3 ">
      <button
        type="button"
        aria-label="Account options"
        onClick={handleToggleDropDown}
      >
        <BiDotsVerticalRounded className="text-2xl" />
      </button>
      {isOpen ? (
        <div className="absolute flex -translate-x-full flex-col gap-2 rounded bg-gray-600 p-3">
          <button
            type="button"
            onClick={handleEdit}
            className=" hover:text-slate-300"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className=" hover:text-slate-300"
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}
