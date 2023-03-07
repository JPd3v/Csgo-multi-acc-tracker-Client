import Navbar from 'features/ui/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

function App() {
  const Home = lazy(() => import('pages/Home'));

  return (
    <div className="relative h-screen">
      <Suspense fallback={<div>loading...</div>}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
