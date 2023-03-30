import { TbError404 } from 'react-icons/tb';

export default function PageNotFound() {
  return (
    <main className="fixed top-0 left-0 flex h-full w-full flex-col items-center justify-center">
      <TbError404 size="6rem" />
      <p className="text-xl font-bold">Page Not Found.</p>
    </main>
  );
}
