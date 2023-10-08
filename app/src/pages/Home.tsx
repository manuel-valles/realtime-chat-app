import MainLayout from '../layouts/MainLayout';
import Sidebar from '../components/Sidebar.tsx';
import AuthOverlay from '../components/AuthOverlay.tsx';

function Home() {
  return (
    <MainLayout>
      <>
        <AuthOverlay />
        <Sidebar />
      </>
    </MainLayout>
  );
}

export default Home;
