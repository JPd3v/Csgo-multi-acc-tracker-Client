import { TbError404 } from 'react-icons/tb';

export default function PageNotFound() {
  return (
    <main className="absolute top-0 left-0 right-0 bottom-0 m-auto flex h-fit w-fit flex-col items-center justify-center">
      <TbError404 size="6rem" />
      <p className="text-xl font-bold">Page Not Found.</p>
    </main>
  );
}
