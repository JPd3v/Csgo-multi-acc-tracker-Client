import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { MainLayout } from 'layout';
import { ModalManager } from 'features/modals';
import { LoadingSpinner } from 'components';

function App() {
  const Home = lazy(() => import('pages/Home'));
  const PageNotFound = lazy(() => import('pages/PageNotFound'));

  return (
    <div className="relative h-screen">
      <Suspense
        fallback={
          <>
            <MainLayout />
            <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center">
              <LoadingSpinner size="4rem" />
            </div>
          </>
        }
      >
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>

        <ModalManager />
      </Suspense>
    </div>
  );
}

export default App;
