import { useState, useEffect } from 'react';

export default function useClickOutside(
  ElementRef: React.RefObject<HTMLElement>
) {
  const [hasClickedOutside, setHasClickedOutside] = useState(false);

  useEffect(() => {
    function handleClickOutside({ target }: MouseEvent) {
      if (ElementRef.current && !ElementRef.current.contains(target as Node)) {
        setHasClickedOutside((prev) => !prev);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ElementRef]);
  return hasClickedOutside;
}
