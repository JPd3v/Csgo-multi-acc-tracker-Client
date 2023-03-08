import { useAuthToken } from 'features/auth';
import Navbar from 'features/ui/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  useAuthToken();
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
