import FocusLock from 'react-focus-lock';

interface Iprops {
  children: JSX.Element;
}

export default function ModalWrapper({ children }: Iprops) {
  return (
    <div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-gray-900/80">
      <FocusLock className="m-3 flex w-full justify-center">
        {children}
      </FocusLock>
    </div>
  );
}
