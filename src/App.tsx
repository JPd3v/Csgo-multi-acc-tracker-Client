import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { MainLayout } from 'layout';

function App() {
  const Home = lazy(() => import('pages/Home'));
  const PageNotFound = lazy(() => import('pages/PageNotFound'));

  return (
    <div className="relative">
      <Suspense
        fallback={
          <>
            <MainLayout />
            <div>loading... place holder</div>
          </>
        }
      >
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
