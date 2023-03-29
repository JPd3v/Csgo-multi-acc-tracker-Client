import { formatDistanceStrict, intervalToDuration } from 'date-fns';
import EditDropTimestamp from 'features/steamAccounts/components/EditDropTimestamp';
import { useState } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';

interface Iprops {
  accountId: string;
  lastDropTimestamp: string;
}

export default function DropTimestamp({
  accountId,
  lastDropTimestamp,
}: Iprops) {
  const [isEditing, setIsEditing] = useState(false);

  function handleOpenEdit() {
    setIsEditing(true);
  }

  function handleCloseEdit() {
    setIsEditing(false);
  }

  const formatedTime = formatDistanceStrict(
    new Date(),
    new Date(lastDropTimestamp)
  );

  const dateInterval = intervalToDuration({
    start: new Date(lastDropTimestamp),
    end: new Date(),
  });

  const isDropAvailable = dateInterval.days && dateInterval.days! >= 7;

  return isEditing ? (
    <EditDropTimestamp
      accountId={accountId}
      lastDropTimestamp={lastDropTimestamp}
      onClose={() => handleCloseEdit()}
    />
  ) : (
    <div
      className={`${
        isDropAvailable ? 'bg-green-700' : 'bg-red-700'
      } my-1 flex  w-full p-2 font-bold`}
    >
      {isDropAvailable ? (
        <div className="flex w-full flex-row rounded  text-center">
          <p className="flex-1"> Drop available</p>
          <button
            type="button"
            className="flex w-9  flex-row items-center justify-center "
            onClick={handleOpenEdit}
          >
            <IoSettingsSharp size="70%" />
          </button>
        </div>
      ) : (
        <div className=" w-full  rounded ">
          <div>
            <div className="flex flex-row  items-center text-center">
              <p className="flex-1">last drop: {formatedTime} ago</p>
              <button
                type="button"
                className="flex w-9  flex-row items-center justify-center "
                onClick={handleOpenEdit}
              >
                <IoSettingsSharp size="70%" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
